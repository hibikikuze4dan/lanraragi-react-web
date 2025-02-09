import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import getArchiveMetaData from "../../../requests/metadata";
import { getArchiveCategories } from "../../../requests/categories";
import { useUpdateArchiveMetadata } from "../../../hooks/useUpdateArchiveMetadata/useUpdateArchiveMetadata";

export const useArchiveEditDialogModalLogic = ({ onCloseProp, arcId }) => {
  const dispatch = useDispatch();
  const [archiveData, setArchiveData] = useState({});
  const [showDelete, setShowDelete] = useState(false);

  const archiveDataReady =
    !isEmpty(archiveData) && archiveData?.arcid === arcId;

  const onClose = useCallback(() => {
    if (onCloseProp) onCloseProp();
    setTimeout(() => setShowDelete(false), 500);
  }, [onCloseProp]);

  const onUpdateButtonFunction = useUpdateArchiveMetadata();

  const onUpdateButtonClick = () =>
    onUpdateButtonFunction({
      arcId,
      archiveData,
      postUpdate: onClose,
    });

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
    dispatch,
  };
};
