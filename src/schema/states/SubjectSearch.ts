import { atom } from "recoil";

import {
  SearchSummary,
  SearchDetail,
  UnivKeyword,
  MajorKeyword,
  UnivChoice,
  MajorChoice,
  UnivName,
  MajorName
} from "../types/SubjectSearch";

export const univChoiceState = atom<UnivChoice>({
  key: "schema/states/SubjectSearch/UnivChoice",
  default: ""
});

export const majorChoiceState = atom<MajorChoice>({
  key: "schema/states/SubjectSearch/MajorChoice",
  default: ""
});

export const univNamesState = atom<UnivName[]>({
  key: "schema/states/SubjectSearch/UnivNames",
  default: []
});

export const majorNamesState = atom<MajorName[]>({
  key: "schema/states/SubjectSearch/MajorNames",
  default: []
});

export const univKeywordState = atom<UnivKeyword>({
  key: "schema/states/SubjectSearch/UnivKeyword",
  default: ""
});

export const majorKeywordState = atom<MajorKeyword>({
  key: "schema/states/SubjectSearch/MajorKeyword",
  default: ""
});

export const searchSummaryListState = atom<SearchSummary[]>({
  key: "schema/states/SubjectSearch/SearchSummaryList",
  default: []
});

export const searchDetailState = atom<SearchDetail | undefined>({
  key: "schema/states/SubjectSearch/SearchDetail",
  default: undefined
});
