import type { RequiredCreditFieldDto } from "../../../../schema/types/AdminMajor";

export interface MajorRecruitFormUx {
  addRequiredCredit: (dto: RequiredCreditFieldDto) => void;
  removeRequiredCredit: (index: number) => void;
  addGroup: (value: string) => void;
  removeGroup: (index: number) => void;
  editDifficulty: (value: string) => void;
  save: () => void;
}
