import { atom } from "recoil";

import type {
  StudentProfile,
  SignupRequest
} from "../types/Signup";

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
  key: "schema/states/Signup/StudentProfile",
  default: defaultStudentProfile
});

export const signupRequestState = atom<SignupRequest>({
  key: "schema/states/Singup/SignupRequest",
  default: defaultSignupRequest
});
