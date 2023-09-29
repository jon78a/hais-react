import React from 'react';
import { useRecoilValue } from "recoil";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { OptionalSubject } from '../../../domain/subject/school.interface';
import OptionalSubjects from "./OptionalSubjects.json";
import { recommendAlgorithm } from './RecommendAlgorithm';
import { SearchTableUx } from '../subject-search.ux/SearchTable';
import { searchSummaryListState } from '../../../schema/states/SubjectSearch';


export interface TableDataInfo {
  optionalSubject: OptionalSubject;
  recommendPoint: number;
  button: JSX.Element;
}

//성적 외부에서 불러올 예정
export const Grade = () => {
  return [
    { subjectGroup: "국어", grade: 3 },
    { subjectGroup: "수학", grade: 1 },
    { subjectGroup: "과학", grade: 2 },
    { subjectGroup: "체육", grade: 4 }
  ];
};

export const MajorInfo = () => {
  return [
    {
      majorname: "정보시스템",
      subjects: ["화법과 작문", "물리학Ⅰ", "고급 화학"]
    },
    {
      majorname: "기계공학과",
      subjects: ["미적분", "물리학Ⅰ", "고급 물리학"]
    },
    {
      majorname: "생명과학과",
      subjects: ["수학Ⅰ", "생명과학Ⅰ", "고급 물리학"]
    },
    
  ];
}

const SearchTable: React.FC<SearchTableUx> = (ux) => {
  // const majorInfo = MajorInfo();
  // const sortedRows: TableDataInfo[] = OptionalSubjects
  //   .map((subject) => {
  //     const gradeInfo = Grade().find((grade) => grade.subjectGroup === subject.group);
  //     const grade = gradeInfo ? gradeInfo.grade : 0;
  //     const major = majorInfo.find((info) => info.majorname === ux.Major);
  //     const isSubjectInMajor = major && major.subjects.includes(subject.name);

  //     return {
  //       optionalSubject: {
  //         code: subject.code,
  //         group: subject.group,
  //         category: subject.category,
  //         name: subject.name,
  //         description: subject.description,
  //         suneungInfo: subject.suneung_info,
  //         etcInfo: subject.etc_info,
  //       },
  //       recommendPoint: recommendAlgorithm.recommendOutput(
  //         subject.group === gradeInfo?.subjectGroup ? grade : 0,
  //         true,
  //         major&&isSubjectInMajor ? true : false,
  //       ),
  //       button: (
  //         <button onClick={() => handleButtonClick({ description: subject.description, etc_info: subject.etc_info })}>
  //           상세정보
  //         </button>
  //       ),
  //     };
  //   })
  //   .sort((a, b) => b.recommendPoint - a.recommendPoint);
    
  //   const top10Rows = sortedRows.slice(0, 10);

  function handleButtonClick(props: { description: string; etc_info: string }) {
    alert(`상세 정보 : ${props.description} / ${props.etc_info} `);
  }

  const searchSummaryList = useRecoilValue(searchSummaryListState);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>추천교과 명</TableCell>
              <TableCell align="right">과목분류</TableCell>
              <TableCell align="right">과목그룹</TableCell>
              <TableCell align="right">수능과목여부</TableCell>
              {/* <TableCell align="right">과목추천점수</TableCell> */}
              <TableCell align="right">상세정보</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchSummaryList.map((row) => (
              <TableRow
                key={row.sbjName}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.sbjName}
                </TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.group}</TableCell>
                <TableCell align="right">{row.suneungOX}</TableCell>
                {/* <TableCell align="right">{row.recommendPoint}/40</TableCell> */}
                <TableCell align="right">{}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SearchTable;
