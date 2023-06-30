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

const STYLES = {
  dialogTitle: { ml: 2, flex: 1, fontSize: "1.25rem" },
};

export const BaseDialog = ({
  open = false,
  onClose,
  title,
  children,
  titleStyles = {},
  fullWidth = false,
  maxWidth = "sm",
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isElement = isValidElement(title);

  return (
    <Dialog
      fullScreen={smDown}
      open={open}
      onClose={onClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogTitle sx={{ padding: 0, ...titleStyles }}>
        <AppBar sx={{ position: "relative" }}>
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
              <Typography sx={STYLES.dialogTitle} component="div">
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
