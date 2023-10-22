import { useContext, useMemo, useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { SubjectDetailDialogUx } from "../subject.ux/SubjectDetailDialogUx";
import { ModalContext } from "./ModalContext";
import { commonSubjectDetailState, optionalSubjectDetailState, subjectDistinctState } from "../../../../schema/states/SubjectTable";
import { studentCategoryMap } from "../../../../policy/school";
import type { OptionalSubjectDetail } from "../../../../schema/types/SubjectTable";

import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const SubjectDetailDialog: React.FC<SubjectDetailDialogUx> = (ux) => {
  const {modalState, setModalState} = useContext(ModalContext);
  const distinct = useRecoilValue(subjectDistinctState);
  const commonSubjectDetail = useRecoilValue(commonSubjectDetailState);
  const optionalSubjectDetail = useRecoilValue(optionalSubjectDetailState);

  const profile = useMemo(() => {
    if (distinct === "COMMON") return commonSubjectDetail!;
    if (distinct === "OPTION") return optionalSubjectDetail!;
    throw Error();
  }, [distinct, commonSubjectDetail, optionalSubjectDetail]);

  const [formData, setFormData] = useState<typeof profile>(profile);
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const dialogTitle = useMemo(() => {
    if (modalState === "CREATE") return "교과추가";
    if (modalState === "UPDATE") return "교과수정";
  }, [modalState]);
  const actionCommitText = useMemo(() => {
    if (modalState === "CREATE") return "추가";
    if (modalState === "UPDATE") return "수정";
  }, [modalState]);

  const detailFields = useMemo(() => {
    if (modalState === null) return undefined;
    if (distinct === "COMMON") return (
      <DialogContent dividers>
        <TextField
          label="과목코드"
          fullWidth
          variant="standard"
          value={formData?.code}
          disabled
          sx={{mt: 2}}
        />
        <TextField
          label="그룹명"
          fullWidth
          variant="standard"
          value={formData.group}
          sx={{mt: 2}}
        />
        <TextField
          label="과목명"
          fullWidth
          variant="standard"
          value={formData?.name}
          sx={{mt: 2}}
        />
        <FormControl fullWidth sx={{mt: 2}}>
          <InputLabel id="계열">계열</InputLabel>
          <Select
            labelId="계열"
            label={"계열"}
            value={formData.studentCategory ?? "NONE"}
          >
            {
              [
                <MenuItem value={"NONE"}>
                  해당없음
                </MenuItem>,
                ...Object.entries(studentCategoryMap).map((e) => (
                  <MenuItem value={e[0]}>
                    {e[1]}
                  </MenuItem>
                ))
              ]
            }
          </Select>
        </FormControl>
        <TextField
          label="설명"
          fullWidth
          variant="standard"
          value={formData?.description}
          multiline
          sx={{mt: 2}}
        />
        <TextField
          label="부가설명"
          fullWidth
          variant="standard"
          value={formData.etcInfo}
          multiline
          sx={{mt: 2}}
        />
      </DialogContent>
    )
    if (distinct === "OPTION") return (
      <DialogContent dividers>
        <TextField
          label="과목코드"
          fullWidth
          variant="standard"
          value={formData?.code}
          disabled
          sx={{mt: 2}}
        />
        <TextField
          label="선택과목분류"
          fullWidth
          variant="standard"
          value={(formData as OptionalSubjectDetail).subjectCategory}
          sx={{mt: 2}}
        />
        <TextField
          label="그룹명"
          fullWidth
          variant="standard"
          value={formData.group}
          sx={{mt: 2}}
        />
        <TextField
          label="과목명"
          fullWidth
          variant="standard"
          value={formData?.name}
          sx={{mt: 2}}
        />
        <FormControl fullWidth sx={{mt: 2}}>
          <InputLabel id="계열">계열</InputLabel>
          <Select
            labelId="계열"
            label={"계열"}
            value={formData.studentCategory ?? "NONE"}
          >
            {
              [
                <MenuItem value={"NONE"}>
                  해당없음
                </MenuItem>,
                ...Object.entries(studentCategoryMap).map((e) => (
                  <MenuItem value={e[0]}>
                    {e[1]}
                  </MenuItem>
                ))
              ]
            }
          </Select>
        </FormControl>
        <TextField
          label="설명"
          fullWidth
          variant="standard"
          value={formData?.description}
          multiline
          sx={{mt: 2}}
        />
        <TextField
          label="수능과목정보"
          fullWidth
          variant="standard"
          value={(formData as OptionalSubjectDetail).suneungInfo}
          multiline
          sx={{mt: 2}}
        />
        <TextField
          label="부가설명"
          fullWidth
          variant="standard"
          value={formData.etcInfo}
          multiline
          sx={{mt: 2}}
        />
      </DialogContent>
    )
  }, [distinct, modalState, formData]);

  return (
    <Dialog
      open={!!modalState} onClose={() => setModalState(null)}
      scroll={"paper"}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
        {detailFields}
      <DialogActions>
        <Button onClick={() => setModalState(null)}>취소</Button>
        <Button onClick={() => {
          ux.modify(distinct, formData);
          setModalState(null);
        }}>{
          actionCommitText
        }</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SubjectDetailDialog;
