import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

export const EditArchiveButton = ({ onEditClick, id, title }) => {
  const onClick = () => {
    onEditClick(id);
  };
  return (
    <IconButton
      className="absolute top-2.5 right-2 w-fit bg-[#363940]"
      aria-label={`Click to Edit Archive Info for ${title}`}
      onClick={onClick}
    >
      <Edit className="text-slate-50" />
    </IconButton>
  );
};
