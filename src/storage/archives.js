import {
  NUM_ARCHIVES_PER_ROW as NUM_ARCHIVES_PER_ROW_STRING,
  NUM_ARCHIVES_TO_RENDER,
  SEARCH_STATS,
  SEARCH_STATS_DEFAULT,
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

export const setSearchStats = (stats) => {
  const oldStats =
    JSON.parse(localStorage.getItem(SEARCH_STATS)) ?? SEARCH_STATS_DEFAULT;
  localStorage.setItem(
    SEARCH_STATS,
    JSON.stringify(
      Object.keys(oldStats).reduce((acc, key) => {
        const accumulator = acc;
        accumulator[key] =
          stats[key] !== undefined ? stats[key] : oldStats[key] ?? "";
        return accumulator;
      }, {})
    )
  );
};

export const getSearchStats = () => {
  const localStorageValue =
    JSON.parse(localStorage.getItem(SEARCH_STATS)) ?? {};
  return {
    filter: localStorageValue.filter ?? "",
    page: localStorageValue.page ?? 1,
    sort: localStorageValue.sort ?? "date_added",
    direction: localStorageValue.direction ?? "desc",
    category: localStorageValue.category ?? "",
  };
};
