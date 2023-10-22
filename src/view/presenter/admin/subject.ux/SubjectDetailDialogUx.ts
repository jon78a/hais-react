import type { CommonSubjectDetail, OptionalSubjectDetail, SubjectDistinct } from "../../../../schema/types/SubjectTable";

export interface SubjectDetailDialogUx {
  modify: (
    distinct: SubjectDistinct,
    form: CommonSubjectDetail | OptionalSubjectDetail
  ) => void;
}
