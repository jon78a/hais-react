import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { OAuthEnum } from "../policy/auth";
import { generateOAuthEmail, generateOAuthPassword } from "../policy/auth";
import { PASSWORD_MAX_LENGTH } from "../policy/account";
import { useRecoilValue } from "recoil";
import { userState } from "../domain/account/user.impl";
import { OAuthClient } from "../driver/oauth/client";
import { routes } from "../policy/routes";
import { userRepository } from "../driver/repository/account";

const OAuthPage = () => {
  const navigate = useNavigate();

  const [searchParams, __setSearchParams] = useSearchParams();
  const { slug } = useParams();

  const userSnapshot = useRecoilValue(userState);

  useEffect(() => {
    if (!searchParams.has("code")) new Error("code가 반드시 필요합니다.");
    const code = searchParams.get("code")!;

    let email = "";
    let password = "";

    if (slug === OAuthEnum.KAKAO) {
      const oAuthClient = new OAuthClient(slug);

      email = generateOAuthEmail(OAuthEnum.KAKAO);
      password = generateOAuthPassword(PASSWORD_MAX_LENGTH);

      oAuthClient.provider.getOAuthToken(code)
        .then(({accessToken}) => {
          oAuthClient.provider.getOAuthUserId(accessToken)
            .then(({userId}) => {
              userRepository.saveUserOnClient({
                ...userSnapshot.data,
                verified: true,
                id: userId
              });
            });
          
          navigate(routes.signup.path + "?step=2");
        })
        .catch((e) => console.error(e));
    }
  }, [slug, searchParams]);
  return (
    <></>
  );
}

export default OAuthPage;
