import { useState } from "react";
import { useRecoilValue } from "recoil";

import {
  selectedMajorIdState,
  subjectDataListState,
  recommendStatusState,
} from "../../../schema/states/SubjectRecommend";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

const SubjectList: React.FC = () => {
  const [clickedRowCode, setClickedRowCode] = useState<string | null>(null);
  const subjectDataList = useRecoilValue(subjectDataListState);
  const selectedMajorId = useRecoilValue(selectedMajorIdState);
  const recommendStatus = useRecoilValue(recommendStatusState);

  return !!selectedMajorId ? (
    <div>
      <Typography color={"info.main"}>
        평가점수: {recommendStatus.status}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">과목코드</TableCell>
              <TableCell align="center">교과명</TableCell>
              <TableCell align="center">구분</TableCell>
              <TableCell align="center">그룹명</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {subjectDataList.map((row) => (
              <>
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                  <TableCell align="center">{row.code}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.subjectCategory}</TableCell>
                  <TableCell align="center">{row.group}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => {
                        if (clickedRowCode === row.code)
                          setClickedRowCode(null);
                        else setClickedRowCode(row.code);
                      }}
                    >
                      {clickedRowCode === row.code ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0, width: "100%" }}
                    colSpan={6}
                  >
                    <Collapse
                      in={clickedRowCode === row.code}
                      timeout="auto"
                      unmountOnExit
                      sx={{ py: 4, px: 1 }}
                    >
                      <Stack spacing={2}>
                        <Stack spacing={1}>
                          <Typography>설명</Typography>
                          <Divider />
                          <Typography variant={"body2"}>
                            {row.description}
                          </Typography>
                        </Stack>
                        <Stack spacing={1}>
                          <Typography>수능과목정보</Typography>
                          <Divider />
                          <Typography variant={"body2"}>
                            {row.suneungInfo}
                          </Typography>
                        </Stack>
                        <Stack spacing={1}>
                          <Typography>기타정보</Typography>
                          <Divider />
                          <Typography variant={"body2"}>
                            {row.etcInfo}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) : (
    <></>
  );
};

export default SubjectList;
