import React, { isValidElement } from "react";
import {
  AppBar,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";

export const BaseDialog = ({
  open = false,
  onClose,
  title,
  children,
  fullWidth = false,
  fullScreen,
  maxWidth = "sm",
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isElement = isValidElement(title);

  return (
    <Dialog
      fullScreen={fullScreen ?? smDown}
      open={open}
      onClose={onClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogTitle className="p-0">
        <AppBar className="relative">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
            {!isElement ? (
              <Typography className="flex text-xl ml-2" component="div">
                {title}
              </Typography>
            ) : (
              title
            )}
          </Toolbar>
        </AppBar>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
