import axios from "axios";
import { throttle } from "lodash";
import { SEARCH_URL } from "./constants";
import { getBaseUrl } from "../storage/requests";
import { httpOrHttps } from "../utils";
import { getRequestConfig } from "./request-utils";

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
    ...getRequestConfig(),
    url: `${httpOrHttps()}${getBaseUrl()}${SEARCH_URL}?${params.toString()}`,
    ...(controller && { signal: controller.signal }),
  });
  console.log(categories);
  return categories?.data?.data ?? [];
};

export const getArchivesBySearchThrottled = throttle(
  getArchivesBySearch,
  10000,
  { trailing: false }
);
