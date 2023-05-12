import axios from "axios";
import { HEADERS, RANDOM_URL } from "./constants";
import { getApiKey, getBaseUrl } from "../storage/requests";

const config = {
  method: "get",
  headers: HEADERS,
};

export const getRandomArchives = async (count = 10) =>
  axios({
    ...config,
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
    },
    url: `http://${getBaseUrl()}${RANDOM_URL}?count=${count}`,
  })
    .then((response) => response.data.data)
    .catch((error) => {
      console.log(error);
    });

export default getRandomArchives;
