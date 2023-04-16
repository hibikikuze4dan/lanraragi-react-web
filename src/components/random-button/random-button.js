import React from "react";
import { useDispatch } from "react-redux";
import { AppBar, Button, Typography } from "@mui/material";
import { updateRandomArchives } from "../../app/slice";
import { getRandomArchives } from "../../requests/random";

export const RandomButton = ({ displayRandom, setDisplay }) => {
  const dispatch = useDispatch();

  const showRandom = async () => {
    if (displayRandom) {
      dispatch(updateRandomArchives(await getRandomArchives()));
    }
    setDisplay({ random: true, images: false });
  };

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ top: "auto", bottom: 0, backgroundColor: "rgba(24, 26, 27, 1)" }}
    >
      <Button onClick={showRandom}>
        <Typography
          style={{
            color: "white",
            alignContent: "center",
            textTransform: "none",
          }}
        >
          Random
        </Typography>
      </Button>
    </AppBar>
  );
};

export default RandomButton;
