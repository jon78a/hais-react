import React from 'react';
import { useRecoilValue } from "recoil";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

import { OptionalSubject } from '../../../domain/subject/school.interface';
import { searchDetailState, searchSummaryListState } from '../../../schema/states/SubjectSearch';
import { SearchTableUx } from '../subject-search.ux/SearchTable';
//import { SearchDetail } from '../../../schema/types/SubjectSearch';


export interface TableDataInfo {
  optionalSubject: OptionalSubject;
  recommendPoint: number;
  button: JSX.Element;
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

  // function handleButtonClick(props: { description: string; etc_info: string }) {
  //   alert(`상세 정보 : ${props.description} / ${props.etc_info} `);
  // }

  const searchSummaryList = useRecoilValue(searchSummaryListState);
  const searchDetail = useRecoilValue(searchDetailState);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight:'bold'}}>추천교과 명</TableCell>
              <TableCell align="right" sx={{fontWeight:'bold'}}>과목분류</TableCell>
              <TableCell align="right" sx={{fontWeight:'bold'}}>과목그룹</TableCell>
              <TableCell align="right" sx={{fontWeight:'bold'}}>수능과목여부</TableCell>
              {/* <TableCell align="right" sx={{fontWeight:'bold'}}>과목추천점수</TableCell> */}
              <TableCell align="right" sx={{fontWeight:'bold'}}>상세정보</TableCell>
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
                <TableCell align="right">{row.subjectCategory}</TableCell>
                <TableCell align="right">{row.group}</TableCell>
                <TableCell align="right">{row.suneungOX}</TableCell>
                {/* <TableCell align="right">{row.recommendPoint}/40</TableCell> */}
                <TableCell align="right">
                  <div>
                  <Button onClick={() => { handleOpen(); ux.clickMore(row.code); }}><SearchIcon /></Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Box className='flex justify-between'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                          {row.sbjName}
                        </Typography>
                        <Button onClick={handleClose}>X</Button>
                        </Box>
                        {searchDetail !== undefined && (
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {searchDetail.description}
                        </Typography>
                        )}
                      </Box>
                    </Modal>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SearchTable;




