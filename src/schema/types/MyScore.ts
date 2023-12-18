import { CreditType, GradeType } from "../../policy/score";

export type SubjectLabel = "공통과목" | "선택과목";

export type GradeScoreForm = {
  subjectCode: string;
  grade: GradeType;
  category: string;
};

export type CreditScoreForm = {
  subjectCode: string;
  credit: CreditType;
  creditAmount: string;
  category: string;
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

export type GradeScoreValue = {
  id: string;
  code: string;
  value: GradeType;
};

export type ScoreRow = SubjectSummary & {score: string; creditAmount?: string};
