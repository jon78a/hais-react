/**
@startuml
class Major {
  Integer id
  String name
  String univ
  String college
  String investigationYear
  String sidoCode
  Boolean isActive
}
@enduml
 */
export interface Major {
  id: number;
  name: string;
  univ: string;
  college: string;
  investigationYear: string;
  sidoCode: string;
  isActive: boolean;
  standardCategory: string;
}

/**
@startuml
class TargetMajor {
  Integer id
  String studentId
  Integer majorId
  Boolean isActive
}
@enduml
 */
export interface TargetMajor {
  id: number;
  studentId: string;
  majorId: number;
  isActive: boolean;
}
