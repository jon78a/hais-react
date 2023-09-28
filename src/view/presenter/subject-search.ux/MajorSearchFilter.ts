export interface MajorSearchFilterUx {
  inputUnivKeyword: (value: string) => void;  // 학교 키워드 입력
  inputMajorKeyword: (value: string) => void;  // 학과 키워드 입력
  selectUnivChoice: (value: string) => void;  // 학교 목록 중 선택
  selectMajorChoice: (value: string) => void;  // 학과 목록 중 선택
  inputGeneralMajorKeyword: (value: string) => void;
  clickClsfChoices: (choice: string) => void;
  checkMajorNameChoices: (choices: string[]) => void;
  clickSearchButton: () => void;  // 검색
}
