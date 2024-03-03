import { useContext, useEffect, useMemo, useState } from "react";

import { DepartmentTableContext } from "./DepartmentTableContext";
import type {
  DepartmentCreateRequest,
  GuidelineDto,
} from "../../../../schema/types/AdminUniv";
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
import { useRecoilValue } from "recoil";
import { univListState, univState } from "../../../../schema/states/AdminUniv";
import { DepartmentDetailDialogUx } from "../univ.ux/DepartmentDetailDialogUx";
import GuidelineForm from "./GuidelineForm";
import Stack from "@mui/material/Stack/Stack";
import Card from "@mui/material/Card/Card";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import IconButton from "@mui/material/IconButton/IconButton";
import { AddCircle } from "@mui/icons-material";

const DepartmentDetailDialog: React.FC<DepartmentDetailDialogUx> = (ux) => {
  const context = useContext(DepartmentTableContext);

  const [form, setForm] = useState<DepartmentCreateRequest | undefined>(
    undefined
  );
  const univList = useRecoilValue(univListState);
  const univ = useRecoilValue(univState);
  const [guidelines, setGuidelines] = useState<boolean[]>([]);

  useEffect(() => {
    if (context.modal.state !== "UPDATE") return undefined;
    setForm({
      data: context.selection.state!,
    });
  }, [context.modal.state, context.selection.state, univ?.id]);

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

        <FormControl fullWidth sx={{ mt: 2 }} required>
          <InputLabel id="대학교">대학교</InputLabel>
          <Select
            required
            labelId="대학교"
            label={"대학교"}
            value={form.data?.universityId}
            onChange={(e) =>
              form.data &&
              setForm({
                ...form,
                data: {
                  ...form.data,
                  universityId: e.target.value as string,
                },
              })
            }
          >
            {Object.values(univList).map((e) => (
              <MenuItem key={e.id} value={e.id}>
                {e.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
        <Card sx={{ my: 2, p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel>모집요강</FormLabel>
            <IconButton
              aria-label="add"
              color="primary"
              size="small"
              onClick={() => {
                form.data &&
                  setForm({
                    ...form,
                    data: {
                      ...form?.data,
                      guidelines: [...form.data.guidelines, {} as GuidelineDto],
                    },
                  });
              }}
            >
              <AddCircle fontSize="inherit" />
            </IconButton>
          </Box>
          <Stack>
            {form.data.guidelines?.map((guideline, index) => {
              return (
                <GuidelineForm
                  key={index}
                  state={{
                    form: {
                      get: form,
                      set: setForm,
                    },
                    guideline: {
                      get: guidelines,
                      set: setGuidelines,
                    },
                  }}
                  getSubjectList={ux.getSubjectList}
                  index={index}
                />
              );
            })}
          </Stack>
        </Card>
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
  }, [form, guidelines, univList, ux.getSubjectList]);

  return (
    <Dialog
      onClose={() => context.modal.set(null)}
      scroll={"paper"}
      open={context.modal.state === "UPDATE"}
    >
      <DialogTitle>교과목 수정</DialogTitle>
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
