import axios from "axios";
import { HEADERS, CATEGORIES_URL, UPDATE_CATEGORY_URL } from "./constants";
import { getBaseUrl } from "../storage/requests";

const data = "";

const config = {
  method: "get",
  headers: HEADERS,
  data,
};

export const getCategories = async () => {
  const categories = await axios({
    ...config,
    url: `http://${getBaseUrl()}${CATEGORIES_URL}`,
  });
  return categories.data;
};

export const updateCategory = async ({ catId, arcId }) => {
  const result = await axios({
    method: "put",
    headers: HEADERS,
    url: `http://${getBaseUrl()}${UPDATE_CATEGORY_URL}`
      .replace(":id", catId)
      .replace(":archive", arcId),
  });
  return result.data;
};

export default getCategories;
