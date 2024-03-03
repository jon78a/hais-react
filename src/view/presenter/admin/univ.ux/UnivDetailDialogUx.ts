import type { EditRequest } from "../../../../schema/types/AdminUniv";

export interface UnivDetailDialogUx {
  modify: (req: EditRequest) => void;
}
