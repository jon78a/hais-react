import type { SchoolSubjectDeleteRequest } from "../../../../schema/types/AdminSchool";

export interface SchoolSubjectDeleteDialogUx {
  delete: (req: SchoolSubjectDeleteRequest) => void;
}
