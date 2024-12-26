import axios from "axios";
import { FILES_URL, NEW_FLAG_URL } from "./constants";
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
      return {};
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
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return null;
    });
  return data;
};

export const clearArchiveNewFlag = async (archiveId) =>
  axios({
    method: "delete",
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
    },
    url: `${httpOrHttps()}${getBaseUrl()}${NEW_FLAG_URL.replace(
      ":id",
      archiveId
    )}`,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });