import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentRandomArchives,
  getCurrentSearchArchives,
} from "../../app/selectors";
import { updateSearchArchives } from "../../app/slice";
import { getArchivesBySearchThrottled } from "../../requests/search";
import { getSearchStats } from "../../storage/search";

export const useSearchOnLoad = () => {
  const dispatch = useDispatch();
  const { filter, sort: sortby, direction: order, category } = getSearchStats();
  const searchArchives = useSelector(getCurrentSearchArchives);
  const randomArchives = useSelector(getCurrentRandomArchives);
  const [loading, setLoading] = useState(false);
  const searchLoaded = searchArchives.length;

  const results = { results: searchArchives, loading };

  const callNewArchives = useCallback(async (search) => {
    setLoading(true);
    const arcs = await getArchivesBySearchThrottled({
      filter: search,
      sortby,
      order,
      start: -1,
      ...(category && { category }),
    });
    dispatch(updateSearchArchives(arcs.data));
    setLoading(false);
  }, []);

  if (!searchLoaded && randomArchives.length && !loading) {
    callNewArchives(filter);
  }

  return results;
};
