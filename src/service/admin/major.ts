import { createContext, useContext } from "react";
import {
  UnivKeyword,
  MajorKeyword,
  FullNameKeyword,
  UnivSearchResult,
  MajorResult,
  SubjectData
} from "../../schema/types/AdminMajor";

export interface AdminMajorService {
  suggestUniv: (univKeyword: UnivKeyword) => Promise<UnivSearchResult[]>;
  searchByMajorKeywordOnUnivName: (majorKeyword: MajorKeyword, univName: string) => Promise<MajorResult[]>;
  searchByUnivOrMajor: (fullNameKeyword: FullNameKeyword) => Promise<MajorResult[]>;
  readSubjectList: (majorId: number) => Promise<SubjectData[]>;
}

export const AdminMajorContext = createContext<AdminMajorService | undefined>(undefined);

export const useAdminMajorService = () => useContext(AdminMajorContext)!;
