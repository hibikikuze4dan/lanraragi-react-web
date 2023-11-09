import { useCallback, useEffect, useRef, useState } from "react";
import { useImageSize } from "react-image-size";
import { getTagsObjectFromTagsString, httpOrHttps } from "../../utils";
import { THUMBNAIL_URL } from "../../requests/constants";
import { ARCHIVE_STYLES } from "./constants";
import { getRatingType } from "../../storage/ratings";
import { useImageBlobUrl } from "../../hooks/useImageBlobUrl/useImageBlobUrl";
import { getNoFunModeEnabled } from "../../storage/images";

export const useArchiveLogic = ({
  baseUrl,
  currentArchiveId,
  id,
  imagesLoaded,
  numOfArchivesRendered,
  setImagesLoaded,
  tags,
  wideImageDisplayMethod,
}) => {
  const [showFullTitle, updateShowFullTitle] = useState(false);
  const stringifiedSrc = `${httpOrHttps()}${baseUrl}${THUMBNAIL_URL.replace(
    ":id",
    id
  )}`;
  const { url, revokeImageUrl } = useImageBlobUrl(stringifiedSrc);
  const src = getNoFunModeEnabled() === "No" ? stringifiedSrc : url;
  const [dimensions] = useImageSize(src);
  const width = dimensions?.width ?? 0;
  const height = dimensions?.height ?? 0;
  const wideImage = width > height;
  const diffBetweenMaxHeightAndImageHeight = 300 - height;
  const isDiffBetweenMaxHeightAndImageHeightPositive =
    diffBetweenMaxHeightAndImageHeight > 0;
  const extraMargin = isDiffBetweenMaxHeightAndImageHeightPositive
    ? `${diffBetweenMaxHeightAndImageHeight * 0.5}px`
    : 0;
  const wideImageStyles = {
    ...ARCHIVE_STYLES.imageWide,
    ...(wideImageDisplayMethod && { objectFit: wideImageDisplayMethod }),
    ...(isDiffBetweenMaxHeightAndImageHeightPositive && {
      marginTop: extraMargin,
      marginBottom: extraMargin,
    }),
  };
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
    if (
      id === currentArchiveId &&
      ref?.current &&
      numOfArchivesRendered === imagesLoaded
    ) {
      setTimeout(
        () =>
          ref.current.scrollIntoView({ behavior: "smooth", block: "center" }),
        500
      );
    }
  }, [id, currentArchiveId, ref, numOfArchivesRendered, imagesLoaded]);

  const onLoad = () => {
    if (revokeImageUrl) revokeImageUrl();
    setImagesLoaded(imagesLoaded + 1);
  };

  return {
    rating,
    wideImageStyles,
    onTitleClick,
    wideImage,
    src,
    height,
    width,
    showFullTitle,
    ref,
    revokeImageUrl,
    onLoad,
    allImagesLoaded: numOfArchivesRendered <= imagesLoaded,
  };
};
