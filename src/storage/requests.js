import { BASE_URL, LRR_API_KEY } from "./constants";

export const getBaseUrl = () => {
  const value = localStorage.getItem(BASE_URL);
  return value ?? "";
};

export const getApiKey = () => {
  const value = localStorage.getItem(LRR_API_KEY);
  return value ?? "";
};

export const storeBaseUrl = (url) => {
  localStorage.setItem(BASE_URL, url);
};

export const storeApiKey = (key) => {
  localStorage.setItem(LRR_API_KEY, key);
};
