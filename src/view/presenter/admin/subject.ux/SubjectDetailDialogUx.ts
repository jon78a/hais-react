import type { CommonSubjectDetail, OptionalSubjectDetail, SubjectDistinct } from "../../../../schema/types/SubjectTable";

export interface SubjectDetailDialogUx {
  modify: (
    distinct: SubjectDistinct,
    code: string,
    form: CommonSubjectDetail | OptionalSubjectDetail
  ) => void;
}
