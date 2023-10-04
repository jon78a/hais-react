import { useCallback, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { AuthChoiceType, OAuthEnum } from "../policy/auth";
import { generateOAuthEmail, generateOAuthPassword } from "../policy/auth";
import { PASSWORD_MAX_LENGTH } from "../policy/account";
import { useRecoilValue } from "recoil";
import { userState } from "../domain/account/user.impl";
import { OAuthClient } from "../driver/oauth/client";
import { routes } from "../routes";
import unsignedUserRepository from "../driver/repository/unsignedUserRepository";
import oAuthStatusRepository from "../driver/repository/oAuthStatusRepository";
import userRepository from "../driver/repository/userRepository";
import authSessionRepository from "../driver/repository/authSessionRepository";

const OAuthPage = () => {
  const navigate = useNavigate();

  const [searchParams, __setSearchParams] = useSearchParams();
  const code = searchParams.get("code")!;

  const { slug } = useParams();
  const oAuthType = slug as OAuthEnum;

  const oAuthStatus = oAuthStatusRepository.find();

  const email = generateOAuthEmail(oAuthType);
  const password = generateOAuthPassword(PASSWORD_MAX_LENGTH);

  const userSnapshot = useRecoilValue(userState);

  const handleSocialLogin = useCallback(async (oAuthClient: OAuthClient) => {
    const {accessToken} = await oAuthClient.provider.getOAuthToken(code);
    const {userId} = await oAuthClient.provider.getOAuthUserId(accessToken);
    if (!userId) return;
    const user = await userRepository.findByUserId(userId);
    if (!user) {
      alert("회원가입을 먼저 해주세요");
      navigate(routes.signup.path, {replace: true});
      return;
    }
    await authSessionRepository.save(userId, "GRANT");
    navigate(routes.home.path, {replace: true});
  }, [
    code,
    navigate
  ]);

  const handleSocialSignup = useCallback(async (oAuthClient: OAuthClient) => {
    const {accessToken} = await oAuthClient.provider.getOAuthToken(code);
    const {userId} = await oAuthClient.provider.getOAuthUserId(accessToken);
    if (!userId) return;
    unsignedUserRepository.save({
      ...userSnapshot.data,
      verified: true,
      id: userId,
      authChoice: oAuthType.toUpperCase() as AuthChoiceType,
      email,
      password
    });
    navigate(routes.signup.path + "?step=2");
  }, [
    code,
    oAuthType,
    email,
    password,
    userSnapshot,
    navigate
  ]);

  useEffect(() => {
    const oAuthClient = new OAuthClient(oAuthType);

    try {
      if (oAuthStatus === "LOGIN") {
        handleSocialLogin(oAuthClient);
      }
      else if (oAuthStatus === "SIGNUP") {
        handleSocialSignup(oAuthClient);
      }
      else {
        alert("비정상적인 접근입니다");
        window.location.replace(routes.home.path);
      }
    } catch(e) {
      console.error(e);
    }

    return () => oAuthStatusRepository.clear();
  }, [
    handleSocialLogin,
    handleSocialLogin,
    oAuthStatus
  ])

  return (
    <></>
  );
}

export default OAuthPage;
