import {
  GridCallbackDetails,
  GridRowId,
  GridRowSelectionModel,
} from "@mui/x-data-grid";

export interface SubjectListUx {
  selectionModel: GridRowId[][];
  handleSelectionModelChange: (
    rowSelectionModel: GridRowSelectionModel,
    details: GridCallbackDetails,
    guidelineLength: number
  ) => void;
}
