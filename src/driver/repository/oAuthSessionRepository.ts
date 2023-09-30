import { OAuthSessionType, OAuthSessionRepository } from "../../domain/account/auth.interface";
import { OAUTH_AUTH_SESSION_KEY } from "../sessionStorage/constants"

const oAuthSessionRepository: OAuthSessionRepository = {
  find: () => {
    return sessionStorage.getItem(OAUTH_AUTH_SESSION_KEY) as OAuthSessionType ?? null;
  },
  save: (oAuthSessionType) => {
    sessionStorage.setItem(OAUTH_AUTH_SESSION_KEY, oAuthSessionType);
  },
  clear: () => {
    sessionStorage.removeItem(OAUTH_AUTH_SESSION_KEY);
  }
}

export default oAuthSessionRepository;
