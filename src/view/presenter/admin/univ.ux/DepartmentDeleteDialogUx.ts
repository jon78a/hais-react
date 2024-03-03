import type { DepartmentDeleteRequest } from "../../../../schema/types/AdminUniv";

export interface DepartmentDeleteDialogUx {
  delete: (req: DepartmentDeleteRequest) => void;
}
