import { Grid, Slider as MUISlider, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";

export const Slider = ({
  defaultValue = 0,
  min,
  max,
  step,
  size = "medium",
  onChange,
  label = "Slider",
  labelId,
  value,
  marks = true,
  slotProps = {},
}) => {
  const [sliderValue, setSliderValue] = useState(defaultValue);
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
        <Typography id={labelId}>{label}</Typography>
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
          slotProps={{ ...slotProps }}
        />
      </Grid>
    </Grid>
  );
};
