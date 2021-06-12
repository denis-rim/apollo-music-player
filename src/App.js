import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { Grid, Hidden, useMediaQuery } from "@material-ui/core";
import { createContext, useContext, useReducer } from "react";
import { songReducer } from "./reducer";

export const SongContext = createContext({
  song: {
    id: "841db122-4c1b-4aef-b901-5e30364d5eb0",
    title:
      "Iron Maiden, ,Metallica, Helloween, BlackSabbath - Heavy Metal Hard Rock Music 2021",
    artist: "Youtube",
    thumbnail: "https://i.ytimg.com/vi/80lKLqLm16I/0.jpg",
    url: "https://www.youtube.com/watch?v=80lKLqLm16I",
    duration: 4430,
  },
  isPlaying: false,
});

function App() {
  const initialSongState = useContext(SongContext);
  const [state, dispatch] = useReducer(songReducer, initialSongState);
  const greaterThenSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const greaterThenMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <SongContext.Provider value={{ state, dispatch }}>
      {/*{greaterThenSm && <Header />}*/}
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid container={true} spacing={3} xs={12}>
        <Grid
          style={{ paddingTop: greaterThenSm ? 80 : 10 }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            greaterThenMd
              ? { position: "fixed", width: "100%", right: 0, top: 63 }
              : {
                  position: "fixed",
                  width: "100%",
                  left: 0,
                  bottom: 0,
                }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
}

export default App;
