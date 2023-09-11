import type { GradeEnum } from "../../policy/score";
import type { SubjectCategoryCode } from "../../policy/subject";

/**
@startuml
class CommonSubject {
  String id
  String code
  Enum<"a", "b", "c"> category
  String name
}
@enduml
 */
export interface Subject {
  id: string;
  code: string;
  category: SubjectCategoryCode;
  name: string;
}

/**
@startuml
class ProfileScore {
  String id
  String subjectCode
  GradeEnum grade
}
@enduml
 */
export interface ProfileScore {
  id: string;
  subjectCode: string;
  grade: GradeEnum;
}

/**
@startuml
class Student {
  String userId
  String id
  Enum<"a", "b", "c"> category
  String name
  Enum<1, 2, 3> schoolYear
}
@enduml
 */
export interface Student {
  userId: string;
  id: string;
  category: SubjectCategoryCode;
  name: string;
  schoolYear: number;
}
