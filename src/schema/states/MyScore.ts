import { atom, selector } from "recoil";

import { SubjectSummary, type SubjectLabel, ScoreRow, CreditScoreValue, GradeScoreValue } from "../types/MyScore";

export const subjectLabelState = atom<SubjectLabel>({
  key: "schema/states/MyScore/SubjectLabel",
  default: "공통과목"
});

export const subjectSummaryListState = atom<SubjectSummary[]>({
  key: "schema/states/MyScore/SubjectSummary",
  default: []
});

export const creditScoreValueListState = atom<CreditScoreValue[]>({
  key: "schema/states/MyScore/CreditScoreValueList",
  default: []
});

export const gradeScoreValueListState = atom<GradeScoreValue[]>({
  key: "schema/states/MyScore/GradeScoreValueList",
  default: []
});

export const scoreRowsState = selector<ScoreRow[]>({
  key: "schema/states/MyScore/ScoreRows",
  get: ({get}) => {
    const subjects = get(subjectSummaryListState);
    const label = get(subjectLabelState);
    if (label === "공통과목") {
      const scores = get(gradeScoreValueListState);
      return subjects.map((subject) => {
        const scoreValue = scores.find((v) => v.code === subject.code);
        return {
          ...subject,
          score: scoreValue ? `${scoreValue.value}` : ""
        }
      });
    }
    if (label === "선택과목") {
      const scores = get(creditScoreValueListState);
      return subjects.map((subject) => {
        const scoreValue = scores.find((v) => v.code === subject.code);
        return {
          ...subject,
          score: scoreValue?.value || ""
        }
      });
    }

    return [];
  }
});
