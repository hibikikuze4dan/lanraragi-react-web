import axios from "axios";
import { RANDOM_URL } from "./constants";
import { getBaseUrl } from "../storage/requests";
import { httpOrHttps } from "../utils";
import { getRequestConfig } from "./request-utils";

export const getRandomArchives = async (count = 10) =>
  axios({
    ...getRequestConfig(),
    url: `${httpOrHttps()}${getBaseUrl()}${RANDOM_URL}?count=${count}`,
  })
    .then((response) => response?.data?.data ?? [])
    .catch((error) => {
      console.log(error);
      return [];
    });

export default getRandomArchives;
