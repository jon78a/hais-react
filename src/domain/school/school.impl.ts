import { atom } from "recoil";

import type { DataStateType } from "../../types";
import { School, SchoolSubjectBase } from "./school.interface";
import { SchoolSubjectType } from "../../policy/school";

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
  admin: "",
};

export const defaultSubject: SchoolSubjectBase<SchoolSubjectType> = {
  id: "",
  name: "",
  description: "",
  type: "",
  groups: [],
  level: 0,
  credit: 0,
};

export const defaultYear = {
  id: "",
  name: "",
  description: "",
  type: "",
  groups: [],
  level: 0,
  credit: 0,
};

export const schoolState = atom<DataStateType<School>>({
  key: "school/schoolResponse",
  default: {
    data: defaultSchool,
    loading: false,
  },
});
