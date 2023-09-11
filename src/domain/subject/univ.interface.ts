/**
@startuml
class Major {
  Integer id
  String univ
  String college
  String investigationYear
  String sidoCode
}
@enduml
 */
export interface Major {
    id: number;
    univ: string;
    college: string;
    investigationYear: string;
    sidoCode: string;
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
