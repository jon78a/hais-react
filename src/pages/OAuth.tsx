import { useEffect } from "react";
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
  const { slug } = useParams();

  const userSnapshot = useRecoilValue(userState);

  useEffect(() => {
    if (!searchParams.has("code")) new Error("code가 반드시 필요합니다.");
    if (!slug) return;

    const code = searchParams.get("code")!;

    const oAuthType = slug as OAuthEnum;
    const oAuthSessionType = oAuthStatusRepository.find()

    if (!oAuthSessionType) {
      alert("비정상적인 접근입니다");
      window.location.replace(routes.home.path);
    }

    let email = "";
    let password = "";

    const oAuthClient = new OAuthClient(oAuthType);

    email = generateOAuthEmail(oAuthType);
    password = generateOAuthPassword(PASSWORD_MAX_LENGTH);

    oAuthClient.provider.getOAuthToken(code)
      .then(({accessToken}) => {
        oAuthClient.provider.getOAuthUserId(accessToken)
          .then(({userId}) => {
            if (!userId) return;
            if (oAuthSessionType === "LOGIN") {
              userRepository.findByUserId(userId).then((user) => {
                if (userId && !user) {
                  alert("회원가입을 먼저 해주세요");
                  navigate(routes.signup.path, {replace: true});
                  return;
                }
                authSessionRepository.save(userId, "GRANT");
                navigate(routes.home.path, {replace: true});
              });
            }
            else if (oAuthSessionType === "SIGNUP") {
              unsignedUserRepository.save({
                ...userSnapshot.data,
                verified: true,
                id: userId,
                authChoice: oAuthType.toUpperCase() as AuthChoiceType,
                email,
                password
              });
              navigate(routes.signup.path + "?step=2"); 
            } else {}
            oAuthStatusRepository.clear();
          });
      })
      .catch((e) => console.error(e));
  }, [slug, searchParams]);
  return (
    <></>
  );
}

export default OAuthPage;
