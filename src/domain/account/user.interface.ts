import type { AuthType } from "../../policy/auth";
import type { YN } from "../../types"

/**
@startuml
class Student {
  String userId
  String id
  String scoreId
  String name
  Integer grade
}
@enduml
 */
export interface Student {
    userId: string;
    id: string;
    scoreId: string;
    name: string;
    grade: number;    
}

/**
@startuml
class User {
  String id
  String email
  String password
  Boolean activated
  "Y" | "N" marketingAgreement
  "Y" | "N" serviceAgreement
  "Y" | "N" privacyAgreement
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
