import { ExceptionDetail } from "../../../types";

export interface StudentProfileStepUx {
  inputName: (value: string) => ExceptionDetail | null;
  selectSchoolYear: (value: number) => void;
  selectSubjectCategory: (value: string) => void;
  selectSchool: (value: string) => void;
  onChangeSchoolName: (value: string) => void;
  inputTargetMajors: (values: string[]) => void;
  clickSignupDone: () => void;
  back: () => void;
}
