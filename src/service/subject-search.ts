import { useContext, createContext } from "react";

import {
  GeneralMajorByClsfInput,
  SearchDetail,
  SearchSummary,
  UnivToMajorInput,
  UnivChoice,
  MajorChoice,
  UnivName,
  MajorName
} from "../schema/types/SubjectSearch";

interface SubjectSearchService {
  showUnivs: (keyword: string) => Promise<UnivName[]>;
  showMajors: (keyword: string, univName: string) => Promise<MajorName[]>;
  // search: (filters: {
  //   univToMajor?: UnivToMajorInput;
  //   generalMajorByClsf?: GeneralMajorByClsfInput;
  // }) => Promise<SearchSummary[]>;
  // searchMore: (code: string) => Promise<SearchDetail>;
}

export const SubjectSearchContext = createContext<SubjectSearchService | undefined>(undefined);

export const useSubjectSearchService = () => useContext(SubjectSearchContext)!;
