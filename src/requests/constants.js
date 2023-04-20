import { getApiKey } from "../storage/requests";

export const RANDOM_URL = "/api/search/random";

export const THUMBNAIL_URL = "/api/archives/:id/thumbnail";

export const FILES_URL = "/api/archives/:id/files";

export const HEADERS = {
  Authorization: `Bearer ${getApiKey()}`,
};
