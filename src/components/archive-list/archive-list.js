import { Grid } from "@mui/material";
import React, { useState } from "react";
import Archive from "../archive/archive";
import { ArchiveInfoDialog } from "../dialogs/fragments/archive-info-dialog";

export const ArchiveList = ({ archives = [], display }) => {
  const [archiveInfoModalState, updateArchiveInfoModalState] = useState({
    open: false,
    arcId: "",
  });

  return (
    <div
      className="full-height"
      style={{
        display,
        overflowY: "scroll",
      }}
    >
      <div style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
        <Grid
          container
          spacing={4}
          sx={{
            padding: "0 1rem",
            marginTop: 0,
          }}
        >
          {archives.map((archive, idx) => {
            const { arcid, title } = archive;
            const onInfoClick = () =>
              updateArchiveInfoModalState({ open: true, arcId: arcid });
            return (
              <Grid
                key={arcid}
                xs={12}
                sm={6}
                md={6}
                lg={3}
                xl={2}
                item
                sx={{ paddingTop: "0 !important", paddingBottom: "2rem" }}
              >
                <Archive
                  index={idx}
                  id={arcid}
                  title={title}
                  onInfoClick={onInfoClick}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
      <ArchiveInfoDialog
        onClose={() =>
          updateArchiveInfoModalState({ ...archiveInfoModalState, open: false })
        }
        open={archiveInfoModalState.open}
        arcId={archiveInfoModalState.arcId}
      />
    </div>
  );
};
