import React, { useCallback, useState } from "react";
import {
  getNumArchivePerRow,
  setNumArchivePerRowForViewport,
} from "../../../../storage/archives";
import { useWidth } from "../../../../hooks/useWidth";
import { Slider } from "../../../slider/slider";

export const NumArchivesForRow = () => {
  const [numArchives, updateNumArchives] = useState(getNumArchivePerRow());
  const width = useWidth();
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  const numArchivesForViewport = numArchives[width];

  const onNumArchivesChange = useCallback(
    (value) => {
      updateNumArchives({ ...numArchives, [width]: value });
      setNumArchivePerRowForViewport(width, value);
    },
    [width, numArchives]
  );

  const portraitOrLandscape = isPortrait ? "Portrait" : "Landscape";

  const numArchivesLabel = (
    <>
      Number of archives displayed per row (Max: 10)
      <br />
      {portraitOrLandscape}: {numArchivesForViewport}
    </>
  );

  return (
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
  );
};
