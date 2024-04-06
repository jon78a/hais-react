import { School, SchoolSubject } from "./school.interface";

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
  admin: [],
  createdAt: new Date().valueOf(),
  updatedAt: new Date().valueOf(),
};

export const defaultSubject: SchoolSubject = {
  id: "",
  name: "",
  schoolId: "",
  type: "공통과목",
  groups: [],
  level: 1,
  credit: 0,
  admin: [],
};
