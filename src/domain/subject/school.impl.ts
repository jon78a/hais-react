import { atom } from "recoil";
import { Student } from "./school.interface";

export const defaultStudent: Student = {
  userId: "",
  id: "",
  category: null,
  name: "",
  schoolYear: 0
}

export const studentState = atom<Student>({
  key: "subject/school/Student",
  default: defaultStudent
});
