import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArchivesBySearch } from "../../requests/search";
import {
  getCurrentSearchArchives,
  getLoading,
  getSearchFilter,
  getSearchPage,
} from "../../app/selectors";
import { updateLoading, updateSearchArchives } from "../../app/slice";
import { ArchiveList } from "../archive-list/archive-list";
import { PageButtons } from "../archive-list/fragments/page-buttons";
import { useWidth } from "../../hooks/useWidth";
import { getNumArchivesToRender } from "../../storage/archives";
import { SearchAccordion } from "../accordions/search-accordion/search-accordion";

export const Search = ({ display }) => {
  const dispatch = useDispatch();
  const breakpoint = useWidth();
  const searchArchives = useSelector(getCurrentSearchArchives);
  const searchFilter = useSelector(getSearchFilter);
  const searchPage = useSelector(getSearchPage);
  const { search: isSearchLoading } = useSelector(getLoading);
  const maxArchivesBreakpoints = getNumArchivesToRender();
  const sliceToRender = [
    searchPage > 1 ? (searchPage - 1) * maxArchivesBreakpoints[breakpoint] : 0,
    maxArchivesBreakpoints[breakpoint] * searchPage,
  ];

  const callNewArchives = useCallback(async (search) => {
    dispatch(updateLoading({ search: true }));
    const arcs = await getArchivesBySearch({
      filter: search,
      sortby: "date_added",
      order: "desc",
      start: -1,
    });
    dispatch(updateSearchArchives(arcs.data));
    dispatch(updateLoading({ search: false }));
  }, []);

  useEffect(() => {
    if (searchFilter === "" && !searchArchives.length && !isSearchLoading) {
      callNewArchives(searchFilter);
      return;
    }
    dispatch(updateLoading({ search: false }));
  }, []);

  const header = (
    <>
      <SearchAccordion />
      <PageButtons id="page-buttons-top" top disabled={isSearchLoading} />
    </>
  );

  return (
    <ArchiveList
      display={display}
      archives={searchArchives}
      sliceToRender={sliceToRender}
      isSearch
      archivesLoading={isSearchLoading}
      loadingLabel="Getting archives from search"
      header={header}
      footer={
        <PageButtons id="page-buttons-bottom" disabled={isSearchLoading} />
      }
    />
  );
};

export default Search;
