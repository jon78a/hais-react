import { useContext, useMemo, useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { TableContext } from "./TableContext";
import { schoolTabState } from "../../../../schema/states/AdminSchool";
import type { CreateRequest } from "../../../../schema/types/AdminSchool";
import { SchoolCreateDialogUx } from "../school.ux/SchoolCreateDialogUx";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const SchoolCreateDialog: React.FC<SchoolCreateDialogUx> = (ux) => {
  const context = useContext(TableContext);
  const tabItem = useRecoilValue(schoolTabState);

  const [form, setForm] = useState<CreateRequest | undefined>(undefined);
  useEffect(() => {
    console.log("context.modal.state", context.modal.state);
    if (context.modal.state !== "CREATE") return undefined;
  }, [tabItem, context.modal.state]);

  const detailFields = useMemo(() => {
    if (context.modal.state !== "CREATE") return undefined;
    if (!form) return undefined;
  }, [context.modal.state, form]);

  return (
    <Dialog
      open={context.modal.state === "CREATE"}
      onClose={() => context.modal.set(null)}
      scroll={"paper"}
    >
      <DialogTitle>고등학교 추가</DialogTitle>
      {detailFields}
      <DialogActions>
        <Button onClick={() => context.modal.set(null)}>취소</Button>
        <Button
          onClick={() => {
            ux.create(form!);
            context.modal.set(null);
          }}
        >
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SchoolCreateDialog;
