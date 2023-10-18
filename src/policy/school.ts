export type StudentCategoryCode = "A" | "B" | "C" | "D" | "E";

export const studentCategoryMap = {
  "A": "인문계",
  "B": "자연계",
  "C": "예체능",
}

export enum OptionalSubjectCategoryEnum {
  Normal = "일반선택",
  Job = "진로선택",
  Convergence = "융합선택",
}
