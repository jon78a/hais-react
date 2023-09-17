import { useRecoilState } from "recoil";

import { useSignupService } from "../../context/signup";
import { SignupMain } from "../presenter/signup.ui/SignupMain";
import { useSignupStep } from "../../recoil-hooks/useSignupStep";
import { signupRequestState } from "../../schema/atom/Signup";

const SignupInteractor: React.FC = () => {
  const service = useSignupService();
  const { step } = useSignupStep();

  const [signupRequest, setSignupRequest] = useRecoilState(signupRequestState);

  switch(step) {
    case 1:
      return (
        <SignupMain
          clickMarketingAgreementToggle={() => {
            setSignupRequest({
              ...signupRequest,
              isAgreeMarketing: !signupRequest.isAgreeMarketing
            })
          }}
          inputEmail={(value) => {
            setSignupRequest({
              ...signupRequest,
              email: value
            });
            return service.checkEmail(value);
          }}
          inputPassword={(value) => {
            setSignupRequest({
              ...signupRequest,
              password: value
            });
            return service.checkPassword(value);
          }}
          inputPasswordConfirm={(value) => {
            setSignupRequest({
              ...signupRequest,
              passwordConfirm: value
            });
            return service.checkPasswordConfirm(signupRequest.password, value);
          }}
          clickSignup={(authType) => {
            setSignupRequest({
              ...signupRequest,
              authType
            });
            service.requestSignup(signupRequest);
          }}
        />
      );
    default:
      throw new Error("step invalid");
  }
}

export default SignupInteractor;
