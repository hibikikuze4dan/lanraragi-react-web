import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { ARCHIVE_STYLES } from "../constants";

export const EditArchiveButton = ({ onEditClick, id }) => {
  const onClick = () => {
    onEditClick(id);
  };
  return (
    <IconButton
      onClick={onClick}
      size="large"
      style={ARCHIVE_STYLES.editIconButton}
    >
      <Edit style={{ mixBlendMode: "difference" }} />
    </IconButton>
  );
};
