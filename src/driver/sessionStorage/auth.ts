import { AUTH_SESSION_KEY } from "./constants";
import { AUTH_SESSION_TTL } from "../../policy/auth";

export const createAuthSession = () => {
  sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({
    exp: Math.floor(Date.now() / 1000) + AUTH_SESSION_TTL
  }));
}

export const isAuthSessionExpired = () => {
  const current = Math.floor(Date.now() / 1000);
  const item = sessionStorage.getItem(AUTH_SESSION_KEY);
  if (!item) return true;
  const comp = JSON.parse(item);
  return comp < current;
}

export const removeAuthSession = () => {
  sessionStorage.removeItem(AUTH_SESSION_KEY);
}
