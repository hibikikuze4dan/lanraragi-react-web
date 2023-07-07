import { BASE_URL, LRR_API_KEY, USE_HTTPS } from "./constants";

export const getBaseUrl = () => {
  const value = localStorage.getItem(BASE_URL);
  return value ?? "";
};

export const getApiKey = () => {
  const value = localStorage.getItem(LRR_API_KEY);
  return value ?? "";
};

export const getUseHttps = () => {
  const value = localStorage.getItem(USE_HTTPS);
  if (!value) return false;
  return value === "true";
};

export const storeBaseUrl = (url) => {
  localStorage.setItem(BASE_URL, url);
};

export const storeApiKey = (key) => {
  localStorage.setItem(LRR_API_KEY, key);
};

export const storeUseHttps = (useHttps) => {
  console.log(useHttps);
  localStorage.setItem(USE_HTTPS, useHttps.toString());
};
