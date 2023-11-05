import { atom } from "recoil";
import {
  ScoreWeight,
  SubjectWeight,
} from "../types/AdminMeasurement";

export const scoreWeightListState = atom<ScoreWeight[]>({
  key: "schema/state/AdminMeasurement/ScoreWeightList",
  default: [],
});

export const subjectWeightListState = atom<SubjectWeight[]>({
  key: "schema/state/AdminMeasurement/SubjectWeightList",
  default: [],
});
