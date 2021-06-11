import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { PlayArrow, Save } from "@material-ui/icons";
import { GET_SONGS } from "../graphql/subscriptions";
import { useSubscription, useQuery } from "react-apollo";

const SongList = () => {
  const { data, loading, error } = useSubscription(GET_SONGS);

  console.log(error);

  // const song = {
  //   title: "LUNE",
  //   artist: "MÖÖN",
  //   thumbnail:
  //     "https://dokclub.ru/upload/wysiwyg/b335c6c154db28d84adf675ed09b8d96.png",
  // };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) return <div>Error...</div>;

  return (
    <div>
      {data.songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(1),
  },
  songInfoContainer: {
    display: "flex",
    alignItems: "center",
  },
  songInfo: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  thumbnail: {
    objectFit: "cover",
    width: 140,
    height: 140,
  },
}));

const Song = ({ song }) => {
  const { title, artist, thumbnail, duration, url } = song;
  const classes = useStyles();

  return (
    <Card className={classes.container}>
      <div className={classes.songInfoContainer}>
        <CardMedia className={classes.thumbnail} image={thumbnail} />
        <div className={classes.songInfo}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body1" component="p" color="textSecondary">
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton size="small" color="primary">
              <PlayArrow />
            </IconButton>
            <IconButton size="small" color="secondary">
              <Save />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
};

export default SongList;
