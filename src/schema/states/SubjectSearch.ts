import { atom, selector } from "recoil";

import type {
  FullNameKeyword,
  MajorResult,
  SearchMode,
  UnivSearchResult,
  SelectedMajorId,
  SubjectData,
  MajorKeyword,
  UnivKeyword,
} from "../types/SubjectSearch";
import { Department } from "../../domain/univ/univ.interface";

export const searchModeState = atom<SearchMode>({
  key: "schema/states/SubjectSearch/SearchMode",
  default: "UNIV",
});

export const univKeywordState = atom<UnivKeyword>({
  key: "schema/states/SubjectSearch/UnivKeyword",
  default: "",
});

export const majorKeywordState = atom<MajorKeyword>({
  key: "schema/states/SubjectSearch/MajorKeyword",
  default: "",
});

export const fullNameKeywordState = atom<FullNameKeyword>({
  key: "schema/states/SubjectSearch/FullNameKeyword",
  default: "",
});

export const univSearchResultListState = atom<UnivSearchResult[]>({
  key: "schema/states/SubjectSearch/UnivSearchResultList",
  default: [],
});

export const majorResultListState = atom<Partial<Department>[]>({
  key: "schema/states/SubjectSearch/MajorResultList",
  default: [],
});

export const majorResultLoadingState = atom<boolean>({
  key: "schema/states/SubjectSearch/MajorResultLoading",
  default: false,
});

export const isMatchUnivState = selector<boolean>({
  key: "schema/states/SubjectSearch/isMatchUniv",
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
  key: "schema/states/SubjectSearch/SelectedMajorId",
  default: null,
});

export const selectedMajorState = selector<Partial<Department> | undefined>({
  key: "schema/states/SubjectSearch/selectedMajor",
  get: ({ get }) => {
    const selectedId = get(selectedMajorIdState);
    if (!selectedId) return undefined;
    return get(majorResultListState).find((v) => v.id === selectedId);
  },
});

export const subjectDataListState = atom<SubjectData[]>({
  key: "schema/states/SubjectSearch/SubjectDataList",
  default: [],
});
