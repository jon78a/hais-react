import { userRepository } from "../driver/repository/account";
import { authRepository } from "../driver/repository/account";
import SignupContainer from "../view/container/SignupContainer";

const SignupPage = (): JSX.Element => {
  return (
    <SignupContainer repositories={{
      userRepository,
      authRepository
    }}>
    </SignupContainer>
  );
}

export default SignupPage;
