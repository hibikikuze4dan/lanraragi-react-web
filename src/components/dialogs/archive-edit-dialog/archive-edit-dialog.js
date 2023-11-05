/* eslint-disable function-paren-newline */
import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import getArchiveMetaData, {
  updateArchiveMetadata,
} from "../../../requests/metadata";
import { getArchiveCategories } from "../../../requests/categories";
import { BaseDialog } from "../base-dialog";

export const ArchiveEditDialog = ({ arcId, onCloseProp, open }) => {
  const [archiveData, setArchiveData] = useState({});
  const [updateResponse, setUpdateResponse] = useState({
    error: "",
    operation: "update_metadata",
    success: 0,
    successMessage: null,
  });

  const onClose = useCallback(() => {
    onCloseProp();
  }, [onCloseProp]);
  const onUpdateButtonClick = useCallback(() => {
    updateArchiveMetadata({
      id: arcId,
      title: archiveData?.title,
      tags: archiveData?.tags,
    })
      .then((res) =>
        setUpdateResponse({
          ...res,
          successMessage:
            "Congrats! The archive's information has been updated!",
        })
      )
      .catch(() =>
        setUpdateResponse({
          ...updateResponse,
          error: "Sorry, something seems to have gone wrong.",
        })
      );
  });

  useEffect(() => {
    const getArchiveData = async () => {
      const metaData = await getArchiveMetaData(arcId);
      const categoriesData = await getArchiveCategories(arcId);
      setArchiveData({
        ...metaData,
        categories: categoriesData?.categories ?? [],
      });
    };

    if (arcId) getArchiveData();
  }, [arcId, setArchiveData]);

  const dialogTitle = (
    <Grid container justifyContent="space-between">
      <Typography sx={{ alignSelf: "center", ml: "1rem", fontSize: "1.25rem" }}>
        Edit Archive Info
      </Typography>
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
      <Grid container spacing={4} sx={{ padding: "2rem 0 1rem 0" }}>
        <Grid item xs={12}>
          <TextField
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
          <Grid container justifyContent="center">
            <Grid item xs={6}>
              <Button fullWidth onClick={onUpdateButtonClick}>
                Update Archive
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </BaseDialog>
  );
};
