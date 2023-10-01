import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import { userCredentialState } from "../../domain/account/auth.impl";
import { loginRequestState } from "../../schema/states/Login";
import LoginForm from "../presenter/login.ui/LoginForm";
import { useLoginService } from "../../service/login";

const LoginInteractor: React.FC = () => {
  const userCredentialSnapshot = useRecoilValue(userCredentialState);

  const [loginRequest, setLoginRequest] = useRecoilState(loginRequestState);

  useEffect(() => {
    const {error} = userCredentialSnapshot;
    if (error) {
      alert(error.message);
    }
  }, [userCredentialSnapshot]);

  const service = useLoginService();

  return (
    <LoginForm
      inputEmail={(value) => {
        setLoginRequest({
          ...loginRequest,
          email: value
        });
      }}
      inputPassword={(value) => {
        setLoginRequest({
          ...loginRequest,
          password: value
        });
      }}
      clickLoginButton={() => {
        service.login(loginRequest);
      }}
      clickSocial={(socialType) => {
        service.socialLogin(socialType);
      }}
    />
  );
}

export default LoginInteractor;
