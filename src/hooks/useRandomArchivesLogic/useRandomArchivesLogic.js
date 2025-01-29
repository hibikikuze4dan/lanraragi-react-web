import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLoading, updateRandomArchives } from "../../app/slice";
import getRandomArchives from "../../requests/random";
import { getNumArchivesToRender } from "../../storage/archives";
import { useWidth } from "../useWidth";
import { scrollIntoViewByElement } from "../../utils";
import { getCurrentRandomArchives, getLoading } from "../../app/selectors";

export const useRandomArchivesLogic = (initialLoadRandomArchives) => {
  const breakpoint = useWidth();
  const dispatch = useDispatch();
  const randomArchives = useSelector(getCurrentRandomArchives);
  const count = getNumArchivesToRender()[breakpoint];
  const { random: isRandomSectionLoading } = useSelector(getLoading);

  const getNewRandomArchives = useCallback(async () => {
    dispatch(updateLoading({ random: true }));
    const randomArchiveArray = await getRandomArchives(count);
    dispatch(updateRandomArchives(randomArchiveArray));
    dispatch(updateLoading({ random: false }));
    scrollIntoViewByElement("#archive-text-0", 750);
  }, [count]);

  useEffect(() => {
    if (randomArchives.length) {
      dispatch(updateLoading({ random: false }));
      return;
    }
    if (!isRandomSectionLoading && initialLoadRandomArchives)
      getNewRandomArchives();
  }, []);

  return { getNewRandomArchives, isRandomSectionLoading, randomArchives };
};
