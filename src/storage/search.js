import { SEARCH_STATS, SEARCH_STATS_DEFAULT } from "./constants";

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
