import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import {
  getArchiveOpenedFrom,
  getCurrentArchiveId,
  getCurrentPages,
  getDisplayNavbar,
  getLoading,
} from "../../app/selectors";
import { getBaseUrl } from "../../storage/requests";
import {
  setAllSectionVisibilityFalse,
  updateDisplayNavbar,
  updateLoading,
  updatePages,
  updateSectionVisibility,
} from "../../app/slice";
import { getArchiveFiles } from "../../requests/files";
import { getMinionStatus } from "../../requests/minion";
import {
  getImageSpacingLevel,
  getNoFunModeEnabled,
} from "../../storage/images";
import { requestUpdateArchiveReadingPosition } from "../../requests/info";

export const useImageListLogic = () => {
  const dispatch = useDispatch();
  const arcId = useSelector(getCurrentArchiveId);
  const pageUrls = useSelector(getCurrentPages);
  const displayNavbar = useSelector(getDisplayNavbar);
  const archiveOpenedFrom = useSelector(getArchiveOpenedFrom);
  const { images: gettingImagesFromLRR } = useSelector(getLoading);
  const [pagesToRender, updatePagesToRender] = useState(10);
  const [pagesError, setPagesError] = useState(false);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const baseUrl = getBaseUrl();
  const [observerTarget, setObserverTarget] = useState();
  const [finalTarget, setFinalTarget] = useState();
  const observerRoot = useRef(null);

  useEffect(() => {
    if (pageUrls?.length)
      requestUpdateArchiveReadingPosition({ id: arcId, page: 1 });
  }, [pageUrls, arcId]);

  useEffect(() => {
    const getPages = async () => {
      setPagesError(false);
      let jobStatusObject;
      dispatch(updateLoading({ images: true }));
      const filesResponse = await getArchiveFiles(arcId);
      const job = filesResponse?.job;
      if (job) {
        jobStatusObject = await getMinionStatus(filesResponse?.job);
      }

      if (jobStatusObject?.state === "finished") {
        dispatch(updatePages(filesResponse.pages));
        dispatch(updateLoading({ images: false }));
        return;
      }

      if (jobStatusObject?.error || !filesResponse?.pages) {
        setPagesError(true);
        dispatch(updatePages([]));
        return;
      }

      // The timeout is to give the Lanraragi API a bit more time to
      // finish extracting the images. Was experiencing messed up
      // images without it
      setTimeout(() => dispatch(updatePages(filesResponse.pages)), 1000);
      dispatch(updateLoading({ images: false }));
    };

    if (arcId && !pageUrls.length) getPages();
  }, [arcId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          updatePagesToRender((ptr) => ptr + 10);
        }
      },
      { threshold: 0.5, root: observerRoot.current }
    );

    if (observerTarget) observer.observe(observerTarget);
    if (finalTarget) observer.observe(finalTarget);

    return () => {
      if (observerTarget) observer.unobserve(observerTarget);
      if (finalTarget) observer.unobserve(finalTarget);
    };
  }, [observerTarget, finalTarget, observerRoot]);

  const onImageClick = useCallback(() => {
    dispatch(updateDisplayNavbar(!displayNavbar));
  }, [displayNavbar]);
  const onBackClick = useCallback(() => {
    dispatch(setAllSectionVisibilityFalse());
    dispatch(updateDisplayNavbar(true));
    dispatch(updateSectionVisibility({ [archiveOpenedFrom]: true }));
  }, [archiveOpenedFrom]);

  const useBlobImages = getNoFunModeEnabled() === "Yes";

  const imageSpacingLevel = getImageSpacingLevel();

  return {
    archiveOpenedFrom,
    arcId,
    baseUrl,
    gettingImagesFromLRR,
    height,
    imageSpacingLevel,
    isMobile,
    observerRoot,
    onBackClick,
    onImageClick,
    pagesError,
    pagesToRender,
    pageUrls,
    setFinalTarget,
    setObserverTarget,
    width,
    useBlobImages,
  };
};
