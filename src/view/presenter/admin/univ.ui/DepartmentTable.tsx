import { useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import useScreenHeight from "../../../../hooks/useScreenHeight";
import { DepartmentTableContext, ModalState } from "./DepartmentTableContext";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {
  departmentListState,
  departmentPaginationState,
} from "../../../../schema/states/AdminUniv";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import { DepartmentTableUx } from "../univ.ux/DepartmentTableUx";
import { Department } from "../../../../domain/univ/univ.interface";

const DepartmentTable: React.FC<{
  ux: DepartmentTableUx;
  children: React.ReactNode;
}> = ({ ux, children }) => {
  const screenHeight = useScreenHeight();

  const departmentList = useRecoilValue(departmentListState);

  const [rowSelection, setRowSelection] = useState<Department | null>(null);
  const [modalState, setModalState] = useState<ModalState>(null);
  const [keywordValue, setKeywordValue] = useState<string>("");
  const [page, setPage] = useRecoilState(departmentPaginationState);

  const setPaginationModel = (model: GridPaginationModel): void => {
    setPage((prev) => {
      return {
        ...prev,
        cursor: departmentList[model.pageSize - 1],
        page: model.page,
        isPrev: prev.page > model.page,
      };
    });
  };

  const subjectColumns = useMemo<GridColDef[]>(
    () => [
      { field: "id" },
      {
        field: "name",
        headerName: "전공명",
      },
      {
        field: "keyword",
        headerName: "키워드",
      },
      {
        field: "universityName",
        headerName: "대학교",
      },
      {
        field: "precedences",
        headerName: "선호도",
      },
      {
        field: "department",
        headerName: "모집요강",
        renderCell: ({ row }) => {
          return (
            <Button
              onClick={() => {
                setRowSelection(row);
                setModalState("GUIDELINE");
              }}
            >
              모집요강
            </Button>
          );
        },
      },
      {
        field: "actions",
        headerName: "actions",
        width: 300,
        renderCell: ({ row }) => {
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
    []
  );

  return (
    <DepartmentTableContext.Provider
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
              placeholder="전공명을 입력해주세요."
              inputProps={{ "aria-label": "전공 검색" }}
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
            rows={departmentList}
            columns={subjectColumns}
            rowCount={page.totalElements}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
              pagination: {
                paginationModel: { page: 0, pageSize: page.size },
              },
            }}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
          />
        </Box>
      </Stack>
      {children}
    </DepartmentTableContext.Provider>
  );
};

export default DepartmentTable;
