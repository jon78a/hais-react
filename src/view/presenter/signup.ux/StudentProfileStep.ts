import { ExceptionDetail } from "../../../types";

export interface StudentProfileStepUx {
  inputName: (value: string) => ExceptionDetail | null;
  selectSchoolYear: (value: number) => void;
  selectSubjectCategory: (value: string) => void;
  inputTargetMajors: (values: string[]) => void;
  clickSignupDone: () => void;
  back: () => void;
}
