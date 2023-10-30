import { grey } from "@mui/material/colors";

import Stack from "@mui/material/Stack";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const SubjectRecommendPage = (): JSX.Element => {
  return (
    <div className="w-full h-full max-h-[600px] flex flex-col justify-center items-center">
      <Stack spacing={2}>
        <Stack direction={"row"} spacing={2} sx={{color: grey[600]}}>
          <WarningAmberIcon sx={{fontSize: "32px"}} />
          <Typography variant={"h5"} component={"span"}>
            서비스 준비중입니다.
          </Typography>
        </Stack>
        <Button variant={"outlined"} onClick={() => window.location.replace("/")}>
          홈으로 바로가기
        </Button>
      </Stack>
    </div>
  );
}

export default SubjectRecommendPage;
