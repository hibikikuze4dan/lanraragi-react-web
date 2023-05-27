import { Alert, Snackbar } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDisplayDeleteSnackbar } from "../../app/selectors";
import { updateDisplayDeleteSnackbar } from "../../app/slice";

export const SnackbarAlert = () => {
  const dispatch = useDispatch();
  const open = useSelector(getDisplayDeleteSnackbar);

  const onClose = useCallback(() => {
    dispatch(updateDisplayDeleteSnackbar(false));
  }, []);

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "left", vertical: "top" }}
      autoHideDuration={5000}
      autoFocus
      open={open}
      onClose={onClose}
    >
      <Alert severity="success">Archive Successfully Deleted!</Alert>
    </Snackbar>
  );
};
