import type { AuthSessionStatusType, AuthType, OAuthEnum } from "../../policy/auth";

/**
@startuml
class AuthSession {
  String id
  String userId
  number expiredAt
  Enum<"REGISTER", "GRANT"> status
}
@enduml
 */
export interface AuthSession {
  id: string;
  userId: string;
  expiredAt: number;
  status: AuthSessionStatusType
}

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

export interface AuthRepository {
  register: (credential: UserCredential) => Promise<{userId: string}>;
  sendEmail: (email: string) => Promise<void>;
  oAuthLogin: (oAuthProviderName: OAuthEnum) => void;
}
