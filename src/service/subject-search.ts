import { useContext, createContext } from "react";

import {
  GeneralMajorByClsfInput,
  SearchSummary,
  SearchDetail,
  UnivToMajorInput,
  UnivChoice,
  MajorChoice
} from "../schema/types/SubjectSearch";

interface SubjectSearchService {
  showUnivs: (keyword: string) => Promise<UnivChoice[]>;
  showMajors: (keyword: string, univName: string) => Promise<MajorChoice[]>;
  search: (filters: {
    univToMajor: UnivToMajorInput;
    generalMajorByClsf?: GeneralMajorByClsfInput;
  }) => Promise<SearchSummary[]>;
  searchMore: (code: string) => Promise<SearchDetail>;
}

export const SubjectSearchContext = createContext<SubjectSearchService | undefined>(undefined);

export const useSubjectSearchService = () => useContext(SubjectSearchContext)!;
