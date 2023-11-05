import type { GradeType } from "../../policy/score";

export type ScoreWeight = {
  scoreType: GradeType;
  weight: number;
};

export type ScoreWeightForm = {
  scoreType: GradeType;
  value: string;
}

export type SubjectWeight = {
  subject: {
    code: string;
    category: string;
    group: string;
    name: string;
  };
  weight: number;
};

export type SubjectWeightForm = {
  subjectCode: string;
  value: string;
}
