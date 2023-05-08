import axios from "axios";
import throttle from "lodash/throttle";
import { HEADERS, RANDOM_URL } from "./constants";
import { getApiKey, getBaseUrl } from "../storage/requests";

const config = {
  method: "get",
  headers: HEADERS,
};

export const getRandomArchives = throttle(
  async (count = 10) =>
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
      }),
  2000
);

export default getRandomArchives;
