import { useContext, createContext } from "react";

import {
  UnivKeyword,
  UnivSearchResult,
  MajorResult,
  SubjectData,
  MajorKeyword,
  FullNameKeyword,
  RecommendStatus
} from "../schema/types/SubjectRecommend";

export interface SubjectRecommendService {
  suggestUniv: (univKeyword: UnivKeyword) => Promise<UnivSearchResult[]>;
  searchByMajorKeywordOnUnivName: (majorKeyword: MajorKeyword, univName: string) => Promise<MajorResult[]>;
  searchByUnivOrMajor: (fullNameKeyword: FullNameKeyword) => Promise<MajorResult[]>;
  recommend: (subjects: SubjectData[]) => Promise<RecommendStatus>;
  readSubjectList: (majorId: number) => Promise<SubjectData[]>;
}

export const SubjectRecommendContext = createContext<SubjectRecommendService | undefined>(undefined);

export const useSubjectRecommendService = () => useContext(SubjectRecommendContext)!;
