import { Fragment, useCallback, useState } from "react";
import { useRecoilValue } from "recoil";

import {
  selectedMajorIdState,
  majorWithSubjectState,
} from "../../../schema/states/SubjectRecommend";

import Typography from "@mui/material/Typography";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import { Stack } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: "type",
    headerName: "구분",
    valueGetter: (params) => params.row.guideline.type,
  },
  {
    field: "name",
    headerName: "교과명",
    valueGetter: (params) => params.row.name,
  },
  {
    field: "groups",
    headerName: "그룹명",
    valueGetter: (params) =>
      params.row.groups ? params.row.groups.join(", ") : "",
  },
];

const SubjectList: React.FC = () => {
  const selectedMajorId = useRecoilValue(selectedMajorIdState);
  const majorResult = useRecoilValue(majorWithSubjectState);
  const [selectionModel, setSelectionModel] = useState<GridRowId[][]>([]);

  const handleSelectionModelChange = useCallback(
    (
      newSelection: GridRowId[],
      detail: GridCallbackDetails<any>,
      guidelineIndex: number
    ) => {
      setSelectionModel((prevSelectionModel) => {
        const updatedModel = [...prevSelectionModel]; // Create a copy of the previous selection model
        updatedModel[guidelineIndex] = newSelection; // Update the selection model for the specific guideline
        return updatedModel; // Return the updated selection model
      });
    },
    []
  );

  return !!selectedMajorId ? (
    <div>
      <Typography variant="body1" sx={{ mb: 1 }} fontWeight="bold">
        우선순위: {majorResult?.precedences?.join(" > ")}
      </Typography>
      {majorResult?.guidelines?.map((guideline, i) => (
        <Stack key={guideline.id} marginY={i === 0 ? 2 : 4}>
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            {`${guideline.type}에서 ${
              guideline.required ? "필수" : "선택사항으"
            }로 ${guideline.condition}개 이상 과목이 선택되어야 합니다.`}{" "}
            {(selectionModel[i]?.length ?? 0) >= guideline.condition ||
            !guideline.required ? (
              <CheckCircleOutlineIcon color="success" />
            ) : (
              <ErrorOutlineIcon color="error" />
            )}
          </Typography>
          <DataGrid
            columns={columns}
            rows={guideline.options.map((option) => ({
              ...option,
              guideline,
            }))}
            checkboxSelection
            disableRowSelectionOnClick
            rowSelectionModel={selectionModel[i]}
            onRowSelectionModelChange={(newSelection, detail) =>
              handleSelectionModelChange(newSelection, detail, i)
            }
            sortModel={[
              {
                field: "groups",
                sort: "desc",
              },
            ]}
          />
        </Stack>
      ))}
    </div>
  ) : (
    <></>
  );
};

export default SubjectList;
