import { createSlice } from "@reduxjs/toolkit";
import { getNewSearchArchivesArrayAfterDeletingArchiveId } from "../utils";
import { getSearchStats } from "../storage/search";

const initialState = {
  archiveOpenedFrom: "random",
  baseUrl: "",
  categories: [],
  currentArchiveId: "",
  displayNavbar: true,
  displayDeleteSnackbar: false,
  infoDialogArchiveId: "",
  pages: [],
  randomArchives: [],
  renderedPages: [],
  searchArchives: [],
  searchCategory: {},
  searchFilter: "",
  searchPage: 1,
  searchSort: "date_added",
  searchSortDirection: "desc",
  tags: [],
  sectionVisibility: {
    random: true,
    search: false,
    history: false,
    images: false,
    settings: false,
  },
  loading: {
    onLoadSearch: false,
    search: false,
    random: false,
    images: false,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState: () => {
    const {
      sort: searchSort,
      direction: searchSortDirection,
      filter: searchFilter,
      page: searchPage,
      category: id,
    } = getSearchStats();
    return {
      ...initialState,
      searchSort,
      searchSortDirection,
      searchFilter,
      searchPage,
      searchCategory: {
        id,
      },
    };
  },
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
    updateDisplayDeleteSnackbar: (state, { payload }) => {
      state.displayDeleteSnackbar = payload;
    },
    deleteArchiveFromRandomArchives: (state, { payload }) => {
      state.randomArchives = [
        ...state.randomArchives.filter(({ arcid }) => arcid !== payload),
      ];
    },
    deleteArchiveFromSearchArchives: (state, { payload }) => {
      state.searchArchives = [
        ...getNewSearchArchivesArrayAfterDeletingArchiveId(
          state.searchArchives,
          payload
        ),
      ];
    },
    updateTags: (state, { payload }) => {
      state.tags = [...payload];
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
  updateDisplayDeleteSnackbar,
  deleteArchiveFromRandomArchives,
  deleteArchiveFromSearchArchives,
  updateTags,
} = appSlice.actions;

export default appSlice.reducer;
