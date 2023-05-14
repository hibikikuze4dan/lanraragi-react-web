import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayNavbar: true,
  currentArchiveId: "",
  randomArchives: [],
  searchArchives: [],
  categories: [],
  baseUrl: "",
  searchCategory: {},
  searchFilter: "",
  searchSort: "date_added",
  searchSortDirection: "desc",
  searchPage: 1,
  pages: [],
  renderedPages: [],
  infoDialogArchiveId: "",
  sectionVisibility: {
    random: true,
    search: false,
    images: false,
    settings: false,
  },
  loading: {
    search: false,
    random: false,
    images: false,
  },
  archiveOpenedFrom: "random",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateCurrentArchiveId: (state, action) => {
      state.currentArchiveId = action.payload;
    },
    updateRandomArchives: (state, { payload }) => {
      state.randomArchives = [...payload];
    },
    updateSearchArchives: (state, { payload }) => {
      state.searchArchives = [...payload];
    },
    updateBaseUrl: (state, { payload }) => {
      state.baseUrl = `${payload}`;
    },
    updatePages: (state, { payload }) => {
      state.pages = [...payload];
    },
    updateRenderedPages: (state, { payload }) => {
      state.renderedPages = [...payload];
    },
    updateSectionVisibility: (state, { payload }) => {
      state.sectionVisibility = { ...state.sectionVisibility, ...payload };
    },
    updateLoading: (state, { payload }) => {
      state.loading = { ...state.loading, ...payload };
    },
    setAllSectionVisibilityFalse: (state) => {
      state.sectionVisibility = {
        ...Object.keys(state.sectionVisibility).reduce(
          (acc, section) => ({ ...acc, [section]: false }),
          {}
        ),
      };
    },
    updateSearchPage: (state, { payload }) => {
      state.searchPage = Number(payload) || 1;
    },
    updateSearchFilter: (state, { payload }) => {
      state.searchFilter = payload ?? "";
    },
    updateCategories: (state, { payload }) => {
      state.categories = [...payload];
    },
    updateInfoDialogArchiveId: (state, { payload }) => {
      state.infoDialogArchiveId = payload;
    },
    updateDisplayNavbar: (state, { payload }) => {
      state.displayNavbar = payload;
    },
    updateArchiveOpenedFrom: (state, { payload }) => {
      state.archiveOpenedFrom = payload;
    },
    updateSearchCategory: (state, { payload }) => {
      state.searchCategory = { ...payload };
    },
    updateSearchSort: (state, { payload }) => {
      state.searchSort = payload;
    },
    updateSearchSortDirection: (state, { payload }) => {
      state.searchSortDirection = payload;
    },
  },
});

export const {
  updateCurrentArchiveId,
  updateRandomArchives,
  updateBaseUrl,
  updatePages,
  updateRenderedPages,
  updateSectionVisibility,
  updateSearchArchives,
  updateSearchPage,
  updateSearchFilter,
  setAllSectionVisibilityFalse,
  updateCategories,
  updateInfoDialogArchiveId,
  updateDisplayNavbar,
  updateArchiveOpenedFrom,
  updateSearchCategory,
  updateSearchSort,
  updateSearchSortDirection,
  updateLoading,
} = appSlice.actions;

export default appSlice.reducer;
