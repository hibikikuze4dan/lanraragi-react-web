import axios from "axios";
import { HEADERS, SEARCH_URL } from "./constants";
import { getBaseUrl } from "../storage/requests";

const config = {
  method: "get",
  headers: HEADERS,
};

export const getArchivesBySearch = async ({
  filter,
  sortby,
  order,
  start = -1,
}) => {
  const categories = await axios({
    ...config,
    url: `http://${getBaseUrl()}${SEARCH_URL}`,
    params: {
      filter,
      sortby,
      order,
      start,
    },
  });
  return categories.data;
};
