import { atom } from "recoil";

import {
  SearchSummary,
  SearchDetail,
  UnivKeyword,
  MajorKeyword,
  UnivChoice,
  MajorChoice,
} from "../types/SubjectSearch";

export const univChoiceState = atom<UnivChoice>({
  key: "schema/states/SubjectSearch/UnivChoice",
  default: {
    id: 0,
    name: ""
  }
});

export const majorChoiceState = atom<MajorChoice>({
  key: "schema/states/SubjectSearch/MajorChoice",
  default: {
    id: 0,
    name: ""
  }
});

export const univChoiceListState = atom<UnivChoice[]>({
  key: "schema/states/SubjectSearch/UnivChoiceList",
  default: []
});

export const majorChoiceListState = atom<MajorChoice[]>({
  key: "schema/states/SubjectSearch/MajorChoiceList",
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
