import { atom, selector } from "recoil";

import {
  type FullNameKeyword,
  type MajorResult,
  type SearchMode,
  type UnivSearchResult,
  type SelectedMajorId,
  type SubjectData,
  type MajorKeyword,
  type UnivKeyword,
  RecommendStatus
} from "../types/SubjectRecommend";

export const searchModeState = atom<SearchMode>({
  key: "schema/states/SubjectRecommend/SearchMode",
  default: "UNIV",
});

export const univKeywordState = atom<UnivKeyword>({
  key: "schema/states/SubjectRecommend/UnivKeyword",
  default: "",
});

export const majorKeywordState = atom<MajorKeyword>({
  key: "schema/states/SubjectRecommend/MajorKeyword",
  default: "",
});

export const fullNameKeywordState = atom<FullNameKeyword>({
  key: "schema/states/SubjectRecommend/FullNameKeyword",
  default: "",
});

export const univSearchResultListState = atom<UnivSearchResult[]>({
  key: "schema/states/SubjectRecommend/UnivSearchResultList",
  default: [],
});

export const majorResultListState = atom<MajorResult[]>({
  key: "schema/states/SubjectRecommend/MajorResultList",
  default: [],
});

export const majorResultLoadingState = atom<boolean>({
  key: "schema/states/SubjectRecommend/MajorResultLoading",
  default: false,
});

export const isMatchUnivState = selector<boolean>({
  key: "schema/states/SubjectRecommend/isMatchUniv",
  get: ({ get }) => {
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
  key: "schema/states/SubjectRecommend/SelectedMajorId",
  default: null,
});

export const selectedMajorState = selector<MajorResult | undefined>({
  key: "schema/states/SubjectRecommend/selectedMajor",
  get: ({ get }) => {
    const selectedId = get(selectedMajorIdState);
    if (!selectedId) return undefined;
    return get(majorResultListState).find((v) => v.id === selectedId);
  },
});

export const subjectDataListState = atom<SubjectData[]>({
  key: "schema/states/SubjectRecommend/SubjectDataList",
  default: [],
});

export const recommendStatusState = atom<RecommendStatus>({
  key: "schema/states/SubjectRecommend/RecommendStatus",
  default: {
    status: 0,
    comparisons: []
  }
});
