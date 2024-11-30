import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import getArchiveMetaData, {
  updateArchiveMetadata,
} from "../../../requests/metadata";
import { getArchiveCategories } from "../../../requests/categories";
import { getVisibleSection } from "../../../app/selectors";
import { updateArchiveTags, updateDisplaySnackbar } from "../../../app/slice";

export const useArchiveEditDialogModalLogic = ({ onCloseProp, arcId }) => {
  const dispatch = useDispatch();
  const openPage = useSelector(getVisibleSection);
  const [archiveData, setArchiveData] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [updateResponse, setUpdateResponse] = useState({
    error: "",
    operation: "update_metadata",
    success: 0,
    successMessage: null,
  });

  const archiveDataReady =
    !isEmpty(archiveData) && archiveData?.arcid === arcId;

  const onClose = useCallback(() => {
    if (onCloseProp) onCloseProp();
    setTimeout(() => setShowDelete(false), 500);
  }, [onCloseProp]);

  const onUpdateButtonClick = useCallback(() => {
    updateArchiveMetadata({
      id: arcId,
      title: archiveData?.title,
      tags: archiveData?.tags,
      summary: archiveData?.summary ?? null,
    })
      .then((res) => {
        if (res?.success === 1) {
          setUpdateResponse({
            ...res,
            successMessage:
              "Congrats! The archive's information has been updated!",
          });
          dispatch(
            updateArchiveTags({
              arcId,
              searchOrRandom: openPage,
              tags: archiveData?.tags,
            })
          );
          onClose();
          dispatch(
            updateDisplaySnackbar({
              open: true,
              type: "UPDATE_ARCHIVE_INFO_SUCCESS",
            })
          );
        } else {
          onClose();
          updateDisplaySnackbar({
            open: true,
            type: "UPDATE_ARCHIVE_INFO_FAILURE",
            severity: "error",
          });
          console.log(res?.error ?? "Unknown error with updating archive info");
        }
      })
      .catch((err) => {
        setUpdateResponse({
          ...updateResponse,
          error: "Sorry, something seems to have gone wrong.",
        });
        onClose();
        updateDisplaySnackbar({
          open: true,
          type: "UPDATE_ARCHIVE_INFO_FAILURE",
          severity: "error",
        });
        console.log(err);
      });
  }, [archiveData, onClose, dispatch, arcId]);

  useEffect(() => {
    const getArchiveData = async () => {
      const metaData = await getArchiveMetaData(arcId);
      const categoriesArray = await getArchiveCategories(arcId);

      setArchiveData({
        ...metaData,
        categories: categoriesArray ?? [],
      });
    };

    if (arcId) getArchiveData();
  }, [arcId, setArchiveData]);

  return {
    onClose,
    archiveData,
    setArchiveData,
    onUpdateButtonClick,
    archiveDataReady,
    showDelete,
    setShowDelete,
  };
};
