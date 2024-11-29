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
  getUsePaginatedSearch,
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
  const usePaginatedSearch = useSelector(getUsePaginatedSearch);

  const callNewArchives = useCallback(
    async ({ filter, category, sortby, order }) => {
      const maxPerPage = maxArchivesBreakpoints[breakpoint];

      const searchObject = {
        filter,
        sortby,
        order,
        start: usePaginatedSearch
          ? Math.max(0, (searchPage - 1) * maxPerPage)
          : -1,
        length: usePaginatedSearch ? maxPerPage : -1,
        ...(category && { category }),
      };

      const response = await getArchivesBySearch(searchObject);
      dispatch(updateSearchArchives({
        archives: response.data,
        total: usePaginatedSearch ? response.recordsFiltered : response.data.length
      }));
      dispatch(updateLoading({ search: false }));
    },
    [searchPage, breakpoint, usePaginatedSearch]
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
    onLoadSearch,
    searchFilter,
    searchSortBy,
    searchOrder,
    searchCategory
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
      sliceToRender={!usePaginatedSearch ? [
        (searchPage - 1) * maxArchivesBreakpoints[breakpoint],
        searchPage * maxArchivesBreakpoints[breakpoint]
      ] : [0, Math.min(searchArchives.length, maxArchivesBreakpoints[breakpoint])]}
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
