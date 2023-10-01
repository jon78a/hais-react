import type { OAuthEnum, AuthSessionStatus } from "../../policy/auth";
/**
@startuml
class UserCredential {
  String email
  String password
}
@enduml
 */
export interface UserCredential {
  email: string;
  password: string;
}

export interface AuthSession {
  exp: number;
  userId: string;
  status: AuthSessionStatus;
}

export interface AuthRepository {
  register: (credential: UserCredential) => Promise<{userId: string}>;
  sendEmail: (email: string) => Promise<void>;
  oAuthAuthorize: (oAuthProviderName: OAuthEnum) => void;
  unregister: (userId: string) => Promise<void>;
  login: (credential: UserCredential) => Promise<void>;
  logout: () => Promise<void>;
  isLogined: () => boolean;
}

export type OAuthSessionType = "LOGIN" | "SIGNUP"

export interface OAuthSessionRepository {
  find: () => OAuthSessionType | null;
  save: (authType: OAuthSessionType) => void;
  clear: () => void;
}

export interface AuthSessionRepository {
  save: (userId: string, status: AuthSessionStatus) => void;
  getValidUserId: () => string | null;
  isLogined: () => boolean;
  clear: () => void;
}
