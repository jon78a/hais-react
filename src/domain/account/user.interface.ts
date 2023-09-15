import type { AuthType } from "../../policy/auth";
import type { ErrorDetail, YN } from "../../types"

/**
@startuml
class User {
  String id
  String email
  String password
  Boolean activated
  Boolean verified
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
  authType: AuthType | null;
  activated: boolean;
  verified: boolean;
  serviceAgreement: YN;
  marketingAgreement: YN;
  privacyAgreement: YN;
}

export interface UserErrorMap {
  SIGNUP_FAILED: ErrorDetail;
  UNCHECKED_ESSENCIAL_AGREEMENT: ErrorDetail;
  NO_NAME: ErrorDetail;
  NO_SCHOOL_YEAR: ErrorDetail;
  NO_SUBJECT_CATEGORY: ErrorDetail;
}

// Repositories
export interface UserRepository {
  findMe: () => Promise<User>;
  save: (user: User) => Promise<void>;
  delete: (userId: string) => Promise<void>;
}
