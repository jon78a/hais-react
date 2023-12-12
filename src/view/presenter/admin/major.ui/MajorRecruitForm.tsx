import { useRecoilValue } from "recoil";
import React, { useEffect, useMemo, useState } from "react";

import type { MajorRecruitFormUx } from "../major.ux/MajorRecruitFormUx";
import {
  majorResultListState,
  selectedMajorIdState,
} from "../../../../schema/states/AdminMajor";
import { formatNumber } from "../../../../policy/utils";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

const MAX_WIDTH_LIMIT = 486;

type AddFieldProps = {
  title: string;
  children?: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddField: React.FC<AddFieldProps> = ({
  title,
  children,
  onSubmit
}) => {
  return (
    <Stack spacing={2}>
      <Typography variant="body1" component="p" color="primary.main">
        {title}
      </Typography>
      <Stack
        direction="row"
        component="form"
        spacing={2}
        onSubmit={onSubmit}
      >
        {children}
        <Button type="submit" variant="contained">추가</Button>
      </Stack>
    </Stack>
  )
}

const MajorRecruitForm = (ux: MajorRecruitFormUx) => {
  const majorResultList = useRecoilValue(majorResultListState);
  const selectedMajorId = useRecoilValue(selectedMajorIdState);
  const major = useMemo(
    () => majorResultList.find((result) => result.id === selectedMajorId),
    [selectedMajorId, majorResultList]
  );

  const [subjectCategoryValue, setSubjectCategoryValue] = useState<string>("");
  const [creditAmountValue, setCreditAmountValue] = useState<string>("");
  const [subjectGroupValue, setSubjectGroupValue] = useState<string>("");
  const [difficultyValue, setDifficultyValue] = useState<string>("");

  useEffect(() => {
    if (major) {
      setDifficultyValue(major.difficulty);
    }
  }, [major]);

  return major ? (
    <Stack spacing={4}>
      <Typography variant="h6" color="primary.main">{major.univ + ' ' + major.name}</Typography>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <AddField title="요구학점"
            onSubmit={(e) => {
              e.preventDefault();
              if (!subjectCategoryValue || !creditAmountValue) {
                return;
              }
              ux.addRequiredCredit({
                subjectCategory: subjectCategoryValue,
                amount: creditAmountValue,
              });
              setSubjectCategoryValue("");
              setCreditAmountValue("");
            }}
          >
            <TextField
              size="small"
              label="과목구분"
              variant="outlined"
              value={subjectCategoryValue}
              onChange={(e) => {
                setSubjectCategoryValue(e.target.value);
              }}
            />
            <TextField
              size="small"
              label="필요학점"
              variant="outlined"
              value={creditAmountValue}
              onChange={(e) => {
                setCreditAmountValue(
                  formatNumber(e.target.value, creditAmountValue)
                );
              }}
            />
          </AddField>
          <List sx={{
            maxWidth: MAX_WIDTH_LIMIT,
          }}>
            {
              major.requiredCredits.map((dto, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton onClick={() => ux.removeRequiredCredit(index)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                  sx={{
                    boxShadow: 1
                  }}
                >
                  <ListItemText>
                    과목구분: { dto.subjectCategory }
                  </ListItemText>
                  <ListItemText>
                    필요학점: { dto.amount }학점
                  </ListItemText>
                </ListItem>
              ))
            }
          </List>
        </Stack>
        <Stack spacing={2}>
          <AddField title="필수 과목군"
            onSubmit={(e) => {
              e.preventDefault();
              if (!subjectGroupValue) { return }
              ux.addGroup(subjectGroupValue);
              setSubjectGroupValue("");
            }}
          >
            <TextField
              size="small"
              label="과목군"
              variant="outlined"
              value={subjectGroupValue}
              onChange={(e) => setSubjectGroupValue(e.target.value)}
            />
          </AddField>
          <Grid container gap={1}>
            {
              major.requiredGroups.map((value, index) => (
                <Grid item>
                  <Chip label={value} onDelete={() => ux.removeGroup(index)} />
                </Grid>
              ))
            }
          </Grid>
        </Stack>
        <Stack spacing={2}>
          <Typography variant="body1" component="p" color="primary.main">
            난이도
          </Typography>
          <Stack
            direction="row"
            component="form"
            spacing={2}
          >
            <TextField variant="standard" sx={{maxWidth: 60}} onChange={(e) => {
              const formatted = formatNumber(e.target.value, difficultyValue);
              setDifficultyValue(formatted);
              ux.editDifficulty(formatted);
            }} value={difficultyValue} />
          </Stack>
        </Stack>
      </Stack>
      <Button
        variant="outlined"
        onClick={ux.save}
        sx={{
          maxWidth: MAX_WIDTH_LIMIT
        }}
      >저장하기</Button>
    </Stack>
  ) : null;
};

export default MajorRecruitForm;
