import axios from "axios";
import { HEADERS, TAGS_URL } from "./constants";
import { getBaseUrl } from "../storage/requests";
import { httpOrHttps } from "../utils";

const config = {
  method: "get",
  headers: HEADERS,
};

const EXCLUDED_NAMSPACES = ["date_added", "source"];

export const getTags = async () => {
  let response = null;
  try {
    response = await axios({
      ...config,
      url: `${httpOrHttps()}${getBaseUrl()}${TAGS_URL}`,
    });
  } catch (error) {
    console.log(error);
    response = { data: [] };
    return response.data;
  }
  return response.data.filter(
    (tag) => !EXCLUDED_NAMSPACES.includes(tag.namespace)
  );
};
