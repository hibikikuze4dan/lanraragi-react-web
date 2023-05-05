import axios from "axios";
import { HEADERS, METADATA_URL } from "./constants";
import { getBaseUrl } from "../storage/requests";

const config = {
  method: "get",
  headers: HEADERS,
};

export const getArchiveMetaData = async (arcId) => {
  if (!arcId) return Error("No archive Id supplied");
  const metadata = await axios({
    ...config,
    url: `http://${getBaseUrl()}${METADATA_URL.replace(":id", arcId)}`,
  });
  return metadata.data;
};

export default getArchiveMetaData;
