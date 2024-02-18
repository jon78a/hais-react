import { SchoolFloatButtonUx } from "../school.ux/SchoolFloatButtonUx";
import UploadIcon from "@mui/icons-material/Upload";
import Tooltip from "@mui/material/Tooltip";
import DownloadIcon from "@mui/icons-material/Download";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

const SchoolFloatButton: React.FC<SchoolFloatButtonUx> = (ux) => {
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
      <Tooltip title="학교 샘플 엑셀 폼 다운로드" placement="top">
        <Fab href={ux.sampleExcelLink} download>
          <DownloadIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="학교 엑셀 폼 업로드" placement="top">
        <Fab tabIndex={-1} component="label">
          <UploadIcon />
          <input
            accept=".xlsx, .xls, .csv"
            type="file"
            onChange={ux.uploadExcel}
            className="absolute overflow-hidden w-1 h-1 bottom-0 left-0 whitespace-nowrap"
          />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default SchoolFloatButton;
