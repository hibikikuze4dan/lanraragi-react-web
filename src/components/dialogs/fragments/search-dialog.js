import React from "react";
import { BaseDialog } from "../base-dialog";
import { SearchForm } from "../../search-form/search-form";

export const SearchDialog = ({ onClose, open }) => (
  <BaseDialog title="Search" onClose={onClose} open={open}>
    <SearchForm onClose={onClose} />
  </BaseDialog>
);
