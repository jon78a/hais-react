import { useContext, useEffect, useMemo, useRef, useState } from "react";

import type { DepartmentCreateRequest } from "../../../../schema/types/AdminUniv";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { DepartmentCreateDialogUx } from "../univ.ux/DepartmentCreateDialogUx";
import { useRecoilValue } from "recoil";
import { univListState, univState } from "../../../../schema/states/AdminUniv";
import { DepartmentTableContext } from "./DepartmentTableContext";
import Autocomplete from "@mui/material/Autocomplete";

const DepartmentCreateDialog: React.FC<DepartmentCreateDialogUx> = (ux) => {
  const context = useContext(DepartmentTableContext);

  const [form, setForm] = useState<DepartmentCreateRequest | undefined>(
    undefined
  );
  const univList = useRecoilValue(univListState);
  const univ = useRecoilValue(univState);

  useEffect(() => {
    if (context.modal.state !== "CREATE") return undefined;
    setForm({
      data: {
        id: "",
        name: "",
        precedences: [],
        universityId: "",
        keyword: "",
        createdAt: new Date().valueOf(),
        updatedAt: new Date().valueOf(),
      },
    });
  }, [context.modal.state, univ?.id]);

  const detailFields = useMemo(() => {
    if (!form) return undefined;

    return (
      <DialogContent dividers>
        <TextField
          required
          label="학과명"
          fullWidth
          value={form.data?.name}
          sx={{ mt: 2 }}
          onChange={(e) =>
            form.data &&
            setForm({
              ...form,
              data: {
                ...form?.data,
                name: e.target.value,
              },
            })
          }
        />
        <TextField
          required
          label="키워드"
          placeholder="경영학과"
          fullWidth
          value={form.data?.keyword}
          sx={{ mt: 2 }}
          onChange={(e) =>
            form.data &&
            setForm({
              ...form,
              data: {
                ...form?.data,
                keyword: e.target.value,
              },
            })
          }
        />

        <Autocomplete
          sx={{ mt: 2 }}
          fullWidth
          options={Object.values(univList)}
          getOptionLabel={(option) => option.name}
          value={univList.find((univ) => univ.id === form.data?.universityId)}
          onChange={(event, newValue) => {
            const selectedUniversityId = newValue ? newValue.id : "";
            const selectedUniversityName = newValue ? newValue.name : "";
            setForm({
              ...form,
              data: {
                ...form.data,
                universityId: selectedUniversityId,
                universityName: selectedUniversityName,
              },
            });
          }}
          renderInput={(params) => (
            <TextField {...params} label="대학교" required variant="outlined" />
          )}
        />

        <TextField
          label="선호도"
          fullWidth
          required
          value={form.data?.precedences}
          placeholder="영어,수학"
          sx={{ mt: 2 }}
          onChange={(e) =>
            form.data &&
            setForm({
              ...form,
              data: {
                ...form?.data,
                precedences: e.target.value.split(","),
              },
            })
          }
        />
      </DialogContent>
    );
  }, [form, univList]);

  return (
    <Dialog
      onClose={() => context.modal.set(null)}
      scroll={"paper"}
      open={context.modal.state === "CREATE"}
    >
      <DialogTitle>전공 등록</DialogTitle>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          ux.create(form!);
          context.modal.set(null);
        }}
      >
        {detailFields}
        <DialogActions>
          <Button onClick={() => context.modal.set(null)}>취소</Button>
          <Button type="submit">추가</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DepartmentCreateDialog;
