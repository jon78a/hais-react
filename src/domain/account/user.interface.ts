import type { AuthType } from "../../policy/auth";
import type { YN } from "../../types"

/**
@startuml
class User {
  String id
  String email
  String password
  Boolean activated
  Enum<"Y", "N"> marketingAgreement
  Enum<"Y", "N"> serviceAgreement
  Enum<"Y", "N"> privacyAgreement
}
@enduml
 */
export interface User {
  id: string;
  email: string;
  password: string;
  authType: AuthType;
  activated: boolean;
  serviceAgreement: YN;
  marketingAgreement: YN;
  privacyAgreement: YN;
}

// Repositories
export interface UserRepository {
  findMe: () => User;
  save: (user: User) => void;
  delete: (userId: string) => void;
}
