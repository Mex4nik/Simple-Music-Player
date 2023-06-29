import React, { useEffect, useState } from "react";
import scss from "./App.module.scss";
import Player from "./components/player/Player";
import Playlist from "./components/playlist/Playlist";
import chillHop from "./api/chillHop";

function App() {
  const [currentSong, setCurrentSong] = useState({})
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const allSongs = chillHop();
    setPlaylist(allSongs)
    setCurrentSong(allSongs[0])
  }, [])

	return (
		<div className={scss.wrapper}>
			<Player track={currentSong} />
			<Playlist playlist={playlist} />
		</div>
	);
}

export default App;
