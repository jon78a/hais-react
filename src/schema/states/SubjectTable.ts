import { atom } from "recoil";

import type {
  SubjectDistinct,
  CommonSubjectDetail,
  OptionalSubjectDetail,
  SubjectSummary,
  SubjectFilter
} from "../types/SubjectTable";

export const subjectDistinctState = atom<SubjectDistinct>({
  key: "/schema/states/SubjectTable/SubjectDistinct",
  default: "OPTION"
});

export const subjectFilterState = atom<SubjectFilter>({
  key: "/schema/states/SubjectTable/SubjectFilter",
  default: {
    nameKeyword: ""
  }
});

export const subjectSummaryListState = atom<SubjectSummary[]>({
  key: "/schema/states/SubjectTable/SubjectSummary",
  default: []
});

export const commonSubjectDetailState = atom<CommonSubjectDetail | undefined>({
  key: "/schema/states/SubjectTable/CommonSubjectDetail",
  default: undefined
});

export const optionalSubjectDetailState = atom<OptionalSubjectDetail | undefined>({
  key: "/schema/states/SubjectTable/OptionalSubjectDetail",
  default: undefined
});
