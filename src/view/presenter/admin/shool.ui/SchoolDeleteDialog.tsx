import { useContext } from "react";

import { TableContext } from "./TableContext";
import { SchoolDeleteDialogUx } from "../school.ux/SchoolDeleteDialogUx";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const SchoolDeleteDialog: React.FC<SchoolDeleteDialogUx> = (ux) => {
  const context = useContext(TableContext);

  return (
    <Dialog
      open={context.modal.state === "DELETE"}
      onClose={() => context.modal.set(null)}
    >
      <DialogTitle>
        학교를 삭제하시겠습니까? (아래의 항목이 삭제됩니다)
      </DialogTitle>
      <DialogContent>
        <List sx={{ maxHeight: 280, overflowY: "scroll" }}>
          <ListItem disablePadding>
            <ListItemText
              id={`checkbox-list-label-${context.selection.state?.id}`}
              primary={context.selection.state?.name}
            />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => context.modal.set(null)}>취소</Button>
        <Button
          onClick={() => {
            if (!context.selection.state?.id) return;
            ux.delete({ id: context.selection.state?.id });
            context.modal.set(null);
          }}
        >
          삭제하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SchoolDeleteDialog;
