import { useContext } from "react";

import { DepartmentTableContext } from "./DepartmentTableContext";

import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

const DepartmentFloatButton: React.FC = () => {
  const context = useContext(DepartmentTableContext);
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 32,
        right: 48,
        display: "flex",
        columnGap: 1,
        alignItems: "center",
      }}
    >
      <Tooltip title="전공 등록" placement="top">
        <Fab
          tabIndex={-1}
          component="label"
          onClick={() => context.modal.set("CREATE")}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default DepartmentFloatButton;
