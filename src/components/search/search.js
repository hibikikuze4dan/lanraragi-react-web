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
  const sliceToRender = [
    searchPage > 1 ? (searchPage - 1) * maxArchivesBreakpoints[breakpoint] : 0,
    maxArchivesBreakpoints[breakpoint] * searchPage,
  ];
  const archivesLoading = isSearchLoading || onLoadSearch;

  const callNewArchives = useCallback(
    async ({ filter, category, sortby, order }) => {
      const searchObject = {
        filter,
        sortby,
        order,
        start: -1,
        ...(category && { category }),
      };
      const arcs = await getArchivesBySearch(searchObject);
      dispatch(updateSearchArchives(arcs.data));
      dispatch(updateLoading({ search: false }));
    },
    []
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
  ]);

  const header = (
    <>
      <div style={{ marginBottom: "1.5rem" }}>
        <SearchAccordion />
      </div>
      <PageButtons id="page-buttons-top" top disabled={isSearchLoading} />
    </>
  );

  return (
    <ArchiveList
      display={display}
      archives={searchArchives}
      sliceToRender={sliceToRender}
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
