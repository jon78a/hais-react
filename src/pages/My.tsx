import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { theme } from '../theme';

import GradeInput from '../view/presenter/grade-input/GradeInput';

const MyPage = (): JSX.Element => {
  return (
  <div className='mt-8'>
    <Typography variant="h5" sx={{m:2, fontWeight: 'bold', textAlign: 'left', width:'90%' }} style={{ color: theme.palette.primary.main }}>
        교과 성적 입력
      </Typography>
    <BasicTabs />
 </div>
  );
}

export default MyPage;


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p:1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', padding: 0 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="1학년" {...a11yProps(0)} />
          <Tab label="2학년" {...a11yProps(1)} />
          <Tab label="3학년" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <GradeInput grade="firstGrade"/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GradeInput grade="secondGrade"/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <GradeInput grade="thirdGrade"/>
      </CustomTabPanel>
    </Box>
  );
}