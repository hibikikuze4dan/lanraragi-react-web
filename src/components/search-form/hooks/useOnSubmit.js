import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLoading,
  updateSearchCategory,
  updateSearchPage,
} from "../../../app/slice";
import {
  getCategories,
  getSearchFilter,
  getSearchSort,
  getSearchSortDirection,
} from "../../../app/selectors";
import { setSearchStats } from "../../../storage/search";
import { addSearchToSearchHistory } from "../../../storage/history";

export const useOnSubmit = ({
  selectedCategoryId = "",
  onPostDispatch = () => null,
}) => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  const searchFilter = useSelector(getSearchFilter);
  const searchSort = useSelector(getSearchSort);
  const searchSortDirection = useSelector(getSearchSortDirection);

  const onSubmit = useCallback(() => {
    dispatch(updateSearchPage(1));
    dispatch(
      updateSearchCategory(
        categories.find(({ id }) => id === selectedCategoryId) ?? {}
      )
    );
    dispatch(updateLoading({ search: true }));
    console.log("calling post dispatch", onPostDispatch);
    onPostDispatch();

    const searchStatsObject = {
      filter: searchFilter,
      page: 1,
      sort: searchSort,
      direction: searchSortDirection,
      category: selectedCategoryId,
    };
    setSearchStats(searchStatsObject);
    addSearchToSearchHistory(searchStatsObject);
  }, [
    searchFilter,
    selectedCategoryId,
    onPostDispatch,
    categories,
    searchSort,
    searchSortDirection,
  ]);

  return onSubmit;
};
