import { createContext, useContext } from "react";
import type { SubjectFilter } from "../../schema/types/AdminSubject";
import {
  DeleteRequest,
  CreateRequest,
  EditRequest,
  SchoolSubjectCreateRequest,
  SchoolSubjectDeleteRequest,
  SchoolSubjectEditRequest,
  SchoolSubjectGetRequest,
} from "../../schema/types/AdminSchool";
import { School, SchoolSubject } from "../../domain/school/school.interface";

interface AdminSchoolService {
  getSchoolList: ({
    filter,
    cursor,
    pageSize,
    isPrev,
  }: {
    filter?: SubjectFilter;
    cursor?: School;
    pageSize: number;
    isPrev?: boolean;
  }) => Promise<{ data: School[]; totalElements: number }>;
  getSchool: (id: string) => Promise<School | null>;
  editSchool: (req: EditRequest) => Promise<void>;
  addSchool: (req: CreateRequest) => Promise<{ id: string }>;
  deleteSchool: (req: DeleteRequest) => Promise<void>;

  getSubjectList: ({
    filter,
  }: {
    filter: SubjectFilter;
  }) => Promise<SchoolSubject[]>;
  getSubject: ({
    isCommonSubject,
    subjectId,
  }: SchoolSubjectGetRequest) => Promise<SchoolSubject | null>;
  editSubject: (req: SchoolSubjectEditRequest) => Promise<void>;
  addSubject: (req: SchoolSubjectCreateRequest) => Promise<{ id: string }>;
  deleteSubject: (req: SchoolSubjectDeleteRequest) => Promise<void>;
}

export const AdminSchoolContext = createContext<AdminSchoolService | undefined>(
  undefined
);

export const useAdminSchoolService = () => useContext(AdminSchoolContext)!;
