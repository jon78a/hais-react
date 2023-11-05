import { useRecoilValue } from "recoil";
import { useCallback, useEffect, useMemo, useState } from "react";

import { MeasurementUx, isValidWeight } from "../measurement.ux/MeasurementUx";
import {
  scoreWeightListState,
  subjectWeightListState,
} from "../../../../schema/states/AdminMeasurement";
import {
  ScoreWeightForm,
  SubjectWeightForm,
} from "../../../../schema/types/AdminMeasurement";
import type { GradeType } from "../../../../policy/score";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Divider from "@mui/material/Divider";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";

const Measurement: React.FC<MeasurementUx> = (ux) => {
  const scoreWeightList = useRecoilValue(scoreWeightListState);
  const subjectWeightList = useRecoilValue(subjectWeightListState);

  const _initScoreWeightFormMap = useMemo(() => {
    const obj: { [key: string]: ScoreWeightForm } = {};
    for (let scoreWeight of scoreWeightList) {
      obj[String(scoreWeight.scoreType)] = {
        scoreType: scoreWeight.scoreType,
        value: String(scoreWeight.weight),
      };
    }
    return obj;
  }, [scoreWeightList]);

  const _initSubjectWeightFormMap = useMemo(() => {
    const obj: { [key: string]: SubjectWeightForm } = {};
    for (let subjectWeight of subjectWeightList) {
      obj[subjectWeight.subject.code] = {
        subjectCode: subjectWeight.subject.code,
        value: String(subjectWeight.weight),
      };
    }
    return obj;
  }, [subjectWeightList]);

  const [scoreWeightFormMap, setScoreWeightFormMap] =
    useState<{ [key in string]: ScoreWeightForm }>();
  const [subjectWeightFormMap, setSubjectWeightFormMap] =
    useState<{ [key in string]: SubjectWeightForm }>();

  useEffect(() => {
    setScoreWeightFormMap(_initScoreWeightFormMap);
    setSubjectWeightFormMap(_initSubjectWeightFormMap);
  }, [_initScoreWeightFormMap, _initSubjectWeightFormMap]);

  const isChangedScoreWeight = useCallback(
    (key: string) => {
      if (!scoreWeightFormMap) return false;

      return (
        Number(scoreWeightFormMap[key]?.value) !==
        Number(_initScoreWeightFormMap[key]?.value)
      );
    },
    [scoreWeightFormMap, _initScoreWeightFormMap]
  );

  const isChangedSubjectWeight = useCallback(
    (key: string) => {
      if (!subjectWeightFormMap) return false;

      return (
        Number(subjectWeightFormMap[key]?.value) !==
        Number(_initSubjectWeightFormMap[key]?.value)
      );
    },
    [subjectWeightFormMap, _initSubjectWeightFormMap]
  );

  const handleScoreWeightChange = useCallback(
    (key: string, value: string) => {
      if (!scoreWeightFormMap) {
        return;
      }
      let weightValue = value;
      if (!!weightValue) {
        weightValue = isValidWeight(weightValue)
          ? weightValue
          : scoreWeightFormMap[key].value;
      }

      const copy = { ...scoreWeightFormMap };

      copy[key] = {
        scoreType: parseInt(key) as GradeType,
        value: weightValue,
      };

      setScoreWeightFormMap(copy);
    },
    [scoreWeightFormMap]
  );

  const handleSubjectWeightChange = useCallback(
    (key: string, value: string) => {
      if (!subjectWeightFormMap) {
        return;
      }
      let weightValue = value;
      if (!!weightValue) {
        weightValue = isValidWeight(weightValue)
          ? weightValue
          : subjectWeightFormMap[key].value;
      }

      const copy = { ...subjectWeightFormMap };

      copy[key] = {
        subjectCode: key,
        value: weightValue,
      };

      setSubjectWeightFormMap(copy);
    },
    [subjectWeightFormMap]
  );

  if (
    (scoreWeightFormMap &&
      !Object.keys(scoreWeightFormMap).length) ||
    (subjectWeightFormMap &&
      !Object.keys(subjectWeightFormMap).length)
  )
    return <></>;

  return !!scoreWeightFormMap && !!subjectWeightFormMap ? (
    <Stack spacing={5}>
      <Box width={"100%"}>
        <Typography variant={"h5"} component={"h2"} color={"primary.main"}>
          공통과목 성적 가중치
        </Typography>
        <Typography variant={"caption"}>
          * 가중치는 0~10 사이 소수점 2자리까지 입력해주세요.
        </Typography>
        <Grid container spacing={1} sx={{ mt: 3 }}>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((scoreType) => (
            <Grid key={scoreType} item sm={6} md={4}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{
                  width: "100%",
                  gap: 3,
                }}
              >
                {`${scoreType}등급`}
                <Input
                  value={
                    scoreWeightFormMap[scoreType].value
                  }
                  sx={{
                    width: 40,
                    position: "relative",
                    bottom: 2,
                  }}
                  inputProps={{
                    sx: {
                      textAlign: "center",
                      py: 0,
                    },
                  }}
                  onChange={(e) => {
                    handleScoreWeightChange(scoreType, e.target.value);
                  }}
                />
                {isChangedScoreWeight(scoreType) && (
                  <IconButton
                    sx={{ p: 0 }}
                    onClick={() => {
                      ux.submitScoreWeightForm(scoreWeightFormMap[scoreType]);
                    }}
                  >
                    <SaveIcon fontSize={"small"} />
                  </IconButton>
                )}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider />
      <Box width={"100%"}>
        <Typography variant={"h5"} component={"h2"} color={"primary.main"}>
          과목별 가중치
        </Typography>
        <Typography variant={"caption"}>
          * 가중치는 0~10 사이 소수점 2자리까지 입력해주세요.
        </Typography>
        <Stack spacing={1} sx={{ mt: 3 }}>
          {subjectWeightList.map((item, index) => (
            <Grid key={index} container alignItems="center">
              <Grid item xs={2} md={1}>
                <Typography>{item.subject.code}</Typography>
              </Grid>
              <Grid item xs={3} md={2}>
                <Typography>{item.subject.category}</Typography>
              </Grid>
              <Grid item xs={3} md={2}>
                <Typography>{item.subject.name}</Typography>
              </Grid>
              <Grid item xs={2} md={1}>
                <Box
                  width={40}
                  sx={{
                    position: "relative",
                    bottom: 2,
                  }}
                >
                  <Input
                    value={
                      subjectWeightFormMap[item.subject.code].value
                    }
                    inputProps={{
                      sx: {
                        textAlign: "center",
                        py: 0,
                      },
                    }}
                    onChange={(e) => {
                      handleSubjectWeightChange(
                        item.subject.code,
                        e.target.value
                      );
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={2} md={1}>
                {isChangedSubjectWeight(item.subject.code) && (
                  <IconButton
                    sx={{ p: 0 }}
                    onClick={() => {
                      ux.submitSubjectWeightForm(
                        subjectWeightFormMap[item.subject.code]
                      );
                    }}
                  >
                    <SaveIcon fontSize={"small"} />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
        </Stack>
      </Box>
    </Stack>
  ) : <></>;
};

export default Measurement;
