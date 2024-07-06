import axios from "axios";
import {
  GET_HEADERS,
  CATEGORIES_URL,
  UPDATE_CATEGORY_URL,
  ARCHIVE_CATEGORY_URL,
} from "./constants";
import { getApiKey, getBaseUrl } from "../storage/requests";
import { httpOrHttps } from "../utils";
import { getRequestConfig } from "./request-utils";

export const getCategories = async () => {
  const categoriesResponse = await axios({
    ...getRequestConfig(),
    url: `${httpOrHttps()}${getBaseUrl()}${CATEGORIES_URL}`,
  });

  return categoriesResponse?.data ?? [];
};

export const getArchiveCategories = async (arcId) => {
  let response = null;
  try {
    response = await axios({
      ...getRequestConfig(),
      url: `${httpOrHttps()}${getBaseUrl()}${ARCHIVE_CATEGORY_URL.replace(":id", arcId)}`,
    });
  } catch (error) {
    console.log(error);
  }

  return response?.data?.categories ?? [];
};

export const updateCategory = async ({ catId, arcId }) => {
  let result = null;
  try {
    result = await axios({
      method: "put",
      headers: { ...GET_HEADERS() },
      url: `${httpOrHttps()}${getBaseUrl()}${UPDATE_CATEGORY_URL}`
        .replace(":id", catId)
        .replace(":archive", arcId),
      params: { key: `${getApiKey()}` },
    });
  } catch (error) {
    console.log(error);
    result = { data: { error: "Sorry, something went wrong." } };
  }

  return result?.data ?? {};
};

export default getCategories;
