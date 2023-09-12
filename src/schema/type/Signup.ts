import type { AuthType } from "../../policy/auth";

export type Agreement = {
  isAgreeMarketing: boolean;
  isAgreeService: boolean;
  isAgreePrivacy: boolean;
}

export type StudentProfile = {
  name: string;
  schoolYear: number;
  targetMajor: number[];
}

export type UserCredential = {
  email: string;
  password: string;
  passwordConfirm: string;
}

export type OAuth = {
  code: string;
  authType: AuthType;
}

export type AuthPayload = {
  email?: string;
}
