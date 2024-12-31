import { getApiKey } from "../storage/requests";

export const SEARCH_URL = "/api/search";

export const RANDOM_URL = `${SEARCH_URL}/random`;

export const LAST_READ_URL = `${SEARCH_URL}?filter=&sortby=lastread`;

export const THUMBNAIL_URL = "/api/archives/:id/thumbnail";

export const FILES_URL = "/api/archives/:id/files";

export const NEW_FLAG_URL = "/api/archives/:id/isnew";

export const METADATA_URL = "/api/archives/:id/metadata";

export const READING_POSITION = "/api/archives/:id/progress/:page";

export const CATEGORIES_URL = "/api/categories";

export const UPDATE_CATEGORY_URL = `${CATEGORIES_URL}/:id/:archive`;

export const ARCHIVE_CATEGORY_URL = `/api/archives/:id/categories`;

export const API_INFO_URL = `/api/info`;

export const MINION_URL = "/api/minion/:jobid";

export const DELETE_ARCHIVE_URL = "/api/archives/:id";

export const TAGS_URL = "/api/database/stats?minweight=1";

export const UPDATE_ARCHIVE_THUMBNAIL_URL = "/api/archives/:id/thumbnail";

export const GET_HEADERS = () => ({
  Authorization: `Bearer ${getApiKey()}`,
});
