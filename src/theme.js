import { teal, purple } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: teal,
    secondary: purple,
  },
});

export default theme;
