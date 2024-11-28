import { useMediaQuery, useTheme } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWidth } from "../../../hooks/useWidth";
import { getMaxPages, getSearchPage, getUsePaginatedSearch } from "../../../app/selectors";
import { updateSearchPage, updateLoading } from "../../../app/slice";
import { setSearchStats } from "../../../storage/search";
import { updateSearchHistoryLastSearchPage } from "../../../storage/history";

const scroll = () => {
  document
    .getElementById("page-buttons-top")
    ?.scrollIntoView({ behavior: "smooth" });
};

export const usePageButtonsLogic = ({ top }) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const breakpoint = useWidth();
  const dispatch = useDispatch();
  const searchPage = useSelector(getSearchPage);
  const usePaginatedSearch = useSelector(getUsePaginatedSearch);
  const maxPage = useSelector(getMaxPages)(breakpoint);
  const outOfBounds = searchPage > maxPage;
  const topCopy = top ? "top" : "bottom";
  const pages = Array(maxPage)
    .fill(0)
    .map((_, index) => index + 1);

  useEffect(() => {
    if (outOfBounds) dispatch(updateSearchPage(1));
  }, []);

  const onBackClick = useCallback(() => {
    const newPage = searchPage - 1;
    if (!top) scroll();
    dispatch(updateSearchPage(newPage));
    if (usePaginatedSearch) {
      dispatch(updateLoading({ search: true }));
    }
    setSearchStats({ page: newPage ?? 1 });
    updateSearchHistoryLastSearchPage(newPage ?? 1);
  }, [top, searchPage, usePaginatedSearch]);

  const onForwardClick = useCallback(() => {
    if (!top) scroll();
    if (maxPage !== searchPage) {
      const newPage = searchPage + 1;
      dispatch(updateSearchPage(newPage));
      if (usePaginatedSearch) {
        dispatch(updateLoading({ search: true }));
      }
      setSearchStats({ page: newPage });
      updateSearchHistoryLastSearchPage(newPage);
    }
  }, [top, maxPage, searchPage, usePaginatedSearch]);

  const onChange = useCallback(
    (e) => {
      const newPage = Number(e.target.value);
      dispatch(updateSearchPage(newPage));
      if (usePaginatedSearch) {
        dispatch(updateLoading({ search: true }));
      }
      setSearchStats({ page: newPage });
      updateSearchHistoryLastSearchPage(newPage);
      if (!top) scroll();
    },
    [top, usePaginatedSearch]
  );

  return {
    mdDown,
    onBackClick,
    topCopy,
    searchPage,
    onChange,
    pages,
    onForwardClick,
  };
};
