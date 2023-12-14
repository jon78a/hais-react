import { useContext, createContext } from "react";

import {
  UnivKeyword,
  MajorKeyword,
  FullNameKeyword,
  UnivSearchResult,
  MajorResult,
  SubjectData,
  MajorRecruit
} from "../schema/types/SubjectSearch";

export interface SubjectSearchService {
  suggestUniv: (univKeyword: UnivKeyword) => Promise<UnivSearchResult[]>;
  searchByMajorKeywordOnUnivName: (majorKeyword: MajorKeyword, univName: string) => Promise<MajorResult[]>;
  searchByUnivOrMajor: (fullNameKeyword: FullNameKeyword) => Promise<MajorResult[]>;
  readSubjectList: (recruit: MajorRecruit) => Promise<SubjectData[]>;
}

export const SubjectSearchContext = createContext<SubjectSearchService | undefined>(undefined);

export const useSubjectSearchService = () => useContext(SubjectSearchContext)!;
