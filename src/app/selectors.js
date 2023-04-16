import { createSelector } from "reselect";

const getState = (state) => state;

const getApp = createSelector(getState, (state) => state.app);

export const getCurrentArchiveId = createSelector(
  getApp,
  (app) => `${app.currentArchiveId}`
);

export const getCurrentRandomArchives = createSelector(getApp, (app) => [
  ...app.randomArchives,
]);

export const getBaseUrlSelector = createSelector(
  getApp,
  (app) => `${app.baseUrl}`
);
