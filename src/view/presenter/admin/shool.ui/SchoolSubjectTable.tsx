import { useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import useScreenHeight from "../../../../hooks/useScreenHeight";
import {
  SchoolSubjectTableContext,
  ModalState,
} from "./SchoolSubjectTableContext";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {
  schoolListState,
  schoolState,
  schoolSubjectListState,
} from "../../../../schema/states/AdminSchool";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import { SchoolSubjectTableUx } from "../school.ux/SchoolSubjectTableUx";
import { SchoolSubject } from "../../../../domain/school/school.interface";
import { userState } from "../../../../schema/states/User";

const SchoolSubjectTable: React.FC<{
  ux: SchoolSubjectTableUx;
  children: React.ReactNode;
}> = ({ ux, children }) => {
  const screenHeight = useScreenHeight();

  const schoolList = useRecoilValue(schoolListState);
  const schoolSubjectList = useRecoilValue(schoolSubjectListState);
  const [school, setSchool] = useRecoilState(schoolState);
  const user = useRecoilValue(userState);

  const [rowSelection, setRowSelection] = useState<SchoolSubject | null>(null);
  const [modalState, setModalState] = useState<ModalState>(null);
  const [keywordValue, setKeywordValue] = useState<string>("");
  const subjectColumns = useMemo<GridColDef[]>(
    () => [
      { field: "id" },
      {
        field: "name",
        headerName: "과목명",
      },
      {
        field: "type",
        headerName: "과목 분류",
      },
      {
        field: "groups",
        headerName: "그룹",
      },
      {
        field: "level",
        headerName: "난이도",
      },
      {
        field: "credit",
        headerName: "학점",
      },
      {
        field: "actions",
        headerName: "actions",
        width: 150,
        renderCell: ({ row }) => {
          if (!row.admin.includes(user?.email)) return null;
          return (
            <>
              <Button
                onClick={() => {
                  setRowSelection(row);
                  setModalState("UPDATE");
                }}
              >
                수정
              </Button>
              <Button
                onClick={() => {
                  setRowSelection(row);
                  setModalState("DELETE");
                }}
              >
                삭제
              </Button>
            </>
          );
        },
      },
    ],
    [user?.email]
  );

  return (
    <SchoolSubjectTableContext.Provider
      value={{
        modal: {
          state: modalState,
          set: setModalState,
        },
        selection: {
          state: rowSelection,
          set: setRowSelection,
        },
      }}
    >
      <Stack spacing={1} sx={{ mt: 2 }}>
        <Stack direction="row" justifyContent="space-between" paddingY={2}>
          <Stack direction="row" columnGap={1} justifyContent="space-between">
            <Autocomplete
              disablePortal
              sx={{
                flex: 1,
                fontSize: 14,
                width: 300,
              }}
              defaultValue={school}
              getOptionLabel={(option) => option.name}
              options={schoolList}
              disableClearable
              onChange={(_, newValue) => newValue && setSchool(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    "& .MuiInputBase-root": {
                      p: 0,
                      height: 36,
                    },
                  }}
                  placeholder="교과를 확인할 학교를 선택해주세요"
                />
              )}
            />
            <Button
              sx={{ p: 0, height: 36 }}
              variant="contained"
              disabled={!school?.id}
              onClick={() => setModalState("CREATE")}
            >
              교과 등록
            </Button>
          </Stack>
        </Stack>
        {school?.id ? (
          <>
            <Stack>
              <Paper
                component={"form"}
                sx={{
                  p: "2px 2px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <InputBase
                  sx={{
                    ml: 1,
                    flex: 1,
                    fontSize: 14,
                  }}
                  placeholder="교과명을 입력해주세요."
                  inputProps={{ "aria-label": "교과명 검색" }}
                  value={keywordValue}
                  onChange={(e) => {
                    ux.inputKeyword(e.target.value);
                    setKeywordValue(e.target.value);
                  }}
                />
                <IconButton type="button" aria-label="search" size={"small"}>
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Stack>
            <Box height={screenHeight * 0.65}>
              <DataGrid
                disableRowSelectionOnClick
                rows={schoolSubjectList}
                columns={subjectColumns}
                initialState={{
                  columns: {
                    columnVisibilityModel: {
                      id: false,
                    },
                  },
                  pagination: {
                    paginationModel: { page: 0, pageSize: 15 },
                  },
                }}
              />
            </Box>
          </>
        ) : null}
      </Stack>
      {school?.id ? children : null}
    </SchoolSubjectTableContext.Provider>
  );
};

export default SchoolSubjectTable;
