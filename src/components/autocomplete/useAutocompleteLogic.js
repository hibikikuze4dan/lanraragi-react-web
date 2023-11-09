import { matchSorter } from "match-sorter";
import { useCallback, useRef, useState } from "react";

export const useAutocompleteLogic = ({ value, onChange, items, maxItems }) => {
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

  return {
    focused,
    setFocued,
    setRef,
    onListItemButtonClick,
    onEndAdornmentButtonClick,
    listItems,
    onTextFieldChange,
    textFieldValue,
    tagSearchValue,
    listOpen,
    ref,
  };
};
