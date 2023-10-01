import type { UnivChoice, MajorChoice } from "../../../schema/types/SubjectSearch";

export interface MajorSearchFilterUx {
  inputUnivKeyword: (value: string) => void;  // 학교 키워드 입력
  inputMajorKeyword: (value: string) => void;  // 학과 키워드 입력
  selectUnivChoice: (value: UnivChoice) => void;  // 학교 목록 중 선택
  selectMajorChoice: (value: MajorChoice) => void;  // 학과 목록 중 선택
  deleteUnivChoice: () => void;  // 선택 학교 삭제
  deleteMajorChoice: () => void;  // 선택 학과 삭제
  inputGeneralMajorKeyword: (value: string) => void;
  clickClsfChoices: (choice: string) => void;
  checkMajorNameChoices: (choices: string[]) => void;
  clickSearchButton: () => void;  // 검색
}
