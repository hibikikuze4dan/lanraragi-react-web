import { useCallback, useEffect, useRef, useState } from "react";
import { getTagsObjectFromTagsString, httpOrHttps } from "../../utils";
import { THUMBNAIL_URL } from "../../requests/constants";
import { getRatingType } from "../../storage/ratings";
import { useImageBlobUrl } from "../../hooks/useImageBlobUrl/useImageBlobUrl";
import { getNoFunModeEnabled } from "../../storage/images";

export const useArchiveLogic = ({
  baseUrl,
  currentArchiveId,
  id,
  numOfArchivesRendered,
  tags,
}) => {
  const [showFullTitle, updateShowFullTitle] = useState(false);
  const stringifiedSrc = `${httpOrHttps()}${baseUrl}${THUMBNAIL_URL.replace(
    ":id",
    id
  )}`;
  const { url, revokeImageUrl } = useImageBlobUrl(stringifiedSrc);
  const src = getNoFunModeEnabled() === "No" ? stringifiedSrc : url;
  const ratingFromTags =
    getTagsObjectFromTagsString(tags ?? "")?.[getRatingType()]?.[0] ?? null;
  const rating =
    typeof ratingFromTags === "string"
      ? Number(ratingFromTags)
      : ratingFromTags;

  const ref = useRef();

  const onTitleClick = useCallback(() => {
    updateShowFullTitle(!showFullTitle);
  }, [showFullTitle]);

  useEffect(() => {
    if (id === currentArchiveId && ref?.current) {
      setTimeout(
        () =>
          ref.current.scrollIntoView({ behavior: "smooth", block: "center" }),
        500
      );
    }
  }, [id, currentArchiveId, ref, numOfArchivesRendered]);

  const onLoad = () => {
    if (revokeImageUrl) revokeImageUrl();
  };

  return {
    onLoad,
    onTitleClick,
    rating,
    ref,
    showFullTitle,
    src,
  };
};
