import axios from "axios";
import { MINION_URL } from "./constants";
import { getApiKey, getBaseUrl } from "../storage/requests";
import { httpOrHttps } from "../utils";

const config = {
  method: "get",
};

export const getMinionStatus = async (jobId) => {
  let response = null;
  try {
    response = await axios({
      ...config,
      headers: {
        Authorization: `Bearer ${getApiKey()}`,
      },
      url: `${httpOrHttps()}${getBaseUrl()}${MINION_URL.replace(
        ":jobid",
        jobId
      )}`,
    });
  } catch (error) {
    console.log(error);
    response = { data: null };
  }

  return response.data;
};
