import { createContext, useContext } from "react";
import type {
  EditRequest,
  CommonSubjectDetail,
  OptionalSubjectDetail,
  SubjectDistinct,
  SubjectSummary,
  SubjectFilter,
} from "../../schema/types/SubjectTable";

interface AdminSubjectService {
  readSubject: (distinct: SubjectDistinct, filter: SubjectFilter) => Promise<SubjectSummary[]>;
  readSubjectProfile: (code: string, distinct: SubjectDistinct) =>
    Promise<OptionalSubjectDetail | CommonSubjectDetail>;
  editSubject: (req: EditRequest) => Promise<void>;
}

export const AdminSubjectContext = createContext<AdminSubjectService | undefined>(undefined);

export const useAdminSubjectService = () => useContext(AdminSubjectContext)!;
