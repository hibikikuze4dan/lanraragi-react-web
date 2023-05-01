import { getApiKey } from "../storage/requests";

export const RANDOM_URL = "/api/search/random";

export const THUMBNAIL_URL = "/api/archives/:id/thumbnail";

export const FILES_URL = "/api/archives/:id/files";

export const METADATA_URL = "/api/archives/:id/metadata";

export const CATEGORIES_URL = "/api/categories";

export const UPDATE_CATEGORY_URL = `${CATEGORIES_URL}/:id/:archive`;

export const HEADERS = {
  Authorization: `Bearer ${getApiKey()}`,
};
