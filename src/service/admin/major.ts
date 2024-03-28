import { createContext, useContext } from "react";
import {
  UnivKeyword,
  FullNameKeyword,
  UnivSearchResult,
  MajorResult,
  SubjectData,
  MajorRecruit,
  SelectedMajorId,
} from "../../schema/types/AdminMajor";
import { Department } from "../../domain/univ/univ.interface";

export interface AdminMajorService {
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
  readSubjectList: (majorId: number | string) => Promise<SubjectData[]>;
  submitMajorRecruit: (
    recruit: MajorRecruit,
    id: SelectedMajorId
  ) => Promise<void>;
}

export const AdminMajorContext = createContext<AdminMajorService | undefined>(
  undefined
);

export const useAdminMajorService = () => useContext(AdminMajorContext)!;
