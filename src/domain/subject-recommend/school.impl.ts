import { atom } from "recoil";
import { Student, StudentExceptionMap } from "./school.interface";

import type { DataStateType } from "../../types";

export const defaultStudent: Student = {
  userId: "",
  id: "",
  category: null,
  name: "",
  schoolYear: 0,
  targetMajor: []
}

export const studentState = atom<DataStateType<Student>>({
  key: "subject/school/studentResponse",
  default: {
    data: defaultStudent,
    loading: false
  }
});

export const studentExceptionMap: StudentExceptionMap = {
  INVALID_NAME: {
    name: "INVALID_NAME",
    message: "이름을 올바르게 입력해주세요."
  }
}
