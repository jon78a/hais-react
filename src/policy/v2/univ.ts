export type UnivOperation = "사립대학" | "국립대학" | "공립대학";

export const univOperationMap: Record<string, UnivOperation> = {
  PRIVATE: "사립대학",
  PUBLIC: "공립대학",
  NATIONAL: "국립대학",
} as const;
