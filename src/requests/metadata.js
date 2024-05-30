import axios from "axios";
import { GET_HEADERS, METADATA_URL } from "./constants";
import { getBaseUrl } from "../storage/requests";
import { httpOrHttps } from "../utils";
import { getRequestConfig } from "./request-utils";

export const getArchiveMetaData = async (arcId) => {
  if (!arcId) return Error("No archive Id supplied");
  const metadata = await axios({
    ...getRequestConfig(),
    url: `${httpOrHttps()}${getBaseUrl()}${METADATA_URL.replace(":id", arcId)}`,
  });

  return metadata?.data ?? {};
};

export const updateArchiveMetadata = async ({ id, title, tags }) => {
  if (!id) return Error("No archive Id supplied");
  const formData = new FormData();
  if (title) formData.append("title", title);
  if (tags) formData.append("tags", tags);
  const response = await axios.put(
    `${httpOrHttps()}${getBaseUrl()}${METADATA_URL.replace(":id", id)}`,
    formData,
    {
      headers: {
        ...GET_HEADERS(),
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response?.data;
};

export default getArchiveMetaData;
