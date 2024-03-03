import { atom } from "recoil";

import type { DataStateType } from "../../types";
import { Univ, Department } from "./univ.interface";

export const defaultUniv: Univ = {
  id: "",
  name: "",
  location: "",
  operation: "사립대학",
  web1: "",
  admin: [],
  createdAt: new Date().valueOf(),
  updatedAt: new Date().valueOf(),
};

export const defaultDepartment: Department = {
  id: "",
  name: "",
  keyword: "",
  universityId: "",
  precedences: [],
  guidelines: [],
  admin: [],
  createdAt: new Date().valueOf(),
  updatedAt: new Date().valueOf(),
};

export const univState = atom<DataStateType<Univ>>({
  key: "univ/univResponse",
  default: {
    data: defaultUniv,
    loading: false,
  },
});
