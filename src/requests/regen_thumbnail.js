import axios from "axios";
import { getBaseUrl } from "../storage/requests";
import { httpOrHttps } from "../utils";
import { GET_HEADERS, UPDATE_ARCHIVE_THUMBNAIL_URL } from "./constants";

export const regenArchiveThumbnail = async ({ id, page }) => {
  if (!id) return Error("No archive Id supplied");

  const formData = new FormData();
  if (page) formData.append("page", page);

  const response = await axios.put(
    `${httpOrHttps()}${getBaseUrl()}${UPDATE_ARCHIVE_THUMBNAIL_URL.replace(
      ":id",
      id
    )}`,
    formData,
    {
      headers: {
        ...GET_HEADERS(),
        "Content-Type": "multipart/form-data",
      },
    }
  );

  console.log(response, "axios response for thumbnail regen");

  return response?.data;
};
