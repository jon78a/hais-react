import { atom } from "recoil";

import type { DataStateType } from "../../types";
import { School } from "./school.interface";

export const defaultSchool: School = {
  id: "",
  name: "",
  description: "",
  type: "",
  operation: "공립학교",
  jurisdiction: "",
  address1: "",
  address2: "",
  web1: "",
};

export const schoolState = atom<DataStateType<School>>({
  key: "school/schoolResponse",
  default: {
    data: defaultSchool,
    loading: false,
  },
});
