import { atom } from "recoil";
import { Student } from "./school.interface";

import type { DataStateType } from "../../types";

export const defaultStudent: Student = {
  userId: "",
  id: "",
  category: null,
  name: "",
  schoolYear: 0
}

export const studentState = atom<DataStateType<Student>>({
  key: "subject/school/Student",
  default: {
    data: defaultStudent,
    loading: false
  }
});
