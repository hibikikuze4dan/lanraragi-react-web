import React, { useCallback, useEffect, useState } from "react";
import { Button, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getArchiveThumbnail } from "../../requests/thumbnail";
import {
  updateCurrentArchiveId,
  updateSectionVisibility,
} from "../../app/slice";
import { getSectionVisibilityObjectWithAllFalse } from "../../app/selectors";

const styles = {
  paper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  image: { height: 300, width: "100%" },
};

export const Archive = ({ id, title, index }) => {
  const dispatch = useDispatch();
  const [thumbnail, updateThumbnail] = useState(null);
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
  }, [thumbnail, id]);

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
      <div>
        <div>
          <Typography
            id={`archive-text-${index}`}
            sx={{ textTransform: "none" }}
          >
            {title}
          </Typography>
        </div>
      </div>
      <Button variant="outlined" fullWidth onClick={onPress}>
        Read
      </Button>
    </Paper>
  );
};

export default Archive;
