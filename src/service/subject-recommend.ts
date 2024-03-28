import { useContext, createContext } from "react";

import {
  UnivKeyword,
  MajorResult,
  SubjectData,
  FullNameKeyword,
  RecommendStatus,
} from "../schema/types/SubjectRecommend";
import { Department, Guideline, Univ } from "../domain/univ/univ.interface";
import { SchoolSubject } from "../domain/school/school.interface";

export interface SubjectRecommendService {
  suggestUniv: (
    nameKeyword: UnivKeyword
  ) => Promise<Pick<Univ, "id" | "name">[]>;
  getDepartmentOnUniv: (
    name: string,
    univId: string
  ) => Promise<
    Pick<Department, "id" | "name" | "precedences" | "keyword" | "guidelines">[]
  >;
  searchByUnivOrMajor: (
    fullNameKeyword: FullNameKeyword
  ) => Promise<MajorResult[]>;
  recommend: (subjects: SubjectData[]) => Promise<RecommendStatus>;
  readSubjectList: (
    guidelines: Partial<Guideline>[]
  ) => Promise<(SchoolSubject | null)[]>;
  findSubjectByGroups: (
    groups: string[],
    schoolId: string
  ) => Promise<SchoolSubject[]>;
}

export const SubjectRecommendContext = createContext<
  SubjectRecommendService | undefined
>(undefined);

export const useSubjectRecommendService = () =>
  useContext(SubjectRecommendContext)!;
