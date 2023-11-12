import axios from "axios";
import { RANDOM_URL } from "./constants";
import { getBaseUrl } from "../storage/requests";
import { httpOrHttps } from "../utils";
import { getConfig } from "./request-utils";

export const getRandomArchives = async (count = 10) =>
  axios({
    ...getConfig(),
    url: `${httpOrHttps()}${getBaseUrl()}${RANDOM_URL}?count=${count}`,
  })
    .then((response) => response.data.data)
    .catch((error) => {
      console.log(error);
    });

export default getRandomArchives;
