import type { GradeEnum } from "../../policy/score";
import type { SubjectCategoryCode } from "../../policy/subject-category";
import type { ExceptionDetail } from "../../types";

export interface Subject {
  id: string;
  code: string;
  category: SubjectCategoryCode;
  name: string;
}

// 선택과목
export interface OptionalSubject {
  code: string;
  group: string;
  category: string;
  name: string;
  description: string;
  suneungInfo: string;
  etcInfo: string;
}

export interface ProfileScore {
  id: string;
  studentId: string;
  subjectCode: string;
  grade: GradeEnum;
}

export interface Student {
  userId: string;
  id: string;
  category: SubjectCategoryCode | null;
  name: string;
  schoolYear: number;
  targetMajor: string[];
}

export interface StudentExceptionMap {
  INVALID_NAME: ExceptionDetail;
}

// Repositories
export interface ProfileScoreRepository {
  findByStudent: (studentId: string) => Promise<ProfileScore[]>;
}

export interface StudentRepository {
  // getByUser: (userId: string) => Promise<Student>;
  // findAll: () => Promise<Student[]>;
  save: (student: Student) => Promise<void>;
}

export interface OptionalSubjectRepository {
  findByMajorId: (majorId: number) => Promise<OptionalSubject[]>;
}
