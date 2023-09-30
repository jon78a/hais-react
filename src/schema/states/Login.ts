import { atom } from "recoil";

export const loginRequestState = atom({
  key: "schema/states/Login/UserCredential",
  default: {
    email: "",
    password: ""
  }
});
