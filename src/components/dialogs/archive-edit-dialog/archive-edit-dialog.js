/* eslint-disable function-paren-newline */
import React from "react";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";
import { BaseDialog } from "../base-dialog";
import { Loading } from "../../loading/loading";
import { useArchiveEditDialogModalLogic } from "./useArchiveEditDialogLogic";

export const ArchiveEditDialog = ({
  arcId,
  onCloseProp,
  open,
  updateArchiveRatingModalState,
}) => {
  const {
    onClose,
    onUpdateButtonClick,
    archiveData,
    setArchiveData,
    archiveDataReady,
  } = useArchiveEditDialogModalLogic({ onCloseProp, arcId });

  const dialogTitle = (
    <Grid container justifyContent="space-between">
      <Typography className="self-center ml-1 text-xl">
        Edit Archive Info
      </Typography>
      <IconButton
        aria-label="Open Delete Archive Section"
        onClick={() => {
          updateArchiveRatingModalState({ arcId, open: true });
          onClose();
        }}
      >
        <Star />
      </IconButton>
    </Grid>
  );

  return (
    <BaseDialog
      title={dialogTitle}
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="md"
    >
      <Grid className="pt-8 pb-4 px-0" container spacing={4}>
        {archiveDataReady ? (
          <>
            <Grid item xs={12}>
              <TextField
                id="edit-title-inputfield"
                label="Title"
                value={archiveData?.title}
                placeholder="Current Title"
                onChange={(e) =>
                  setArchiveData({ ...archiveData, title: e.target.value })
                }
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="edit-tags-inputfield"
                label="Tags"
                multiline
                rows={8}
                value={archiveData?.tags}
                placeholder="Current Tags"
                onChange={(e) =>
                  setArchiveData({ ...archiveData, tags: e.target.value })
                }
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="edit-summary-inputfield"
                label="Summary"
                multiline
                rows={8}
                value={archiveData?.summary ?? ""}
                placeholder="Current Summary"
                onChange={(e) =>
                  setArchiveData({ ...archiveData, summary: e.target.value })
                }
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="center">
                <Grid item xs={6}>
                  <Button fullWidth onClick={onUpdateButtonClick}>
                    Update Archive
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <Loading label="Getting archive info" loading centerText />
        )}
      </Grid>
    </BaseDialog>
  );
};
