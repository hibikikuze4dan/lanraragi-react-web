import { USE_PAGINATED_SEARCH } from "./constants";

export const saveSearchSettings = (settings) => {
  localStorage.setItem(USE_PAGINATED_SEARCH, JSON.stringify(settings));
};

export const loadSearchSettings = () => {
  const savedSetting = localStorage.getItem(USE_PAGINATED_SEARCH);
  return savedSetting ? JSON.parse(savedSetting) : true;
};
