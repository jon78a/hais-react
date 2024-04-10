import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";
import { useRecoilValue } from "recoil";
import { authSessionState } from "../schema/states/AuthSession";

const MyPage = () => {
  const authSession = useRecoilValue(authSessionState);

  const navigate = useNavigate();

  useEffect(() => {
    navigate(
      authSession?.isPremium ? routes.myPremium.path : routes.myScore.path
    );
  }, [authSession?.isPremium, navigate]);
  return <></>;
};

export default MyPage;
