import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import { AuthRepository, AuthSessionRepository, OAuthStatusRepository } from "../../domain/account/auth.interface";
import {
  LoginContext
} from "../../service/login"
import { defaultUserCredential, userCredentialState } from "../../domain/account/auth.impl";
import { OAuthEnum } from "../../policy/auth";
import { routes } from "../../routes";
import { UserRepository } from "../../domain/account/user.interface";
import { ErrorStatus } from "../../policy/errors";

const LoginContainer = ({
  children,
  repositories
}: {
  children: React.ReactNode;
  repositories: {
    authRepository: AuthRepository,
    userRepository: UserRepository,
    oAuthStatusRepository: OAuthStatusRepository,
    authSessionRepository: AuthSessionRepository
  };
}): JSX.Element => {
  const navigate = useNavigate();

  const setUserCredentialSnapshot = useSetRecoilState(userCredentialState);

  const {
    authRepository,
    oAuthStatusRepository,
    authSessionRepository,
    userRepository
  } = repositories;

  return (
    <LoginContext.Provider value={{
      async login(credential) {
        const {email, password} = credential;
        setUserCredentialSnapshot({
          data: {
            email,
            password
          },
          loading: true
        });
        try {
          const user = await userRepository.findByCredential(email, password);
          if (!user ||
            !user.activated || !user.verified) throw new Error(ErrorStatus.USER_NOT_FOUND);

          authSessionRepository.save(
            user.id,
            "GRANT"
          ).then(() => {
            setUserCredentialSnapshot({
              data: defaultUserCredential,
              loading: false
            });
            navigate(routes.home.path, {replace: true});
          });
        } catch(e) {
          if (e instanceof Error) {
            setUserCredentialSnapshot({
              data: {email, password},
              loading: false,
              error: {
                name: "LOGIN_FAILED",
                message: e.message
              }
            });
          } else {
            console.error(e);
            throw e;
          }
        }
      },
      async socialLogin(socialType) {
        oAuthStatusRepository.save("LOGIN");
        await authRepository.oAuthAuthorize(OAuthEnum[socialType]);
      }
      // findPassword(verifyingEmail) {
        
      // },
    }}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginContainer;
