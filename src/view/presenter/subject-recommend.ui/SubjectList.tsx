import { useRecoilValue } from "recoil";

import {
  selectedMajorIdState,
  majorWithSubjectState,
} from "../../../schema/states/SubjectRecommend";

import Typography from "@mui/material/Typography";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { SubjectListUx } from "../subject-recommend.ux/SubjectListUx";
import { orderBy } from "lodash";

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
];

const SubjectList: React.FC<SubjectListUx> = (ux) => {
  const selectedMajorId = useRecoilValue(selectedMajorIdState);
  const majorResult = useRecoilValue(majorWithSubjectState);

  if (!selectedMajorId) return null;

  return (
    <>
      <Typography variant="body2" sx={{ mb: 1 }} fontWeight="bold">
        *
        <Link to="/login" className="text-indigo-600 font-normal">
          로그인
        </Link>
        하면 성적을 입력하면 추천 과목을 확인할 수 있어요.
      </Typography>

      <Typography variant="body1" sx={{ mb: 1 }} fontWeight="bold">
        해당 학과의 모집요강은 다음과 같습니다.
        <br /> 우선순위: {majorResult?.precedences?.join(" > ")}
      </Typography>
      {majorResult?.guidelines?.map((guideline, i) => (
        <Stack key={guideline.id} marginY={i === 0 ? 2 : 4}>
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <strong>{`${guideline.type}`}</strong>
            {`에서 ${guideline.required ? "필수" : "선택사항으"}로 ${
              guideline.condition
            }개 이상 과목이 선택되어야 합니다.`}{" "}
            {(ux.selectionModel[i]?.length ?? 0) >= guideline.condition ||
            !guideline.required ? (
              <CheckCircleOutlineIcon color="success" />
            ) : (
              <ErrorOutlineIcon color="error" />
            )}
          </Typography>
          <DataGrid
            columns={columns}
            rows={orderBy(
              guideline.options.map((option) => ({
                ...option,
                guideline,
              })),
              [
                (row) =>
                  majorResult?.precedences?.map((precedence) =>
                    row.groups?.indexOf(precedence)
                  ),
              ],
              ["desc"]
            )}
            checkboxSelection
            disableRowSelectionOnClick
            rowSelectionModel={ux.selectionModel[i]}
            onRowSelectionModelChange={(newSelection, detail) =>
              ux.handleSelectionModelChange(newSelection, detail, i)
            }
          />
        </Stack>
      ))}
    </>
  );
};

export default SubjectList;
