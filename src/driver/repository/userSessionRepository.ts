import { USER_SESSION_KEY } from "../sessionStorage/constants";
import { UserSessionRepository } from "../../domain/account/user.interface"

const userSessionRepository: UserSessionRepository = {
  save(user) {
    sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
  },
  getUser() {
    const item = sessionStorage.getItem(USER_SESSION_KEY);
    if (!item) return null;
    return JSON.parse(item);
  },
  delete() {
    sessionStorage.removeItem(USER_SESSION_KEY);
  },
}

export default userSessionRepository;
