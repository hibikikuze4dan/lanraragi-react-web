import React from "react";
import { Paper, Grid } from "@mui/material";
import { ArchiveActionButtons } from "./fragments/archive-action-buttons";
import { EditArchiveButton } from "./fragments/edit-archive-button";
import { Rating } from "../rating/rating";
import { useArchiveLogic } from "./useArchiveLogic";

export const Archive = ({
  baseUrl,
  currentArchiveId,
  id,
  index,
  isSearch,
  onEditClick,
  onInfoClick,
  numOfArchivesRendered,
  tags,
  title,
}) => {
  const { onLoad, onTitleClick, rating, ref, showFullTitle, src } =
    useArchiveLogic({
      baseUrl,
      currentArchiveId,
      id,
      numOfArchivesRendered,
      tags,
    });

  return (
    <Grid xs={1} sm={1} md={1} lg={1} xl={1} item>
      <Paper
        className="h-full flex flex-col justify-between relative bg-[#363940]"
        id={`archive_${id}`}
      >
        <div className="overflow-hidden min-h-[300px] p-2 flex flex-row justify-center">
          <img
            className="object-contain w-max max-w-full max-h-[300px] rounded"
            id={`archive-img-${index}`}
            alt={`thumbnail for ${title}`}
            src={src}
            onLoad={onLoad}
          />
        </div>
        <div className="p-2">
          <button className="w-full" type="button" onClick={onTitleClick}>
            <p
              className={`normal-case font-bold m-0 text-sm ${
                showFullTitle ? "" : "clamp"
              }`}
              id={`archive-text-${index}`}
            >
              {title}
            </p>
          </button>
        </div>
        {rating && (
          <div>
            <Rating readOnly arcId={id} size="small" ratingProp={rating} />
          </div>
        )}
        <ArchiveActionButtons
          id={id}
          title={title}
          currentArchiveId={currentArchiveId}
          isSearch={isSearch}
          onInfoClick={onInfoClick}
        />
        <EditArchiveButton id={id} title={title} onEditClick={onEditClick} />
      </Paper>
      <span ref={ref} />
    </Grid>
  );
};

export default Archive;
