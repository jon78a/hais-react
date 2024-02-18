import { DeleteRequest } from "../../../../schema/types/AdminSchool";

export interface SchoolDeleteDialogUx {
  delete: (req: DeleteRequest) => void;
}
