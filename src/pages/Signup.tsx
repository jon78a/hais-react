import userRepository from "../driver/repository/userRepository";
import authRepository from "../driver/repository/authRepository";
import studentRepository from "../driver/repository/studentRepository";
import SignupContainer from "../view/container/SignupContainer";
import SignupInteractor from "../view/interactor/SignupInteractor";
import userSessionRepository from "../driver/repository/userSessionRepository";
import oAuthSessionRepository from "../driver/repository/oAuthSessionRepository";

const SignupPage = (): JSX.Element => {
  return (
    <SignupContainer repositories={{
      userRepository,
      authRepository,
      studentRepository,
      userSessionRepository,
      oAuthSessionRepository
    }}>
      <SignupInteractor/>
    </SignupContainer>
  );
}

export default SignupPage;
