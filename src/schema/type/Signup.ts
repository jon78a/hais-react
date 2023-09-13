import type { AuthType } from "../../policy/auth";
import type { SubjectCategoryCode } from "../../policy/subjectCategory";

export type Agreement = {
  isAgreeMarketing: boolean;
  isAgreeService: boolean;
  isAgreePrivacy: boolean;
}

export type StudentProfile = {
  name: string;
  schoolYear: number;
  subjectCategory: SubjectCategoryCode;
  targetMajor: number[];
}

export type UserCredential = {
  email: string;
  password: string;
  passwordConfirm: string;
}

export type SelectedAuth = AuthType;

export type AuthPayload = {
  email?: string;
}
