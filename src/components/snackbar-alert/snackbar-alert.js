import { Alert, Snackbar } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDisplaySnackbar } from "../../app/selectors";
import { updateDisplaySnackbar } from "../../app/slice";
import { SNACKBAR_COPIES } from "./constants";

export const SnackbarAlert = () => {
  const dispatch = useDispatch();
  const { open, type, severity } = useSelector(getDisplaySnackbar);

  const onClose = useCallback(() => {
    dispatch(updateDisplaySnackbar({ open: false, type: "", severity: "" }));
  }, []);

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "left", vertical: "top" }}
      autoHideDuration={5000}
      autoFocus
      open={open}
      onClose={onClose}
    >
      <Alert severity={severity || "success"}>{SNACKBAR_COPIES[type]}</Alert>
    </Snackbar>
  );
};
