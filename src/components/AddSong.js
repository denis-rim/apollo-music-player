import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { AddBoxOutlined, Link } from "@material-ui/icons";
import ReactPlayer from "react-player";
import SoundCloudPlayer from "react-player/soundcloud";
import YouTubePlayer from "react-player/youtube";
import { useMutation } from "react-apollo";
import { ADD_SONG } from "../graphql/mutations";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
  },
  urlInput: {
    margin: theme.spacing(1),
  },
  addSongButton: {
    margin: theme.spacing(1),
  },
  dialog: {
    textAlign: "center",
  },
  thumbnail: {
    width: "90%",
  },
}));

const DEFAULT_SONG = {
  artist: "",
  title: "",
  duration: 0,
  thumbnail: "",
};

const AddSong = () => {
  const [dialog, setDialog] = useState(false);
  const [url, setUrl] = useState("");
  const [playable, setPlayable] = useState(false);
  const [song, setSong] = useState(DEFAULT_SONG);
  const [addSong, { error }] = useMutation(ADD_SONG);
  const classes = useStyles();

  useEffect(() => {
    const isPlayable =
      SoundCloudPlayer.canPlay(url) || YouTubePlayer.canPlay(url);
    setPlayable(isPlayable);
  }, [url]);

  const handleChangeSong = (event) => {
    const { name, value } = event.target;
    setSong((prevSong) => ({
      ...prevSong,
      [name]: value,
    }));
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };

  const handleEditSong = async ({ player }) => {
    const nestedPlayer = player.player.player;
    let songData;

    if (nestedPlayer.getVideoData) {
      songData = getYouTubeInfo(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundCloudInfo(nestedPlayer);
    }
    setSong({ ...songData, url });
  };

  const handleAddSong = async () => {
    try {
      const { url, thumbnail, duration, artist, title } = song;
      await addSong({
        variables: {
          url: url.length > 0 ? url : null,
          thumbnail: thumbnail.length > 0 ? thumbnail : null,
          duration: duration > 0 ? duration : null,
          title: title.length > 0 ? title : null,
          artist: artist.length > 0 ? artist : null,
        },
      });
      handleCloseDialog();
      setSong(DEFAULT_SONG);
      setUrl("");
    } catch (error) {
      console.error("Error adding song", error);
    }
  };

  const getYouTubeInfo = (player) => {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const thumbnail = `https://i.ytimg.com/vi/${video_id}/0.jpg`;
    return {
      artist: author,
      title,
      duration,
      thumbnail,
    };
  };

  const getSoundCloudInfo = (player) => {
    return new Promise((resolve) => {
      player.getCurrentSound((songData) => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace("-large", "-t500x500"),
          });
        }
      });
    });
  };

  const handleError = (field) => {
    return error?.graphQLErrors[0]?.extensions?.path.includes(field);
  };

  const { thumbnail, title, artist } = song;

  return (
    <div className={classes.container}>
      <Dialog
        className={classes.dialog}
        open={dialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img
            className={classes.thumbnail}
            src={thumbnail}
            alt="Song thumbnail"
          />
          <TextField
            onChange={handleChangeSong}
            value={title}
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            error={handleError("title")}
            helperText={handleError("title") && "Fill out field"}
          />
          <TextField
            onChange={handleChangeSong}
            value={artist}
            margin="dense"
            name="artist"
            label="Artist"
            fullWidth
            error={handleError("artist")}
            helperText={handleError("artist") && "Fill out field"}
          />
          <TextField
            onChange={handleChangeSong}
            value={thumbnail}
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
            error={handleError("thumbnail")}
            helperText={handleError("thumbnail") && "Fill out field"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddSong} variant="outlined" color="primary">
            Add Song
          </Button>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <TextField
        className={classes.urlInput}
        onChange={(event) => setUrl(event.target.value)}
        value={url}
        placeholder="Add Youtube or Soundcloud Url"
        fullWidth
        margin="normal"
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link />
            </InputAdornment>
          ),
        }}
      />
      <Button
        disabled={!playable}
        className={classes.addSongButton}
        onClick={() => setDialog(true)}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
      >
        Add
      </Button>
      <ReactPlayer url={url} hidden onReady={handleEditSong} />
    </div>
  );
};

export default AddSong;
