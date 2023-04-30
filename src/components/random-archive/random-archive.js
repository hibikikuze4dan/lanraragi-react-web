import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getArchiveThumbnail } from "../../requests/thumbnail";
import {
  updateCurrentArchiveId,
  updateSectionVisibility,
} from "../../app/slice";
import {
  getCurrentArchiveId,
  getCurrentArciveRandomArchivesIndex,
  getSectionVisibilityObjectWithAllFalse,
} from "../../app/selectors";
import { scrollIntoViewByElement } from "../../utils";

const styles = {
  paper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#363940",
    color: "white",
  },
  image: { height: 300, width: "100%" },
};

export const RandomArchive = ({ id, title, index, onInfoClick }) => {
  const dispatch = useDispatch();
  const [thumbnail, updateThumbnail] = useState(null);
  const currentArchiveId = useSelector(getCurrentArchiveId);
  const currentArchiveIndex = useSelector(getCurrentArciveRandomArchivesIndex);
  const allSectionsFalse = useSelector(getSectionVisibilityObjectWithAllFalse);
  const onPress = useCallback(() => {
    dispatch(updateSectionVisibility({ ...allSectionsFalse, images: true }));
    dispatch(updateCurrentArchiveId(id));
    document.getElementById(`images-list-${id}`);
  }, [id]);

  useEffect(() => {
    if (!thumbnail) {
      const callNewThumb = async () => {
        updateThumbnail(await getArchiveThumbnail(id));
      };
      callNewThumb();
    }
    if (id === currentArchiveId) {
      scrollIntoViewByElement(`archive-text-${currentArchiveIndex}`, 500);
    }
  }, [thumbnail, id, currentArchiveId, currentArchiveIndex]);

  return (
    <Paper id={`archive_${id}`} style={styles.paper}>
      {thumbnail ? (
        <div>
          <div>
            <img
              alt="thumbnail for archive"
              style={styles.image}
              src={`data:image/jpeg;base64,${thumbnail}`}
            />
          </div>
        </div>
      ) : null}
      <div style={{ padding: "8px" }}>
        <Typography
          id={`archive-text-${index}`}
          sx={{ textTransform: "none", fontWeight: "bold" }}
        >
          {title}
        </Typography>
      </div>
      <Grid container>
        <Grid item xs={6}>
          <Button
            variant="contained"
            onClick={onPress}
            fullWidth
            sx={{ backgroundColor: "#43464E" }}
          >
            Read
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            onClick={onInfoClick}
            fullWidth
            sx={{ backgroundColor: "#43464E" }}
          >
            Info
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RandomArchive;
