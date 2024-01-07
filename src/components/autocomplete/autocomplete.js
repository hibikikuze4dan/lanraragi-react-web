/* eslint-disable no-confusing-arrow */
import { Close } from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useAutocompleteLogic } from "./useAutocompleteLogic";

export const Autocomplete = ({
  label,
  value,
  items = [],
  maxItems = 25,
  onChange,
  placeholder,
}) => {
  const {
    focused,
    setFocued,
    setRef,
    onEndAdornmentButtonClick,
    onListItemButtonClick,
    listItems,
    tagSearchValue,
    textFieldValue,
    onTextFieldChange,
    listOpen,
    ref,
  } = useAutocompleteLogic({ value, onChange, items, maxItems });

  return (
    <div
      onFocus={() => setFocued(true)}
      onBlur={(e) =>
        !e.currentTarget.contains(e.relatedTarget) ? setFocued(false) : null
      }
      tabIndex={-1}
    >
      <TextField
        inputRef={setRef}
        label={label}
        fullWidth
        value={textFieldValue}
        onChange={onTextFieldChange}
        placeholder={placeholder}
        InputProps={{
          endAdornment: textFieldValue ? (
            <IconButton
              aria-label="delete all current search field text"
              onClick={onEndAdornmentButtonClick}
            >
              <Close />
            </IconButton>
          ) : null,
        }}
      />
      <Popper
        className="popper bg-[#121212] z-20"
        open={
          listItems.length > 0 &&
          focused &&
          listOpen &&
          tagSearchValue.length > 1
        }
        anchorEl={ref}
        disablePortal
        placement="bottom-start"
      >
        <List className="max-h-[175px] overflow-y-scroll w-full">
          {listItems.map((item) => (
            <ListItem className="p-0" key={item}>
              <ListItemButton
                className="py-1 pl-2"
                component="div"
                onClick={() => onListItemButtonClick(item)}
              >
                <Typography>{item}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popper>
    </div>
  );
};
