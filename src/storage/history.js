import { ARCHIVE_HISTORY, SEARCH_HISTORY } from "./constants";

export const getSearchHistory = () => {
  const searchHistory = localStorage.getItem(SEARCH_HISTORY);
  return searchHistory ? [...JSON.parse(searchHistory)] : [];
};

export const addSearchToSearchHistory = (searchObject) => {
  const searchHistory = getSearchHistory();
  if (searchHistory.length > 9) {
    const minimizedSearchHistory = searchHistory.slice(1, 10);
    localStorage.setItem(
      SEARCH_HISTORY,
      JSON.stringify([...minimizedSearchHistory, searchObject])
    );
    return;
  }
  localStorage.setItem(
    SEARCH_HISTORY,
    JSON.stringify([...searchHistory, searchObject])
  );
};

export const updateSearchHistoryLastSearchPage = (page) => {
  const searchHistory = getSearchHistory();
  const searchHistoryLength = searchHistory.length;
  if (!searchHistoryLength) return;
  const lengthMinusOne = searchHistoryLength - 1;
  const lastItem = searchHistory[lengthMinusOne];
  localStorage.setItem(
    SEARCH_HISTORY,
    JSON.stringify([
      ...searchHistory.slice(0, lengthMinusOne),
      { ...lastItem, page },
    ])
  );
};

export const getArchiveHistory = () => {
  const archiveHistory = localStorage.getItem(ARCHIVE_HISTORY);
  return archiveHistory ? [...JSON.parse(archiveHistory)] : [];
};

export const addArchiveToArchiveHistory = (archiveObject) => {
  const archiveHistory = getArchiveHistory();
  if (archiveHistory.length > 19) {
    const minimizedarchiveHistory = archiveHistory.slice(1, 20);
    localStorage.setItem(
      ARCHIVE_HISTORY,
      JSON.stringify([...minimizedarchiveHistory, archiveObject])
    );
    return;
  }
  localStorage.setItem(
    ARCHIVE_HISTORY,
    JSON.stringify([...archiveHistory, archiveObject])
  );
};
