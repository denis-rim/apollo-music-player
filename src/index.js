import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
