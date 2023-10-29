import type { CreateRequest } from "../../../../schema/types/AdminSubject";

export interface SubjectCreateDialogUx {
  create: (form: CreateRequest) => void;
}
