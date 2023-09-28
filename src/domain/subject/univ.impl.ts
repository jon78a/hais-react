import { atom } from "recoil";

import {
  Major,
  Univ
} from "./univ.interface";
import type { DataStateType } from "../../types";

export const univListState = atom<DataStateType<Univ[]>>({
  key: "domain/subject/univList",
  default: {
    data: [],
    loading: false,
  }
});

export const majorListState = atom<DataStateType<Major[]>>({
  key: "domain/subject/majorList",
  default: {
    data: [],
    loading: false,
  }
});
