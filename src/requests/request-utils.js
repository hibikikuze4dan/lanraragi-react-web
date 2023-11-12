import { GET_HEADERS } from "./constants";

export const getConfig = (method = "get") => ({
  method,
  headers: { ...GET_HEADERS() },
});
