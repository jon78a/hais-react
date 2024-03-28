import { SchoolSubjectType } from "../../../../policy/school";
import { SchoolSubjectDto } from "../../../../schema/types/AdminSchool";

export interface DepartmentGuidelineDialogUx {
  guidelineFormSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => Promise<string | undefined>;
  getSubjectList: (
    type: SchoolSubjectType
  ) => Promise<SchoolSubjectDto[] | null>;
  onClickDeleteGuideline: ({
    guidelineId,
    departmentId,
  }: {
    guidelineId: string;
    departmentId: string;
  }) => Promise<string | undefined>;
}
