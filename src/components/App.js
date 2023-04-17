import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { Random } from "./random/random";
import { ImageList } from "./image-list/image-list";
import {
  getCurrentArchiveId,
  getSectionVisibilityObject,
  getSectionVisibilityObjectWithAllFalse,
} from "../app/selectors";
import { updateCurrentArchiveId, updateSectionVisibility } from "../app/slice";
import { Url } from "./url/url";
import { Navbar } from "./navbar/navbar";

export default function App() {
  const dispatch = useDispatch();
  const currentArchiveId = useSelector(getCurrentArchiveId);
  const { random, images, address } = useSelector(getSectionVisibilityObject);
  const allSectionsFalse = useSelector(getSectionVisibilityObjectWithAllFalse);

  const onArchiveClick = (archiveId) => {
    dispatch(updateSectionVisibility({ ...allSectionsFalse, images: true }));
    dispatch(updateCurrentArchiveId(archiveId));
  };

  return (
    <div style={{ display: "flex" }}>
      <Grid>
        <Grid>
          {address && <Url />}
          {random && <Random onArchiveClick={onArchiveClick} />}
          {images && <ImageList arcId={currentArchiveId} />}
        </Grid>
      </Grid>
      <Navbar />
    </div>
  );
}
