/* eslint-disable no-confusing-arrow */
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, FormControl, Grid, InputLabel, Select } from "@mui/material";
import React from "react";
import { usePageButtonsLogic } from "./usePageButtonsLogic";

export const PageButtons = ({ id, disabled, top = false }) => {
  const {
    mdDown,
    onBackClick,
    onChange,
    onForwardClick,
    topCopy,
    searchPage,
    pages,
  } = usePageButtonsLogic({ top });

  return (
    <Grid id={id} item xs={12}>
      <Grid
        container
        justifyContent={mdDown ? "space-around" : "center"}
        alignContent="center"
        spacing={2}
        sx={{ pb: "1rem", color: "white" }}
      >
        <Grid container item xs={4} sm={5}>
          <Button
            fullWidth
            onClick={onBackClick}
            variant="contained"
            disabled={disabled}
            sx={{ backgroundColor: "#43464E" }}
          >
            <ArrowBack />
            Prev
          </Button>
        </Grid>
        <Grid item xs={4} sm={2}>
          <FormControl fullWidth>
            <InputLabel
              id={`page-jump-${topCopy}`}
              htmlFor={`page-jump-select-${topCopy}`}
            >
              Page
            </InputLabel>
            <Select
              variant="outlined"
              fullWidth
              labelId={`page-jump-${topCopy}`}
              id={`page-jump-select-${topCopy}`}
              value={searchPage}
              label="Page"
              native
              disabled={disabled}
              onChange={onChange}
            >
              {pages.map((pageNum) => (
                <option key={`page-${pageNum}`} value={pageNum}>
                  {pageNum}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid container item xs={4} sm={5}>
          <Button
            fullWidth
            onClick={onForwardClick}
            variant="contained"
            disabled={disabled}
            sx={{ backgroundColor: "#43464E" }}
          >
            Next
            <ArrowForward />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
