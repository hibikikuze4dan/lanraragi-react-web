import axios from "axios";
import { FILES_URL } from "./constants";
import { getApiKey, getBaseUrl } from "../storage/requests";

const config = {
  method: "get",
};

export const getArchiveFiles = async (archiveId) =>
  axios({
    ...config,
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
    },
    url: `http://${getBaseUrl()}${FILES_URL.replace(":id", archiveId)}`,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
