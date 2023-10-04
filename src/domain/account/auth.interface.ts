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
  id?: string;
  exp: number;
  userId: string;
  status: AuthSessionStatus;
  createdAt?: number;
}

export interface AuthRepository {
  register: (credential: UserCredential) => Promise<{userId: string}>;
  sendEmail: (email: string) => Promise<void>;
  oAuthAuthorize: (oAuthProviderName: OAuthEnum) => void;
  validateUserByCredential: (credential: UserCredential) => Promise<void>;
}

export type OAuthStatusType = "LOGIN" | "SIGNUP"

export interface OAuthStatusRepository {
  find: () => OAuthStatusType | null;
  save: (status: OAuthStatusType) => void;
  clear: () => void;
}

export interface AuthSessionRepository {
  save: (userId: string, status: AuthSessionStatus) => Promise<void>;
  find: () => Promise<AuthSession | null>;
  clear: () => Promise<void>;
}
