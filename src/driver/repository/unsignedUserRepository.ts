import { UNSIGNED_USER_SESSION_KEY } from "../sessionStorage/constants";
import { UnsignedUserRepository } from "../../domain/account/user.interface"

const unsignedUserRepository: UnsignedUserRepository = {
  save(user) {
    sessionStorage.setItem(UNSIGNED_USER_SESSION_KEY, JSON.stringify(user));
  },
  getUser() {
    const item = sessionStorage.getItem(UNSIGNED_USER_SESSION_KEY);
    if (!item) return null;
    return JSON.parse(item);
  },
  delete() {
    sessionStorage.removeItem(UNSIGNED_USER_SESSION_KEY);
  },
}

export default unsignedUserRepository;
