import type { AuthChoiceType } from "../../policy/auth";
import type { StudentCategoryCode } from "../../policy/school";

export type StudentProfile = {
  name: string;
  schoolYear: number;
  subjectCategory: StudentCategoryCode;
  targetMajor: string[];
  schoolId: string;
};

export type SignupRequest = {
  isAgreeMarketing: boolean;
  email: string;
  password: string;
  passwordConfirm: string;
  authChoice: AuthChoiceType;
};
