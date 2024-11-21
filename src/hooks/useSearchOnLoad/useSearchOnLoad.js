import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentRandomArchives,
  getCurrentSearchArchives,
  getSearchArchivesTotal
} from "../../app/selectors";
import { updateSearchArchives } from "../../app/slice";
import { getArchivesBySearchThrottled } from "../../requests/search";
import { getSearchStats } from "../../storage/search";
import { useWidth } from "../../hooks/useWidth";
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
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState(null);
  const [controller] = useState(new AbortController());

  const results = { 
    results: searchArchives, 
    total: searchTotal,
    loading, 
    controller 
  };

  const callNewArchives = useCallback(async (search) => {
    setLoading(true);
    const maxPerPage = getNumArchivesToRender()[breakpoint];
    const start = Math.max(0, (page - 1) * maxPerPage);

    try {
      const response = await getArchivesBySearchThrottled(
        {
          filter: search,
          sortby,
          order,
          start,
          length: maxPerPage,
          ...(category && { category }),
        },
        controller
      );
      
      dispatch(updateSearchArchives({
        archives: response.data,
        total: response.recordsFiltered
      }));
    } catch (error) {
      dispatch(updateSearchArchives({
        archives: [{ id: "error", title: "something went wrong, try searching again" }],
        total: 0
      }));
    } finally {
      setLoading(false);
    }
  }, [breakpoint, page]);

  useEffect(() => {
    if (
      !searchTotal &&  // 改为检查总数而不是当前页的结果
      randomArchives.length &&
      !loading &&
      searchFilter !== filter
    ) {
      callNewArchives(filter);
      setSearchFilter(filter);
    }
  }, [searchTotal, randomArchives, loading, searchFilter, filter]);

  return results;
};
