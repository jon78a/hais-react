import { atom } from "recoil";

import type { StudentProfile, SignupRequest } from "../types/Signup";
import { School } from "../../domain/school/school.interface";

export const defaultStudentProfile: StudentProfile = {
  name: "",
  schoolYear: 1,
  subjectCategory: "A",
  targetMajor: [],
  schoolId: "",
};

export const defaultSignupRequest: SignupRequest = {
  email: "",
  password: "",
  passwordConfirm: "",
  isAgreeMarketing: false,
  authChoice: "NORMAL",
};

export const studentProfileState = atom<StudentProfile>({
  key: "schema/states/Signup/StudentProfile",
  default: defaultStudentProfile,
});

export const signupRequestState = atom<SignupRequest>({
  key: "schema/states/Singup/SignupRequest",
  default: defaultSignupRequest,
});

export const schoolListState = atom<School[]>({
  key: "schema/states/Singup/SchoolList",
  default: [],
});
