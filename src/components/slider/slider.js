import { Grid, Slider as MUISlider, Typography } from "@mui/material";
import React, { useCallback, useId, useState } from "react";

export const Slider = ({
  defaultValue = 0,
  min,
  max,
  step,
  size = "medium",
  onChange,
  label = "Slider",
  value,
  marks = true,
  slotProps = {},
}) => {
  const uniqueId = useId();
  const [sliderValue, setSliderValue] = useState(defaultValue);
  const ariaLabelForThumb = `${uniqueId}-label`;

  const onSliderChange = (_, newValue) => {
    setSliderValue(newValue);
    onChange(newValue);
  };
  const getAriaValueText = useCallback(
    () =>
      `Slider currently at ${sliderValue} - Minimum value is ${min} - Maximum value is ${max}`,
    [sliderValue, min, max]
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography id={ariaLabelForThumb}>{label}</Typography>
      </Grid>
      <Grid item xs={12}>
        <MUISlider
          value={value ?? sliderValue}
          size={size}
          onChange={onSliderChange}
          min={min}
          max={max}
          marks={marks}
          step={step}
          valueLabelDisplay="auto"
          getAriaValueText={getAriaValueText}
          slotProps={{
            ...slotProps,
            input: {
              ...slotProps?.input,
              "aria-labelledby": ariaLabelForThumb,
            },
          }}
        />
      </Grid>
    </Grid>
  );
};
