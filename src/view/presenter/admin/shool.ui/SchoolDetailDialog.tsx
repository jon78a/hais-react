import { useContext, useMemo, useState, useEffect } from "react";

import { SchoolDetailDialogUx } from "../school.ux/SchoolDetailDialogUx";
import { TableContext } from "./TableContext";
import { SchoolOperation, schoolOperationMap } from "../../../../policy/school";
import type { EditRequest } from "../../../../schema/types/AdminSchool";

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

const SchoolDetailDialog: React.FC<SchoolDetailDialogUx> = (ux) => {
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
          label="학교명"
          fullWidth
          value={form.data?.name}
          disabled
          sx={{ mt: 2 }}
        />
        <TextField
          label="설명"
          fullWidth
          value={form.data?.description}
          sx={{ mt: 2 }}
          onChange={(e) =>
            form.data &&
            setForm({
              ...form,
              data: {
                ...form?.data,
                description: e.target.value,
              },
            })
          }
        />
        <TextField
          label="구분"
          fullWidth
          value={form.data?.type}
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
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="운영주체">운영주체</InputLabel>
          <Select
            labelId="운영주체"
            label={"운영주체"}
            value={form.data?.operation ?? "NONE"}
            onChange={(e) =>
              form.data &&
              setForm({
                ...form,
                data: {
                  ...form.data,
                  operation: e.target.value as SchoolOperation,
                },
              })
            }
          >
            {Object.values(schoolOperationMap).map((e) => (
              <MenuItem key={e} value={e}>
                {e}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="관할"
          fullWidth
          value={form.data?.jurisdiction}
          sx={{ mt: 2 }}
          onChange={(e) =>
            form.data &&
            setForm({
              ...form,
              data: {
                ...form?.data,
                jurisdiction: e.target.value,
              },
            })
          }
        />
        <TextField
          label="우편번호"
          fullWidth
          value={form.data?.zipcode}
          sx={{ mt: 2 }}
          onChange={(e) =>
            form.data &&
            setForm({
              ...form,
              data: {
                ...form?.data,
                zipcode: e.target.value,
              },
            })
          }
        />
        <TextField
          label="주소"
          fullWidth
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
          label="관리자"
          fullWidth
          required
          value={form.data?.admin}
          placeholder="user@site.com,user2@stie.com"
          sx={{ mt: 2 }}
          onChange={(e) =>
            form.data &&
            setForm({
              ...form,
              data: {
                ...form?.data,
                admin: e.target.value.split(","),
              },
            })
          }
        />
        <TextField
          label="웹사이트 주소1"
          fullWidth
          value={form.data?.web1}
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
      <DialogTitle>고등학교</DialogTitle>
      {detailFields}
      <DialogActions>
        <Button onClick={() => context.modal.set(null)}>취소</Button>
        <Button
          onClick={() => {
            ux.modify(form!);
            context.modal.set(null);
          }}
        >
          수정
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SchoolDetailDialog;
