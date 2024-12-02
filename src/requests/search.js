import axios from "axios";
import { throttle } from "lodash";
import { LAST_READ_URL, SEARCH_URL } from "./constants";
import { getBaseUrl } from "../storage/requests";
import { httpOrHttps } from "../utils";
import { getRequestConfig } from "./request-utils";

export const getArchivesBySearch = async (
  { filter, sortby, order, start = -1, length = -1, category },
  controller
) => {
  const params = new URLSearchParams();
  params.append("filter", filter);
  params.append("sortby", sortby);
  params.append("order", order);
  params.append("start", start);
  params.append("length", length);
  if (category) params.append("category", category);

  const categories = await axios({
    ...getRequestConfig(),
    url: `${httpOrHttps()}${getBaseUrl()}${SEARCH_URL}?${params.toString()}`,
    ...(controller && { signal: controller.signal }),
  });

  return categories?.data ?? { data: [], recordsFiltered: 0 };
};

export const getArchivesByLastRead = async () => {
  const results = await axios({
    ...getRequestConfig(),
    url: `${httpOrHttps()}${getBaseUrl()}${LAST_READ_URL}`,
  }).catch((err) => {
    console.error(`Something went wrong while trying to get archives sorted by lastread: ${err}`);
    return {};
  });

  return results?.data?.data ?? [];
};

export const getArchivesBySearchThrottled = throttle(getArchivesBySearch, 10000, {
  trailing: false,
});
