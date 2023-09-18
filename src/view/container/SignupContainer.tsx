import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useSearchParams } from "react-router-dom";

import { SignupContext } from "../../context/signup";
import { UserRepository } from "../../domain/account/user.interface";
import { defaultUser, userErrorMap, userState } from "../../domain/account/user.impl";
import * as accountPolicy from "../../policy/account";
import { defaultStudent, studentState } from "../../domain/subject/school.impl";
import { AuthRepository } from "../../domain/account/auth.interface";
import { OAuthEnum } from "../../policy/auth";
import { StudentRepository } from "../../domain/subject/school.interface";
import { firebaseAuth } from "../../driver/firebase/firebase";
import { routes } from "../../policy/routes";

export default function SignupContainer({
  children,
  repositories
}: {
  children: React.ReactNode,
  repositories: {
    userRepository: UserRepository,
    authRepository: AuthRepository,
    studentRepository: StudentRepository
  }
}) {
  const {
    userRepository,
    authRepository,
    studentRepository
  } = repositories;

  const [userSnapshot, setUserSnapshot] = useRecoilState(userState);
  const [studentSnapshot, setStudentSnapshot] = useRecoilState(studentState);

  // const {step, setStep} = useSignupStep();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get("step") === "2") return;

    const unsubscribe = firebaseAuth.onIdTokenChanged((user) => {
      const tmpUser = userRepository.getUserOnClient();
      if (user) {
        (async () => {
          await user.reload();
          if (user.emailVerified && tmpUser) {
            userRepository.saveUserOnClient({
              ...tmpUser,
              verified: true
            });
            searchParams.set("step", "2");
            setSearchParams(searchParams);
          };
        })();
      }
    });

    return () => {
      unsubscribe();
    }
  }, [navigate, routes, searchParams, setSearchParams]);

  useEffect(() => {
    const cleanError = () => {
      setUserSnapshot({
        ...userSnapshot,
        error: undefined
      });
      setStudentSnapshot({
        ...studentSnapshot,
        error: undefined
      });
    }
    if (userSnapshot.error) {
      alert(userSnapshot.error.message);
      cleanError();
      return;
    }
    if (studentSnapshot.error) {
      alert(studentSnapshot.error.message);
      cleanError();
      return;
    }
  }, [
    userSnapshot,
    studentSnapshot
  ]);

  return (
    <SignupContext.Provider value={{
      /**
      @startuml submitStudentInfo
      User -> Client: [Action] 다음 버튼 클릭
      Client -> Service: [Dispatch] 기본 학생 정보 제출

      activate Service
      Service -> Service: 필수 입력 사항 검토
      alt 실패
        Service --> User: [Alert] 필수 항목을 입력해주세요
      else Pass
      end

      Service -> Model: StudentProfile form 저장
      Service -> Service: step++
      deactivate Service
      @enduml
      */
      submitStudentInfo(form) {
        if (!accountPolicy.NAME_REGEX.test(form.name)) {
          setUserSnapshot({
            data: defaultUser,
            error: userErrorMap.NO_NAME,
            loading: false
          });
          return;
        }
        if (!form.schoolYear) {
          setUserSnapshot({
            data: defaultUser,
            error: userErrorMap.NO_SCHOOL_YEAR,
            loading: false
          });
          return;
        }
        if (!form.subjectCategory) {
          setUserSnapshot({
            data: defaultUser,
            error: userErrorMap.NO_SUBJECT_CATEGORY,
            loading: false
          });
          return;
        }
        setStudentSnapshot({
          data: {
            ...studentSnapshot.data,
            name: form.name,
            category: form.subjectCategory,
            schoolYear: form.schoolYear,
            targetMajor: form.targetMajor
          },
          loading: true
        });
      },
      /**
      @startuml signupComplete
      activate Service
      Service -> Service: loading = true
      Model -> DB: 유저 생성

      alt 실패
      Model --> Service: Error
      Service -> Service: loading = false
      Service -> Service: initialize
      Service --> User: [Alert] "회원가입에 실패하였습니다."
      else 성공
      Model --> Service: Success
      Service -> Service: loading = false
      Service -> Service: initialize
      end
      deactivate Service
      Service --> User: 홈 화면으로 이동
      @enduml
      */
      signupComplete() {
        const tmpUser = userRepository.getUserOnClient();
        if (!tmpUser) throw Error("유저 세션이 존재하지 않습니다.");

        Promise.all([
          userRepository.save({
            ...tmpUser,
            activated: true
          }),
          studentRepository.save(studentSnapshot.data)
        ]).then(() => {
          setUserSnapshot({
            data: defaultUser,
            loading: false
          });
          setStudentSnapshot({
            data: defaultStudent,
            loading: false
          });
          // 회원가입 시 자동 로그인
          authRepository.login({
            email: tmpUser.email,
            password: tmpUser.password
          });
        }).catch((e) => {
          setUserSnapshot({
            data: defaultUser,
            loading: false,
            error: userErrorMap.SIGNUP_FAILED
          });
          setStudentSnapshot({
            data: defaultStudent,
            loading: false,
            error: userErrorMap.SIGNUP_FAILED
          });
          console.error(e);
        });

        userRepository.removeUserOnClient();
      },
      async requestSignup(form) {
        if (form.authType === "NORMAL") {
          const payload = await userRepository.findByCredential(form.email, form.password);
          if (!!payload) return setUserSnapshot({
            data: defaultUser,
            loading: false,
            error: userErrorMap.EXISTED_USER
          });

          let data: typeof userSnapshot.data = {
            ...userSnapshot.data,
            authType: form.authType,
            email: form.email,
            password: form.password,
            marketingAgreement: form.isAgreeMarketing ? "Y" : "N"
          }
          setUserSnapshot({
            data,
            loading: true
          });
          authRepository.register({
            email: form.email,
            password: form.password
          })
            .then(({ userId }) => {
              data = {
                ...data,
                id: userId
              }
              setUserSnapshot({
                data,
                loading: false
              });
              setStudentSnapshot({
                data: {
                  ...studentSnapshot.data,
                  userId
                },
                loading: false
              });
              authRepository.sendEmail(form.email);
              userRepository.saveUserOnClient(data);
            })
            .catch((e) => {
              setUserSnapshot({
                ...userSnapshot,
                error: e,
                loading: false
              });
              console.error(e);
            });
          return;
        }

        let data = {
          ...userSnapshot.data,
          authType: form.authType
        }
        setUserSnapshot({
          ...userSnapshot,
          data
        });
        userRepository.saveUserOnClient(data);
        authRepository.oAuthAuthorize(OAuthEnum[form.authType]);
      },
      resetRequest() {
        // 추후에 adminRepository 만들어 강제 삭제 시키기
        userRepository.removeUserOnClient();
        searchParams.set("step", "1");
        setSearchParams(searchParams);
      },
      checkEmail(value) {
        if (!accountPolicy.EMAIL_REGEX.test(value)) {
          return {
            name: "INVALID_EMAIL",
            message: "이메일 형식이 올바르지 않습니다."
          }
        }
        return null;
      },
      checkPassword(value) {
        if (!accountPolicy.PASSWORD_REGEX.test(value)) {
          return {
            name: "INVALID_PASSWORD",
            message: "영문/숫자/특수문자를 포함해서 8~32자로 입력해주세요."
          }
        }
        return null;
      },
      checkPasswordConfirm(password, passwordConfirm) {
        if (password !== passwordConfirm) return {
          name: "INVALID_PASSWORD_CONFIRM",
          message: "비밀번호가 일치하지 않습니다."
        }
        return null;
      },
      checkName(value) {
        if (!accountPolicy.NAME_REGEX.test(value)) {
          return {
            name: "INVALID_NAME",
            message: "이름을 올바르게 입력해 주세요."
          }
        }
        return null;
      },
    }}>
      {children}
    </SignupContext.Provider>
  );
}
