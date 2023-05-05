import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import AppComponent from "./components/App";

const styles = {
  app: {
    maxWidth: "100%",
    maxHeight: `100svh`,
    overflowX: "hidden",
    overflowY: "hidden",
  },
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "white",
        },
      },
    },
  },
});

function App() {
  return (
    <div className="App" style={styles.app}>
      <ThemeProvider theme={darkTheme}>
        <AppComponent />
        <CssBaseline />
      </ThemeProvider>
    </div>
  );
}

export default App;
