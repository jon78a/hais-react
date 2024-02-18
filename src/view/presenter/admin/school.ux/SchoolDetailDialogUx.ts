import type { EditRequest } from "../../../../schema/types/AdminSchool";

export interface SchoolDetailDialogUx {
  modify: (
    form: EditRequest
  ) => void;
}
