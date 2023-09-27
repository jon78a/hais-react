import type { UserCredential, VerifyingEmail } from "../schema/types/Login";

export interface LoginService {
  login: (credential: UserCredential) => Promise<void>;
  findPassword: (verifyingEmail: VerifyingEmail) => Promise<void>;
}
