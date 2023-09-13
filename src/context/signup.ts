import { createContext, useContext } from "react";

import type {
  Agreement,
  StudentProfile,
  UserCredential,
  SelectedAuth
} from "../schema/type/Signup";

interface SignupService {
  acceptAgreement: (form: Agreement) => void;
  submitStudentInfo: (form: StudentProfile) => void;
  selectVerification: (authType: SelectedAuth) => void;
  submitCredential: (form: UserCredential) => void;
  signupComplete: () => void;
}

export const SignupContext = createContext<SignupService | undefined>(undefined);

export const useSignupService = () => useContext(SignupContext)!;
