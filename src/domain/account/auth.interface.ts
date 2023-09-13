import type { AuthSessionStatusType } from "../../policy/auth";

export interface AuthSession {
  id: string;
  userId: string;
  expiredAt: number;
  status: AuthSessionStatusType
}

export interface UserCredential {
  email: string;
  password: string;
}

export interface AuthRepository {
  register: (credential: UserCredential) => Promise<{userId: string}>;
  sendEmail: (email: string) => Promise<void>;
}
