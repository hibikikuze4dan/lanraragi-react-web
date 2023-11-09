import { DISPLAY_METHOD_IMAGES, NO_FUN_MODE_ENABLED } from "./constants";

export const getImagesDisplayMethod = () =>
  localStorage.getItem(DISPLAY_METHOD_IMAGES) ?? "fill";

export const setImageDisplayMethod = (displayMethod) => {
  localStorage.setItem(DISPLAY_METHOD_IMAGES, displayMethod ?? "fill");
};

export const getNoFunModeEnabled = () =>
  localStorage.getItem(NO_FUN_MODE_ENABLED) ?? "No";

export const setNoFunModeEnabled = (displayMethod) => {
  localStorage.setItem(NO_FUN_MODE_ENABLED, displayMethod ?? "No");
};
