import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { SubjectControlFormUx } from "../major.ux/SubjectControlFormUx";
import { selectedMajorState } from "../../../../schema/states/AdminMajor";

import Box from "@mui/material/Box";
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

type CodeInputFieldProps = {
  placeholder?: string;
  buttonText?: string;
  submit: (value: string) => void;
}

const CodeInputField = (props: CodeInputFieldProps) => {
  const {
    placeholder,
    buttonText,
    submit
  } = props;

  const [value, setValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  return (
    <Stack direction={"row"} spacing={2} alignItems={"center"}>
      <OutlinedInput
        id={"code-input-text-field"}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        sx={{
          fontSize: 14,
        }}
        inputProps={{
          style: {
            paddingTop: 7,
            paddingBottom: 7
          }
        }}
      />
      <Button variant="contained" onClick={() => submit(value)}
        sx={{
          fontSize: 14,
          minWidth: "unset",
          paddingY: "4px",
          px: 2
        }}
      >
        {buttonText}
      </Button>
    </Stack>
  )
}

const SubjectControlForm: React.FC<SubjectControlFormUx> = (ux) => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  const selectedMajor = useRecoilValue(selectedMajorState);
  return selectedMajor ? (
    <div className="mt-5">
      <Typography variant={"h6"} color={"primary.main"}>{selectedMajor.univ} {selectedMajor.name}</Typography>
      <Box sx={{pt: 2}}>
        <Stack direction={smUp ? "row" : "column"} spacing={1} justifyContent={smUp ? "space-between" : undefined}>
          <CodeInputField
            placeholder="추가할 과목코드 입력"
            submit={(value) => ux.addSubject(value)}
            buttonText="추가"
          />
          <CodeInputField
            placeholder="삭제할 과목코드 입력"
            submit={(value) => ux.removeSubject(value)}
            buttonText="삭제"
          />
        </Stack>
      </Box>
    </div>
  ) : <></>;
};

export default SubjectControlForm;
