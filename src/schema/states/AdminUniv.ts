import { atom } from "recoil";

import {
  UnivTabItem,
  UnivFilter,
  UnivDto,
  DepartmentDto,
  GuidelineDto,
} from "../types/AdminUniv";
import { SchoolSubjectDto } from "../types/AdminSchool";
import { TablePagination } from "../types/Table";
import { Department } from "../../domain/univ/univ.interface";

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

export const guideLineFormState = atom<Partial<GuidelineDto> | null>({
  key: "/schema/states/AdminUniv/GuidelineForm",
  default: null,
});

export const subjectListState = atom<SchoolSubjectDto[]>({
  key: "/schema/states/AdminUniv/subjectList",
  default: [],
});

export const univPaginationState = atom<TablePagination<UnivDto>>({
  key: "schema/states/AdminUniv/univPagination",
  default: {
    page: 0,
    size: 10,
    totalElements: 0,
    isPrev: false,
  },
});

export const departmentPaginationState = atom<TablePagination<DepartmentDto>>({
  key: "schema/states/AdminUniv/departmentPagination",
  default: {
    page: 0,
    size: 10,
    totalElements: 0,
    isPrev: false,
  },
});
