import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentArchiveId: "",
  randomArchives: [],
  baseUrl: "",
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
  },
});

export const { updateCurrentArchiveId, updateRandomArchives, updateBaseUrl } =
  appSlice.actions;

export default appSlice.reducer;
