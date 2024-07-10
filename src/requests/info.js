import axios from "axios";
import { getRequestConfig } from "./request-utils";
import { httpOrHttps } from "../utils";
import { getBaseUrl } from "../storage/requests";
import { API_INFO_URL, READING_POSITION } from "./constants";

export const requestApiInfo = async () => {
  let response = null;
  try {
    response = await axios({
      ...getRequestConfig(),
      url: `${httpOrHttps()}${getBaseUrl()}${API_INFO_URL}`,
    });
  } catch (error) {
    console.log(error);
  }

  return response?.data ?? {};
};

export const requestUpdateArchiveReadingPosition = async ({ id, page = 1 }) => {
  let response = null;
  try {
    response = await axios({
      ...getRequestConfig(),
      method: "put",
      url: `${httpOrHttps()}${getBaseUrl()}${READING_POSITION.replace(":id", id).replace(
        ":page",
        page
      )}`,
    });
  } catch (error) {
    console.log(error);
  }

  return response?.data ?? {};
};
