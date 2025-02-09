import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateArchiveMetadata } from "../../requests/metadata";
import { updateArchiveTags, updateDisplaySnackbar } from "../../app/slice";
import { getVisibleSection } from "../../app/selectors";
import { SNACKBAR_COPIES } from "../../components/snackbar-alert/constants";

export const useUpdateArchiveMetadata = () => {
  const dispatch = useDispatch();
  const openPage = useSelector(getVisibleSection);

  const updateArchiveMetadataCallback = useCallback(
    async ({ arcId = "", archiveData, postUpdate = () => null }) => {
      const archiveTags = archiveData?.tags;
      const metaDataUpdateResponse = await updateArchiveMetadata({
        id: arcId,
        title: archiveData?.title,
        tags: archiveTags,
        summary: archiveData?.summary ?? null,
      });

      if (metaDataUpdateResponse?.success === 1) {
        dispatch(
          updateArchiveTags({
            arcId,
            searchOrRandom: openPage,
            tags: archiveTags,
          })
        );

        // Should be used for something like an onClose function
        if (typeof postUpdate === "function") postUpdate();

        dispatch(
          updateDisplaySnackbar({
            open: true,
            type: SNACKBAR_COPIES.UPDATE_ARCHIVE_INFO_SUCCESS,
          })
        );
      } else {
        if (typeof postUpdate === "function") postUpdate();
        updateDisplaySnackbar({
          open: true,
          type: SNACKBAR_COPIES.UPDATE_ARCHIVE_INFO_FAILURE,
          severity: "error",
        });
        console.log(
          metaDataUpdateResponse?.error ??
            "Unknown error with updating archive info"
        );
      }
    },
    [dispatch, openPage]
  );

  return updateArchiveMetadataCallback;
};
