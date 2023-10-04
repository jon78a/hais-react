import { OAuthStatusType, OAuthStatusRepository } from "../../domain/account/auth.interface";
import { OAUTH_STATUS_KEY } from "../sessionStorage/constants"

const oAuthStatusRepository: OAuthStatusRepository = {
  find: () => {
    return sessionStorage.getItem(OAUTH_STATUS_KEY) as OAuthStatusType ?? null;
  },
  save: (status) => {
    sessionStorage.setItem(OAUTH_STATUS_KEY, status);
  },
  clear: () => {
    sessionStorage.removeItem(OAUTH_STATUS_KEY);
  }
}

export default oAuthStatusRepository;
