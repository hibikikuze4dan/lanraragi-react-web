import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentRandomArchives,
  getCurrentSearchArchives,
} from "../../app/selectors";
import { updateSearchArchives } from "../../app/slice";
import { getArchivesBySearchThrottled } from "../../requests/search";

export const useSearchOnLoad = (searchFilter) => {
  const dispatch = useDispatch();
  const searchArchives = useSelector(getCurrentSearchArchives);
  const randomArchives = useSelector(getCurrentRandomArchives);
  const [loading, setLoading] = useState(false);
  const searchLoaded = searchArchives.length;

  const results = { results: searchArchives, loading };

  const callNewArchives = useCallback(async (search) => {
    setLoading(true);
    const arcs = await getArchivesBySearchThrottled({
      filter: search,
      sortby: "date_added",
      order: "desc",
      start: -1,
    });
    dispatch(updateSearchArchives(arcs.data));
    setLoading(false);
  }, []);

  if (
    searchFilter === "" &&
    !searchLoaded &&
    randomArchives.length &&
    !loading
  ) {
    callNewArchives(searchFilter);
  }

  return results;
};
