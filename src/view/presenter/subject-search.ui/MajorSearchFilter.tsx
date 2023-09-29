import { useRecoilValue } from "recoil";

import { MajorSearchFilterUx } from "../subject-search.ux/MajorSearchFilter";
import {
  univNamesState,
  majorNamesState
} from "../../../schema/states/SubjectSearch";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// const UnivList = [
//   { Name: '한양대학교', year: 1994 },
//   { Name: '서울대학교', year: 1972 },
//   { Name: '연세대학교', year: 1974 },
//   { Name: '고려대학교', year: 2003 },
//   { Name: '성균관대학교', year: 2003 },
//   { Name: '서강대학교', year: 2003 },
// ];

// const MajorList = [
//   { Name: '기계공학과', year: 1994 },
//   { Name: '정보시스템', year: 1994 },
//   { Name: '행정학과', year: 1994 },
//   { Name: '정책학과', year: 1994 },
//   { Name: '생명과학과', year: 1994 },
// ]

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
}));

const GroupItems = styled('ul')({
  padding: 0,
});

const MajorSearchFilter: React.FC<MajorSearchFilterUx> = (ux) => {
  // const UnivOptions = UnivList.map((option) => {
  //   const firstLetter = option.Name[0].toUpperCase();
  //   return {
  //     firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
  //     ...option,
  //   };
  // });

  // const MajorOptions = MajorList.map((option) => {
  //   const firstLetter = option.Name[0].toUpperCase();
  //   return {
  //     firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
  //     ...option,
  //   };
  // });
  
  const univNames = useRecoilValue(univNamesState);
  const majorNames = useRecoilValue(majorNamesState);

  return (
    <>
    <Box sx={{display:'flex', justifyContent:"space-around", padding:"5px"}}>
    <Autocomplete
      id="grouped-demo"
      options={univNames}
      // groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option}
      sx={{ width: 300 }}
      onChange={(event, newValue) => {
        if (newValue !== null) {
          ux.selectUnivChoice(newValue); 
        }
      }}
      renderInput={(params) => <TextField {...params} label="대학검색" onChange={(e) => {ux.inputUnivKeyword(e.target.value)}}/>}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
    />
    <Autocomplete
      id="grouped"
      options={majorNames}
      // groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option}
      sx={{ width: 300 }}
      onChange={(event, newValue) => {
        if (newValue !== null) {
          ux.selectMajorChoice(newValue);
        }
      }}
      renderInput={(params) => <TextField {...params} label="학과검색" onChange={(e) => {ux.inputMajorKeyword(e.target.value)}}/>}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
    />
   <Button variant="contained" onClick={ux.clickSearchButton} >검색</Button>
    </Box>
    </>
  );
}

export default MajorSearchFilter;
