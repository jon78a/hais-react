import { useContext, useEffect, useMemo, useState } from "react";

import { DepartmentTableContext } from "./DepartmentTableContext";
import type { DepartmentCreateRequest } from "../../../../schema/types/AdminUniv";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useRecoilValue } from "recoil";
import { univListState } from "../../../../schema/states/AdminUniv";
import { DepartmentDetailDialogUx } from "../univ.ux/DepartmentDetailDialogUx";
import Autocomplete from "@mui/material/Autocomplete";

const DepartmentDetailDialog: React.FC<DepartmentDetailDialogUx> = (ux) => {
  const context = useContext(DepartmentTableContext);

  const [form, setForm] = useState<DepartmentCreateRequest | undefined>(
    undefined
  );
  const univList = useRecoilValue(univListState);

  useEffect(() => {
    if (context.modal.state !== "UPDATE") return undefined;
    setForm({
      data: context.selection.state!,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.modal.state]);

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
      open={context.modal.state === "UPDATE"}
    >
      <DialogTitle>전공 수정</DialogTitle>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!form?.data.id) return;
          ux.modify({
            data: form?.data!,
            departmentId: form?.data.id,
          });
          context.modal.set(null);
        }}
      >
        {detailFields}
        <DialogActions>
          <Button
            onClick={() => {
              if (!form?.data?.id) return;
              ux.modify({
                data: form?.data!,
                departmentId: form?.data?.id!,
              });
              context.modal.set(null);
            }}
          >
            취소
          </Button>
          <Button type="submit">수정</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DepartmentDetailDialog;
