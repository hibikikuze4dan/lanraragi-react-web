import axios from "axios";
import { FILES_URL } from "./constants";
import { getBaseUrl } from "../storage/requests";

const config = {
  method: "get",
  headers: {
    Authorization: "Bearer cGVyc29uYTRkYW4=",
  },
};

export const getArchiveFiles = async (archiveId) =>
  axios({
    ...config,
    url: `http://${getBaseUrl()}${FILES_URL.replace(":id", archiveId)}`,
  })
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data.pages;
    })
    .catch((error) => {
      console.log(error);
    });
