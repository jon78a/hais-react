import { useRecoilValue } from "recoil";

import { LoginFormUx } from "../login.ux/LoginForm";
import { loginRequestState } from "../../../schema/states/Login";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";

const LoginForm: React.FC<LoginFormUx> = (ux) => {
  const loginRequest = useRecoilValue(loginRequestState);

  return (
    <Paper sx={{
      width: 350,
      py: 3,
      px: 2
    }} className="flex flex-col items-center">
      <Typography variant={"h5"} component={"h1"}>로그인</Typography>
      <Box
        component={"form"}
        autoComplete="off"
        className="flex flex-col w-full"
        onSubmit={(e) => {
          e.preventDefault();
          ux.clickLoginButton();
        }}
      >
        <Stack spacing={1}>
          <div className="flex flex-col">
            <InputLabel>
              <Typography variant={"overline"} component={"h2"}>
                이메일
              </Typography>
            </InputLabel>
            <TextField
              value={loginRequest.email}
              onChange={(e) => {
                ux.inputEmail(e.target.value);
              }}
              size={"small"}
              fullWidth
            />
          </div>
          <div className="flex flex-col">
            <InputLabel>
              <Typography variant={"overline"} component={"h2"}>
                비밀번호
              </Typography>
            </InputLabel>
            <TextField
              value={loginRequest.password}
              onChange={(e) => {
                ux.inputPassword(e.target.value);
              }}
              type={"password"}
              size={"small"}
              fullWidth
            />
          </div>
        </Stack>
        <Button variant="contained" sx={{mt: 4}} type={"submit"}>
          가입하기
        </Button>
      </Box>
      <Divider sx={{width: "100%", mt: 3}}>
        <Typography variant={"caption"}>
          간편 로그인
        </Typography>
      </Divider>
      <Stack direction={"row"} spacing={2} sx={{mt: 2}}>
        <button onClick={() => ux.clickSocial("KAKAO")}>
          <img alt="kakao" src={process.env.PUBLIC_URL + "/kakao-logo.svg"} className="w-[40px] h-[40px]"/>
        </button>
      </Stack>
    </Paper>
  );
}

export default LoginForm;
