import { RATING_TYPE } from "./constants";

export const getRatingType = () => {
  const ratingType = localStorage.getItem(RATING_TYPE);
  return ratingType || "Stars";
};

export const setRatingType = (type) => {
  if (type) localStorage.setItem(RATING_TYPE, type);
};
