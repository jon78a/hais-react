import { atom } from "recoil";

import type {
  CommonSubjectDetail,
  OptionalSubjectDetail,
} from "../types/AdminSubject";
import { SchoolTabItem, SchoolFilter, SchoolDto } from "../types/AdminSchool";

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

export const commonSubjectDetailState = atom<CommonSubjectDetail | undefined>({
  key: "/schema/states/AdminSchool/CommonSubjectDetail",
  default: undefined,
});

export const optionalSubjectDetailState = atom<
  OptionalSubjectDetail | undefined
>({
  key: "/schema/states/AdminSchool/OptionalSubjectDetail",
  default: undefined,
});
