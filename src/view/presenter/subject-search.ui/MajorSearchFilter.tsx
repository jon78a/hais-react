import { useRecoilValue } from "recoil";

import { MajorSearchFilterUx } from "../subject-search.ux/MajorSearchFilter";
import {
  univChoiceListState,
  majorChoiceListState
} from "../../../schema/states/SubjectSearch";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { theme } from "../../../theme";

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
}));

const GroupItems = styled('ul')({
  padding: 0,
});

const MajorSearchFilter: React.FC<MajorSearchFilterUx> = (ux) => {
  const univChoiceList = useRecoilValue(univChoiceListState);
  const majorChoiceList = useRecoilValue(majorChoiceListState);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: "5px" }}>
       <Typography variant="h5" sx={{m:2, fontWeight: 'bold', textAlign: 'left', width:'90%' }} style={{ color: theme.palette.primary.main }}>
        추천교과 탐색
      </Typography>
      <Autocomplete
        id="grouped-demo"
        options={univChoiceList}
        getOptionLabel={(option) => option.name}
        sx={{ width: '90%', m: 2 }}
        onChange={(event, newValue) => {
          if (newValue !== null) {
            ux.selectUnivChoice(newValue);
          } else ux.deleteUnivChoice();
        }}
        renderInput={(params) => <TextField {...params} label="대학검색" onChange={(e) => { ux.inputUnivKeyword(e.target.value) }} />}
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>{params.group}</GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
      />
      <Autocomplete
        id="grouped"
        options={majorChoiceList}
        getOptionLabel={(option) => option.name}
        sx={{ width: '90%' , m: 2  }}
        onChange={(event, newValue) => {
          if (newValue !== null) {
            ux.selectMajorChoice(newValue);
          } else ux.deleteMajorChoice();
        }}
        renderInput={(params) => <TextField {...params} label="학과검색" onChange={(e) => { ux.inputMajorKeyword(e.target.value) }} />}
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>{params.group}</GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
      />
      <Button variant="contained" onClick={ux.clickSearchButton} sx={{width:'90%', m:2}}>검색</Button>
    </Box>
  );
}

export default MajorSearchFilter;
