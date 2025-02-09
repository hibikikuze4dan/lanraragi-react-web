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

export const updateArchiveMetadata = async ({ id, title, tags, summary }) => {
  try {
    if (!id) return {};

    const url = `${httpOrHttps()}${getBaseUrl()}${METADATA_URL.replace(
      ":id",
      id
    )}`;

    const formData = new FormData();

    if (title) formData.append("title", title);
    if (tags) formData.append("tags", tags);
    if (summary) formData.append("summary", summary);

    const response = await axios.put(url, formData, {
      headers: {
        ...GET_HEADERS(),
        "Content-Type": "multipart/form-data",
      },
    });

    return response?.data ?? {};
  } catch (error) {
    console.log(
      `Error occured while attempting to update archive info: ${error}`
    );
    return {};
  }
};

export default getArchiveMetaData;
