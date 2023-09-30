import { useContext, createContext } from "react";

import type { LoginRequest, VerifyingEmail } from "../schema/types/Login";
import { SocialType } from "../policy/auth";

export interface LoginService {
  login: (credential: LoginRequest) => Promise<void>;
  socialLogin: (socialType: SocialType) => Promise<void>;
  // findPassword: (verifyingEmail: VerifyingEmail) => Promise<void>;
}

export const LoginContext = createContext<LoginService | undefined>(undefined);

export const useLoginService = () => useContext(LoginContext)!;
