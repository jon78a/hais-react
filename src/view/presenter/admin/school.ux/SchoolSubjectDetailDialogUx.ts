import type { SchoolSubjectEditRequest } from "../../../../schema/types/AdminSchool";

export interface SchoolSubjectDetailDialogUx {
  modify: (req: SchoolSubjectEditRequest) => void;
}
