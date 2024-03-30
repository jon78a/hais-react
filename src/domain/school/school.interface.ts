import { SchoolOperation } from "../../policy/school";
import {
  Credit,
  Level,
  SchoolFilter,
  SchoolSubjectType,
} from "../../schema/types/AdminSchool";

export interface School {
  id: string;
  name: string;
  description?: string;
  type?: string;
  operation?: SchoolOperation;
  jurisdiction?: string;
  address1?: string;
  address2?: string;
  zipcode?: string;
  admin?: string[];
  web1?: string;
  web2?: string;
  web3?: string;
  updatedAt?: number;
  createdAt?: number;
}

export interface SchoolSubject {
  id: string;
  name: string;
  schoolId: string;
  type: SchoolSubjectType;
  groups: string[];
  level: Level;
  credit: Credit;
  admin?: string[];
  updatedAt?: number;
  createdAt?: number;
}

// Repositories
export interface SchoolRepository {
  save: (form: School, id?: string) => Promise<{ id: string }>;
  delete: (key: string) => Promise<void>;
  findBy: (filter: SchoolFilter) => Promise<School[]>;
  findById: (id: string) => Promise<School | null>;

  saveSubject: ({
    form,
    subjectId,
  }: {
    form: SchoolSubject;
    subjectId?: string;
  }) => Promise<{ id: string }>;
  deleteSubject: ({
    isCommonSubject,
    subjectId,
  }: {
    isCommonSubject: boolean;
    subjectId?: string;
  }) => Promise<void>;
  findSubjectByGroups: (
    groups: string[],
    schoolId: string
  ) => Promise<SchoolSubject[]>;
  findSubjectBy: (filter: SchoolFilter) => Promise<SchoolSubject[]>;
  findSubjectByType: (
    type: SchoolSubjectType
  ) => Promise<SchoolSubject[] | null>;
  findSubjectById: ({
    isCommonSubject,
    subjectId,
  }: {
    isCommonSubject: boolean;
    subjectId: string;
  }) => Promise<SchoolSubject | null>;
  getCommonSubjects: () => Promise<SchoolSubject[]>;
  getOptionalSubjects: (schoolId: string) => Promise<SchoolSubject[]>;
}
