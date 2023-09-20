import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useSearchParams } from "react-router-dom";

import { SignupContext } from "../../context/signup";
import { UserRepository, UserSessionRepository } from "../../domain/account/user.interface";
import { defaultUser, userErrorMap, userState } from "../../domain/account/user.impl";
import * as accountPolicy from "../../policy/account";
import { defaultStudent, studentState } from "../../domain/subject-recommend/school.impl";
import { AuthRepository } from "../../domain/account/auth.interface";
import { OAuthEnum } from "../../policy/auth";
import { StudentRepository } from "../../domain/subject-recommend/school.interface";
import { firebaseAuth } from "../../driver/firebase/firebase";
import { routes } from "../../policy/routes";
import { userExceptionMap } from "../../domain/account/user.impl";
import { studentExceptionMap } from "../../domain/subject-recommend/school.impl";

export default function SignupContainer({
  children,
  repositories
}: {
  children: React.ReactNode,
  repositories: {
    userRepository: UserRepository,
    authRepository: AuthRepository,
    studentRepository: StudentRepository,
    userSessionRepository: UserSessionRepository
  }
}) {
  const {
    userRepository,
    authRepository,
    studentRepository,
    userSessionRepository
  } = repositories;

  const [userSnapshot, setUserSnapshot] = useRecoilState(userState);
  const [studentSnapshot, setStudentSnapshot] = useRecoilState(studentState);

  // const {step, setStep} = useSignupStep();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get("step") === "2") return;

    const unsubscribe = firebaseAuth.onIdTokenChanged((fbUser) => {
      const user = userSessionRepository.getUser();
      if (fbUser) {
        (async () => {
          await fbUser.reload();
          if (fbUser.emailVerified && user) {
            userSessionRepository.save({
              ...user,
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
              userSessionRepository.save(data);
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
        userSessionRepository.save(data);
        authRepository.oAuthAuthorize(OAuthEnum[form.authType]);
      },
      submitStudentInfo(form) {
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
      signupComplete() {
        const tmpUser = userSessionRepository.getUser();
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

        userSessionRepository.delete();
      },
      resetRequest() {
        // 추후에 adminRepository 만들어 강제 삭제 시키기
        userSessionRepository.delete();
        searchParams.set("step", "1");
        setSearchParams(searchParams);
      },
      checkEmail(value) {
        if (!accountPolicy.EMAIL_REGEX.test(value)) {
          return userExceptionMap.INVALID_EMAIL;
        }
        return null;
      },
      checkPassword(value) {
        if (!accountPolicy.PASSWORD_REGEX.test(value)) {
          return userExceptionMap.INVALID_PASSWORD;
        }
        return null;
      },
      checkPasswordConfirm(password, passwordConfirm) {
        if (password !== passwordConfirm) {
          return userExceptionMap.INVALID_PASSWORD_CONFIRM;
        }
        return null;
      },
      checkName(value) {
        if (!accountPolicy.NAME_REGEX.test(value)) {
          return studentExceptionMap.INVALID_NAME;
        }
        return null;
      },
    }}>
      {children}
    </SignupContext.Provider>
  );
}
