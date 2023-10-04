import { createContext, useContext } from "react";

import type {
  StudentProfile,
  SignupRequest
} from "../schema/types/Signup";
import type { ExceptionDetail } from "../types";
import { SocialType } from "../policy/auth";

interface SignupService {
  submitStudentInfo: (form: StudentProfile) => void;
  signupComplete: () => void;
  requestSignup: (form: SignupRequest) => Promise<void>;
  requestSocialSignup: (type: SocialType) => Promise<void>;
  resetRequest: () => void;
  checkEmail: (value: string) => ExceptionDetail | null;
  checkPassword: (value: string) => ExceptionDetail | null;
  checkPasswordConfirm: (
    password: string,
    passwordConfirm: string
  ) => ExceptionDetail | null;
  checkName: (value: string) => ExceptionDetail | null;
}

export const SignupContext = createContext<SignupService | undefined>(undefined);

export const useSignupService = () => useContext(SignupContext)!;
