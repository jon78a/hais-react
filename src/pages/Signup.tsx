import userRepository from "../driver/repository/userRepository";
import authRepository from "../driver/repository/authRepository";
import studentRepository from "../driver/repository/studentRepository";
import SignupContainer from "../view/container/SignupContainer";
import SignupInteractor from "../view/interactor/SignupInteractor";
import unsignedUserRepository from "../driver/repository/unsignedUserRepository";
import oAuthStatusRepository from "../driver/repository/oAuthStatusRepository";
import authSessionRepository from "../driver/repository/authSessionRepository";
import schoolRepository from "../driver/repository/schoolRepository";

const SignupPage = (): JSX.Element => {
  return (
    <SignupContainer
      repositories={{
        userRepository,
        authRepository,
        studentRepository,
        unsignedUserRepository,
        oAuthStatusRepository,
        authSessionRepository,
        schoolRepository,
      }}
    >
      <div className="w-full my-20 flex justify-center">
        <SignupInteractor />
      </div>
    </SignupContainer>
  );
};

export default SignupPage;
