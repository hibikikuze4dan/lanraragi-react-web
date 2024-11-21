/* eslint-disable camelcase */
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentSearchArchives,
  getLoading,
  getSearchCategory,
  getSearchFilter,
  getSearchPage,
  getSearchSort,
  getSearchSortDirection,
} from "../../app/selectors";
import { updateLoading, updateSearchArchives } from "../../app/slice";
import { ArchiveList } from "../archive-list/archive-list";
import { PageButtons } from "../archive-list/fragments/page-buttons";
import { useWidth } from "../../hooks/useWidth";
import { getNumArchivesToRender } from "../../storage/archives";
import { SearchAccordion } from "../accordions/search-accordion/search-accordion";
import { getArchivesBySearch } from "../../requests/search";

export const Search = ({ display, loading, controller }) => {
  const dispatch = useDispatch();
  const breakpoint = useWidth();
  const searchArchives = useSelector(getCurrentSearchArchives);
  const searchPage = useSelector(getSearchPage);
  const { search: isSearchLoading, onLoadSearch } = useSelector(getLoading);
  const searchFilter = useSelector(getSearchFilter);
  const searchSortBy = useSelector(getSearchSort);
  const searchOrder = useSelector(getSearchSortDirection);
  const searchCategory = useSelector(getSearchCategory)?.id;
  const maxArchivesBreakpoints = getNumArchivesToRender();
  const archivesLoading = isSearchLoading || onLoadSearch;

  const callNewArchives = useCallback(
    async ({ filter, category, sortby, order }) => {
      const maxPerPage = maxArchivesBreakpoints[breakpoint];
      const start = Math.max(0, (searchPage - 1) * maxPerPage);
      
      const searchObject = {
        filter,
        sortby,
        order,
        start,
        length: maxPerPage,
        ...(category && { category }),
      };
      
      const response = await getArchivesBySearch(searchObject);
      dispatch(updateSearchArchives({
        archives: response.data,
        total: response.recordsFiltered
      }));
      dispatch(updateLoading({ search: false }));
    },
    [searchPage, breakpoint]
  );

  useEffect(() => {
    dispatch(updateLoading({ onLoadSearch: loading }));
    if (isSearchLoading && controller) controller.abort();
  }, [loading, isSearchLoading, controller]);

  useEffect(() => {
    if (isSearchLoading && !onLoadSearch)
      callNewArchives({
        filter: searchFilter,
        sortby: searchSortBy,
        order: searchOrder,
        category: searchCategory,
      });
  }, [
    isSearchLoading,
    searchFilter,
    searchSortBy,
    searchOrder,
    searchCategory,
    searchPage,
    breakpoint
  ]);

  const header = (
    <>
      <div className="mb-6">
        <SearchAccordion />
      </div>
      <PageButtons id="page-buttons-top" top disabled={isSearchLoading} />
    </>
  );

  return (
    <ArchiveList
      display={display}
      archives={searchArchives}
      isSearch
      archivesLoading={archivesLoading}
      loadingLabel="Getting archives from search"
      header={header}
      footer={
        <PageButtons id="page-buttons-bottom" disabled={isSearchLoading} />
      }
    />
  );
};

export default Search;
