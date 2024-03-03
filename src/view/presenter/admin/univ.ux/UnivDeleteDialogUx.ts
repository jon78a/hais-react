import { DeleteRequest } from "../../../../schema/types/AdminUniv";

export interface UnivDeleteDialogUx {
  delete: (req: DeleteRequest) => void;
}
