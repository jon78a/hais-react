import { WEIGHT_REGEX } from "../../../../policy/weight";
import { ScoreWeightForm, SubjectWeightForm } from "../../../../schema/types/AdminMeasurement";

export interface MeasurementUx {
  submitScoreWeightForm: (form: ScoreWeightForm) => void;
  submitSubjectWeightForm: (form: SubjectWeightForm) => void;
}

export function isValidWeight(value: string) {
  return WEIGHT_REGEX.test(value);
}
