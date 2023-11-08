export interface SearchBarUx {
  selectSearchMode: (mode: "UNIV" | "FULL") => void;
  inputKeyword: (value: string, type: "univ" | "major" | "full") => void;
  clickMajor: (id: number) => void;
}
