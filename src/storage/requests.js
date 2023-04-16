export const getBaseUrl = () => {
  const value = localStorage.getItem("BASE_URL");
  return value ?? "";
};

export const storeBaseUrl = (url) => {
  localStorage.setItem("BASE_URL", url);
};
