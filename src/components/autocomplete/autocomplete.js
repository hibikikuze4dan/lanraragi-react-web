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

const styles = {
  popper: {
    width: "calc(100% - 32px)",
    backgroundColor: "#121212",
    zIndex: 5,
  },
  list: {
    maxHeight: "500px",
    overflowY: "scroll",
    width: "100%",
  },
};

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
    [textFieldValue, ref]
  );

  const listItems = matchSorter(items, commaSplitTextField[lastIndex], {
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
              onClick={() => onTextFieldChange({ target: { value: "" } })}
            >
              <Close />
            </IconButton>
          ) : null,
        }}
      />
      <Popper
        open={listItems.length > 0 && focused && listOpen}
        anchorEl={ref}
        disablePortal
        placement="bottom-start"
        sx={styles.popper}
      >
        <List sx={styles.list}>
          {listItems.map((item) => (
            <ListItem>
              <ListItemButton
                component="div"
                key={item}
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
