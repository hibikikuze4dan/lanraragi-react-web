import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { BaseDialog } from "../base-dialog";
import getArchiveMetaData from "../../../requests/metadata";
import { Categories } from "../../categories/categories";
import { Tags } from "../../tags/tags";

export const ArchiveInfoDialog = ({ onClose, arcId, open }) => {
  const [archiveData, setArchiveData] = useState(null);

  useEffect(() => {
    const getArchiveData = async () =>
      setArchiveData(await getArchiveMetaData(arcId));
    getArchiveData();
  }, [arcId, setArchiveData]);

  const title = archiveData?.title ?? "";
  return (
    <BaseDialog title={title} onClose={onClose} open={open}>
      <Typography sx={{ padding: "1rem 0" }}>
        Pages: {archiveData?.pagecount ?? 0}
      </Typography>
      <Tags onClose={onClose} archiveTags={archiveData?.tags ?? ""} />
      <Categories arcId={arcId} />
    </BaseDialog>
  );
};
