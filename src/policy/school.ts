export type StudentCategoryCode = "A" | "B" | "C" | "D" | "E" | "NONE";

export const studentCategoryMap = {
  "NONE": "해당없음",
  "A": "인문계",
  "B": "자연계",
  "C": "예체능",
}

export type OptionalSubjectCategory = |
"일반선택" |
"진로선택" |
"융합선택";
