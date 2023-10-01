import { grey } from "@mui/material/colors";

import Stack from "@mui/material/Stack";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const NotFound = (): JSX.Element => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <img src={process.env.PUBLIC_URL + "logo-main.png"} alt="logo-main"
        className="absolute top-4 left-4 w-20 h-24"
      />
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
