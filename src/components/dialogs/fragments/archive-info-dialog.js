import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { BaseDialog } from "../base-dialog";
import getArchiveMetaData from "../../../requests/metadata";

export const ArchiveInfoDialog = ({ onClose, arcId, open }) => {
  const [archiveData, setArchiveData] = useState(null);

  useEffect(() => {
    const a = async () => setArchiveData(await getArchiveMetaData(arcId));
    a();
  }, [arcId, setArchiveData]);

  const title = archiveData?.title ?? "";
  return (
    <BaseDialog title={title} onClose={onClose} open={open}>
      <Typography>Pages: {archiveData?.pagecount ?? 0}</Typography>
      <Typography>Tags: {archiveData?.tags ?? ""}</Typography>
    </BaseDialog>
  );
};
