import { atom } from "recoil";

import {
  UnivTabItem,
  UnivFilter,
  UnivDto,
  DepartmentDto,
} from "../types/AdminUniv";
import { SchoolSubjectDto } from "../types/AdminSchool";

export const univTabState = atom<UnivTabItem>({
  key: "/schema/states/AdminUniv/SchoolTab",
  default: "UNIV",
});

export const univFilterState = atom<UnivFilter>({
  key: "/schema/states/AdminUniv/UnivFilter",
  default: {
    nameKeyword: "",
  },
});

export const univListState = atom<UnivDto[]>({
  key: "/schema/states/AdminUniv/UnivList",
  default: [],
});

export const univState = atom<UnivDto | undefined>({
  key: "/schema/states/AdminUniv/Univ",
  default: undefined,
});

export const departmentListState = atom<DepartmentDto[]>({
  key: "/schema/states/AdminUniv/DepartmentList",
  default: [],
});

export const departmentState = atom<DepartmentDto | null>({
  key: "/schema/states/AdminUniv/Department",
  default: null,
});
