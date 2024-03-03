import { SchoolSubjectType } from "../../../../policy/school";
import { SchoolSubjectDto } from "../../../../schema/types/AdminSchool";
import {
  DepartmentCreateRequest,
  DepartmentEditRequest,
} from "../../../../schema/types/AdminUniv";

export interface GuidelineFormUx {
  state: {
    form: {
      get: DepartmentCreateRequest | DepartmentEditRequest;
      set: React.Dispatch<
        React.SetStateAction<DepartmentCreateRequest | undefined>
      >;
    };
    guideline: {
      get: boolean[];
      set: React.Dispatch<React.SetStateAction<boolean[]>>;
    };
  };
  getSubjectList: (
    type: SchoolSubjectType
  ) => Promise<SchoolSubjectDto[] | null>;
  index: number;
}
