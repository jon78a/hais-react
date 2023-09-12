import { createContext, useContext } from "react";

import type {
  Agreement,
  StudentProfile,
  UserCredential
} from "../schema/type/Signup";
import type { AuthType } from "../policy/auth";

interface SignupService {
  acceptAgreement: (form: Agreement) => void;
  submitBaseInfo: (form: StudentProfile) => void;
  selectVerification: (authType: AuthType) => void;
  submitCredential: (form: UserCredential) => void;
  redirect: () => void;
}

export const SignupContext = createContext<SignupService | undefined>(undefined);

export const useSignupService = () => useContext(SignupContext)!;
