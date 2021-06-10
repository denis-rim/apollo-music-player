import React from "react";
import QueuedSongList from "./QueuedSongList";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  makeStyles,
  Slider,
  Typography,
} from "@material-ui/core";
import { PlayArrow, SkipNext, SkipPrevious } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 15px",
  },
  content: {
    flex: "1 0 auto",
  },
  thumbnail: {
    width: 150,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const SongPlayer = () => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.container} variant="outlined">
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5" component="h3">
              Title
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              Artist
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton>
              <SkipPrevious />
            </IconButton>
            <IconButton>
              <PlayArrow className={classes.playIcon} />
            </IconButton>
            <IconButton>
              <SkipNext />
            </IconButton>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              00:01:30
            </Typography>
          </div>
          <Slider min={0} max={1} step={0.01} />
        </div>
        <CardMedia
          className={classes.thumbnail}
          image="https://dokclub.ru/upload/wysiwyg/b335c6c154db28d84adf675ed09b8d96.png"
        />
      </Card>
      <QueuedSongList />
    </>
  );
};

export default SongPlayer;
