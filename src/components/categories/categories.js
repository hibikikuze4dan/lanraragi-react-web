import React, { useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
} from "@mui/material";
import { updateCategory } from "../../requests/categories";

export const Categories = ({ arcId, categories }) => {
  const [selectedCatagoryID, setSelectedCategory] = useState("");
  const [response, setResponse] = useState(null);
  const onChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const onClick = () => {
    const updateCat = async () => {
      const updateCategoryResponse = await updateCategory({
        catId: selectedCatagoryID ?? "",
        arcId,
      });
      setResponse(updateCategoryResponse);
    };
    updateCat();
  };

  const categoriesToShow = categories.filter((cat) => !!cat.archives.length);

  return categoriesToShow.length ? (
    <Grid container>
      {response && (
        <Alert
          className="mx-0 mt-0 mb-4"
          severity={response?.error ? "error" : "success"}
        >
          {response?.error ?? ""}
          {response?.successMessage ?? ""}
        </Alert>
      )}
      <Grid item xs={12} sm={12}>
        <FormControl fullWidth>
          <InputLabel
            id="category-select-info-dialog"
            htmlFor="category-select-select"
          >
            Category
          </InputLabel>
          <Select
            className="mx-0 mt-0 mb-4"
            variant="filled"
            fullWidth
            labelId="category-select-info-dialog"
            id="category-select-select"
            value={selectedCatagoryID}
            label="Category"
            onChange={onChange}
            native
          >
            <option value="" aria-label="none" />
            {categoriesToShow.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat?.name ?? "UNKNOWN"}
              </option>
            ))}
          </Select>
          <Button fullWidth onClick={onClick}>
            Add to Category
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  ) : null;
};
