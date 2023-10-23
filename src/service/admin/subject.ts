import { createContext, useContext } from "react";
import type {
  EditRequest,
  CommonSubjectDetail,
  OptionalSubjectDetail,
  SubjectDistinct,
  SubjectSummary,
  SubjectFilter,
  CreateRequest,
} from "../../schema/types/SubjectTable";

interface AdminSubjectService {
  readSubject: (distinct: SubjectDistinct, filter: SubjectFilter) => Promise<SubjectSummary[]>;
  readSubjectProfile: (code: string, distinct: SubjectDistinct) =>
    Promise<OptionalSubjectDetail | CommonSubjectDetail>;
  editSubject: (req: EditRequest) => Promise<void>;
  addSubject: (req: CreateRequest) => Promise<void>;
}

export const AdminSubjectContext = createContext<AdminSubjectService | undefined>(undefined);

export const useAdminSubjectService = () => useContext(AdminSubjectContext)!;
