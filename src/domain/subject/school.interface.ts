import type { GradeEnum } from "../../policy/score";
import type { StudentCategoryCode, OptionalSubjectCategoryEnum } from "../../policy/school";
import type { ExceptionDetail } from "../../types";

export interface CommonSubject {
  id: string;
  code: string;
  category: StudentCategoryCode;
  name: string;
}

// 선택과목
export interface OptionalSubject {
  code: string;
  group: string;
  category: OptionalSubjectCategoryEnum;
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
  category: StudentCategoryCode | null;
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
