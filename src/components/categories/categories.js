import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { getCategories, updateCategory } from "../../requests/categories";

export const Categories = ({ arcId }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCatagory, setSelectedCategory] = useState("");
  const [response, setResponse] = useState(null);
  const onChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const onClick = () => {
    const updateCat = async () => {
      const updateCategoryResponse = await updateCategory({
        catId: selectedCatagory?.id ?? "",
        arcId,
      });
      setResponse(updateCategoryResponse);
    };
    updateCat();
  };

  useEffect(() => {
    const getCats = async () => {
      setCategories(await getCategories());
    };
    getCats();
  }, [setCategories]);

  const categoriesToShow = categories.filter((cat) => !!cat.archives.length);

  return categoriesToShow.length ? (
    <Grid container sx={{ padding: "2rem 0 1rem 0" }}>
      {response && (
        <Alert
          severity={response?.error ? "error" : "success"}
          sx={{ margin: "0 0 1rem 0" }}
        >
          {response?.error ?? ""}
          {response?.successMessage ?? ""}
        </Alert>
      )}
      <Grid item xs={9} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="category-select-info-dialog">Category</InputLabel>
          <Select
            variant="filled"
            fullWidth
            labelId="category-select-info-dialog"
            id="category-select-select"
            value={selectedCatagory}
            label="Category"
            onChange={onChange}
            sx={{ margin: "0 0 1rem 0" }}
          >
            {categoriesToShow.map((cat) => (
              <MenuItem key={cat.id} value={cat}>
                {cat?.name ?? "UNKNOWN"}
              </MenuItem>
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
