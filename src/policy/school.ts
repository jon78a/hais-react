export type StudentCategoryCode = "A" | "B" | "C" | "D" | "E" | "NONE";
export type SchoolOperation = "사립학교" | "공립학교";

export const studentCategoryMap = {
  NONE: "해당없음",
  A: "인문계",
  B: "자연계",
  C: "예체능",
};

export const schoolOperationMap = {
  PRIVATE: "사립학교",
  PUBLIC: "공립학교",
} as const;
