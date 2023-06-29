import React, { useEffect, useState } from "react";
import scss from "./App.module.scss";
import Player from "./components/player/Player";
import Playlist from "./components/playlist/Playlist";
import chillHop from "./api/chillHop";

function App() {
  const [currentSong, setCurrentSong] = useState({})
  const [playlist, setPlaylist] = useState([]);
  const [songChangeTrigger, setSongChangeTrigger] = useState(false);

  useEffect(() => {
    const allSongs = chillHop();
    setPlaylist(allSongs)
    setCurrentSong(allSongs[0])
  }, [])

  const onSongSelect = (track) => {
    setSongChangeTrigger(!songChangeTrigger);
    setCurrentSong(track);
  }

  const prevSongChangeHandle = () => {
    setSongChangeTrigger(!songChangeTrigger);

    const currentSongId = currentSong.id;
    const currentSongIdIndex = playlist.map(song => song.id).indexOf(currentSongId);

    let prevSongIndex = currentSongIdIndex - 1;
    if (prevSongIndex < 0) prevSongIndex = playlist.length - 1;
    
    setCurrentSong(playlist[prevSongIndex]);
  }

  const nextSongChangeHandle = () => {
    setSongChangeTrigger(!songChangeTrigger);

    const currentSongId = currentSong.id;
    const currentSongIdIndex = playlist.map(song => song.id).indexOf(currentSongId);

    let nextSongIndex = currentSongIdIndex + 1;
    if (nextSongIndex === playlist.length) nextSongIndex = 0;

    setCurrentSong(playlist[nextSongIndex]);
  }

	return (
		<div className={scss.wrapper}>
			<Player track={currentSong} songChangeTrigger={songChangeTrigger} prevSongChangeHandle={prevSongChangeHandle} nextSongChangeHandle={nextSongChangeHandle} />
			<Playlist playlist={playlist} currentSelectedSongId={currentSong.id} onSongSelect={onSongSelect} />
		</div>
	);
}

export default App;
