import { useRecoilValue } from "recoil";
import premiumRepository from "../driver/repository/PremiumRepository";
import { authSessionState } from "../schema/states/AuthSession";
import MyPremiumContainer from "../view/container/MyPremiumContainer";
import MyPremiumInteractor from "../view/interactor/MyPremiumInteractor";

const MyPremiumPage = () => {
  const authSession = useRecoilValue(authSessionState);
  const id = authSession?.premiumId;

  return (
    <MyPremiumContainer
      repositories={{
        premiumRepository,
      }}
    >
      {id ? <MyPremiumInteractor id={id} /> : <>loading...</>}
    </MyPremiumContainer>
  );
};

export default MyPremiumPage;
