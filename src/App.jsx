import React from "react";
import scss from "./App.module.scss";
import Player from "./components/player/Player";
import Playlist from "./components/playlist/Playlist";

function App() {

	return (
		<div className={scss.wrapper}>
			<Player />
			<Playlist />
		</div>
	);
}

export default App;
