/* eslint-disable function-paren-newline */
import React, { useCallback } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Delete, Image, Save, Star } from "@mui/icons-material";
import { isMobile } from "react-device-detect";
import { BaseDialog } from "../base-dialog";
import { Loading } from "../../loading/loading";
import { useArchiveEditDialogModalLogic } from "./useArchiveEditDialogLogic";
import { regenArchiveThumbnail } from "../../../requests/regen_thumbnail";
import { DeleteArchive } from "../../delete-archive/delete-archive";

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
    showDelete,
    setShowDelete,
  } = useArchiveEditDialogModalLogic({ onCloseProp, arcId });

  const onUpdateArchiveRatingButtonClick = () => {
    updateArchiveRatingModalState({ arcId, open: true });
    onClose();
  };
  const onRegenArchiveThumbnailButtonClick = () => {
    regenArchiveThumbnail({ id: arcId });
  };
  const updateShowDelete = useCallback(
    (show) => setShowDelete(show),
    [showDelete]
  );
  const onDeleteIconClick = useCallback(() => {
    updateShowDelete(true);
  }, []);

  const dialogTitle = (
    <Grid container justifyContent="space-between">
      <Typography className="self-center ml-1 text-xl">
        {!showDelete ? "Edit Archive Info" : "Delete Archive?"}
      </Typography>
    </Grid>
  );
  const archiveTitle = archiveData?.title ?? "";

  return (
    <BaseDialog
      title={dialogTitle}
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="md"
    >
      <Grid
        className={`full-width m-0 pt-8 px-0 ${isMobile ? "pb-40" : "pb-4"}`}
        container
        spacing={4}
      >
        {!showDelete ? (
          <Loading
            label="Getting archive info"
            loading={!archiveDataReady}
            centerText
          >
            <Grid className="pl-0" item xs={12}>
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
            <Grid className="pl-0" item xs={12}>
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
            <Grid className="pl-0" item xs={12}>
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
              <Grid container justifyContent="center" spacing={4}>
                <Grid className="pl-0" item xs={12} md={6}>
                  <Button
                    startIcon={<Save />}
                    fullWidth
                    onClick={onUpdateButtonClick}
                  >
                    Save Archive Info Changes
                  </Button>
                </Grid>
                <Grid className="pl-0" item xs={12} md={6}>
                  <Button
                    startIcon={<Star />}
                    fullWidth
                    onClick={onUpdateArchiveRatingButtonClick}
                  >
                    Update Archive Rating
                  </Button>
                </Grid>
                <Grid className="pl-0" item xs={12} md={6}>
                  <Button
                    startIcon={<Image />}
                    fullWidth
                    onClick={onRegenArchiveThumbnailButtonClick}
                  >
                    Regen Archive Thumbnail
                  </Button>
                </Grid>
                <Grid className="pl-0" item xs={12} md={6}>
                  <Button
                    startIcon={<Delete />}
                    fullWidth
                    onClick={onDeleteIconClick}
                  >
                    Delete Archive
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Loading>
        ) : (
          <DeleteArchive
            arcId={arcId}
            title={archiveTitle}
            onBack={updateShowDelete}
            onClose={onClose}
          />
        )}
      </Grid>
    </BaseDialog>
  );
};
