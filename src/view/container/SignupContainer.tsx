import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { SignupContext } from "../../context/signup";
import { UserRepository } from "../../domain/account/user.interface";
import { useSignupStep } from "../../recoil-hooks/useSignupStep";
import { defaultUser, userErrorMap, userState } from "../../domain/account/user.impl";
import * as accountPolicy from "../../policy/account";
import { defaultStudent, studentState } from "../../domain/subject/school.impl";
import { AuthRepository } from "../../domain/account/auth.interface";
import { OAuthEnum } from "../../policy/auth";
import { StudentRepository } from "../../domain/subject/school.interface";
import { firebaseAuth } from "../../driver/firebase/firebase";

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

  const {setStep} = useSignupStep();

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) setStep(2);
      }
    });
    return () => {
      unsubscribe();
    }
  }, [setStep]);

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
    userSnapshot.error,
    studentSnapshot.error
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
          loading: false
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
        setUserSnapshot({
          data: {
            ...userSnapshot.data,
            verified: true,
            activated: true
          },
          loading: true
        });
        setStudentSnapshot({
          ...studentSnapshot,
          loading: true
        });

        Promise.all([
          userRepository.save(userSnapshot.data),
          studentRepository.save(studentSnapshot.data)
        ]).then(() => {
          setUserSnapshot({
            data: defaultUser,
            loading: false
          });
          setStudentSnapshot({
            data: defaultStudent,
            loading: false
          })
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
      },
      requestSignup(form) {
        if (form.authType === "NORMAL") {
          setUserSnapshot({
            ...userSnapshot,
            data: {
              ...userSnapshot.data,
              authType: form.authType,
              email: form.email,
              password: form.password,
              marketingAgreement: form.isAgreeMarketing ? "Y" : "N"
            }
          });
          authRepository.register({
            email: form.email,
            password: form.password
          })
            .then(({ userId }) => {
              setUserSnapshot({
                data: {
                  ...userSnapshot.data,
                  id: userId,
                },
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
            })
            .catch((e) => console.error(e));
          return;
        }

        setUserSnapshot({
          ...userSnapshot,
          data: {
            ...userSnapshot.data,
            authType: form.authType
          }
        });
        authRepository.oAuthAuthorize(OAuthEnum[form.authType]);
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
    }}>
      {children}
    </SignupContext.Provider>
  );
}
