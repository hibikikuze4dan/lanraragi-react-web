import React, { useCallback, useState } from "react";
import { Slider } from "../../../slider/slider";
import {
  getNumArchivesToRender,
  setNumArchivesToRender,
} from "../../../../storage/archives";
import { useWidth } from "../../../../hooks/useWidth";

export const MaxArchivesForViewPort = () => {
  const [archivesToRender, updateArchivesToRender] = useState(
    getNumArchivesToRender()
  );
  const width = useWidth();
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

  const onArchiveToRenderChange = useCallback(
    (value) => {
      updateArchivesToRender({ ...archivesToRender, [width]: value });
      setNumArchivesToRender(width, value);
    },
    [width, archivesToRender]
  );

  const portraitOrLandscape = isPortrait ? "Portrait" : "Landscape";

  const maxArchivesForViewport = archivesToRender[width];
  const maxArchivesLabel = (
    <>
      Max number of archives displayed at once (Max: 100)
      <br />
      {portraitOrLandscape}: {maxArchivesForViewport}
    </>
  );

  return (
    <div className="p-4">
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
  );
};
