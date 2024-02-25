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
  getSchoolList: (filter: SubjectFilter) => Promise<School[]>;
  getSchool: (id: string) => Promise<School | null>;
  editSchool: (req: EditRequest) => Promise<void>;
  addSchool: (req: CreateRequest) => Promise<{ id: string }>;
  deleteSchool: (req: DeleteRequest) => Promise<void>;

  getSubjectList: (filter: SubjectFilter) => Promise<SchoolSubject[]>;
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
