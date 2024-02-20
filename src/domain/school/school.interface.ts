import {
  SchoolCommonSubjectType,
  SchoolOperation,
  SchoolOptionalSubjectType,
  SchoolSpecialSubjectType,
} from "../../policy/school";
import {
  SchoolFilter,
  SchoolSubjectType,
} from "../../schema/types/AdminSchool";

export interface Version {
  version: string;
  type: "product" | "test";
}

export interface School {
  id: string;
  name: string;
  description?: string;
  type?: string;
  operation: SchoolOperation;
  jurisdiction?: string;
  address1?: string;
  address2?: string;
  zipcode?: string;
  admin: string;
  web1: string;
  web2?: string;
  web3?: string;
  updatedAt?: number;
  createdAt?: number;
}

export interface SchoolCommonSubject
  extends SchoolSubjectBase<SchoolCommonSubjectType> {}
export interface SchoolOptionalSubject
  extends SchoolSubjectBase<SchoolOptionalSubjectType> {}
export interface SchoolSpecialSubject
  extends SchoolSubjectBase<SchoolSpecialSubjectType> {}

export interface SchoolSubjectBase<T extends SchoolSubjectType> {
  id: string;
  description: string;
  name: string;
  type: T | "";
  groups: string[];
  level: number;
  credit: number;
  admin?: string;
  updatedAt?: number;
  createdAt?: number;
}

export interface Year {
  year: number;
  school: string;
  university: string;
}

// Repositories
export interface SchoolRepository {
  save: (form: School, id?: string) => Promise<{ id: string }>;
  delete: (key: string) => Promise<void>;
  findBy: (filter: SchoolFilter) => Promise<School[]>;
  findById: (id: string) => Promise<School | null>;
}
