import { userRepository } from "../driver/repository/account";
import { authRepository } from "../driver/repository/account";
import { studentRepository } from "../driver/repository/subject";
import SignupContainer from "../view/container/SignupContainer";
import SignupInteractor from "../view/interactor/SignupInteractor";

const SignupPage = (): JSX.Element => {
  return (
    <SignupContainer repositories={{
      userRepository,
      authRepository,
      studentRepository
    }}>
      <SignupInteractor/>
    </SignupContainer>
  );
}

export default SignupPage;
