import type {
  GradeScoreForm,
  CreditScoreForm,
} from "../../../schema/types/MyScore";

export interface ScoreEditableTableUx {
  saveGradeScore: (form: GradeScoreForm) => void;
  saveCreditScore: (form: CreditScoreForm) => void;
}

export function isValidForm(form: GradeScoreForm | CreditScoreForm) {
  if (!form.subjectCode) {
    return false;
  }
  return true;
}
