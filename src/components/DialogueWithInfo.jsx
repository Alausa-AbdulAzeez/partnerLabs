import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// eslint-disable-next-line react/prop-types
export default function FormDialog({
  open,
  handleClose,
  rejectResult,
  setReasonForRejection,
}) {
  // FUNCTION TO HANDLE REJECTION REASON CHANGE
  const handleRejectionReasonChange = (e) => {
    setReasonForRejection(e.target?.value);
  };
  // END OF FUNCTION TO HANDLE REJECTION REASON CHANGE

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reject this result, please kindly add a reason for rejection
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Reason for rejection"
            multiline
            maxRows={4}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => handleRejectionReasonChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={rejectResult}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
