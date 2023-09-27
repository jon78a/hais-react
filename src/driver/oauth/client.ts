import qs from "qs";
import { capitalize } from "lodash";

import { OAuthEnum } from "../../policy/auth";
import { routes } from "../../routes";

interface TokenResult {
  accessToken: string;
  refreshToken: string;
}

interface ProfileResult {
  userId: string;
}

interface FetchApiConfig {
  url: string;
  getInit: (...args: any[]) => RequestInit | undefined;
  getResult: (data: any) => ProfileResult | TokenResult | undefined;
}

interface OAuthApiConfigs {
  authorize: FetchApiConfig;
  token: FetchApiConfig;
  profile: FetchApiConfig;
}

abstract class OAuthProvider {
  protected tokenType = "bearer";
  protected apiConfigs: OAuthApiConfigs = {
    authorize: {
      url: "",
      getInit: () => undefined,
      getResult: (data: any) => undefined
    },
    token: {
      url: "",
      getInit: (code: string) => undefined,
      getResult(data: any): TokenResult {
        return {
          accessToken: "",
          refreshToken: ""
        }
      }
    },
    profile: {
      url: "",
      getInit: (token: string) => undefined,
      getResult(data: any): ProfileResult {
        return {
          userId: ""
        }
      }
    }
  };
  protected redirectUri: string;
  protected clientId: string;

  constructor() {
    this.apiConfigs = {
      authorize: {
        url: "",
        getInit: () => undefined,
        getResult: (data: any) => undefined
      },
      token: {
        url: "",
        getInit: (code: string) => undefined,
        getResult(data: any): TokenResult {
          return {
            accessToken: "",
            refreshToken: ""
          }
        }
      },
      profile: {
        url: "",
        getInit: (token: string) => undefined,
        getResult(data: any): ProfileResult {
          return {
            userId: ""
          }
        }
      }
    };
    this.redirectUri = "";
    this.clientId = "";
  }

  authorize(): void {
    window.location.replace(this.apiConfigs.authorize.url);
  }

  async getOAuthToken(code: string): Promise<TokenResult> {
    const res = await fetch(this.apiConfigs.token.url, this.apiConfigs.token.getInit(code));
    const data = await res.json();
    return this.apiConfigs.token.getResult(data) as TokenResult;
  }

  async getOAuthUserId(token: string): Promise<{userId: string}> {
    const res = await fetch(this.apiConfigs.profile.url, this.apiConfigs.profile.getInit(token));
    const data = await res.json();
    return this.apiConfigs.profile.getResult(data) as ProfileResult;
  }
}

class KakaoOAuth extends OAuthProvider {
  constructor() {
    super();
    this.redirectUri = process.env.REACT_APP_HOST_URL + routes.oauth.detail!(OAuthEnum.KAKAO);
    this.clientId = process.env.REACT_APP_KAKAO_API_KEY!;
    this.apiConfigs = {
      authorize: {
        url: "https://kauth.kakao.com/oauth/authorize?" + qs.stringify({
          'response_type': 'code',
          'client_id': this.clientId,
          'redirect_uri': this.redirectUri
        }),
        getInit() { return undefined },
        getResult(data) {
          return undefined;
        },
      },
      token: {
        url: "https://kauth.kakao.com/oauth/token",
        getInit: (code: string) => {
          return {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: qs.stringify({
              "grant_type": "authorization_code",
              "client_id": this.clientId,
              "redirect_uri": this.redirectUri,
              "code": code
            })
          }
        },
        getResult(data) {
          return {
            accessToken: data["access_token"],
            refreshToken: data["refresh_token"]
          }
        },
      },
      profile: {
        url: "https://kapi.kakao.com/v2/user/me",
        getInit: (token: string) => {
          return {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
              "Authorization": `${capitalize(this.tokenType)} ${token}`
            }
          }
        },
        getResult(data) {
          return {
            userId: String(data["id"])
          }
        },
      }
    }
  }
}

export class OAuthClient {
  public provider: OAuthProvider;
  constructor(oAuthProviderName: OAuthEnum) {
    switch (oAuthProviderName) {
      case OAuthEnum.KAKAO:
        this.provider = new KakaoOAuth();
        break;
      default:
        throw new Error("호환되지 않는 oauth 유형입니다.");
    }
  }
}
