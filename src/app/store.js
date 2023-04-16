import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slice";

export const store = configureStore({
  reducer: {
    app: appSlice,
  },
});
