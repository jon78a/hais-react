import { atom } from "recoil";

import {
  type SubjectDistinct,
  type SubjectColumn,
  type EditRequest,
  type CommonSubjectDetail,
  type OptionalSubjectDetail,
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
