import React, { useCallback, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BaseDialog } from "../base-dialog";
import {
  updateSearchArchives,
  updateSearchCategory,
  updateSearchFilter,
  updateSearchPage,
} from "../../../app/slice";
import { getArchivesBySearch } from "../../../requests/search";
import {
  getCategories,
  getSearchCategory,
  getSearchFilter,
} from "../../../app/selectors";

export const SearchDialog = ({ onClose, open }) => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  const searchFilter = useSelector(getSearchFilter);
  const searchCategory = useSelector(getSearchCategory);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    searchCategory?.id ?? ""
  );

  const onChangeText = (e) => dispatch(updateSearchFilter(e.target.value));

  const callNewArchives = useCallback(async (searchVal, categoryId) => {
    const arcs = await getArchivesBySearch({
      filter: searchVal,
      sortby: "date_added",
      order: "desc",
      start: -1,
      ...(categoryId && { category: categoryId }),
    });
    dispatch(updateSearchArchives(arcs.data));
  }, []);
  const onSubmit = useCallback(() => {
    dispatch(updateSearchPage(1));
    dispatch(
      updateSearchCategory(
        categories.find(({ id }) => id === selectedCategoryId) ?? {}
      )
    );
    callNewArchives(searchFilter, selectedCategoryId);
    onClose();
  }, [searchFilter, selectedCategoryId, onClose, categories]);
  const onClear = () => {
    dispatch(updateSearchPage(1));
    dispatch(updateSearchCategory({}));
    dispatch(updateSearchFilter(""));
    setSelectedCategoryId("");
    callNewArchives("", "");
    onClose();
  };
  const onKeyUp = (event) => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    if (event.code === "Enter") onSubmit();
  };
  const onCategorySelect = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  return (
    <BaseDialog title="Search" onClose={onClose} open={open}>
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        spacing={2}
        sx={{ height: "100%", pt: "2rem" }}
      >
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="select-categories-search-label">
              Filter Archives by Category
            </InputLabel>
            <Select
              labelId="select-categories-search-label"
              id="select-categories-search"
              value={selectedCategoryId}
              label="Filter Archives by Category"
              onChange={onCategorySelect}
              native
            >
              <option value="" aria-label="None" />
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Search Filter"
            placeholder="Search Title, Artist, Series, Language or Tags"
            fullWidth
            value={searchFilter}
            onChange={onChangeText}
            onKeyUp={onKeyUp}
            type="text"
            sx={{ mb: "1rem" }}
          />
        </Grid>
        <Grid container justifyContent="center" item xs={12} sm={6}>
          <Button fullWidth={smUp} onClick={onSubmit}>
            Apply Filter
          </Button>
        </Grid>
        <Grid container justifyContent="center" item xs={12} sm={6}>
          <Button fullWidth={smUp} onClick={onClear}>
            Clear Filter
          </Button>
        </Grid>
      </Grid>
    </BaseDialog>
  );
};
