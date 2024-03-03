import { Department } from "../../domain/univ/univ.interface";
import { UnivOperation } from "../../policy/v2/univ";
import { SchoolSubjectType } from "./AdminSchool";

export type UnivTabItem = "UNIV" | "DEPARTMENT";

export type DeleteRequest = {
  id: string;
};

export type UnivFilter = {
  nameKeyword: string;
};

export type CreateRequest = {
  data: UnivDto;
};

export type EditRequest = {
  id: string;
  data: UnivDto | null;
};

export type UnivDto = {
  id: string;
  name: string;
  location: string;
  type?: string;
  operation: UnivOperation;
  address1?: string;
  address2?: string;
  admin: string[];
  web1: string;
  web2?: string;
  web3?: string;
  createdAt?: number;
  updatedAt?: number;
};

export type DepartmentCreateRequest = {
  data: DepartmentDto;
};

export type DepartmentGetRequest = {
  departmentId: string;
};

export type DepartmentEditRequest = {
  data: DepartmentDto | null;
  departmentId: string;
};

export type DepartmentDeleteRequest = {
  id?: string;
};

export type DepartmentDto = {
  id: string;
  name: string;
  keyword: string;
  universityName?: string;
  universityId: string;
  precedences: string[];
  guidelines: (GuidelineDto | undefined)[];
  admin: string[];
  updatedAt?: number;
  createdAt?: number;
};

export type GuidelineDto = {
  id: string;
  required: boolean;
  type?: SchoolSubjectType;
  options: string[];
  condition: number;
};
