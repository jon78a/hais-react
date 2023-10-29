import { createContext, useContext } from "react";
import type {
  EditRequest,
  CommonSubjectDetail,
  OptionalSubjectDetail,
  SubjectDistinct,
  SubjectSummary,
  SubjectFilter,
  CreateRequest,
  DeleteRequest,
} from "../../schema/types/AdminSubject";

interface AdminSubjectService {
  readSubject: (distinct: SubjectDistinct, filter: SubjectFilter) => Promise<SubjectSummary[]>;
  readSubjectProfile: (code: string, distinct: SubjectDistinct) =>
    Promise<OptionalSubjectDetail | CommonSubjectDetail>;
  editSubject: (req: EditRequest) => Promise<void>;
  addSubject: (req: CreateRequest) => Promise<void>;
  deleteSubject: (req: DeleteRequest) => Promise<void>;
}

export const AdminSubjectContext = createContext<AdminSubjectService | undefined>(undefined);

export const useAdminSubjectService = () => useContext(AdminSubjectContext)!;
