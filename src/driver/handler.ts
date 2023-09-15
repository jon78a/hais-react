import { isAuthSessionExpired } from "./sessionStorage/auth";
import { firebaseAuth } from "./firebase/firebase";
import { ErrorStatus } from "./firebase/constants";

export function authorizeRequired() {
  const user = firebaseAuth.currentUser;
  if (!user || isAuthSessionExpired()) throw new Error(ErrorStatus.USER_SESSION_OUT);
}
