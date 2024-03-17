import { useRecoilState, useRecoilValue } from "recoil";

import { ScoreEditableTableUx } from "../myScore.ux/ScoreEditableTableUx";
import {
  gradeListState,
  subjectListState,
} from "../../../schema/states/MyScore";
import type { GradeType } from "../../../policy/score";
import type { StudentGrade } from "../../../schema/types/MyScore";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { SchoolSubjectDto } from "../../../schema/types/AdminSchool";

const GradeScoreSelect = ({
  row,
  save,
}: {
  row: SchoolSubjectDto;
  save: (form: StudentGrade) => void;
}) => {
  const [gradeList, setGradeList] = useRecoilState(gradeListState);
  const grade = gradeList.find((grade) => grade.subjectId === row?.id)?.grade;

  return (
    <Select
      id="score-select"
      value={grade as GradeType}
      onChange={(event) => {
        const newGrade = {
          grade: event.target.value as GradeType,
          subjectId: row.id,
        };
        save(newGrade);
        setGradeList((prev) => [newGrade, ...prev]);
      }}
      input={
        <InputBase
          sx={{
            borderRadius: 1,
            border: "1px solid",
            width: "100%",
            px: 1,
          }}
        />
      }
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
};

const ScoreEditableTable: React.FC<ScoreEditableTableUx> = (ux) => {
  const subjectList = useRecoilValue(subjectListState);

  if (ux.loading) return null;

  return <SubjectTable rows={subjectList} onSaveScore={ux.saveGradeScore} />;
};

type TableProps<StudentGrade> = {
  rows: SchoolSubjectDto[];
  onSaveScore: (form: StudentGrade) => void;
};

const SubjectTable: React.FC<TableProps<StudentGrade>> = ({
  rows,
  onSaveScore,
}) => {
  return (
    <Stack spacing={2} sx={{ paddingRight: 8 }}>
      <Grid
        container
        alignItems="center"
        component={Paper}
        sx={{
          height: 48,
        }}
      >
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
      {rows.map((row, index) => (
        <div key={index}>
          <Grid container alignItems="center">
            <Grid item xs={2} textAlign="center">
              <Typography>{row.type}</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography>{row.name}</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography>{row.groups.join(",")}</Typography>
            </Grid>
            <Grid item xs={2}>
              <GradeScoreSelect row={row} save={onSaveScore} />
            </Grid>
          </Grid>
        </div>
      ))}
    </Stack>
  );
};

export default ScoreEditableTable;
