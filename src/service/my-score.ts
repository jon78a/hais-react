import { createContext, useContext } from "react";
import type {
  GradeScoreForm,
  CreditScoreForm
} from "../schema/types/MyScore";

interface MyScoreService {
  saveGradeScore: (form: GradeScoreForm) => void;
  saveCreditScore: (form: CreditScoreForm) => void;
}

export const MyScoreContext = createContext<MyScoreService | undefined>(undefined);

export const useMyScoreService = () => useContext(MyScoreContext)!;
