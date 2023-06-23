import { useCallback, useEffect, useState } from "react";
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
  // const { search: isSearchLoading, onLoadSearch } = useSelector(getLoading);
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState(null);
  const [controller] = useState(new AbortController());
  const searchLoaded = searchArchives.length;

  const results = { results: searchArchives, loading, controller };

  const callNewArchives = useCallback(async (search) => {
    setLoading(true);
    const arcs = await getArchivesBySearchThrottled(
      {
        filter: search,
        sortby,
        order,
        start: -1,
        ...(category && { category }),
      },
      controller
    ).catch(() => /* find a better way of handling errors */ ({
      data: [
        { id: "error", title: "something went wrong, try searching again" },
      ],
    }));
    dispatch(updateSearchArchives(arcs.data));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (
      !searchLoaded &&
      randomArchives.length &&
      !loading &&
      searchFilter !== filter
    ) {
      callNewArchives(filter);
      setSearchFilter(filter);
    }
  }, [searchLoaded, randomArchives, loading, searchFilter, filter]);

  return results;
};
