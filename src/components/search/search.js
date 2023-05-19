import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentSearchArchives,
  getLoading,
  getSearchFilter,
  getSearchPage,
} from "../../app/selectors";
import { updateLoading } from "../../app/slice";
import { ArchiveList } from "../archive-list/archive-list";
import { PageButtons } from "../archive-list/fragments/page-buttons";
import { useWidth } from "../../hooks/useWidth";
import { getNumArchivesToRender } from "../../storage/archives";
import { SearchAccordion } from "../accordions/search-accordion/search-accordion";
import { searchOnLoad } from "../../hooks/searchOnLoad/searchOnLoad";

export const Search = ({ display }) => {
  const dispatch = useDispatch();
  const breakpoint = useWidth();
  const searchArchives = useSelector(getCurrentSearchArchives);
  const searchFilter = useSelector(getSearchFilter);
  const searchPage = useSelector(getSearchPage);
  const { search: isSearchLoading } = useSelector(getLoading);
  const { loading } = searchOnLoad(searchFilter);
  const maxArchivesBreakpoints = getNumArchivesToRender();
  const sliceToRender = [
    searchPage > 1 ? (searchPage - 1) * maxArchivesBreakpoints[breakpoint] : 0,
    maxArchivesBreakpoints[breakpoint] * searchPage,
  ];

  useEffect(() => {
    dispatch(updateLoading({ search: loading }));
  }, [loading]);

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
