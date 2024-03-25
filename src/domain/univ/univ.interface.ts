import { SchoolSubjectType } from "../../policy/school";
import { UnivOperation } from "../../policy/v2/univ";
import { UnivFilter } from "../../schema/types/AdminUniv";

export interface Univ {
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
  updatedAt?: number;
  createdAt?: number;
}

export interface Department {
  id: string;
  name: string;
  keyword: string;
  universityId: string;
  precedences: string[];
  guidelines: Guideline[];
  admin: string[];
  updatedAt?: number;
  createdAt?: number;
}

export interface DepartmentWithSubject extends Omit<Department, "guidelines"> {
  guidelines: {
    id: string;
    required: boolean;
    type?: SchoolSubjectType;
    options: {
      id?: string;
      name?: string;
      groups?: string[];
      credit: number;
    }[];
    condition: number;
  }[];
}

export interface Guideline {
  id: string;
  required: boolean;
  type?: SchoolSubjectType;
  options: string[];
  condition: number;
}

// Repositories
export interface UnivRepository {
  save: (form: Univ, id?: string) => Promise<{ id: string }>;
  delete: (key: string) => Promise<void>;
  findBy: (filter: UnivFilter) => Promise<Univ[]>;
  findById: (id: string) => Promise<Univ | null>;
}

export interface DepartmentRepository {
  findBy: (filter: UnivFilter) => Promise<Department[]>;
  save: (form: Department, id?: string) => Promise<{ id: string }>;
  delete: (key: string) => Promise<void>;
  findByUnivId: (name: string, univId: string) => Promise<Department[]>;
}
