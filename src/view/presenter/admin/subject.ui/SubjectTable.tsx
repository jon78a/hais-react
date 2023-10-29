import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { SubjectTableUx } from "../subject.ux/SubjectTableUx";
import { subjectSummaryListState } from "../../../../schema/states/AdminSubject";
import useScreenHeight from "../../../../hooks/useScreenHeight";
import { TableContext, ModalState } from "./TableContext";

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SubjectTable: React.FC<{
  ux: SubjectTableUx,
  children: React.ReactNode;
}> = (props) => {
  const {ux, children} = props;

  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const screenHeight = useScreenHeight();

  const subjectSummaryList = useRecoilValue(subjectSummaryListState);
  const subjectColumns = useMemo<GridColDef[]>(() => [
    {
      field: "id", headerName: "과목코드", width: 80
    },
    {
      field: "distinctDetail", headerName: "구분"
    },
    {
      field: "group", headerName: "그룹명"
    },
    {
      field: "name", headerName: "과목명"
    },
    {
      field: "description", headerName: "설명", width: mobile ? 100 : 600
    }
  ], [mobile]);

  const [rowSelections, setRowSelections] = useState<number[]>([]);
  const [modalState, setModalState] = useState<ModalState>(null);
  const [keywordValue, setKeywordValue] = useState<string>("");

  return (
    <TableContext.Provider value={{
      modal: {
        state: modalState,
        set: setModalState
      },
      selections: {
        state: rowSelections,
        set: setRowSelections
      }
    }}>
      <Stack spacing={1} sx={{mt: 1}}>
        <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
          <Paper
            component={"form"}
            sx={{
              p: '2px 2px',
              display: 'flex',
              alignItems: 'center',
              width: 400
            }}
          >
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                fontSize: 14
              }}
              placeholder="과목명을 입력해주세요."
              inputProps={{ 'aria-label': '과목명 검색' }}
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
            <Button disabled={rowSelections.length !== 1} onClick={() => {
              ux.clickRow(String(rowSelections[0]));
              setModalState("UPDATE");
            }}>수정</Button>
            <Button disabled={rowSelections.length < 1} onClick={() => {
              setModalState("DELETE")
            }}>삭제</Button>
          </Stack>
        </Stack>
        <Box height={screenHeight * 0.65}>
          <DataGrid
            rows={subjectSummaryList}
            columns={subjectColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 15 },
              },
            }}
            checkboxSelection
            onRowSelectionModelChange={(rowSelectionModel) => {
              setRowSelections(rowSelectionModel.map(v => Number(v)));
            }}
            onRowDoubleClick={(params) => {
              ux.clickRow(String(params.id));
              setModalState("UPDATE");
            }}
            rowSelectionModel={rowSelections}
          />
        </Box>
      </Stack>
      {children}
    </TableContext.Provider>
  );
}

export default SubjectTable;
