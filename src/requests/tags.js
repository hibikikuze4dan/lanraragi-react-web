import axios from "axios";
import { TAGS_URL } from "./constants";
import { getBaseUrl } from "../storage/requests";
import { httpOrHttps } from "../utils";
import { getRequestConfig } from "./request-utils";

const EXCLUDED_NAMSPACES = ["date_added", "source"];

export const getTags = async () => {
  let response = null;
  try {
    response = await axios({
      ...getRequestConfig(),
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
