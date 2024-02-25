import { useContext } from "react";

import { SchoolSubjectTableContext } from "./SchoolSubjectTableContext";

import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

const SchoolSubjectFloatButton: React.FC = () => {
  const context = useContext(SchoolSubjectTableContext);
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
      <Tooltip title="교과 등록" placement="top">
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

export default SchoolSubjectFloatButton;
