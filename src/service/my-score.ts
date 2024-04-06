import { createContext, useContext } from "react";
import type {
  SubjectLabel,
  SubjectSummary,
  StudentGrade,
} from "../schema/types/MyScore";
import { School, SchoolSubject } from "../domain/school/school.interface";
import { Student } from "../domain/subject/school.interface";

interface MyScoreService {
  saveGradeScore: (
    studentId: string,
    isCommonSubject: boolean,
    form: StudentGrade
  ) => Promise<void>;
  showSubjectSummaryList: (label: SubjectLabel) => Promise<SubjectSummary[]>;
  getSchoolList: ({
    cursor,
    pageSize,
  }: {
    cursor?: School;
    pageSize: number;
  }) => Promise<{ data: School[]; totalElements: number }>;
  saveMySchool: (schoolId: string) => Promise<void>;
  getStudent: () => Promise<Student | undefined>;
  getCommonSubjects: () => Promise<SchoolSubject[]>;
  getOptionalSubjects: (schoolId: string) => Promise<SchoolSubject[]>;
  getSubjectGrade: (
    studentId: string,
    isCommonSubject?: boolean
  ) => Promise<StudentGrade[]>;
}

export const MyScoreContext = createContext<MyScoreService | undefined>(
  undefined
);

export const useMyScoreService = () => useContext(MyScoreContext)!;
