import { SchoolOperation } from "../../policy/school";
import { SchoolFilter } from "../../schema/types/AdminSchool";

export interface SchoolRepository {
  save: (form: School, id: string) => Promise<void>;
  delete: (key: string) => Promise<void>;
  findBy: (filter: SchoolFilter) => Promise<School[]>;
  findById: (id: string) => Promise<School | null>;
}

export interface School {
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
  admin?: string;
  updatedAt?: number;
  createdAt?: number;
}
