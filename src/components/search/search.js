import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArchivesBySearch } from "../../requests/search";
import {
  getCurrentSearchArchives,
  getSearchFilter,
  getSearchPage,
} from "../../app/selectors";
import { updateSearchArchives } from "../../app/slice";
import { ArchiveList } from "../archive-list/archive-list";
import { NUM_ARCHIVES_FOR_RENDER } from "../../constants";

export const Search = ({ display }) => {
  const dispatch = useDispatch();
  const searchArchives = useSelector(getCurrentSearchArchives);
  const searchFilter = useSelector(getSearchFilter);
  const searchPage = useSelector(getSearchPage);
  const sliceToRender = [
    searchPage > 1 ? (searchPage - 1) * NUM_ARCHIVES_FOR_RENDER : 0,
    NUM_ARCHIVES_FOR_RENDER * searchPage,
  ];

  const callNewArchives = useCallback(async (search) => {
    const arcs = await getArchivesBySearch({
      filter: search,
      sortby: "date_added",
      order: "desc",
      start: -1,
    });
    dispatch(updateSearchArchives(arcs.data));
  }, []);

  useEffect(() => {
    if (searchFilter === "" && !searchArchives.length)
      callNewArchives(searchFilter);
  }, []);

  return (
    <ArchiveList
      display={display}
      archives={searchArchives}
      sliceToRender={sliceToRender}
      isSearch
    />
  );
};

export default Search;
