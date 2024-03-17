import type { CreditType, GradeType } from "../../policy/score";
import type { StudentCategoryCode } from "../../policy/school";
import type { ExceptionDetail } from "../../types";
import { StudentGrade } from "../../schema/types/MyScore";

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
  subjectCategory: string;
  suneungInfo: string;
  difficulty: number;
}
export interface GradeScore {
  id: string;
  studentId: string;
  subjectCode: string;
  grade: GradeType;
  category: string;
}

export interface CreditScore {
  id: string;
  studentId: string;
  subjectCode: string;
  credit: CreditType;
  creditAmount: number;
  category: string;
}

export interface GradeScoreWeight {
  scoreType: GradeType;
  weight: number;
}

export interface CommonSubjectWeight {
  subjectCode: string;
  weight: number;
}

export interface Student {
  userId: string;
  schoolId?: string;
  id: string;
  category: StudentCategoryCode | null;
  name: string;
  schoolYear: number;
  targetMajor: string[];
  commonSubject?: StudentScore[];
  optionalSubject?: StudentScore[];
}

export interface StudentScore {
  subjectId: string;
  score: string;
}

export interface StudentExceptionMap {
  INVALID_NAME: ExceptionDetail;
}

// Repositories
export interface StudentRepository {
  getSubjectGrade: (
    studentId: string,
    isCommonSubject?: boolean
  ) => Promise<StudentGrade[]>;
  findByUser: (userId: string) => Promise<Student>;
  // findAll: () => Promise<Student[]>;
  save: (student: Student) => Promise<void>;
  update: (studentId: string, form: Partial<Student>) => Promise<void>;
  updateSubjectScore: (
    studentId: string,
    isCommonSubject: boolean,
    form: StudentGrade
  ) => Promise<void>;
}

export interface GradeScoreRepository {
  save: (score: Omit<GradeScore, "id">, key?: string) => Promise<void>;
  findByStudent: (studentId: string) => Promise<GradeScore[]>;
}

export interface CreditScoreRepository {
  save: (score: Omit<CreditScore, "id">, key?: string) => Promise<void>;
  findByStudent: (studentId: string) => Promise<CreditScore[]>;
}

export interface CommonSubjectRepository {
  save: (commonSubject: CommonSubject, key?: string) => Promise<void>;
  findBy: (filter: SubjectFilter) => Promise<CommonSubject[]>;
  findByCode: (code: string) => Promise<CommonSubject | null>;
  delete: (key: string) => Promise<void>;
}

export interface OptionalSubjectRepository {
  findByMajorId: (majorId: number | string) => Promise<OptionalSubject[]>;
  findBy: (filter: SubjectFilter) => Promise<OptionalSubject[]>;
  findByCode: (code: string) => Promise<OptionalSubject | null>;
  save: (optionalSubject: OptionalSubject, key?: string) => Promise<void>;
  delete: (key: string) => Promise<void>;
}

export interface GradeScoreWeightRepository {
  save: (form: GradeScoreWeight) => Promise<void>;
  findAll: () => Promise<GradeScoreWeight[]>;
}

export interface CommonSubjectWeightRepository {
  save: (form: CommonSubjectWeight) => Promise<void>;
  findAll: () => Promise<CommonSubjectWeight[]>;
}
