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

export type SchoolDto = {
  id: string;
  name: string;
  description: string;
  type: string;
  operation: SchoolOperation;
  jurisdiction: string;
  address1: string;
  address2: string;
  zipcode?: string;
  web1: string;
  web2?: string;
  web3?: string;
};
