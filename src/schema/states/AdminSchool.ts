import { atom } from "recoil";

import {
  SchoolTabItem,
  SchoolFilter,
  SchoolDto,
  SchoolSubjectDto,
} from "../types/AdminSchool";
import { School } from "../../domain/school/school.interface";
import { TablePagination } from "../types/Table";

export const schoolTabState = atom<SchoolTabItem>({
  key: "/schema/states/AdminSchool/SchoolTab",
  default: "SCHOOL",
});

export const schoolFilterState = atom<SchoolFilter>({
  key: "/schema/states/AdminSchool/SchoolFilter",
  default: {
    nameKeyword: "",
  },
});

export const schoolListState = atom<SchoolDto[]>({
  key: "/schema/states/AdminSchool/SchoolList",
  default: [],
});

export const schoolState = atom<SchoolDto | undefined>({
  key: "/schema/states/AdminSchool/School",
  default: undefined,
});

export const schoolSubjectListState = atom<SchoolSubjectDto[]>({
  key: "/schema/states/AdminSchool/SchoolSubjectList",
  default: [],
});

export const schoolPaginationState = atom<TablePagination<School>>({
  key: "schema/states/AdminSchool/Pagination",
  default: {
    page: 0,
    size: 10,
    totalElements: 0,
    isPrev: false,
  },
});
