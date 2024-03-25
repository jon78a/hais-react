import {
  GridCallbackDetails,
  GridRowId,
  GridRowSelectionModel,
} from "@mui/x-data-grid";

export interface AuthorizedUserSubjectListUx {
  totalCredit: number;
  rows: GridColOption[];
  selectionModel: GridRowId[][];
  guidelineLength: number;
  handleSelectionModelChange: (
    rowSelectionModel: GridRowSelectionModel,
    details: GridCallbackDetails,
    guidelineLength: number
  ) => void;
  loading?: boolean;
  avgScore: number;
}

export type GridColOption = {
  id?: string;
  guideline: { type?: string };
  name?: string;
  groups?: string[];
  credit: number;
  level?: number;
  description?: string;
};
