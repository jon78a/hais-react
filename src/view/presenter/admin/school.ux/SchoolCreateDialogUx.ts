import type { CreateRequest } from "../../../../schema/types/AdminSchool";

export interface SchoolCreateDialogUx {
  create: (req: CreateRequest) => void;
}
