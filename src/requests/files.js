import axios from "axios";
import { FILES_URL } from "./constants";
import { getApiKey, getBaseUrl } from "../storage/requests";
import { httpOrHttps } from "../utils";

const config = {
  method: "get",
};

export const getArchiveFiles = async (archiveId) =>
  axios({
    ...config,
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
    },
    url: `${httpOrHttps()}${getBaseUrl()}${FILES_URL.replace(
      ":id",
      archiveId
    )}`,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });

export const getArchiveImage = async (imgSrc) => {
  const data = await axios({
    ...config,
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
    },
    url: imgSrc,
    responseType: "blob",
    responseEncoding: "base64",
  })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return "";
    });
  return data;
};
