import React, { useCallback, useState } from "react";
import { Grid } from "@mui/material";
import { Slider } from "../slider/slider";
import {
  getNumArchivePerRow,
  getNumArchivesToRender,
  setNumArchivePerRowForViewport,
  setNumArchivesToRender,
} from "../../storage/archives";
import { useWidth } from "../../hooks/useWidth";

export const Settings = () => {
  const [numArchives, updateNumArchives] = useState(getNumArchivePerRow());
  const [archivesToRender, updateArchivesToRender] = useState(
    getNumArchivesToRender()
  );
  const width = useWidth();
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

  const onNumArchivesChange = useCallback(
    (value) => {
      updateNumArchives({ ...numArchives, [width]: value });
      setNumArchivePerRowForViewport(width, value);
    },
    [width, numArchives]
  );
  const onArchiveToRenderChange = useCallback(
    (value) => {
      updateArchivesToRender({ ...archivesToRender, [width]: value });
      setNumArchivesToRender(width, value);
    },
    [width, archivesToRender]
  );

  const portraitOrLandscape = isPortrait ? "Portrait" : "Landscape";

  const numArchivesForViewport = numArchives[width];
  const numArchivesLabel = (
    <>
      Number of archives displayed per row (Max: 10)
      <br />
      {portraitOrLandscape}: {numArchivesForViewport}
    </>
  );
  const maxArchivesForViewport = archivesToRender[width];
  const maxArchivesLabel = (
    <>
      Max number of archives displayed at once (Max: 50)
      <br />
      {portraitOrLandscape}: {maxArchivesForViewport}
    </>
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <div style={{ padding: "1rem" }}>
          <Slider
            min={1}
            max={10}
            step={1}
            defaultValue={numArchivesForViewport}
            value={numArchivesForViewport}
            onChange={onNumArchivesChange}
            label={numArchivesLabel}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div style={{ padding: "1rem" }}>
          <Slider
            min={10}
            max={100}
            step={1}
            defaultValue={maxArchivesForViewport}
            value={maxArchivesForViewport}
            onChange={onArchiveToRenderChange}
            label={maxArchivesLabel}
            marks={false}
          />
        </div>
      </Grid>
    </Grid>
  );
};
