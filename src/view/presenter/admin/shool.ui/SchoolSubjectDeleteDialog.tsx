import { useContext } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { SchoolSubjectDeleteDialogUx } from "../school.ux/SchoolSubjectDeleteDialogUx";
import { SchoolSubjectTableContext } from "./SchoolSubjectTableContext";

const SchoolSubjectDeleteDialog: React.FC<SchoolSubjectDeleteDialogUx> = (
  ux
) => {
  const context = useContext(SchoolSubjectTableContext);

  return (
    <Dialog
      open={context.modal.state === "DELETE"}
      onClose={() => context.modal.set(null)}
    >
      <DialogTitle>
        교과목을 삭제하시겠습니까? (아래의 항목이 삭제됩니다)
      </DialogTitle>
      <DialogContent>
        <List sx={{ maxHeight: 280, overflowY: "scroll" }}>
          <ListItem disablePadding>
            <ListItemText
              id={`checkbox-list-label-${context.selection.state?.id}`}
              primary={
                context.selection.state?.name +
                "/" +
                context.selection.state?.type
              }
            />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => context.modal.set(null)}>취소</Button>
        <Button
          onClick={() => {
            ux.delete({
              isCommonSubject: context.selection.state?.type === "공통과목",
              subjectId: context.selection?.state?.id,
            });
            context.modal.set(null);
          }}
        >
          삭제하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SchoolSubjectDeleteDialog;
