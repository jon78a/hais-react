import { useContext, createContext } from "react";

import {
  UnivKeyword,
  FullNameKeyword,
  UnivSearchResult,
  MajorResult,
  SubjectData,
  MajorRecruit,
} from "../schema/types/SubjectSearch";
import { Department } from "../domain/univ/univ.interface";

export interface SubjectSearchService {
  suggestUniv: (univKeyword: UnivKeyword) => Promise<UnivSearchResult[]>;
  getDepartmentOnUniv: (
    name: string,
    univId: string
  ) => Promise<
    Pick<
      Department,
      "id" | "name" | "keyword" | "precedences" | "universityId"
    >[]
  >;
  searchByUnivOrMajor: (
    fullNameKeyword: FullNameKeyword
  ) => Promise<MajorResult[]>;
  readSubjectList: (recruit: MajorRecruit) => Promise<SubjectData[]>;
}

export const SubjectSearchContext = createContext<
  SubjectSearchService | undefined
>(undefined);

export const useSubjectSearchService = () => useContext(SubjectSearchContext)!;
