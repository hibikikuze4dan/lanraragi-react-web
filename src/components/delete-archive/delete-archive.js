import { Button, Grid, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  deleteArchiveFromRandomArchives,
  deleteArchiveFromSearchArchives,
  updateDisplaySnackbar,
} from "../../app/slice";
import { deleteArchiveById } from "../../requests/delete";

export const DeleteArchive = ({ onClose, arcId, title, onBack }) => {
  const dispatch = useDispatch();
  const onDelete = useCallback(async () => {
    const response = await deleteArchiveById(arcId);
    if (response?.success) {
      dispatch(deleteArchiveFromRandomArchives(arcId));
      dispatch(deleteArchiveFromSearchArchives(arcId));
      dispatch(updateDisplaySnackbar({ open: true, type: "DELETE_ARCHIVE" }));
    }
    onClose();
    onBack(false);
  }, [onClose, arcId]);
  const onBackClick = useCallback(() => {
    onBack(false);
  }, []);

  return (
    <Grid
      className="h-full mt-8"
      container
      direction="column"
      justifyContent="center"
      spacing={2}
    >
      <Grid item>
        <Typography gutterBottom>
          Are you sure you want to delete the following archive from storage?
        </Typography>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Button fullWidth variant="outlined" onClick={onDelete}>
              Yes, Delete
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="outlined" onClick={onBackClick}>
              No, Go Back
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
