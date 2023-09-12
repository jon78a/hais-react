export enum GradeEnum {
  FIRST = 1,
  SECOND,
  THIRD,
  FOURTH,
  FIFTH,
  SIXTH,
  SEVENTH,
  EIGHTH,
  NINETH
}

export type CreditType = |
  "A" |
  "B" |
  "C" |
  "D" |
  "E" |
  "I";

export const creditMap = {
  "A": 90,
  "B": 80,
  "C": 70,
  "D": 60,
  "E": 40,
  "I": 0,
}
