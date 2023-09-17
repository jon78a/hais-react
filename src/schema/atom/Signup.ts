import { atom } from "recoil";

import type {
  Agreement,
  StudentProfile,
  UserCredential,
  SelectedAuth,
  AuthPayload
} from "../type/Signup";

export const defaultAgreement: Agreement = {
  isAgreeMarketing: false,
  isAgreeService: false,
  isAgreePrivacy: false
}

export const defaultStudentProfile: StudentProfile = {
  name: "",
  schoolYear: 1,
  subjectCategory: "A",
  targetMajor: []
}

export const defaultUserCredential: UserCredential = {
  email: "",
  password: "",
  passwordConfirm: ""
}

export const defaultSelectedAuth: SelectedAuth = "NORMAL";

export const defaultAuthPayload: AuthPayload = {
  email: ""
}

export const agreementState = atom<Agreement>({
  key: "schema/atom/Signup/Agreement",
  default: defaultAgreement
});

export const studentProfileState = atom<StudentProfile>({
  key: "schema/atom/Signup/StudentProfile",
  default: defaultStudentProfile
});

export const userCredentialState = atom<UserCredential>({
  key: "schema/atom/Signup/UserCredential",
  default: defaultUserCredential
});

export const selectedAuthState = atom<SelectedAuth>({
  key: "schema/atom/Signup/SelectedAuth",
  default: defaultSelectedAuth
});

export const authPayloadState = atom<AuthPayload>({
  key: "schema/atom/Signup/AuthPayload",
  default: defaultAuthPayload
});
