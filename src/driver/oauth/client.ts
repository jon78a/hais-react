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
  getFetchFormat: (...args: any[]) => RequestInit | undefined;
  serialize: (data: any) => ProfileResult | TokenResult | undefined;
}

interface OAuthApiConfigs {
  authorize: FetchApiConfig;
  token: FetchApiConfig;
  profile: FetchApiConfig;
  logout?: FetchApiConfig;
}

function randomGenerator() {
  return String(Math.floor(Math.random() * 10) * 12);
}

class OAuthProvider {
  protected stateToken = "";
  protected tokenType = "bearer";
  protected apiConfigs: OAuthApiConfigs = {
    authorize: {
      url: "",
      getFetchFormat: () => undefined,
      serialize: (data: any) => undefined
    },
    token: {
      url: "",
      getFetchFormat: (code: string) => undefined,
      serialize(data: any): TokenResult {
        return {
          accessToken: "",
          refreshToken: ""
        }
      }
    },
    profile: {
      url: "",
      getFetchFormat: (token: string) => undefined,
      serialize(data: any): ProfileResult {
        return {
          userId: ""
        }
      }
    },
    logout: {
      url: "",
      getFetchFormat: () => undefined,
      serialize: (data: any) => undefined
    }
  };
  protected redirectUri: string;
  protected clientId: string;

  constructor() {
    this.apiConfigs = {
      authorize: {
        url: "",
        getFetchFormat: () => undefined,
        serialize: (data: any) => undefined
      },
      token: {
        url: "",
        getFetchFormat: (code: string) => undefined,
        serialize(data: any): TokenResult {
          return {
            accessToken: "",
            refreshToken: ""
          }
        }
      },
      profile: {
        url: "",
        getFetchFormat: (token: string) => undefined,
        serialize(data: any): ProfileResult {
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

  logout(): boolean {
    if (!this.apiConfigs.logout) return false;
    window.location.replace(this.apiConfigs.logout.url || "");
    return true;
  }

  async getOAuthToken(code: string): Promise<TokenResult> {
    const res = await fetch(this.apiConfigs.token.url, this.apiConfigs.token.getFetchFormat(code));
    const data = await res.json();
    return this.apiConfigs.token.serialize(data) as TokenResult;
  }

  async getOAuthUserId(token: string): Promise<{userId: string}> {
    const res = await fetch(this.apiConfigs.profile.url, this.apiConfigs.profile.getFetchFormat(token));
    const data = await res.json();
    return this.apiConfigs.profile.serialize(data) as ProfileResult;
  }

  generateStateToken(random?: () => string, sessionKey='oauth-state-token') {
    let token;
    if (!random)
      token = randomGenerator();
    else token = random();

    this.stateToken = token;
    sessionStorage.setItem(sessionKey, token);
    return token;
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
        getFetchFormat() { return undefined },
        serialize(data) {
          return undefined;
        },
      },
      token: {
        url: "https://kauth.kakao.com/oauth/token",
        getFetchFormat: (code: string) => {
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
        serialize(data) {
          return {
            accessToken: data["access_token"],
            refreshToken: data["refresh_token"]
          }
        },
      },
      profile: {
        url: "https://kapi.kakao.com/v2/user/me",
        getFetchFormat: (token: string) => {
          return {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
              "Authorization": `${capitalize(this.tokenType)} ${token}`
            }
          }
        },
        serialize(data) {
          return {
            userId: String(data["id"])
          }
        },
      },
      logout: {
        url: "https://kauth.kakao.com/oauth/logout?" + qs.stringify({
          "client_id": this.clientId,
          "logout_redirect_uri": process.env.REACT_APP_HOST_URL + '/oauth/logout/kakao'
        }),
        getFetchFormat(...args) {
          return undefined;
        },
        serialize(data) {
          return undefined;
        },
      }
    }
  }
}

export class NaverOAuth extends OAuthProvider {
  constructor() {
    super();
    this.redirectUri = process.env.REACT_APP_HOST_URL + routes.oauth.detail!(OAuthEnum.NAVER);
    this.clientId = process.env.REACT_APP_NAVER_API_KEY!;
    this.apiConfigs = {
      authorize: {
        url: "https://nid.naver.com/oauth2.0/authorize?" + qs.stringify({
          'response_type': 'code',
          'client_id': this.clientId,
          'redirect_uri': this.redirectUri,
          'state': this.generateStateToken()
        }),
        getFetchFormat() { return undefined },
        serialize(data) {
          return undefined;
        },
      },
      token: {
        url: "https://nid.naver.com/oauth2.0/token",
        getFetchFormat: (code: string) => {
          return {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: qs.stringify({
              "grant_type": "authorization_code",
              "client_id": this.clientId,
              "client_secret": process.env.REACT_APP_NAVER_SECRET_KEY,
              "code": code,
              "state": this.stateToken
            })
          }
        },
        serialize(data) {
          return {
            accessToken: data["access_token"],
            refreshToken: data["refresh_token"]
          }
        },
      },
      profile: {
        url: "https://openapi.naver.com/v1/nid/me",
        getFetchFormat: (token: string) => {
          return {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
              "Authorization": `${capitalize(this.tokenType)} ${token}`
            }
          }
        },
        serialize(data) {
          return {
            userId: String(data["id"])
          }
        },
      },
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
      case OAuthEnum.NAVER:
        this.provider = new NaverOAuth();
        break
      default:
        throw new Error("호환되지 않는 oauth 유형입니다.");
    }
  }
}
