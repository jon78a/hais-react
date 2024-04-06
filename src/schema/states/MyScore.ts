import { atom } from "recoil";

import {
  SubjectSummary,
  type SubjectLabel,
  StudentGrade,
} from "../types/MyScore";
import { School } from "../../domain/school/school.interface";
import { Student } from "../../domain/subject/school.interface";
import { SchoolDto, SchoolSubjectDto } from "../types/AdminSchool";

export const subjectListState = atom<SchoolSubjectDto[]>({
  key: "schema/states/MyScore/SchoolSubject",
  default: [],
});

export const studentState = atom<Student | undefined>({
  key: "schema/states/MyScore/Student",
  default: undefined,
});

export const gradeListState = atom<StudentGrade[]>({
  key: "schema/states/MyScore/GradeList",
  default: [],
});

export const subjectLabelState = atom<SubjectLabel>({
  key: "schema/states/MyScore/SubjectLabel",
  default: "공통과목",
});

export const subjectSummaryListState = atom<SubjectSummary[]>({
  key: "schema/states/MyScore/SubjectSummary",
  default: [],
});

export const schoolListState = atom<SchoolDto[]>({
  key: "schema/states/MyScore/SchoolList",
  default: [],
});

export const selectedSchoolIdState = atom<string>({
  key: "schema/states/MyScore/SelectedSchoolId",
  default: undefined,
});
