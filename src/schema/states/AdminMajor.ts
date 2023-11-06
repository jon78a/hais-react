import { atom, selector } from "recoil";

import type {
  FullNameKeyword,
  MajorResult,
  SearchMode,
  UnivSearchResult,
  SelectedMajorId,
  SubjectData,
  MajorKeyword,
  UnivKeyword
} from "../types/AdminMajor";

export const searchModeState = atom<SearchMode>({
  key: "schema/states/AdminMajor/SearchMode",
  default: "UNIV"
});

export const univKeywordState = atom<UnivKeyword>({
  key: "schema/states/AdminMajor/UnivKeyword",
  default: ""
});

export const majorKeywordState = atom<MajorKeyword>({
  key: "schema/states/AdminMajor/MajorKeyword",
  default: ""
});

export const fullNameKeywordState = atom<FullNameKeyword>({
  key: "schema/states/AdminMajor/FullNameKeyword",
  default: ""
});

export const univSearchResultListState = atom<UnivSearchResult[]>({
  key: "schema/states/AdminMajor/UnivSearchResultList",
  default: []
});

export const majorResultListState = atom<MajorResult[]>({
  key: "schema/states/AdminMajor/MajorResultList",
  default: []
});

export const isMatchUnivState = selector<boolean>({
  key: "schema/states/AdminMajor/isMatchUniv",
  get: ({get}) => {
    const mode = get(searchModeState);
    if (mode !== "UNIV") return false;

    const univResults = get(univSearchResultListState);
    const keyword = get(univKeywordState);

    if (univResults.filter((v) => v.name === keyword).length === 1) {
      return true;
    }
    return false;
  },
});

export const selectedMajorIdState = atom<SelectedMajorId>({
  key: "schema/states/AdminMajor/SelectedMajorId",
  default: null
});

export const selectedMajorState = selector<MajorResult | undefined>({
  key: "schema/states/AdminMajor/selectedMajor",
  get: ({get}) => {
    const selectedId = get(selectedMajorIdState);
    if (!selectedId) return undefined;
    return get(majorResultListState).find((v) => v.id === selectedId);
  }
});

export const subjectDataListState = atom<SubjectData[]>({
  key: "schema/states/AdminMajor/SubjectDataList",
  default: []
});
