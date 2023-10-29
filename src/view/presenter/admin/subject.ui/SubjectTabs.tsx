import { useRecoilValue } from 'recoil';

import { subjectDistinctState } from '../../../../schema/states/AdminSubject';
import { SubjectTabsUx } from '../subject.ux/SubjectTabsUx';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useMemo } from 'react';

const SubjectTabs: React.FC<{
  children: React.ReactNode;
  ux: SubjectTabsUx;
}> = (props) => {
  const distinct = useRecoilValue(subjectDistinctState);
  const tabValue = useMemo(() => {
    if (distinct === "COMMON") return 0;
    else if (distinct === "OPTION") return 1;
  }, [distinct]);
  const {ux, children} = props;

  return (
    <Box sx={{width: "100%"}}>
      <Tabs value={tabValue} onChange={(e, newValue) => {
        if (newValue === 0) {
          ux.clickTab("COMMON");
        }
        else if (newValue === 1) {
          ux.clickTab("OPTION");
        }
      }}>
        <Tab label="공통과목"/>
        <Tab label="선택과목"/>
      </Tabs>
      {children}
    </Box>
  );
}

export default SubjectTabs;
