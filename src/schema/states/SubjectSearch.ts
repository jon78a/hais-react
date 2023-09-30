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

const searchSummaryListDefault: SearchSummary[] = [{
  code : "001",
  sbjName : "화법과 작문",
  category : "일반선택",
  group : "국어",
  suneungOX: "O",
},
{
  code : "002",
  sbjName : "언어와 매체",
  category : "일반선택",
  group : "국어",
  suneungOX: "O",
}]

export const searchSummaryListState = atom<SearchSummary[]>({
  key: "schema/states/SubjectSearch/SearchSummaryList",
  default: searchSummaryListDefault
});

export const searchDetailState = atom<SearchDetail | undefined>({
  key: "schema/states/SubjectSearch/SearchDetail",
  default: undefined
});
