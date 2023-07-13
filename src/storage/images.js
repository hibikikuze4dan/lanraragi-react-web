import { DISPLAY_METHOD_IMAGES } from "./constants";

export const getImagesDisplayMethod = () =>
  localStorage.getItem(DISPLAY_METHOD_IMAGES) ?? "fill";

export const setImageDisplayMethod = (displayMethod) => {
  localStorage.setItem(DISPLAY_METHOD_IMAGES, displayMethod ?? "fill");
};
