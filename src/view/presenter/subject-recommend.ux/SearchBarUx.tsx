export interface SearchBarUx {
  inputKeyword: (value: string, type: "univ" | "major" | "full") => void;
  clickMajor: (id?: string) => void;
}
