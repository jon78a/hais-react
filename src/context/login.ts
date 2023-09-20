import type { UserCredential, VerifyingEmail } from "../schema/type/Login";

export interface LoginService {
  login: (credential: UserCredential) => Promise<void>;
  findPassword: (verifyingEmail: VerifyingEmail) => Promise<void>;
}
