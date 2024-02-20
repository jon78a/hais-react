import { createContext, useContext } from "react";
import type { SubjectFilter } from "../../schema/types/AdminSubject";
import {
  DeleteRequest,
  CreateRequest,
  EditRequest,
} from "../../schema/types/AdminSchool";
import { School } from "../../domain/school/school.interface";

interface AdminSchoolService {
  getSchoolList: (filter: SubjectFilter) => Promise<School[]>;
  getSchool: (id: string) => Promise<School | null>;
  editSchool: (req: EditRequest) => Promise<void>;
  addSchool: (req: CreateRequest) => Promise<{ id: string }>;
  deleteSchool: (req: DeleteRequest) => Promise<void>;
}

export const AdminSchoolContext = createContext<AdminSchoolService | undefined>(
  undefined
);

export const useAdminSchoolService = () => useContext(AdminSchoolContext)!;
