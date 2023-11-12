import axios from "axios";
import {
  GET_HEADERS,
  CATEGORIES_URL,
  UPDATE_CATEGORY_URL,
  ARCHIVE_CATEGORY_URL,
} from "./constants";
import { getApiKey, getBaseUrl } from "../storage/requests";
import { httpOrHttps } from "../utils";
import { getConfig } from "./request-utils";

export const getCategories = async () => {
  const categories = await axios({
    ...getConfig(),
    url: `${httpOrHttps()}${getBaseUrl()}${CATEGORIES_URL}`,
  });
  return categories.data;
};

export const getArchiveCategories = async (arcId) => {
  let response = null;
  try {
    response = await axios({
      ...getConfig(),
      url: `${httpOrHttps()}${getBaseUrl()}${ARCHIVE_CATEGORY_URL.replace(
        ":id",
        arcId
      )}`,
    });
  } catch (error) {
    console.log(error);
    response = { data: { errorMessage: "Sorry, something went wrong" } };
  }
  return response.data;
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
    result = { data: { error: error.message } };
  }
  return result.data;
};

export default getCategories;
