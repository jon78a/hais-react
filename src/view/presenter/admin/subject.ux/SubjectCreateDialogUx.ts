import type { CreateRequest } from "../../../../schema/types/SubjectTable";

export interface SubjectCreateDialogUx {
  create: (form: CreateRequest) => void;
}
