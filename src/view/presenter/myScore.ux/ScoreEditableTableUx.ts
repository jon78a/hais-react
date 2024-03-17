import { StudentGrade } from "../../../schema/types/MyScore";

export interface ScoreEditableTableUx {
  saveGradeScore: (form: StudentGrade) => void;
  loading: boolean;
}

export function isValidForm(form: StudentGrade) {
  if (!form.subjectId) {
    return false;
  }
  return true;
}
