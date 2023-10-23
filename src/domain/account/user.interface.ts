import type { AuthChoiceType } from "../../policy/auth";
import type { ErrorDetail, ExceptionDetail, YN } from "../../types";

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
  authChoice: AuthChoiceType | null;
  activated: boolean;
  verified: boolean;
  isAdmin?: boolean;
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
  EXISTED_USER: ErrorDetail;
}

export interface UserExceptionMap {
  INVALID_EMAIL: ExceptionDetail;
  INVALID_PASSWORD: ExceptionDetail;
  INVALID_PASSWORD_CONFIRM: ExceptionDetail;
}

// Repositories
export interface UserRepository {
  findByUserId: (userId: string) => Promise<User | null>;
  save: (user: User) => Promise<void>;
  update: (userId: string, req: {
    activated?: boolean;
    password?: string;
    verified?: boolean;
    isAdmin?: boolean;
  }) => Promise<void>;
  findByCredential: (email: string, password: string) => Promise<User | null>;
}

export interface UnsignedUserRepository {
  save: (user: User) => void;
  getUser: () => User | null;
  delete: () => void;
}
