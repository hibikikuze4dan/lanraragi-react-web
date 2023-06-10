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
import { matchSorter } from "match-sorter";
import React, { useCallback, useRef, useState } from "react";
import { AUTOCOMPLETE_STYLES } from "./constants";

export const Autocomplete = ({
  label,
  value,
  items = [],
  maxItems = 25,
  onChange,
  placeholder,
}) => {
  const [textFieldValue, setTextFieldValue] = useState(value ?? "");
  const [focused, setFocued] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [ref, setRef] = useState(useRef(null));
  const commaSplitTextField = textFieldValue.split(", ");
  const lastIndex = commaSplitTextField.length - 1;
  const tagSearchValue = commaSplitTextField[lastIndex];

  const onTextFieldChange = useCallback(
    (e) => {
      const newTextFieldValue = e?.target?.value ?? "";
      setTextFieldValue(newTextFieldValue);
      if (onChange) onChange(newTextFieldValue);
      if (!listOpen) setListOpen(true);
    },
    [onChange]
  );

  const onListItemButtonClick = useCallback(
    (item) => {
      commaSplitTextField[lastIndex] = `${item}, `;
      const newValue = commaSplitTextField.join(", ");
      setTextFieldValue(newValue);
      ref.focus();
      if (onChange) onChange(newValue);
      setListOpen(false);
    },
    [textFieldValue, ref, onChange]
  );

  const onEndAdornmentButtonClick = useCallback(() => {
    onTextFieldChange({ target: { value: "" } });
    ref.focus();
  }, [onTextFieldChange, ref]);

  const listItems = matchSorter(items, tagSearchValue, {
    threshold: matchSorter.rankings.CONTAINS,
  }).slice(0, maxItems);

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
        open={
          listItems.length > 0 &&
          focused &&
          listOpen &&
          tagSearchValue.length > 1
        }
        anchorEl={ref}
        disablePortal
        placement="bottom-start"
        sx={AUTOCOMPLETE_STYLES.popper}
      >
        <List sx={AUTOCOMPLETE_STYLES.list}>
          {listItems.map((item) => (
            <ListItem key={item} sx={{ padding: 0 }}>
              <ListItemButton
                component="div"
                onClick={() => onListItemButtonClick(item)}
                sx={{ padding: ".25rem 0 .25rem .5rem" }}
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
