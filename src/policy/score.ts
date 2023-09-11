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
  "A+" |
  "A0" |
  "B+" |
  "B0" |
  "C+" |
  "C0" |
  "D+" |
  "D0" |
  "F";

export const creditMap = {
  "A+": 4.5,
  "A0": 4.0,
  "B+": 3.5,
  "B0": 3.0,
  "C+": 2.5,
  "C0": 2.0,
  "D+": 1.5,
  "D0": 1.0,
  "F": NaN
}
