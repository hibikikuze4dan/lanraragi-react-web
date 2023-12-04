import React from "react";
import { Paper, Grid } from "@mui/material";
import { ARCHIVE_STYLES } from "./constants";
import { ArchiveActionButtons } from "./fragments/archive-action-buttons";
import { EditArchiveButton } from "./fragments/edit-archive-button";
import { Rating } from "../rating/rating";
import { useArchiveLogic } from "./useArchiveLogic";

const styles = ARCHIVE_STYLES;

export const Archive = ({
  baseUrl,
  currentArchiveId,
  id,
  imagesLoaded,
  index,
  isSearch,
  onArchiveImageLoad,
  onEditClick,
  onInfoClick,
  numOfArchivesRendered,
  setImagesLoaded,
  tags,
  title,
  wideImageDisplayMethod,
}) => {
  const {
    height,
    onLoad,
    onTitleClick,
    rating,
    ref,
    showFullTitle,
    src,
    wideImage,
    wideImageStyles,
    width,
  } = useArchiveLogic({
    baseUrl,
    currentArchiveId,
    id,
    imagesLoaded,
    numOfArchivesRendered,
    onArchiveImageLoad,
    setImagesLoaded,
    tags,
    wideImageDisplayMethod,
  });

  return (
    <Grid xs={1} sm={1} md={1} lg={1} xl={1} item sx={styles.grid}>
      <Paper id={`archive_${id}`} style={styles.paper}>
        <div style={{ ...styles.imageWrapper }}>
          <img
            id={`archive-img-${index}`}
            alt={`thumbnail for ${title}`}
            style={{
              ...styles.image,
              ...(wideImage ? wideImageStyles : styles.imageLong),
            }}
            src={src}
            height={height}
            width={width}
            onLoad={onLoad}
          />
        </div>
        <div style={{ padding: "8px" }}>
          <button type="button" onClick={onTitleClick}>
            <p
              id={`archive-text-${index}`}
              style={{
                ...styles.typography,
                ...(!showFullTitle && styles.clamp),
              }}
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
