import type { CreateRequest } from "../../../../schema/types/AdminSchool";

export interface SchoolCreateDialogUx {
  create: (form: CreateRequest) => void;
}
