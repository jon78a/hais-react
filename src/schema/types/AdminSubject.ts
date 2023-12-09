import type { StudentCategoryCode } from "../../policy/school";

import type { GridColDef } from "@mui/x-data-grid";

export type SubjectDistinct = "COMMON" | "OPTION";

export type SubjectColumn = {
  code: GridColDef;
  group: GridColDef;
  name: GridColDef;
  description: GridColDef;
};

export type SubjectFilter = {
  nameKeyword: string;
};

export type SubjectSummary = {
  id: number;
  distinctDetail: string;
  group: string;
  name: string;
  description: string;
};

export type EditRequest = {
  distinct: SubjectDistinct;
  subjectCode: string;
  data: CommonSubjectDetail | OptionalSubjectDetail;
};

export type CommonSubjectDto = {
  group: string;
  studentCategory: StudentCategoryCode;
  name: string;
  description: string;
  etcInfo: string;
};

export type OptionalSubjectDto = {
  group: string;
  name: string;
  description: string;
  etcInfo: string;
  studentCategory: StudentCategoryCode;
  subjectCategory: string;
  suneungInfo: string;
  creditAmount: string;
};

export type CreateRequest = {
  distinct: SubjectDistinct;
  data: CommonSubjectDto | OptionalSubjectDto;
};

export type DeleteRequest = {
  distinct: SubjectDistinct;
  subjectCode: string;
};

export type CommonSubjectDetail = {
  code: string;
  group: string;
  studentCategory: StudentCategoryCode;
  name: string;
  description: string;
  etcInfo: string;
};

export type OptionalSubjectDetail = {
  code: string;
  group: string;
  name: string;
  description: string;
  etcInfo: string;
  studentCategory: StudentCategoryCode;
  subjectCategory: string;
  suneungInfo: string;
  creditAmount: string;
};
