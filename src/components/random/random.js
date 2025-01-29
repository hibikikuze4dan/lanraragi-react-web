import React, { useMemo } from "react";
import { Button, Grid } from "@mui/material";
import { Casino } from "@mui/icons-material";
import { ArchiveList } from "../archive-list/archive-list";
import { Loading } from "../loading/loading";
import { useRandomArchivesLogic } from "../../hooks/useRandomArchivesLogic/useRandomArchivesLogic";

export const Random = ({ display }) => {
  const { getNewRandomArchives, randomArchives, isRandomSectionLoading } =
    useRandomArchivesLogic(true);

  const footer = useMemo(
    () => (
      <Grid className="pt-4" container justifyContent="center">
        <Grid item xs={12} sm={8}>
          <Button
            className="normal-case"
            fullWidth
            onClick={getNewRandomArchives}
          >
            <Casino className="mr-2" /> More Archives
          </Button>
        </Grid>
      </Grid>
    ),
    []
  );

  return (
    <Loading loading={isRandomSectionLoading} label="Loading Random Archives">
      <ArchiveList
        display={display}
        archives={randomArchives}
        footer={footer}
      />
    </Loading>
  );
};

export default Random;
