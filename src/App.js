import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { Grid, Hidden, useMediaQuery } from "@material-ui/core";

function App() {
  // const matches = useMediaQuery('(min-width: 600px)')
  const greaterThenSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const greaterThenMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <>
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
    </>
  );
}

export default App;
