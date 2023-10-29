import { useContext } from "react";
import { useRecoilValue } from "recoil";

import { TableContext } from "./TableContext";
import { SubjectDeleteDialogUx } from "../subject.ux/SubjectDeleteDialogUx";
import { subjectSummaryListState } from "../../../../schema/states/AdminSubject";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const SubjectDeleteDialog: React.FC<SubjectDeleteDialogUx> = (ux) => {
  const context = useContext(TableContext);
  const subjectSummaryList = useRecoilValue(subjectSummaryListState);

  return (
    <Dialog
      open={context.modal.state === "DELETE"}
      onClose={() => context.modal.set(null)}
    >
      <DialogTitle>
        과목을 삭제하시겠습니까? (아래의 항목이 삭제됩니다)
      </DialogTitle>
      <DialogContent>
        <List sx={{maxHeight: 280, overflowY: "scroll"}}>
          {
            subjectSummaryList.filter((v) => context.selections.state.includes(v.id)).map((item) => (
              <ListItem
                key={item.id}
                disablePadding
              >
                <ListItemButton onClick={() => context.selections.set(context.selections.state.filter((v) => v !== item.id))}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={true}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': `checkbox-list-label-${item.id}` }}
                    />
                  </ListItemIcon>
                  <ListItemText id={`checkbox-list-label-${item.id}`} primary={`${item.id} / ${item.distinctDetail} / ${item.name}`} />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => context.modal.set(null)}>취소</Button>
        <Button onClick={() => {
          for (let id of context.selections.state) {
            const code = String(id);
            ux.delete(code);
          }
          context.modal.set(null);
        }}>삭제하기</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SubjectDeleteDialog;
