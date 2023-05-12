import React, { useCallback, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BaseDialog } from "../base-dialog";
import {
  updateSearchArchives,
  updateSearchFilter,
  updateSearchPage,
} from "../../../app/slice";
import { getArchivesBySearch } from "../../../requests/search";
import { getCategories } from "../../../app/selectors";

export const SearchDialog = ({ onClose, open }) => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  const [tempSearch, setTempSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const onChangeText = (e) => setTempSearch(() => e.target.value);

  const callNewArchives = useCallback(async (searchVal, category) => {
    const arcs = await getArchivesBySearch({
      filter: searchVal,
      sortby: "date_added",
      order: "desc",
      start: -1,
      ...(category && { category: category?.id }),
    });
    dispatch(updateSearchArchives(arcs.data));
  }, []);
  const onSubmit = () => {
    dispatch(updateSearchPage(1));
    dispatch(updateSearchFilter(tempSearch));
    callNewArchives(tempSearch, selectedCategory);
    onClose();
  };
  const onKeyUp = (event) => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    if (event.code === "Enter") onSubmit();
  };
  const onCategorySelect = (e) => {
    setSelectedCategory(e.target.value);
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
              defaultValue={{}}
              value={selectedCategory}
              label="Filter Archives by Category"
              onChange={onCategorySelect}
            >
              <MenuItem value={null}>None</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Search Filter"
            placeholder="Search Title, Artist, Series, Language or Tags"
            fullWidth
            value={tempSearch}
            onChange={onChangeText}
            onKeyUp={onKeyUp}
            type="text"
            sx={{ mb: "1rem" }}
          />
        </Grid>
        <Button onClick={onSubmit}>Apply Filter</Button>
      </Grid>
    </BaseDialog>
  );
};
