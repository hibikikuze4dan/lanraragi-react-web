import axios from "axios";
import { throttle } from "lodash";
import { HEADERS, SEARCH_URL } from "./constants";
import { getBaseUrl } from "../storage/requests";
import { httpOrHttps } from "../utils";

const config = {
  method: "get",
  headers: HEADERS,
};

export const getArchivesBySearch = async (
  { filter, sortby, order, start = -1, category },
  controller
) => {
  const params = new URLSearchParams();
  params.append("filter", filter);
  params.append("sortby", sortby);
  params.append("order", order);
  params.append("start", start);
  if (category) params.append("category", category);

  const categories = await axios({
    ...config,
    url: `${httpOrHttps()}${getBaseUrl()}${SEARCH_URL}?${params.toString()}`,
    ...(controller && { signal: controller.signal }),
  });
  return categories.data;
};

export const getArchivesBySearchThrottled = throttle(
  getArchivesBySearch,
  10000,
  { trailing: false }
);
