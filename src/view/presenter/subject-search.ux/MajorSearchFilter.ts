export interface MajorSearchFilterUx {
  inputUnivKeyword: (value: string) => void;
  inputMajorKeyword: (value: string) => void;
  inputGeneralMajorKeyword: (value: string) => void;
  clickClsfChoices: (choice: string) => void;
  checkMajorNameChoices: (choices: string[]) => void;
  clickSearchButton: () => void;
}
