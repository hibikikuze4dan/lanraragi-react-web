import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentSearchArchives,
  getLoading,
  getSearchPage,
} from "../../app/selectors";
import { updateLoading } from "../../app/slice";
import { ArchiveList } from "../archive-list/archive-list";
import { PageButtons } from "../archive-list/fragments/page-buttons";
import { useWidth } from "../../hooks/useWidth";
import { getNumArchivesToRender } from "../../storage/archives";
import { SearchAccordion } from "../accordions/search-accordion/search-accordion";

export const Search = ({ display, loading, controller }) => {
  const dispatch = useDispatch();
  const breakpoint = useWidth();
  const searchArchives = useSelector(getCurrentSearchArchives);
  const searchPage = useSelector(getSearchPage);
  const { search: isSearchLoading, onLoadSearch } = useSelector(getLoading);
  const maxArchivesBreakpoints = getNumArchivesToRender();
  const sliceToRender = [
    searchPage > 1 ? (searchPage - 1) * maxArchivesBreakpoints[breakpoint] : 0,
    maxArchivesBreakpoints[breakpoint] * searchPage,
  ];
  const archivesLoading = isSearchLoading || onLoadSearch;

  useEffect(() => {
    dispatch(updateLoading({ onLoadSearch: loading }));
    if (isSearchLoading && controller) controller.abort();
  }, [loading, isSearchLoading, controller]);

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
