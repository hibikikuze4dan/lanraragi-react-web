import axios from "axios";
import { throttle } from "lodash";
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
  category,
}) => {
  const categories = await axios({
    ...config,
    url: `http://${getBaseUrl()}${SEARCH_URL}`,
    params: {
      filter,
      sortby,
      order,
      start,
      category,
    },
  });
  return categories.data;
};

export const getArchivesBySearchThrottled = throttle(
  getArchivesBySearch,
  10000,
  { trailing: false }
);
