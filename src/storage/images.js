import { DISPLAY_METHOD_IMAGES, NO_FUN_MODE_ENABLED, IMAGE_SPACING_LEVEL } from "./constants";

export const getImagesDisplayMethod = () => localStorage.getItem(DISPLAY_METHOD_IMAGES) ?? "fill";

export const setImageDisplayMethod = (displayMethod) => {
  localStorage.setItem(DISPLAY_METHOD_IMAGES, displayMethod ?? "fill");
};

export const getNoFunModeEnabled = () => localStorage.getItem(NO_FUN_MODE_ENABLED) ?? "No";

export const setNoFunModeEnabled = (displayMethod) => {
  localStorage.setItem(NO_FUN_MODE_ENABLED, displayMethod ?? "No");
};

export const getImageSpacingLevel = () => {
  const spacingLevel = localStorage.getItem(IMAGE_SPACING_LEVEL);
  return spacingLevel ? Number(spacingLevel) : 0;
};

export const setImageSpacingLevel = (spacingLevel) => {
  localStorage.setItem(IMAGE_SPACING_LEVEL, `${spacingLevel}`);
};
