import LoginContainer from "../view/container/LoginContainer";
import LoginInteractor from "../view/interactor/LoginInteractor";
import authRepository from "../driver/repository/authRepository";
import oAuthSessionRepository from "../driver/repository/oAuthSessionRepository";

const LoginPage = (): JSX.Element => {
  return (
    <LoginContainer repositories={{
      authRepository,
      oAuthSessionRepository
    }}>
      <div className="w-full mt-20 flex justify-center">
        <LoginInteractor/>
      </div>
    </LoginContainer>
  );
}

export default LoginPage;
