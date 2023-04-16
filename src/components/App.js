import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { Random } from "./random/random";
import { ImageList } from "./image-list/image-list";
import { getCurrentArchiveId } from "../app/selectors";
import { updateCurrentArchiveId } from "../app/slice";
import { RandomButton } from "./random-button/random-button";
import { Url } from "./url/url";
import { getBaseUrl } from "../storage/requests";

export default function App() {
  const dispatch = useDispatch();
  const baseUrl = getBaseUrl();
  const currentArchiveId = useSelector(getCurrentArchiveId);
  const [display, setDisplay] = useState({ random: true, images: false });

  const { random: displayRandom, images: displayImages } = display;
  const onArchiveClick = (archiveId) => {
    setDisplay({ random: false, images: true });
    dispatch(updateCurrentArchiveId(archiveId));
  };

  return (
    <Grid>
      <Grid>
        <Url />
        {displayRandom && baseUrl && <Random onArchiveClick={onArchiveClick} />}
        {displayImages && baseUrl && <ImageList arcId={currentArchiveId} />}
      </Grid>
      <Grid>
        <RandomButton displayRandom={displayRandom} setDisplay={setDisplay} />
      </Grid>
    </Grid>
  );
}
