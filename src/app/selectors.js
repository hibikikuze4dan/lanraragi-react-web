/* eslint-disable function-paren-newline */
/* eslint-disable no-confusing-arrow */
import { createSelector } from "reselect";
import { getNumArchivesToRender } from "../storage/archives";
import { firstLetterToUppercase } from "../utils";

const getState = (state) => state;

const getApp = createSelector(getState, (state) => state.app);

export const getCurrentArchiveId = createSelector(
  getApp,
  (app) => `${app?.currentArchiveId ?? ""}`
);

export const getCurrentRandomArchives = createSelector(getApp, (app) => [
  ...(app?.randomArchives ?? []),
]);

export const getCurrentSearchArchives = createSelector(getApp, (app) => [
  ...(app?.searchArchives ?? []),
]);

export const getSearchArchivesTotal = createSelector(
  getApp,
  (app) => app?.searchArchivesTotal ?? 0
);

export const getRandomAndSearchArchives = createSelector(
  getCurrentRandomArchives,
  getCurrentSearchArchives,
  (randomArchives, searchArchives) => [...randomArchives, ...searchArchives]
);

export const getCurrentArchiveFromRandomAndResults = createSelector(
  getCurrentArchiveId,
  getRandomAndSearchArchives,
  (arcId, archives) => archives.find((arc) => arc?.arcid === arcId) ?? {}
);

export const getAmountOfSearchArchives = createSelector(
  getSearchArchivesTotal,
  (total) => total
);

export const getCurrentArciveRandomArchivesIndex = createSelector(
  getCurrentArchiveId,
  getCurrentRandomArchives,
  (arcId, randomArchives) => {
    const index = randomArchives.findIndex((arc) => arcId === arc.arcid);
    return index === -1 ? 0 : index;
  }
);

export const getCurrentPages = createSelector(getApp, (app) => [
  ...(app?.pages ?? []),
]);

export const getCurrentRenderedPages = createSelector(getApp, (app) => [
  ...(app?.renderedPages ?? []),
]);

export const getBaseUrlSelector = createSelector(
  getApp,
  (app) => `${app?.baseUrl ?? ""}`
);

export const getSectionVisibilityObject = createSelector(getApp, (app) => ({
  ...(app?.sectionVisibility ?? {}),
}));

export const getVisibleSection = createSelector(
  getSectionVisibilityObject,
  (sectionVisibilityObject) =>
    Object.keys(sectionVisibilityObject).find(
      (section) => sectionVisibilityObject[section] === true
    )
);

export const getSectionVisibilityObjectWithAllFalse = createSelector(
  getSectionVisibilityObject,
  (sectionVisibilityObject) =>
    Object.keys(sectionVisibilityObject).reduce(
      (acc, sec) => ({ ...acc, [sec]: false }),
      {}
    )
);

export const getSectionVisibilityObjectForSideNavbar = createSelector(
  getSectionVisibilityObject,
  (sectionVisibilityObject) => [
    ...Object.keys(sectionVisibilityObject)
      .filter((section) => section !== "address")
      .map((section) => ({
        id: section,
        label: firstLetterToUppercase(section),
        visible: sectionVisibilityObject[section],
      })),
  ]
);

export const shouldScrollToArchive = createSelector(
  getSectionVisibilityObject,
  getCurrentArciveRandomArchivesIndex,
  ({ images, random }, index) => ({
    shouldScroll: images && !random,
    scrollIndex: index,
  })
);

export const getSearchPage = createSelector(
  getApp,
  (app) => app?.searchPage ?? 1
);

export const getSearchFilter = createSelector(
  getApp,
  (app) => app?.searchFilter ?? ""
);

export const getMaxPages = createSelector(
  getSearchArchivesTotal,
  (total) => (breakpoint) => {
    const totalArchivesAmount = total ?? 0;
    const maxNum = getNumArchivesToRender();
    const maxPageNumber = totalArchivesAmount / maxNum[breakpoint];
    return totalArchivesAmount % maxNum[breakpoint] === 0
      ? maxPageNumber
      : Math.ceil(maxPageNumber);
  }
);

export const getCategories = createSelector(getApp, (app) => [
  ...(app?.categories ?? []),
]);

export const getInfoDialogArchiveId = createSelector(
  getApp,
  (app) => `${app?.infoDialogArchiveId ?? ""}`
);

export const getArchiveCategories = createSelector(
  getInfoDialogArchiveId,
  getCategories,
  (archiveId, categories) =>
    categories.reduce((acc, category) => {
      const archivesIds = category?.archives;
      if (archivesIds?.length) return acc;
      if (archivesIds?.includes(archiveId)) return { ...acc, category };
      return acc;
    }, {})
);

export const getDisplayNavbar = createSelector(
  getApp,
  (app) => !!app?.displayNavbar
);

export const getArchiveOpenedFrom = createSelector(
  getApp,
  (app) => app?.archiveOpenedFrom ?? "random"
);

export const getSearchSort = createSelector(
  getApp,
  (app) => app?.searchSort ?? "date_added"
);

export const getSearchSortDirection = createSelector(
  getApp,
  (app) => app?.searchSortDirection ?? "desc"
);

export const getSearchCategory = createSelector(
  getApp,
  (app) => app?.searchCategory ?? {}
);

export const getLoading = createSelector(getApp, (app) => app?.loading ?? {});

export const getDisplaySnackbar = createSelector(
  getApp,
  (app) => app?.displaySnackbar ?? {}
);

export const getTags = createSelector(getApp, (app) => app?.tags ?? []);

export const getAutocompleteTags = createSelector(getTags, (tags) =>
  tags.map((tag) => {
    const namespace = tag?.namespace;
    const text = tag?.text;
    return namespace ? `${namespace}:${text}` : text;
  })
);

export const getUsePaginatedSearch = createSelector(
  getApp,
  (app) => app.settings.usePaginatedSearch
);
