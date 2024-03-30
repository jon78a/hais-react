import { useRecoilValue } from "recoil";

import {
  selectedMajorIdState,
  majorWithSubjectState,
} from "../../../schema/states/SubjectRecommend";

import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import { creditState } from "../../../schema/states/Year";
import { AuthorizedUserSubjectListUx } from "../subject-recommend.ux/AuthorizedUserSubjectListUx";

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
  {
    field: "credit",
    headerName: "학점",
    valueGetter: (params) => params.row.credit,
  },
  {
    field: "level",
    headerName: "난이도",
    valueGetter: (params) => params.row.level,
  },
  {
    field: "description",
    headerName: "참고사항",
    valueGetter: (params) => params.row.description,
  },
];

const AuthorizedUserSubjectList: React.FC<AuthorizedUserSubjectListUx> = (
  ux
) => {
  // Recoil States
  const selectedMajorId = useRecoilValue(selectedMajorIdState);
  const majorResult = useRecoilValue(majorWithSubjectState);
  const reqCredit = useRecoilValue(creditState);

  if (!selectedMajorId) return null;

  return (
    <>
      <Typography variant="body1" sx={{ mb: 1 }} fontWeight="bold">
        요구학점: {ux.totalCredit}/{reqCredit}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }} fontWeight="bold">
        우선순위: {majorResult?.precedences?.join(" > ")}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }} fontWeight="bold">
        내 등급(평균): {ux.avgScore}
      </Typography>

      <Stack>
        <Typography variant="body1" sx={{ mb: 1 }} fontWeight="bold">
          추천 과목
        </Typography>

        <DataGrid
          loading={ux.loading}
          rows={ux.rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          rowSelectionModel={ux.selectionModel[ux.guidelineLength]}
          onRowSelectionModelChange={(newSelection, detail) =>
            ux.handleSelectionModelChange(
              newSelection,
              detail,
              ux.guidelineLength
            )
          }
        />
      </Stack>
    </>
  );
};

export default AuthorizedUserSubjectList;
