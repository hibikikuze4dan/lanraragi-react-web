import axios from "axios";
import { getBaseUrl } from "../storage/requests";
import { httpOrHttps } from "../utils";
import { GET_HEADERS, UPDATE_ARCHIVE_THUMBNAIL_URL } from "./constants";

export const regenArchiveThumbnail = async ({ id, page }) => {
  if (!id) {
    console.log("No archive Id supplied");
    return 0;
  }

  const url = `${httpOrHttps()}${getBaseUrl()}${UPDATE_ARCHIVE_THUMBNAIL_URL.replace(
    ":id",
    id
  )}`;

  const formData = new FormData();
  if (page) formData.append("page", page);

  const config = {
    headers: {
      ...GET_HEADERS(),
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axios.put(url, formData, config);

    return response?.data?.success ?? 0;
  } catch (err) {
    console.log(
      `Error occured while trying to regen thumbnail for ${id}: ${err}`
    );
    return 0;
  }
};
