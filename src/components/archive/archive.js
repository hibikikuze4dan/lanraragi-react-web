import React, { useCallback, useEffect, useRef, useState } from "react";
import { Paper, Grid } from "@mui/material";
import { useImageSize } from "react-image-size";
import { THUMBNAIL_URL } from "../../requests/constants";
import { Loading } from "../loading/loading";
import { ARCHIVE_STYLES } from "./constants";
import { ArchiveActionButtons } from "./fragments/archive-action-buttons";
import { getTagsObjectFromTagsString, httpOrHttps } from "../../utils";
import { EditArchiveButton } from "./fragments/edit-archive-button";
import { Rating } from "../rating/rating";
import { getRatingType } from "../../storage/ratings";

const styles = ARCHIVE_STYLES;

export const Archive = ({
  id,
  tags,
  title,
  index,
  onInfoClick,
  onEditClick,
  baseUrl,
  currentArchiveId,
  isSearch,
  wideImageDisplayMethod,
}) => {
  const [showFullTitle, updateShowFullTitle] = useState(false);
  const src = `${httpOrHttps()}${baseUrl}${THUMBNAIL_URL.replace(":id", id)}`;
  const [dimensions, { loading }] = useImageSize(src);
  const width = dimensions?.width ?? 0;
  const height = dimensions?.height ?? 0;
  const wideImage = width > height;
  const diffBetweenMaxHeightAndImageHeight = 300 - height;
  const isDiffBetweenMaxHeightAndImageHeightPositive =
    diffBetweenMaxHeightAndImageHeight > 0;
  const extraMargin = isDiffBetweenMaxHeightAndImageHeightPositive
    ? `${diffBetweenMaxHeightAndImageHeight * 0.5}px`
    : 0;
  const wideImageStyles = {
    ...styles.imageWide,
    ...(wideImageDisplayMethod && { objectFit: wideImageDisplayMethod }),
    ...(isDiffBetweenMaxHeightAndImageHeightPositive && {
      marginTop: extraMargin,
      marginBottom: extraMargin,
    }),
  };
  const rating =
    getTagsObjectFromTagsString(tags ?? "")?.[getRatingType()]?.[0] ?? null;

  const ref = useRef();

  const onTitleClick = useCallback(() => {
    updateShowFullTitle(!showFullTitle);
  }, [showFullTitle]);

  useEffect(() => {
    if (id === currentArchiveId && !loading)
      ref?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [id, currentArchiveId, ref, loading]);

  return (
    <Grid xs={1} sm={1} md={1} lg={1} xl={1} item sx={styles.grid}>
      <Paper id={`archive_${id}`} style={styles.paper}>
        <div style={styles.imageWrapper}>
          <Loading
            label="Loading thumbnail"
            loading={loading}
            height={styles.image.maxHeight}
          >
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
              loading="lazy"
            />
          </Loading>
        </div>
        <div style={{ padding: "8px" }}>
          <button type="button" onClick={onTitleClick}>
            <p
              id={`archive-text-${index}`}
              style={{
                ...styles.typography,
                ...(!showFullTitle && styles.clamp),
              }}
              ref={ref}
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
    </Grid>
  );
};

export default Archive;
