import { CreditType, GradeType } from "../../policy/score";
import { SchoolSubjectDto } from "./AdminSchool";

export type SubjectLabel = "공통과목" | "선택과목";

export type SubjectForm = {
  type: string;
  name: string;
  groups: string;
};

export type SubjectSummary = {
  code: string;
  group: string;
  subjectCategory: string;
  name: string;
};

export type CreditScoreValue = {
  id: string;
  code: string;
  value: CreditType;
  creditAmount: string;
};

export type StudentGrade = {
  subjectId: string;
  grade: GradeType;
};

export type GradeScoreValue = {
  id: string;
  code: string;
  value: GradeType;
};

export type ScoreRow = SchoolSubjectDto & {
  score: string;
};
