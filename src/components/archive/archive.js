import React, { useCallback } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { THUMBNAIL_URL } from "../../requests/constants";
import {
  updateCurrentArchiveId,
  updateSectionVisibility,
} from "../../app/slice";
import { getSectionVisibilityObjectWithAllFalse } from "../../app/selectors";
import { getBaseUrl } from "../../storage/requests";

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

export const Archive = ({ id, title, index, onInfoClick }) => {
  const dispatch = useDispatch();
  const allSectionsFalse = useSelector(getSectionVisibilityObjectWithAllFalse);
  const src = `http://${getBaseUrl()}${THUMBNAIL_URL.replace(":id", id)}`;
  const onPress = useCallback(() => {
    dispatch(updateSectionVisibility({ ...allSectionsFalse, images: true }));
    dispatch(updateCurrentArchiveId(id));
  }, [id]);

  return (
    <Paper id={`archive_${id}`} style={styles.paper}>
      <div>
        <div>
          <img
            alt={`thumbnail for ${title}`}
            style={styles.image}
            src={src}
            placeholder={`Loading thumbnail for ${title}`}
          />
        </div>
      </div>
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

export default Archive;
