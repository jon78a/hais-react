import type { EditRequest } from "../../../../schema/types/AdminSubject";

export interface SubjectDetailDialogUx {
  modify: (
    form: EditRequest
  ) => void;
}
