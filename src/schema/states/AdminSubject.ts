import { atom } from "recoil";

import type {
  SubjectDistinct,
  CommonSubjectDetail,
  OptionalSubjectDetail,
  SubjectSummary,
  SubjectFilter,
} from "../types/AdminSubject";

export const subjectDistinctState = atom<SubjectDistinct>({
  key: "/schema/states/AdminSubject/SubjectDistinct",
  default: "OPTION"
});

export const subjectFilterState = atom<SubjectFilter>({
  key: "/schema/states/AdminSubject/SubjectFilter",
  default: {
    nameKeyword: ""
  }
});

export const subjectSummaryListState = atom<SubjectSummary[]>({
  key: "/schema/states/AdminSubject/SubjectSummary",
  default: []
});

export const commonSubjectDetailState = atom<CommonSubjectDetail | undefined>({
  key: "/schema/states/AdminSubject/CommonSubjectDetail",
  default: undefined
});

export const optionalSubjectDetailState = atom<OptionalSubjectDetail | undefined>({
  key: "/schema/states/AdminSubject/OptionalSubjectDetail",
  default: undefined
});
