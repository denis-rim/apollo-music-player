import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { Grid } from "@material-ui/core";

function App() {
  return (
    <>
      <Header />
      <Grid container={true} spacing={3} xs={12}>
        <Grid style={{ paddingTop: 80 }} item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={{ position: "fixed", width: "100%", right: 0, top: 63 }}
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
