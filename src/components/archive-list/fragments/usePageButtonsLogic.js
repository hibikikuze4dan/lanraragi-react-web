import { useMediaQuery, useTheme } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWidth } from "../../../hooks/useWidth";
import { getMaxPages, getSearchPage } from "../../../app/selectors";
import { updateSearchPage } from "../../../app/slice";
import { setSearchStats } from "../../../storage/search";
import { updateSearchHistoryLastSearchPage } from "../../../storage/history";
import { updateLoading } from "../../../app/slice";

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
  const searchPageFromState = useSelector(getSearchPage);
  const maxPage = useSelector(getMaxPages)(breakpoint);
  const outOfBounds = searchPageFromState > maxPage;
  const searchPage = outOfBounds ? 1 : searchPageFromState;
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
    dispatch(updateLoading({ search: true }));
    setSearchStats({ page: newPage ?? 1 });
    updateSearchHistoryLastSearchPage(newPage ?? 1);
  }, [top, searchPage]);

  const onForwardClick = useCallback(() => {
    if (!top) scroll();
    if (maxPage !== searchPage) {
      const newPage = searchPage + 1;
      dispatch(updateSearchPage(newPage));
      dispatch(updateLoading({ search: true }));
      setSearchStats({ page: newPage });
      updateSearchHistoryLastSearchPage(newPage);
    }
  }, [top, maxPage, searchPage]);

  const onChange = useCallback(
    (e) => {
      const newPage = Number(e.target.value);
      dispatch(updateSearchPage(newPage));
      dispatch(updateLoading({ search: true }));
      setSearchStats({ page: newPage });
      updateSearchHistoryLastSearchPage(newPage);
      if (!top) scroll();
    },
    [top]
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
