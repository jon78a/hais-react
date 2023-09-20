import { AUTH_SESSION_KEY, USER_SESSION_KEY } from "./constants";
import { AUTH_SESSION_TTL } from "../../policy/auth";
import { User } from "../../domain/account/user.interface";
import { AuthSessionStatus } from "../../policy/auth";
import { AuthSession } from "../../domain/account/auth.interface";

export const setAuthSession = (userId: string, status: AuthSessionStatus) => {
  const session: AuthSession = {
    exp: Math.floor(Date.now() / 1000) + AUTH_SESSION_TTL,
    userId,
    status
  }
  sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

export const getValidUserId = () => {
  const item = sessionStorage.getItem(AUTH_SESSION_KEY);
  if (!item) return null;
  const session = JSON.parse(item);
  if (session.status !== "GRANT") return null;
  return session.userId;
}

// export const getUserSession = (): User | null => {
//   const item = sessionStorage.getItem(USER_SESSION_KEY);
//   if (!item) return null;
//   return JSON.parse(item);
// }

// export const setUserSession = (user: User) => {
//   sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
// }

// export const removeUserSession = () => {
//   sessionStorage.removeItem(USER_SESSION_KEY);
// }

export const isVerifiedSignupSession = () => {
  const item = sessionStorage.getItem(USER_SESSION_KEY);
  if (!item) throw new Error("sessionStorage에 값이 존재하지 않습니다. 이메일 인증 요청을 보내주세요.");
  const {verified} = JSON.parse(item);
  return verified;
}

export const isLogined = () => {
  const current = Math.floor(Date.now() / 1000);
  const item = sessionStorage.getItem(AUTH_SESSION_KEY);
  if (!item) return false;
  const session = JSON.parse(item);
  if (session.status !== "GRANT") return false;
  return session.exp > current;
}

export const removeAuthSession = () => {
  sessionStorage.removeItem(AUTH_SESSION_KEY);
}
