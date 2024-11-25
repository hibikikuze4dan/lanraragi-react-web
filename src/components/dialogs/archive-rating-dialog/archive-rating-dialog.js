import React from "react";
import { isMobile } from "react-device-detect";
import { Grid } from "@mui/material";
import { BaseDialog } from "../base-dialog";
import { Rating } from "../../rating/rating";
import { getRatingType } from "../../../storage/ratings";

export const ArchiveRatingDialog = ({ arcId = "", open = false, onClose }) => {
  const ratingNamespace = getRatingType();

  return (
    <BaseDialog
      title={`New ${ratingNamespace} for Archive`}
      onClose={onClose}
      open={open}
      fullScreen={isMobile}
      maxWidth="100%"
    >
      <Grid
        className={`pt-8 pb-4 px-0 full-height ${isMobile ? "" : "m-0"}`}
        alignContent="center"
        container
        spacing={4}
      >
        <Rating arcId={arcId} useSelect={isMobile} postRatingChange={onClose} />
      </Grid>
    </BaseDialog>
  );
};
