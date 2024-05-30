import { GET_HEADERS } from "./constants";

export const getRequestConfig = (method = "get") => ({
  method,
  headers: { ...GET_HEADERS() },
});
