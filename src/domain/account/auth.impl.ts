import { atom } from "recoil";

import { UserCredential } from "./auth.interface";
import { DataStateType } from "../../types";

export const defaultUserCredential: UserCredential = {
  email: "",
  password: ""
}

export const userCredentialState = atom<DataStateType<UserCredential>>({
  key: "domain/account/UserCredential",
  default: {
    data: defaultUserCredential,
    loading: false
  }
});
