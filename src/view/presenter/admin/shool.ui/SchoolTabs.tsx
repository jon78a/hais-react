import { useMemo } from "react";
import { useRecoilValue } from "recoil";

import { schoolTabState } from "../../../../schema/states/AdminSchool";
import { SchoolTabsUx } from "../school.ux/SchoolTabsUx";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const SchoolTabs: React.FC<{
  children: React.ReactNode;
  ux: SchoolTabsUx;
}> = (props) => {
  const distinct = useRecoilValue(schoolTabState);
  const tabValue = useMemo(() => {
    if (distinct === "SCHOOL") return 0;
    else if (distinct === "SUBJECT") return 1;
  }, [distinct]);
  const { ux, children } = props;

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={tabValue}
        onChange={(e, newValue) => {
          if (newValue === 0) {
            ux.clickTab("SCHOOL");
          } else if (newValue === 1) {
            ux.clickTab("SUBJECT");
          }
        }}
      >
        등
        <Tab label="학교관리" />
        <Tab label="교과관리" />
      </Tabs>
      {children}
    </Box>
  );
};

export default SchoolTabs;
