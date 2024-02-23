import type { SchoolOperation } from "../../policy/school";

export type SchoolTabItem = "SCHOOL" | "SUBJECT";
export type SchoolSubjectType =
  | "공통과목"
  | "일반선택"
  | "진로선택"
  | "융합선택"
  | "전공공통"
  | "전공일반"
  | "전공실무";

export type DeleteRequest = {
  id: string;
};

export type SchoolFilter = {
  nameKeyword: string;
};

export type CreateRequest = {
  data: SchoolDto;
};

export type EditRequest = {
  id: string;
  data: SchoolDto | null;
};

export type Level = 1 | 2 | 3;
export type Credit = 0 | 1 | 2 | 3 | 4 | 5;

export type SchoolDto = {
  id: string;
  name: string;
  description?: string;
  type?: string;
  operation: SchoolOperation;
  jurisdiction?: string;
  address1?: string;
  address2?: string;
  zipcode?: string;
  admin: string[];
  web1: string;
  web2?: string;
  web3?: string;
};

export type SchoolSubjectCreateRequest = {
  data: SchoolSubjectDto;
  schoolId: string;
};

export type SchoolSubjectGetRequest = {
  isCommonSubject: boolean;
  schoolId: string;
  subjectId: string;
};

export type SchoolSubjectEditRequest = {
  data: SchoolSubjectDto | null;
  schoolId: string;
  subjectId: string;
};

export type SchoolSubjectDeleteRequest = {
  isCommonSubject: boolean;
  schoolId?: string | undefined;
  subjectId?: string;
};

export type SchoolSubjectDto = {
  id: string;
  name: string;
  type: SchoolSubjectType;
  groups: string[];
  level: Level;
  credit: Credit;
  admin: string[];
};
