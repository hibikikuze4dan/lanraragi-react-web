import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { ARCHIVE_STYLES } from "../constants";

export const EditArchiveButton = ({ onEditClick, id, title }) => {
  const onClick = () => {
    onEditClick(id);
  };
  return (
    <IconButton
      aria-label={`Click to Edit Archive Info for ${title}`}
      onClick={onClick}
      style={ARCHIVE_STYLES.editIconButton}
    >
      <Edit style={{ color: "white" }} />
    </IconButton>
  );
};
