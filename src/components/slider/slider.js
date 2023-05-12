import { Grid, Slider as MUISlider, Typography } from "@mui/material";
import React, { useState } from "react";

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
}) => {
  const [sliderValue, setSliderValue] = useState(defaultValue);
  const onSliderChange = (_, newValue) => {
    setSliderValue(newValue);
    onChange(newValue);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography>{label}</Typography>
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
        />
      </Grid>
    </Grid>
  );
};
