import React,{useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Typography, useMediaQuery } from '@mui/material';
import { theme } from '../theme';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {randomId} from '@mui/x-data-grid-generator'



const MyPage = (): JSX.Element => {
  const matchesDesktopSm = useMediaQuery('(max-width: 899px)');
  return (
  <Box sx={{ px: matchesDesktopSm ? "2%" : "15%" }}>
    <Box sx={{p:"5px"}}>
      <Typography variant="h5" sx={{m:2, fontWeight: 'bold', textAlign: 'left', width:'90%' }} style={{ color: theme.palette.primary.main }}>
        교과 성적 입력
      </Typography>
      <FullFeaturedCrudGrid/>
    </Box>
 </Box>
  );
}

export default MyPage;

interface CourseInfo {
  id: GridRowId;
  category: string;
  courseName: string;
  grade: string;
}

const initialRows: GridRowsProp = [
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, subjectSelect: '', subjectName: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        교과 추가
      </Button>
    </GridToolbarContainer>
  );
}

export function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [gridHeight, setGridHeight] = React.useState<number>(300);
 
  useEffect(() => {
    const numRows = rows.length;
    const minHeight = 150;
    const rowHeight = 50; 
    const newHeight = Math.max(minHeight, minHeight + numRows * rowHeight);
    setGridHeight(newHeight);
  }, [rows]);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'subjectCategory',
      headerName: '선택과목 유형',
      width: 180, 
      type:'singleSelect',
      editable: true,
      valueOptions: ["일반선택", "진로선택", "융합선택"],
     },
     { field: 'subjectArea',
      headerName: '과목영역',
      width: 180, 
      type:'singleSelect',
      editable: true,
      valueOptions: ["국어", "수학", "영어","과학"],
     },    
    {
      field: 'subjectName',
      headerName: '교과명',
      type: 'singleSelect',
      valueOptions: ["화법과작문", "언어와매체", "국어1","국어2"],
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'grade',
      headerName: '성적',
      width: 100,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '편집',
      align:'right',
      headerAlign:'right',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: gridHeight,
        width: '100%',
        '& .actions': {
          color: 'text.primary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        disableVirtualization  // 스크롤 비활성화
      />
    </Box>
  );
}