import React from "react";
import {
  Avatar,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const QueuedSongList = () => {
  const greaterThenMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const song = {
    title: "LUNE",
    artist: "MÖÖN",
    thumbnail:
      "https://dokclub.ru/upload/wysiwyg/b335c6c154db28d84adf675ed09b8d96.png",
  };

  return (
    greaterThenMd && (
      <div style={{ margin: "10px 0" }}>
        <Typography color="textSecondary" variant="button">
          QUEUE (5)
        </Typography>
        {Array.from({ length: 5 }, () => song).map((song, i) => (
          <QueuedSong key={i} song={song} />
        ))}
      </div>
    )
  );
};

const useStyles = makeStyles({
  container: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "50px auto 50px",
    gap: 12,
    alignItems: "center",
    marginTop: 10,
  },
  avatar: {
    width: 44,
    height: 44,
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  songInfoContainer: {
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
});

const QueuedSong = ({ song }) => {
  const { artist, title, thumbnail } = song;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Avatar className={classes.avatar} src={thumbnail} alt="Song thumbnail" />
      <div className={classes.songInfoContainer}>
        <Typography className={classes.text} variant="subtitle2">
          {title}
        </Typography>
        <Typography
          className={classes.text}
          color="textSecondary"
          variant="subtitle2"
        >
          {artist}
        </Typography>
      </div>
      <IconButton>
        <Delete color="error" />
      </IconButton>
    </div>
  );
};

export default QueuedSongList;
