import type { AuthType } from "../../policy/auth";
import type { SubjectCategoryCode } from "../../policy/subject-category";

export type StudentProfile = {
  name: string;
  schoolYear: number;
  subjectCategory: SubjectCategoryCode;
  targetMajor: string[];
}

export type SignupRequest = {
  isAgreeMarketing: boolean;
  email: string;
  password: string;
  passwordConfirm: string;
  authType: AuthType;
}
