import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { SchoolTableUx } from "../school.ux/SchoolTableUx";
import useScreenHeight from "../../../../hooks/useScreenHeight";
import { TableContext, ModalState } from "./TableContext";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { schoolListState } from "../../../../schema/states/AdminSchool";
import { Autocomplete, TextField } from "@mui/material";
import Add from "@mui/icons-material/Add";

const SchoolSubjectTable: React.FC<{
  ux: SchoolTableUx;
}> = (props) => {
  const { ux } = props;

  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const screenHeight = useScreenHeight();

  const schoolList = useRecoilValue(schoolListState);
  const schoolColumns = useMemo<GridColDef[]>(
    () => [
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
      <Stack spacing={1} sx={{ mt: 2 }}>
        <Box height={screenHeight * 0.65}>
          <Stack direction="row" justifyContent="space-between" paddingY={2}>
            <Stack direction="row">
              <Autocomplete
                disablePortal
                sx={{
                  flex: 1,
                  fontSize: 16,
                  width: 300,
                }}
                getOptionLabel={(option) => option.name}
                options={schoolList}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    value={keywordValue}
                    onChange={(e) => {
                      ux.inputKeyword(e.target.value);
                      setKeywordValue(e.target.value);
                    }}
                    placeholder="교과를 확인할 학교를 선택해주세요"
                  />
                )}
              />
              <IconButton type="button" aria-label="search" size={"small"}>
                <SearchIcon />
              </IconButton>
            </Stack>

            <Button>
              <Add />
            </Button>
          </Stack>
          {/* <DataGrid
            getRowId={(school) => school.name}
            rows={schoolList}
            columns={schoolColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 15 },
              },
            }}
            onRowSelectionModelChange={(rowSelectionModel) => {
              setRowSelections(rowSelectionModel.map((v) => v.toString()));
            }}
            onRowDoubleClick={(params) => {
              ux.clickRow(String(params.id));
              setModalState("UPDATE");
            }}
            rowSelectionModel={rowSelections}
          /> */}
        </Box>
      </Stack>
    </TableContext.Provider>
  );
};

export default SchoolSubjectTable;
