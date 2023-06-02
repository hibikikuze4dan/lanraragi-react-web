import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Grid, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { useImageSize } from "react-image-size";
import { THUMBNAIL_URL } from "../../requests/constants";
import {
  setAllSectionVisibilityFalse,
  updateArchiveOpenedFrom,
  updateCurrentArchiveId,
  updatePages,
  updateSectionVisibility,
} from "../../app/slice";
import { Loading } from "../loading/loading";

const styles = {
  paper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#363940",
  },
  image: {
    height: 300,
    objectFit: "cover",
    objectPosition: "left",
    width: "100%",
    borderRadius: "4px",
  },
  typography: {
    textTransform: "none",
    fontWeight: "bold",
    wordWrap: "anywhere",
    fontSize: ".8 rem",
    margin: 0,
  },
  clamp: {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: "4",
    WebkitBoxOrient: "vertical",
  },
  imageWrapper: {
    overflow: "hiddem",
    padding: ".5rem .5rem",
  },
  infoButton: {
    backgroundColor: "#43464E",
    borderRadius: "0 0 4px 0",
    boxShadow: "none",
    borderLeft: "1px solid #363940",
  },
  readButton: {
    backgroundColor: "#43464E",
    borderRadius: "0 0 0 4px",
    boxShadow: "none",
    borderRight: "1px solid #363940",
  },
};

export const Archive = ({
  id,
  title,
  index,
  onInfoClick,
  baseUrl,
  currentArchiveId,
  isSearch,
}) => {
  const dispatch = useDispatch();
  const [showFullTitle, updateShowFullTitle] = useState(false);
  const src = `http://${baseUrl}${THUMBNAIL_URL.replace(":id", id)}`;
  const [, { loading }] = useImageSize(src);

  const onPress = useCallback(() => {
    if (currentArchiveId !== id) dispatch(updatePages([]));
    dispatch(setAllSectionVisibilityFalse());
    dispatch(updateSectionVisibility({ images: true }));
    dispatch(updateCurrentArchiveId(id));
    dispatch(updateArchiveOpenedFrom(isSearch ? "search" : "random"));
  }, [id, currentArchiveId, isSearch]);
  const ref = useRef();

  const onTitleClick = useCallback(() => {
    updateShowFullTitle(!showFullTitle);
  }, [showFullTitle]);

  useEffect(() => {
    if (id === currentArchiveId)
      ref?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [id, currentArchiveId, ref]);

  return (
    <Paper id={`archive_${id}`} style={styles.paper}>
      <div>
        <div style={styles.imageWrapper}>
          <Loading
            label="Loading thumbnail"
            loading={loading}
            height={styles.image.height}
          >
            <img
              id={`archive-img-${index}`}
              alt={`thumbnail for ${title}`}
              style={styles.image}
              src={src}
              loading="lazy"
            />
          </Loading>
        </div>
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
      <Grid container>
        <Grid item xs={6}>
          <Button
            aria-label={`Click to read ${title}`}
            variant="contained"
            onClick={onPress}
            fullWidth
            sx={styles.readButton}
          >
            Read
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            aria-label={`Click for info and to modify categories for ${title}`}
            variant="contained"
            onClick={onInfoClick}
            fullWidth
            sx={styles.infoButton}
          >
            Info
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Archive;
