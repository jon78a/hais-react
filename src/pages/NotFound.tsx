import { grey } from "@mui/material/colors";

import Stack from "@mui/material/Stack";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const NotFound = (): JSX.Element => {
  return (
    <div className="absolute top-0 w-screen h-screen flex flex-col justify-center items-center">
      <div className="absolute top-8 left-8 w-[60px]">
        <img src={process.env.PUBLIC_URL + "logo-main.png"} alt="logo-main"/>
      </div>
      <Stack spacing={2}>
        <Stack direction={"row"} spacing={2} sx={{color: grey[600]}}>
          <WarningAmberIcon sx={{fontSize: "32px"}} />
          <Typography variant={"h5"} component={"span"}>
            페이지를 찾을 수 없습니다.
          </Typography>
        </Stack>
        <Button variant={"outlined"} onClick={() => window.location.replace("/")}>
          홈으로 바로가기
        </Button>
      </Stack>
    </div>
  );
}

export default NotFound;
