import { HEADERS, THUMBNAIL_URL } from "./constants";

const requestOptions = {
  method: "GET",
  headers: HEADERS,
  redirect: "follow",
};

export const getArchiveThumbnail = async (archiveId) =>
  fetch(THUMBNAIL_URL.replace(":id", archiveId), requestOptions)
    .then((response) => response.blob())
    .then((blob) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }).then((succ) => succ.split(",")[1])
    )
    .catch((error) => console.log("error", error));
