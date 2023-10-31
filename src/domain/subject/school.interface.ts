import type { CreditType, GradeEnum } from "../../policy/score";
import type { StudentCategoryCode, OptionalSubjectCategory } from "../../policy/school";
import type { ExceptionDetail } from "../../types";

export interface SubjectBase {
  code: string;
  group: string;
  studentCategory: StudentCategoryCode;
  name: string;
  description: string;
  etcInfo: string;
}

export interface SubjectFilter {
  nameKeyword: string;
}

export interface CommonSubject extends SubjectBase {}

// 선택과목
export interface OptionalSubject extends SubjectBase {
  subjectCategory: OptionalSubjectCategory;
  suneungInfo: string;
}

export interface GradeScore {
  id: string;
  studentId: string;
  subjectCode: string;
  grade: GradeEnum;
  category: string;
}

export interface CreditScore {
  id: string;
  studentId: string;
  subjectCode: string;
  credit: CreditType;
  category: string;
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
export interface StudentRepository {
  // getByUser: (userId: string) => Promise<Student>;
  // findAll: () => Promise<Student[]>;
  save: (student: Student) => Promise<void>;
}

export interface CommonSubjectRepository {
  save: (commonSubject: CommonSubject, key?: string) => Promise<void>;
  findBy: (filter: SubjectFilter) => Promise<CommonSubject[]>;
  findByCode: (code: string) => Promise<CommonSubject | null>;
  delete: (key: string) => Promise<void>;
}

export interface OptionalSubjectRepository {
  findByMajorId: (majorId: number) => Promise<OptionalSubject[]>;
  findBy: (filter: SubjectFilter) => Promise<OptionalSubject[]>;
  findByCode: (code: string) => Promise<OptionalSubject | null>;
  save: (optionalSubject: OptionalSubject, key?: string) => Promise<void>;
  delete: (key: string) => Promise<void>;
}
