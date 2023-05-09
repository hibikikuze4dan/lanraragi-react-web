import axios from "axios";
import { MINION_URL } from "./constants";
import { getApiKey, getBaseUrl } from "../storage/requests";

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
      url: `http://${getBaseUrl()}${MINION_URL.replace(":jobid", jobId)}`,
    });
  } catch (error) {
    console.log(error);
    response = { data: null };
  }
  return response.data;
};
