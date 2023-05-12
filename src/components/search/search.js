import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArchivesBySearch } from "../../requests/search";
import {
  getCurrentSearchArchives,
  getSearchFilter,
  getSearchPage,
} from "../../app/selectors";
import { updateSearchArchives } from "../../app/slice";
import { ArchiveList } from "../archive-list/archive-list";
import { useWidth } from "../../hooks/useWidth";
import { getNumArchivesToRender } from "../../storage/archives";
import { Loading } from "../loading/loading";

export const Search = ({ display }) => {
  const dispatch = useDispatch();
  const breakpoint = useWidth();
  const searchArchives = useSelector(getCurrentSearchArchives);
  const searchFilter = useSelector(getSearchFilter);
  const searchPage = useSelector(getSearchPage);
  const [loading, setLoading] = useState(false);
  const maxArchivesBreakpoints = getNumArchivesToRender();
  const sliceToRender = [
    searchPage > 1 ? (searchPage - 1) * maxArchivesBreakpoints[breakpoint] : 0,
    maxArchivesBreakpoints[breakpoint] * searchPage,
  ];

  const callNewArchives = useCallback(async (search) => {
    setLoading(true);
    const arcs = await getArchivesBySearch({
      filter: search,
      sortby: "date_added",
      order: "desc",
      start: -1,
    });
    dispatch(updateSearchArchives(arcs.data));
  }, []);

  useEffect(() => {
    if (searchFilter === "" && !searchArchives.length) {
      callNewArchives(searchFilter);
      return;
    }
    setLoading(false);
  }, [searchFilter, searchArchives]);

  return (
    <Loading loading={loading} label="Getting archives from search">
      <ArchiveList
        display={display}
        archives={searchArchives}
        sliceToRender={sliceToRender}
        isSearch
      />
    </Loading>
  );
};

export default Search;
