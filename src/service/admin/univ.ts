import { createContext, useContext } from "react";
import {
  DeleteRequest,
  CreateRequest,
  EditRequest,
  UnivFilter,
  DepartmentCreateRequest,
  DepartmentDeleteRequest,
  DepartmentEditRequest,
} from "../../schema/types/AdminUniv";
import { Department, Univ } from "../../domain/univ/univ.interface";
import { SchoolSubject } from "../../domain/school/school.interface";
import { SchoolSubjectType } from "../../policy/school";

interface AdminUnivService {
  getUnivList: (filter: UnivFilter) => Promise<Univ[]>;
  getUniv: (id: string) => Promise<Univ | null>;
  editUniv: (req: EditRequest) => Promise<void>;
  addUniv: (req: CreateRequest) => Promise<{ id: string }>;
  deleteUniv: (req: DeleteRequest) => Promise<void>;

  getDepartmentList: (filter: UnivFilter) => Promise<Department[]>;
  addDepartment: (req: DepartmentCreateRequest) => Promise<{ id: string }>;
  deleteDepartment: (req: DepartmentDeleteRequest) => Promise<void>;
  editDepartment: (req: DepartmentEditRequest) => Promise<void>;
  getSubjectList: (req: SchoolSubjectType) => Promise<SchoolSubject[] | null>;
}

export const AdminUnivContext = createContext<AdminUnivService | undefined>(
  undefined
);

export const useAdminUnivService = () => useContext(AdminUnivContext)!;
