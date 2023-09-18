import type { OAuthEnum } from "../../policy/auth";
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
  oAuthAuthorize: (oAuthProviderName: OAuthEnum) => void;
  unregister: (userId: string) => Promise<void>;
  login: (credential: UserCredential) => Promise<void>;
  logout: () => Promise<void>;
}
