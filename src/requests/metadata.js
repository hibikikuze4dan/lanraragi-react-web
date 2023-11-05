import axios from "axios";
import { HEADERS, METADATA_URL } from "./constants";
import { getBaseUrl } from "../storage/requests";
import { httpOrHttps } from "../utils";

const config = {
  method: "get",
  headers: HEADERS,
};

export const getArchiveMetaData = async (arcId) => {
  if (!arcId) return Error("No archive Id supplied");
  const metadata = await axios({
    ...config,
    url: `${httpOrHttps()}${getBaseUrl()}${METADATA_URL.replace(":id", arcId)}`,
  });
  return metadata.data;
};

export const updateArchiveMetadata = async ({ id, title, tags }) => {
  if (!id) return Error("No archive Id supplied");
  const formData = new FormData();
  if (title) formData.append("title", title);
  if (tags) formData.append("tags", tags);
  const metadata = await axios.put(
    `${httpOrHttps()}${getBaseUrl()}${METADATA_URL.replace(":id", id)}`,
    formData,
    {
      headers: {
        ...HEADERS,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return metadata.data;
};

export default getArchiveMetaData;
