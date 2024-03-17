import { useRecoilValue } from "recoil";
import { useState, useMemo } from "react";

import {
  schoolListState,
  studentProfileState,
} from "../../../schema/states/Signup";
import { StudentProfileStepUx } from "../signup.ux/StudentProfileStep";
import type { ExceptionDetail } from "../../../types";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";

export const StudentProfileStep: React.FC<StudentProfileStepUx> = (ux) => {
  const studentProfile = useRecoilValue(studentProfileState);
  const schoolList = useRecoilValue(schoolListState);

  const [nameException, setNameException] = useState<ExceptionDetail | null>(
    null
  );

  const [clicked, setClicked] = useState<boolean>(false);

  const isDisabled = useMemo(() => {
    const hasException = !!nameException;
    const hasBlank = !studentProfile.name;
    return hasException || (!hasException && hasBlank);
  }, [nameException, studentProfile]);

  return (
    <Paper
      sx={{
        width: 350,
        py: 3,
        px: 2,
      }}
    >
      <div className="flex flex-row w-full justify-between">
        <Button
          variant="text"
          sx={{ textDecoration: "underline" }}
          onClick={() => {
            ux.back();
          }}
        >
          돌아가기
        </Button>
        <Typography variant={"h5"} component={"h1"}>
          학생정보입력
        </Typography>
        <em></em>
      </div>
      <Box component={"form"} autoComplete="off" className="flex flex-col">
        <Stack spacing={1}>
          <div className="flex flex-col">
            <InputLabel>
              <Typography variant={"overline"} component={"h2"}>
                학생이름
              </Typography>
            </InputLabel>
            <TextField
              value={studentProfile.name}
              error={!!nameException}
              helperText={nameException?.message}
              onChange={(e) => {
                const exception = ux.inputName(e.target.value);
                setNameException(exception);
              }}
              size={"small"}
              fullWidth
              placeholder="홍길동"
            />
          </div>
          <div className="flex flex-col">
            <InputLabel>
              <Typography variant="overline" component={"h2"}>
                학년구분
              </Typography>
            </InputLabel>
            <Select
              value={studentProfile.schoolYear}
              onChange={(e) => {
                ux.selectSchoolYear(Number(e.target.value));
              }}
              size={"small"}
            >
              <MenuItem value={1}>1학년</MenuItem>
              <MenuItem value={2}>2학년</MenuItem>
              <MenuItem value={3}>3학년</MenuItem>
            </Select>
          </div>
          <div className="flex flex-col">
            <InputLabel>
              <Typography variant="overline" component={"h2"}>
                계열선택
              </Typography>
            </InputLabel>
            <Select
              value={studentProfile.subjectCategory}
              onChange={(e) => {
                ux.selectSubjectCategory(e.target.value);
              }}
              size={"small"}
            >
              <MenuItem value={"A"}>인문계</MenuItem>
              <MenuItem value={"B"}>자연계</MenuItem>
              <MenuItem value={"C"}>예체능</MenuItem>
            </Select>
          </div>
          <div className="flex flex-col">
            <InputLabel>
              <Typography variant="overline" component={"h2"}>
                내 학교
              </Typography>
            </InputLabel>
            <Autocomplete
              disablePortal
              onChange={(_, value) => {
                if (value?.id) ux.selectSchool(value.id);
              }}
              options={schoolList}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="대학명 입력" size={"small"} />
              )}
            ></Autocomplete>
          </div>
        </Stack>
        <Button
          variant="contained"
          sx={{ mt: 4 }}
          onClick={() => {
            setClicked(true);
            ux.clickSignupDone();
          }}
          disabled={isDisabled || clicked}
        >
          회원가입 완료
        </Button>
      </Box>
    </Paper>
  );
};
