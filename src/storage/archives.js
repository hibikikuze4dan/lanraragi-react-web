import {
  DISPLAY_METHOD_WIDE,
  NUM_ARCHIVES_PER_ROW as NUM_ARCHIVES_PER_ROW_STRING,
  NUM_ARCHIVES_TO_RENDER,
} from "./constants";
import { NUM_ARCHIVES_FOR_RENDER, NUM_ARCHIVES_PER_ROW } from "../constants";

const validate = (value, validateAgainst) =>
  Object.keys(validateAgainst).reduce(
    (acc, viewPort) => ({
      ...acc,
      [viewPort]: value[viewPort] ?? validateAgainst[viewPort],
    }),
    {}
  );

export const getNumArchivePerRow = () => {
  const value = localStorage.getItem(`${NUM_ARCHIVES_PER_ROW_STRING}`);
  return value
    ? validate(JSON.parse(value), NUM_ARCHIVES_PER_ROW)
    : NUM_ARCHIVES_PER_ROW;
};

export const setNumArchivePerRowForViewport = (viewPort, num) => {
  const value = localStorage.getItem(`${NUM_ARCHIVES_PER_ROW_STRING}`);
  const jsonValue = value ? JSON.parse(value) : {};
  localStorage.setItem(
    `${NUM_ARCHIVES_PER_ROW_STRING}`,
    JSON.stringify({ ...jsonValue, [viewPort]: num })
  );
};

export const getNumArchivesToRender = () => {
  const value = localStorage.getItem(`${NUM_ARCHIVES_TO_RENDER}`);
  return value
    ? validate(JSON.parse(value), NUM_ARCHIVES_FOR_RENDER)
    : NUM_ARCHIVES_FOR_RENDER;
};

export const setNumArchivesToRender = (viewPort, num) => {
  const value = localStorage.getItem(`${NUM_ARCHIVES_TO_RENDER}`);
  const jsonValue = value ? JSON.parse(value) : {};
  localStorage.setItem(
    `${NUM_ARCHIVES_TO_RENDER}`,
    JSON.stringify({ ...jsonValue, [viewPort]: num })
  );
};

export const getDisplayMethodForWideArchive = () =>
  localStorage.getItem(DISPLAY_METHOD_WIDE) ?? "contain";

export const setDisplayMethodForWideArchive = (displayMethod) => {
  localStorage.setItem(DISPLAY_METHOD_WIDE, displayMethod);
};
