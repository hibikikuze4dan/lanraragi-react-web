import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentRandomArchives,
  getCurrentSearchArchives,
  getSearchArchivesTotal,
  getUsePaginatedSearch
} from "../../app/selectors";
import { updateSearchArchives } from "../../app/slice";
import { getArchivesBySearchThrottled } from "../../requests/search";
import { getSearchStats } from "../../storage/search";
import { useWidth } from "../useWidth";
import { getNumArchivesToRender } from "../../storage/archives";

export const useSearchOnLoad = () => {
  const dispatch = useDispatch();
  const breakpoint = useWidth();
  const {
    filter,
    sort: sortby,
    direction: order,
    category,
    page = 1
  } = getSearchStats();

  const searchArchives = useSelector(getCurrentSearchArchives);
  const searchTotal = useSelector(getSearchArchivesTotal);
  const randomArchives = useSelector(getCurrentRandomArchives);
  const usePaginatedSearch = useSelector(getUsePaginatedSearch);
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState(null);
  const [controller] = useState(new AbortController());
  const [searchLoaded, setSearchLoaded] = useState(false);

  const results = {
    results: searchArchives,
    total: searchTotal,
    loading,
    controller
  };

  const callNewArchives = useCallback(async (search) => {
    setLoading(true);
    const maxPerPage = getNumArchivesToRender()[breakpoint];

    const response = await getArchivesBySearchThrottled(
      {
        filter: search,
        sortby,
        order,
        start: usePaginatedSearch
          ? Math.max(0, (page - 1) * maxPerPage)
          : -1,
        length: usePaginatedSearch ? maxPerPage : -1,
        ...(category && { category }),
      },
      controller
    );

    dispatch(updateSearchArchives({
      archives: response.data,
      total: usePaginatedSearch ? response.recordsFiltered : response.data.length
    }));
    setLoading(false);
  }, [breakpoint, page, usePaginatedSearch]);

  useEffect(() => {
    if (
      !searchLoaded &&
      randomArchives.length &&
      !loading &&
      searchFilter !== filter
    ) {
      callNewArchives(filter);
      setSearchFilter(filter);
      setSearchLoaded(true);
    }
  }, [searchLoaded, randomArchives, loading, searchFilter, filter]);

  return results;
};
