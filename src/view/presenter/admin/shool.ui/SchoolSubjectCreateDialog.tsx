import { useContext, useEffect, useMemo, useState } from "react";

import { SchoolSubjectTableContext } from "./SchoolSubjectTableContext";
import type {
  Level,
  SchoolSubjectCreateRequest,
} from "../../../../schema/types/AdminSchool";
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
import {
  SchoolSubjectType,
  credits,
  levels,
  schoolSubjectTypeMap,
} from "../../../../policy/school";
import { SchoolSubjectCreateDialogUx } from "../school.ux/SchoolSubjectCreateDialogUx";
import { defaultSubject } from "../../../../domain/school/school.impl";
import { useRecoilValue } from "recoil";
import { schoolState } from "../../../../schema/states/AdminSchool";

const SchoolSubjectCreateDialog: React.FC<SchoolSubjectCreateDialogUx> = (
  ux
) => {
  const context = useContext(SchoolSubjectTableContext);

  const [form, setForm] = useState<SchoolSubjectCreateRequest | undefined>(
    undefined
  );
  const school = useRecoilValue(schoolState);

  useEffect(() => {
    if (context.modal.state !== "CREATE") return undefined;
    if (!school?.id) return undefined;
    setForm({
      data: defaultSubject,
      schoolId: school?.id,
    });
  }, [context.modal.state, school?.id]);

  const detailFields = useMemo(() => {
    if (!form) return undefined;

    return (
      <DialogContent dividers>
        <TextField
          required
          label="과목명"
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
          <InputLabel id="과목 분류">과목 분류</InputLabel>
          <Select
            required
            labelId="과목 분류"
            label={"과목 분류"}
            value={form.data?.type ?? "공통과목"}
            onChange={(e) =>
              form.data &&
              setForm({
                ...form,
                data: {
                  ...form.data,
                  type: e.target.value as SchoolSubjectType,
                },
              })
            }
          >
            {Object.values(schoolSubjectTypeMap).map((e) => (
              <MenuItem value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="그룹"
          fullWidth
          required
          value={form.data?.groups}
          placeholder="수학,국어"
          sx={{ mt: 2 }}
          onChange={(e) =>
            form.data &&
            setForm({
              ...form,
              data: {
                ...form?.data,
                groups: e.target.value.split(","),
              },
            })
          }
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="난이도">난이도</InputLabel>
          <Select
            required
            labelId="난이도"
            label={"난이도"}
            value={form.data?.level ?? "NONE"}
            onChange={(e) =>
              form.data &&
              setForm({
                ...form,
                data: {
                  ...form.data,
                  level: e.target.value as Level,
                },
              })
            }
          >
            {levels.map((level) => (
              <MenuItem value={level}>{level}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="학점">학점</InputLabel>
          <Select
            required
            labelId="학점"
            label={"학점"}
            value={form.data?.credit ?? "NONE"}
            onChange={(e) =>
              form.data &&
              setForm({
                ...form,
                data: {
                  ...form.data,
                  credit: e.target.value as Level,
                },
              })
            }
          >
            {credits.map((credit) => (
              <MenuItem value={credit}>{credit}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
      </DialogContent>
    );
  }, [form]);

  return (
    <Dialog
      onClose={() => context.modal.set(null)}
      scroll={"paper"}
      open={context.modal.state === "CREATE"}
    >
      <DialogTitle>교과목 추가</DialogTitle>
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

export default SchoolSubjectCreateDialog;
