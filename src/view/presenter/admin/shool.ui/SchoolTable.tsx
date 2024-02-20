import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { schoolListState } from "../../../../schema/states/AdminSchool";
import { SchoolTableUx } from "../school.ux/SchoolTableUx";
import useScreenHeight from "../../../../hooks/useScreenHeight";
import { TableContext, ModalState } from "./TableContext";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SchoolTable: React.FC<{
  ux: SchoolTableUx;
  children: React.ReactNode;
}> = (props) => {
  const { ux, children } = props;

  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const screenHeight = useScreenHeight();

  const schoolList = useRecoilValue(schoolListState);
  const schoolColumns = useMemo<GridColDef[]>(
    () => [
      { field: "id" },
      {
        field: "name",
        headerName: "학교",
      },
      {
        field: "description",
        headerName: "설명",
        width: mobile ? 100 : 300,
      },
      {
        field: "type",
        headerName: "구분",
        width: mobile ? 100 : 200,
      },
      {
        field: "operation",
        headerName: "운영 주체",
      },
      {
        field: "jurisdiction",
        headerName: "관할",
        width: mobile ? 100 : 200,
      },
    ],
    [mobile]
  );

  const [rowSelections, setRowSelections] = useState<string[]>([]);
  const [modalState, setModalState] = useState<ModalState>(null);
  const [keywordValue, setKeywordValue] = useState<string>("");

  return (
    <TableContext.Provider
      value={{
        modal: {
          state: modalState,
          set: setModalState,
        },
        selections: {
          state: rowSelections,
          set: setRowSelections,
        },
      }}
    >
      <Stack spacing={1} sx={{ mt: 1 }}>
        <Stack
          direction={"row"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <Paper
            component={"form"}
            sx={{
              p: "2px 2px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                fontSize: 14,
              }}
              placeholder="학교명을 입력해주세요."
              inputProps={{ "aria-label": "학교명 검색" }}
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
          <Stack direction={"row"}>
            <Button
              disabled={rowSelections.length !== 1}
              onClick={() => {
                ux.clickRow(String(rowSelections[0]));
                setModalState("UPDATE");
              }}
            >
              수정
            </Button>
            <Button
              disabled={rowSelections.length < 1}
              onClick={() => {
                setModalState("DELETE");
              }}
            >
              삭제
            </Button>
          </Stack>
        </Stack>
        <Box height={screenHeight * 0.65}>
          <DataGrid
            rows={schoolList}
            columns={schoolColumns}
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
            checkboxSelection
            onRowSelectionModelChange={(rowSelectionModel) => {
              setRowSelections(rowSelectionModel.map((v) => v.toString()));
            }}
            rowSelectionModel={rowSelections}
          />
        </Box>
      </Stack>
      {children}
    </TableContext.Provider>
  );
};

export default SchoolTable;
