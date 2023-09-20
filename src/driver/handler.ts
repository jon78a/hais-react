import { isLogined } from "./sessionStorage/auth";
import { ErrorStatus } from "./firebase/constants";

export function authorizeRequired() {
  if (!isLogined()) throw new Error(ErrorStatus.USER_SESSION_OUT);
}
