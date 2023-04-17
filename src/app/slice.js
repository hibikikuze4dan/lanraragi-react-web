import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentArchiveId: "",
  randomArchives: [],
  baseUrl: "",
  pages: [],
  renderedPages: [],
  sectionVisibility: {
    random: false,
    images: false,
    address: true,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateCurrentArchiveId: (state, action) => {
      state.currentArchiveId = action.payload;
    },
    updateRandomArchives: (state, { payload }) => {
      state.randomArchives = [...payload];
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
  },
});

export const {
  updateCurrentArchiveId,
  updateRandomArchives,
  updateBaseUrl,
  updatePages,
  updateRenderedPages,
  updateSectionVisibility,
} = appSlice.actions;

export default appSlice.reducer;
