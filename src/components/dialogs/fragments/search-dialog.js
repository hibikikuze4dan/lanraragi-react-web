import React, { useCallback, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { BaseDialog } from "../base-dialog";
import {
  updateSearchArchives,
  updateSearchFilter,
  updateSearchPage,
} from "../../../app/slice";
import { getArchivesBySearch } from "../../../requests/search";

export const SearchDialog = ({ onClose, open }) => {
  const dispatch = useDispatch();
  const [tempSearch, setTempSearch] = useState("");

  const onChangeText = (e) => setTempSearch(() => e.target.value);

  const callNewArchives = useCallback(async (searchVal) => {
    const arcs = await getArchivesBySearch({
      filter: searchVal,
      sortby: "date_added",
      order: "desc",
      start: -1,
    });
    dispatch(updateSearchArchives(arcs.data));
  }, []);
  const onSubmit = () => {
    dispatch(updateSearchPage(1));
    dispatch(updateSearchFilter(tempSearch));
    callNewArchives(tempSearch);
    onClose();
  };
  const onKeyUp = (event) => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    if (event.code === "Enter") onSubmit();
  };

  return (
    <BaseDialog title="Search" onClose={onClose} open={open}>
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        sx={{ height: "100%", pt: "2rem" }}
      >
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
        <Button onClick={onSubmit}>Apply Filter</Button>
      </Grid>
    </BaseDialog>
  );
};
