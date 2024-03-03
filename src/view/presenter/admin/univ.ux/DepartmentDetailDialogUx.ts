import { SchoolSubjectType } from "../../../../policy/school";
import { SchoolSubjectDto } from "../../../../schema/types/AdminSchool";
import type { DepartmentEditRequest } from "../../../../schema/types/AdminUniv";

export interface DepartmentDetailDialogUx {
  modify: (req: DepartmentEditRequest) => void;
  getSubjectList: (
    type: SchoolSubjectType
  ) => Promise<SchoolSubjectDto[] | null>;
}
