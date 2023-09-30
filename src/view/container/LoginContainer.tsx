import { useSetRecoilState } from "recoil";

import { AuthRepository, OAuthSessionRepository } from "../../domain/account/auth.interface";
import {
  LoginContext
} from "../../service/login"
import { defaultUserCredential, userCredentialState } from "../../domain/account/auth.impl";
import { OAuthEnum } from "../../policy/auth";
import { routes } from "../../routes";

const LoginContainer = ({
  children,
  repositories
}: {
  children: React.ReactNode;
  repositories: {
    authRepository: AuthRepository,
    oAuthSessionRepository: OAuthSessionRepository
  };
}): JSX.Element => {
  const setUserCredentialSnapshot = useSetRecoilState(userCredentialState);

  const {authRepository, oAuthSessionRepository} = repositories;

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
          await authRepository.login({email, password});
          setUserCredentialSnapshot({
            data: defaultUserCredential,
            loading: false
          });
          window.location.replace(routes.home.path);
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
        oAuthSessionRepository.save("LOGIN");
        authRepository.oAuthAuthorize(OAuthEnum[socialType]);
      }
      // findPassword(verifyingEmail) {
        
      // },
    }}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginContainer;
