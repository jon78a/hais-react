import { useContext } from "react";
import { useRecoilValue } from "recoil";

import { TableContext } from "./TableContext";
import { SchoolDeleteDialogUx } from "../school.ux/SchoolDeleteDialogUx";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import { schoolListState } from "../../../../schema/states/AdminSchool";
import ListItemText from "@mui/material/ListItemText";

const SchoolDeleteDialog: React.FC<SchoolDeleteDialogUx> = (ux) => {
  const context = useContext(TableContext);
  const schoolList = useRecoilValue(schoolListState);

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
          {schoolList
            .filter((v) => context.selections.state.includes(v.id))
            .map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  onClick={() =>
                    context.selections.set(
                      context.selections.state.filter((v) => v !== item.id)
                    )
                  }
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={true}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        "aria-labelledby": `checkbox-list-label-${item.id}`,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={`checkbox-list-label-${item.id}`}
                    primary={item.name}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => context.modal.set(null)}>취소</Button>
        <Button
          onClick={() => {
            for (let id of context.selections.state) {
              ux.delete({ id });
            }
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
