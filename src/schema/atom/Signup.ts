import { atom } from "recoil";

import type {
  StudentProfile,
  SignupRequest
} from "../type/Signup";

export const defaultStudentProfile: StudentProfile = {
  name: "",
  schoolYear: 1,
  subjectCategory: "A",
  targetMajor: []
}

export const defaultSignupRequest: SignupRequest = {
  email: "",
  password: "",
  passwordConfirm: "",
  isAgreeMarketing: false,
  authType: "NORMAL"
}

export const studentProfileState = atom<StudentProfile>({
  key: "schema/atom/Signup/StudentProfile",
  default: defaultStudentProfile
});

export const signupRequestState = atom<SignupRequest>({
  key: "schema/atom/Singup/SignupRequest",
  default: defaultSignupRequest
});
