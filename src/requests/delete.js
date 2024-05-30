import axios from "axios";
import { DELETE_ARCHIVE_URL } from "./constants";
import { getApiKey, getBaseUrl } from "../storage/requests";
import { httpOrHttps } from "../utils";

const config = {
  method: "delete",
};

export const deleteArchiveById = async (archiveId) =>
  axios({
    ...config,
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
    },
    url: `${httpOrHttps()}${getBaseUrl()}${DELETE_ARCHIVE_URL.replace(
      ":id",
      archiveId
    )}`,
    params: { key: `${getApiKey()}` },
  })
    .then((response) => response?.data ?? {})
    .catch((error) => {
      console.log(error);
      return {};
    });
