import { useRecoilValue } from "recoil";

import { ScoreEditableTableUx } from "../myScore.ux/ScoreEditableTableUx";
import { scoreRowsState, subjectLabelState } from "../../../schema/states/MyScore";
import type {
  CreditType,
  GradeType
} from "../../../policy/score";
import type {
  CreditScoreForm,
  GradeScoreForm,
  ScoreRow
} from "../../../schema/types/MyScore";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import Paper from "@mui/material/Paper";
import { useEffect, useRef, useState } from "react";

const GradeScoreSelect = ({save, row}: {
  save: (form: GradeScoreForm) => void;
  row: ScoreRow;
}) => {
  return (
    <Select
      id="score-select"
      value={row.score}
      onChange={(event) => {
        save({
          subjectCode: row.code,
          grade: Number(event.target.value) as GradeType,
          category: row.subjectCategory
        });
      }}
      input={<InputBase sx={{
        borderRadius: 1,
        border: '1px solid',
        width: '100%',
        px: 1
      }} />}
    >
      <MenuItem value="1">1등급</MenuItem>
      <MenuItem value="2">2등급</MenuItem>
      <MenuItem value="3">3등급</MenuItem>
      <MenuItem value="4">4등급</MenuItem>
      <MenuItem value="5">5등급</MenuItem>
      <MenuItem value="6">6등급</MenuItem>
      <MenuItem value="7">7등급</MenuItem>
      <MenuItem value="8">8등급</MenuItem>
      <MenuItem value="9">9등급</MenuItem>
    </Select>
  );
}

const CreditScoreSelect = ({save, row}: {
  save: (form: CreditScoreForm) => void;
  row: ScoreRow;
}) => {
  return (
    <Select
      id="score-select"
      value={row.score}
      onChange={(event) => {
        save({
          subjectCode: row.code,
          credit: event.target.value as CreditType,
          category: row.subjectCategory,
          creditAmount: row.creditAmount as string || '0'
        });
      }}
      input={<InputBase sx={{
        borderColor: 'grey.700',
        borderRadius: 1,
        border: '1px solid',
        width: '100%',
        px: 1
      }} />}
    >
      <MenuItem value="A">A</MenuItem>
      <MenuItem value="B">B</MenuItem>
      <MenuItem value="C">C</MenuItem>
      <MenuItem value="D">D</MenuItem>
      <MenuItem value="F">F</MenuItem>
    </Select>
  );
}

const CreditAmountInput = ({save, row}: {
  save: (form: CreditScoreForm) => void;
  row: ScoreRow;
}) => {
  const [value, setValue] = useState<string>('0');

  useEffect(() => {
    setValue(row.creditAmount ?? '0');
  }, [row]);

  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    save({
      subjectCode: row.code,
      credit: row.score as CreditType,
      category: row.subjectCategory,
      creditAmount: value
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      ref.current?.blur();
    }
  }

  return (
    <InputBase
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      inputProps={{
        className: 'text-center',
      }}
      inputRef={ref}
      onKeyDown={handleKeyDown}
      sx={{
        borderBottom: '1px solid'
      }}
    />
  )
}

const ScoreEditableTable: React.FC<ScoreEditableTableUx> = (ux) => {
  const subjectLabel = useRecoilValue(subjectLabelState);
  const rows = useRecoilValue(scoreRowsState);

  if (subjectLabel === "공통과목") {
    return <CommonSubjectTable rows={rows} onSaveScore={ux.saveGradeScore} />
  }
  if (subjectLabel === "선택과목") {
    return <OptionalSubjectTable rows={rows} onSaveScore={ux.saveCreditScore} />
  }
  return null;
};

type TableProps<ScoreForm> = {
  rows: ScoreRow[];
  onSaveScore: (form: ScoreForm) => void;
}

const CommonSubjectTable: React.FC<TableProps<GradeScoreForm>> = ({rows, onSaveScore}) => {
  return (
    <Stack spacing={2} sx={{paddingRight: 8}}>
      <Grid container alignItems="center" component={Paper} sx={{
        height: 48
      }}>
        <Grid item xs={2} textAlign="center">
          <Typography>분류</Typography>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <Typography>교과명</Typography>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <Typography>교과군</Typography>
        </Grid>
        <Grid item xs={2} textAlign="center">
          <Typography>성적</Typography>
        </Grid>
      </Grid>
      {
        rows.map((row, index) => (
          <div key={index}>
            <Grid container alignItems="center">
              <Grid item xs={2} textAlign="center">
                <Typography>{row.subjectCategory}</Typography>
              </Grid>
              <Grid item xs={4} textAlign="center">
                <Typography>{row.name}</Typography>
              </Grid>
              <Grid item xs={4} textAlign="center">
                <Typography>{row.group}</Typography>
              </Grid>
              <Grid item xs={2}>
                <GradeScoreSelect save={onSaveScore} row={row} />    
              </Grid>
            </Grid>
          </div>
        ))
      }
    </Stack>
  );
}

const OptionalSubjectTable: React.FC<TableProps<CreditScoreForm>> = ({rows, onSaveScore}) => {
  return (
    <Stack spacing={2}>
      <Grid container alignItems="center" component={Paper} sx={{
        height: 48
      }}>
        <Grid item xs={2} textAlign="center">
          <Typography>분류</Typography>
        </Grid>
        <Grid item xs={3} textAlign="center">
          <Typography>교과명</Typography>
        </Grid>
        <Grid item xs={3} textAlign="center">
          <Typography>교과군</Typography>
        </Grid>
        <Grid item xs={1} textAlign="center">
          <Typography>성적</Typography>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={1} textAlign="center">
          <Typography>이수학점</Typography>
        </Grid>
      </Grid>
      {
        rows.map((row, index) => (
          <div key={index}>
            <Grid container alignItems="center">
              <Grid item xs={2} textAlign="center">
                <Typography>{row.subjectCategory}</Typography>
              </Grid>
              <Grid item xs={3} textAlign="center">
                <Typography>{row.name}</Typography>
              </Grid>
              <Grid item xs={3} textAlign="center">
                <Typography>{row.group}</Typography>
              </Grid>
              <Grid item xs={1}>
                <CreditScoreSelect save={onSaveScore} row={row} />    
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={1} textAlign="center">
                <CreditAmountInput save={onSaveScore} row={row} />
              </Grid>
            </Grid>
          </div>
        ))
      }
    </Stack>
  )
}

export default ScoreEditableTable;
