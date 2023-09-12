import type { GradeEnum } from "../../policy/score";
import type { SubjectCategoryCode } from "../../policy/subject";

/**
@startuml
class Subject {
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
  String userId
  String subjectCode
  GradeEnum grade
}
@enduml
 */
export interface ProfileScore {
  id: string;
  userId: string;
  subjectCode: string;
  grade: GradeEnum;
}

/**
@startuml
class Student {
  String userId
  String id
  Enum<"A", "B", "C", "D", "E" | null> category
  String name
  Enum<1, 2, 3> schoolYear
}
@enduml
 */
export interface Student {
  userId: string;
  id: string;
  category: SubjectCategoryCode | null;
  name: string;
  schoolYear: number;
}

// Repositories
export interface SubjectRepository {
  getByCode: (code: string) => Subject;
  getByCategory: (category: SubjectCategoryCode) => Subject;
}

export interface ProfileScoreRepository {
  findByUser: (userId: string) => ProfileScore[];
}

export interface StudentRepository {
  getByUser: (userId: string) => Student;
  findAll: () => Student[];
}
