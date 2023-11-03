import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

interface AlertProps {
  open: boolean;
  message?: string;
  onClose: () => void;
}

const Alert = ({
  open,
  message,
  onClose
}: AlertProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message ?? "에러가 발생하였습니다."}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>확인</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Alert;
