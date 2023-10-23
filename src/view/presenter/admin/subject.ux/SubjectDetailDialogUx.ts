import type { EditRequest } from "../../../../schema/types/SubjectTable";

export interface SubjectDetailDialogUx {
  modify: (
    form: EditRequest
  ) => void;
}
