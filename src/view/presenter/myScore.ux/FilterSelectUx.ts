import type { SubjectLabel } from "../../../schema/types/MyScore";

export interface FilterSelectUx {
  selectSubjectLabel: (label: SubjectLabel) => void;
}
