import { createContext, useContext } from "react";

import type {
  StudentProfile,
  SignupRequest
} from "../schema/type/Signup";
import type { ExceptionDetail } from "../types";

interface SignupService {
  submitStudentInfo: (form: StudentProfile) => void;
  signupComplete: () => void;
  requestSignup: (form: SignupRequest) => void;
  checkEmail: (value: string) => ExceptionDetail | null;
  checkPassword: (value: string) => ExceptionDetail | null;
  checkPasswordConfirm: (
    password: string,
    passwordConfirm: string
  ) => ExceptionDetail | null;
}

export const SignupContext = createContext<SignupService | undefined>(undefined);

export const useSignupService = () => useContext(SignupContext)!;
