import { useContext, useEffect, useMemo, useState } from "react";

import { TableContext } from "./TableContext";
import type { CreateRequest } from "../../../../schema/types/AdminSchool";
import { SchoolCreateDialogUx } from "../school.ux/SchoolCreateDialogUx";
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
import Box from "@mui/material/Box";
import { SchoolOperation, schoolOperationMap } from "../../../../policy/school";

const SchoolCreateDialog: React.FC<SchoolCreateDialogUx> = (ux) => {
  const context = useContext(TableContext);

  const [form, setForm] = useState<CreateRequest | undefined>(undefined);

  useEffect(() => {
    if (context.modal.state !== "CREATE") return undefined;
    setForm({
      data: {
        id: "",
        name: "",
        description: "",
        type: "",
        operation: "사립학교",
        jurisdiction: "",
        address1: "",
        address2: "",
        web1: "",
        admin: [],
      },
    });
  }, [context.modal.state]);

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
          required
          label="구분"
          fullWidth
          value={form.data?.type}
          placeholder="광위단위 자율형 사립고등학교"
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
            required
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
              <MenuItem value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="관할"
          fullWidth
          value={form.data?.jurisdiction}
          placeholder="서울특별시강남서초교육지원청"
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
          required
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
          required
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
          required
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
          required
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
      onClose={() => context.modal.set(null)}
      scroll={"paper"}
      open={context.modal.state === "CREATE"}
    >
      <DialogTitle>고등학교 추가</DialogTitle>
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

export default SchoolCreateDialog;
