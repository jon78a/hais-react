import { useContext, useMemo, useState, useEffect } from "react";

import { TableContext } from "./UnivContext";
import type { EditRequest } from "../../../../schema/types/AdminUniv";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { UnivOperation, univOperationMap } from "../../../../policy/v2/univ";
import { UnivDetailDialogUx } from "../univ.ux/UnivDetailDialogUx";
import { Box } from "@mui/material";

const UnivDetailDialog: React.FC<UnivDetailDialogUx> = (ux) => {
  const context = useContext(TableContext);

  const [form, setForm] = useState<EditRequest | undefined>(undefined);

  useEffect(() => {
    if (context.modal.state !== "UPDATE") return undefined;
    if (!context.selection.state?.id) return undefined;
    setForm({
      data: context.selection.state,
      id: context.selection.state.id,
    });
  }, [context.modal.state, context.selection.state]);

  const detailFields = useMemo(() => {
    if (!form) return undefined;

    return (
      <DialogContent dividers>
        <TextField
          required
          label="학교명"
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
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="대학구분">대학구분</InputLabel>
          <Select
            required
            labelId="대학구분"
            label={"대학구분"}
            value={form.data?.operation ?? "NONE"}
            onChange={(e) =>
              form.data &&
              setForm({
                ...form,
                data: {
                  ...form.data,
                  operation: e.target.value as UnivOperation,
                },
              })
            }
          >
            {Object.values(univOperationMap).map((e) => (
              <MenuItem key={e} value={e}>
                {e}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="위치"
          fullWidth
          placeholder="서울"
          value={form.data?.location}
          sx={{ mt: 2 }}
          onChange={(e) =>
            form.data &&
            setForm({
              ...form,
              data: {
                ...form?.data,
                location: e.target.value,
              },
            })
          }
        />
        <TextField
          label="구분"
          fullWidth
          value={form.data?.type}
          placeholder="4년제 종합대학"
          sx={{ mt: 2 }}
          onChange={(e) =>
            form.data &&
            setForm({
              ...form,
              data: {
                ...form?.data,
                type: e.target.value,
              },
            })
          }
        />
        <TextField
          label="주소"
          fullWidth
          placeholder="서울특별시 성북구"
          value={form.data?.address1}
          sx={{ mt: 2 }}
          onChange={(e) =>
            form.data &&
            setForm({
              ...form,
              data: {
                ...form?.data,
                address1: e.target.value,
              },
            })
          }
        />
        <TextField
          label="상세주소"
          fullWidth
          placeholder="안암로 145"
          value={form.data?.address2}
          sx={{ mt: 2 }}
          onChange={(e) =>
            form.data &&
            setForm({
              ...form,
              data: {
                ...form?.data,
                address2: e.target.value,
              },
            })
          }
        />
        <TextField
          label="웹사이트 주소1"
          fullWidth
          value={form.data?.web1}
          placeholder="https://www.whimoon.hs.kr/"
          sx={{ mt: 2 }}
          onChange={(e) =>
            form.data &&
            setForm({
              ...form,
              data: {
                ...form?.data,
                web1: e.target.value,
              },
            })
          }
        />
        <TextField
          label="웹사이트 주소2"
          fullWidth
          value={form.data?.web2}
          sx={{ mt: 2 }}
          onChange={(e) =>
            form.data &&
            setForm({
              ...form,
              data: {
                ...form?.data,
                web2: e.target.value,
              },
            })
          }
        />
        <TextField
          label="웹사이트 주소3"
          fullWidth
          value={form.data?.web3}
          sx={{ mt: 2 }}
          onChange={(e) =>
            form.data &&
            setForm({
              ...form,
              data: {
                ...form?.data,
                web3: e.target.value,
              },
            })
          }
        />
      </DialogContent>
    );
  }, [form]);

  return (
    <Dialog
      open={context.modal.state === "UPDATE"}
      onClose={() => context.modal.set(null)}
      scroll={"paper"}
    >
      <DialogTitle>대학교 수정</DialogTitle>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          ux.modify(form!);
          context.modal.set(null);
        }}
      >
        {detailFields}
        <DialogActions>
          <Button onClick={() => context.modal.set(null)}>취소</Button>
          <Button type="submit">수정</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default UnivDetailDialog;
