import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { getArchiveThumbnail } from "../../requests/thumbnail";

export const Archive = ({ id, title, onArchiveClick }) => {
  const [thumbnail, updateThumbnail] = useState(null);
  const onPress = useCallback(() => onArchiveClick(id), [onArchiveClick, id]);

  useEffect(() => {
    if (!thumbnail) {
      const callNewThumb = async () => {
        updateThumbnail(await getArchiveThumbnail(id));
      };
      callNewThumb();
    }
  }, [thumbnail, id]);

  return (
    <Button onClick={onPress} sx={{ textTransform: "none" }}>
      <Grid spacing={2} container direction="column" justifyContent="center">
        {thumbnail ? (
          <Grid item container justifyContent="center">
            <img
              alt="thumbnail for archive"
              style={{ height: 300, width: 250 }}
              src={`data:image/jpeg;base64,${thumbnail}`}
            />
          </Grid>
        ) : null}
        <Grid item container justifyContent="center">
          <Typography>{title}</Typography>
        </Grid>
      </Grid>
    </Button>
  );
};

export default Archive;
