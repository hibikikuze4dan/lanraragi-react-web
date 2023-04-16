import axios from "axios";
import { FILES_URL } from "./constants";

var config = {
  method: "get",
  headers: {
    Authorization: "Bearer cGVyc29uYTRkYW4=",
  },
};

export const getArchiveFiles = async (archiveId) =>
  axios({ ...config, url: FILES_URL.replace(":id", archiveId) })
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return response.data.pages;
    })
    .catch(function (error) {
      console.log(error);
    });
