import { SchoolSubjectType } from "../../../../policy/school";
import { SchoolSubjectDto } from "../../../../schema/types/AdminSchool";
import type { DepartmentCreateRequest } from "../../../../schema/types/AdminUniv";

export interface DepartmentCreateDialogUx {
  create: (req: DepartmentCreateRequest) => void;
  getSubjectList: (
    type: SchoolSubjectType
  ) => Promise<SchoolSubjectDto[] | null>;
}
