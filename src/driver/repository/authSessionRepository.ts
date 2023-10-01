import { AuthSession, AuthSessionRepository } from "../../domain/account/auth.interface"
import { AUTH_SESSION_KEY } from "../sessionStorage/constants"
import { AUTH_SESSION_TTL } from "../../policy/auth"

const authSessionRepository: AuthSessionRepository = {
  save(userId, status) {
    const session: AuthSession = {
      exp: Math.floor(Date.now() / 1000) + AUTH_SESSION_TTL,
      userId,
      status
    }
    sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  },
  getValidUserId() {
    const item = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (!item) return null;
    const session = JSON.parse(item);
    if (session.status !== "GRANT") return null;
    return session.userId;
  },
  isLogined() {
    const current = Math.floor(Date.now() / 1000);
    const item = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (!item) return false;
    const session = JSON.parse(item);
    if (session.status !== "GRANT") return false;
    return session.exp > current;
  },
  clear() {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  },
}

export default authSessionRepository;
