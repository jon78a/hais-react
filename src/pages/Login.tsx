import LoginContainer from "../view/container/LoginContainer";
import LoginInteractor from "../view/interactor/LoginInteractor";
import authRepository from "../driver/repository/authRepository";
import oAuthStatusRepository from "../driver/repository/oAuthStatusRepository";
import authSessionRepository from "../driver/repository/authSessionRepository";
import userRepository from "../driver/repository/userRepository";

const LoginPage = (): JSX.Element => {
  return (
    <LoginContainer repositories={{
      authSessionRepository,
      authRepository,
      oAuthStatusRepository,
      userRepository
    }}>
      <div className="w-full mt-20 flex justify-center">
        <LoginInteractor/>
      </div>
    </LoginContainer>
  );
}

export default LoginPage;
