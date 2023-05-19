import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { THUMBNAIL_URL } from "../../requests/constants";
import {
  setAllSectionVisibilityFalse,
  updateArchiveOpenedFrom,
  updateCurrentArchiveId,
  updatePages,
  updateSectionVisibility,
} from "../../app/slice";

const styles = {
  paper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#363940",
  },
  image: { height: 300, width: "100%" },
  typography: {
    textTransform: "none",
    fontWeight: "bold",
    wordWrap: "break-word",
  },
  clamp: {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: "4",
    WebkitBoxOrient: "vertical",
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

  const src = `http://${baseUrl}${THUMBNAIL_URL.replace(":id", id)}`;

  return (
    <Paper id={`archive_${id}`} style={styles.paper}>
      <div>
        <div>
          <img
            id={`archive-img-${index}`}
            alt={`thumbnail for ${title}`}
            style={styles.image}
            src={src}
            placeholder={`Loading thumbnail for ${title}`}
            loading="lazy"
          />
        </div>
      </div>
      <div style={{ padding: "8px" }}>
        <button type="button" onClick={onTitleClick}>
          <Typography
            id={`archive-text-${index}`}
            sx={{ ...styles.typography, ...(!showFullTitle && styles.clamp) }}
            ref={ref}
          >
            {title}
          </Typography>
        </button>
      </div>
      <Grid container>
        <Grid item xs={6}>
          <Button
            aria-label={`Click to read ${title}`}
            variant="contained"
            onClick={onPress}
            fullWidth
            sx={{ backgroundColor: "#43464E", borderRadius: "4px 0 0 4px" }}
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
            sx={{ backgroundColor: "#43464E", borderRadius: "0 4px 4px 0" }}
          >
            Info
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Archive;
