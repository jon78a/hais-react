import { atom } from "recoil";
import { AuthSession } from "../types/AuthSession";

export const authSessionState = atom<AuthSession | null>({
  key: "schema/states/authSession",
  default: null,
});
