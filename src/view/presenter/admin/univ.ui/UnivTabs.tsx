import { useMemo } from "react";
import { useRecoilValue } from "recoil";

import { univTabState } from "../../../../schema/states/AdminUniv";
import { UnivTabsUx } from "../univ.ux/UnivTabsUx";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const UnivTabs: React.FC<{
  children: React.ReactNode;
  ux: UnivTabsUx;
}> = (props) => {
  const distinct = useRecoilValue(univTabState);
  const tabValue = useMemo(() => {
    if (distinct === "UNIV") return 0;
    else if (distinct === "DEPARTMENT") return 1;
  }, [distinct]);
  const { ux, children } = props;

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={tabValue}
        onChange={(e, newValue) => {
          if (newValue === 0) {
            ux.clickTab("UNIV");
          } else if (newValue === 1) {
            ux.clickTab("DEPARTMENT");
          }
        }}
      >
        등
        <Tab label="학교관리" />
        <Tab label="전공관리" />
      </Tabs>
      {children}
    </Box>
  );
};

export default UnivTabs;
