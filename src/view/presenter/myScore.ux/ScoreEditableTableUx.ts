import type {
  GradeScoreForm,
  CreditScoreForm,
} from "../../../schema/types/MyScore";

export interface ScoreEditableTableUx {
  saveGradeScore: (form: GradeScoreForm) => void;
  saveCreditScore: (form: CreditScoreForm) => void;
  editGradeScore: (id: string, form: GradeScoreForm) => void;
  editCreditScore: (id: string, form: CreditScoreForm) => void;
  deleteGradeScore: (id: string) => void;
  deleteCreditScore: (id: string) => void;
}

export function isValidForm(form: GradeScoreForm | CreditScoreForm) {
  if (!form.subjectCode) {
    return false;
  }
  return true;
}
