import React from "react";
import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { HeadsetTwoTone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar color="primary" position="fixed">
        <Toolbar>
          <HeadsetTwoTone />
          <Typography variant="h6" className={classes.title}>
            Apollo-React Music Player
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
