import { createContext, useContext } from "react";

import type {
  ScoreWeight,
  ScoreWeightForm,
  SubjectWeight,
  SubjectWeightForm
} from "../../schema/types/AdminMeasurement";

interface MeasurementService {
  readScoreWeightList: () => Promise<ScoreWeight[]>;
  readSubjectWeightList: () => Promise<SubjectWeight[]>;
  editScoreWeight: (form: ScoreWeightForm) => Promise<void>;
  editSubjectWeight: (form: SubjectWeightForm) => Promise<void>;
}

export const MeasurementContext = createContext<MeasurementService | undefined>(undefined);

export const useMeasurementService = () => useContext(MeasurementContext)!;
