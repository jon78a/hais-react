import { createContext, useContext } from "react";
import {
  DeleteRequest,
  CreateRequest,
  EditRequest,
  UnivFilter,
  DepartmentCreateRequest,
  DepartmentDeleteRequest,
  DepartmentEditRequest,
  CreateGuidelineRequest,
  DeleteGuidelineRequest,
} from "../../schema/types/AdminUniv";
import { Department, Univ } from "../../domain/univ/univ.interface";
import { SchoolSubject } from "../../domain/school/school.interface";
import { SchoolSubjectType } from "../../policy/school";

interface AdminUnivService {
  getUnivList: ({
    filter,
    isPrev,
    cursor,
    pageSize,
  }: {
    filter: UnivFilter;
    isPrev?: boolean;
    cursor?: Univ;
    pageSize?: number;
  }) => Promise<{ data: Univ[]; totalElements: number }>;
  getUniv: (id: string) => Promise<Univ | null>;
  editUniv: (req: EditRequest) => Promise<void>;
  addUniv: (req: CreateRequest) => Promise<{ id: string }>;
  deleteUniv: (req: DeleteRequest) => Promise<void>;

  getDepartmentList: ({
    filter,
    isPrev,
    cursor,
    pageSize,
  }: {
    filter: UnivFilter;
    isPrev?: boolean;
    cursor: Department;
    pageSize: number;
  }) => Promise<{ data: Department[]; totalElements: number }>;
  addDepartment: (req: DepartmentCreateRequest) => Promise<{ id: string }>;
  deleteDepartment: (req: DepartmentDeleteRequest) => Promise<void>;
  editDepartment: (req: DepartmentEditRequest) => Promise<void>;
  getSubjectList: (req: SchoolSubjectType) => Promise<SchoolSubject[] | null>;

  createGuideline: (req: CreateGuidelineRequest) => Promise<{ id: string }>;
  deleteGuideline: (req: DeleteGuidelineRequest) => Promise<{ id: string }>;
}

export const AdminUnivContext = createContext<AdminUnivService | undefined>(
  undefined
);

export const useAdminUnivService = () => useContext(AdminUnivContext)!;
