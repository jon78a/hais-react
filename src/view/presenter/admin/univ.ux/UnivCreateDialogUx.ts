import type { CreateRequest } from "../../../../schema/types/AdminUniv";

export interface UnivCreateDialogUx {
  create: (req: CreateRequest) => void;
}
