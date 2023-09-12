import { ProfileScore, Student, Subject } from "../../domain/subject/school.interface"
import type { SubjectCategoryCode } from "../../policy/subject";

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
