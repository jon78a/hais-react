import type { SchoolSubjectCreateRequest } from "../../../../schema/types/AdminSchool";

export interface SchoolSubjectCreateDialogUx {
  create: (req: SchoolSubjectCreateRequest) => void;
}
