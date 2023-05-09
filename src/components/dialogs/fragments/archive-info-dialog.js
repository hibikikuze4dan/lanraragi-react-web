import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BaseDialog } from "../base-dialog";
import getArchiveMetaData from "../../../requests/metadata";
import { Categories } from "../../categories/categories";
import { Tags } from "../../tags/tags";
import { updateCategories } from "../../../app/slice";
import { getCategories as getStateCategories } from "../../../app/selectors";
import getCategories, {
  getArchiveCategories,
} from "../../../requests/categories";

export const ArchiveInfoDialog = ({ onClose, arcId, open }) => {
  const dispatch = useDispatch();
  const categories = useSelector(getStateCategories);
  const [archiveData, setArchiveData] = useState({});

  useEffect(() => {
    const getArchiveData = async () => {
      const metaData = await getArchiveMetaData(arcId);
      const categoriesData = await getArchiveCategories(arcId);
      setArchiveData({
        ...metaData,
        categories: categoriesData?.categories ?? [],
      });
    };

    getArchiveData();
  }, [arcId, setArchiveData]);

  useEffect(() => {
    const getCats = async () => {
      dispatch(updateCategories(await getCategories()));
    };
    if (!categories.length) getCats();
  }, [categories]);

  const archiveTitle = archiveData?.title ?? "";
  return (
    <BaseDialog title="Archive Info" onClose={onClose} open={open}>
      <Grid container spacing={4} sx={{ padding: "2rem 0 1rem 0" }}>
        <Grid item xs={12} sm={6}>
          <Grid
            alignContent="center"
            justifyContent="center"
            container
            sx={{ height: "100%" }}
          >
            <Typography textAlign="center">{archiveTitle}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Categories arcId={arcId} categories={categories} />
        </Grid>
      </Grid>
      <Typography>
        Categories:{" "}
        {archiveData?.categories?.map((cat) => cat?.name ?? "").join(", ")}
      </Typography>
      <Typography sx={{ padding: "1rem 0" }}>
        Pages: {archiveData?.pagecount ?? 0}
      </Typography>
      <Tags onClose={onClose} archiveTags={archiveData?.tags ?? ""} />
    </BaseDialog>
  );
};
