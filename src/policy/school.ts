export type StudentCategoryCode = "A" | "B" | "C" | "D" | "E" | "NONE";
export type SchoolOperation = "사립학교" | "공립학교";
export type SchoolSubjectType =
  | SchoolCommonSubjectType
  | SchoolOptionalSubjectType
  | SchoolSpecialSubjectType;
export type SchoolCommonSubjectType = "공통과목";
export type SchoolOptionalSubjectType = "일반선택" | "진로선택" | "융합선택";
export type SchoolSpecialSubjectType = "전공공통" | "전공일반" | "전공실무";

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
