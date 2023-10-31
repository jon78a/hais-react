import { CreditType, GradeEnum } from "../../policy/score";

export type SelectedSchoolYear = number;

export type SubjectLabel = "공통과목" | "선택과목";

export type GradeScoreForm = {
  subjectCode: string | undefined;
  grade: GradeEnum;
  category: string;
};

export type CreditScoreForm = {
  subjectCode: string | undefined;
  credit: CreditType;
  category: string;
}
