import { createContext, useContext } from "react";
import type {
  GradeScoreForm,
  CreditScoreForm,
  SubjectLabel,
  SubjectSummary,
  GradeScoreValue,
  CreditScoreValue
} from "../schema/types/MyScore";

interface MyScoreService {
  saveGradeScore: (form: GradeScoreForm) => Promise<void>;
  saveCreditScore: (form: CreditScoreForm) => Promise<void>;
  updateGradeScore: (form: GradeScoreForm, scoreId: string) => Promise<void>;
  updateCreditScore: (form: CreditScoreForm, scoreId: string) => Promise<void>;
  showSubjectSummaryList: (label: SubjectLabel) => Promise<SubjectSummary[]>;
  readGradeScoreList: () => Promise<GradeScoreValue[]>;
  readCreditScoreList: () => Promise<CreditScoreValue[]>;
}

export const MyScoreContext = createContext<MyScoreService | undefined>(undefined);

export const useMyScoreService = () => useContext(MyScoreContext)!;
