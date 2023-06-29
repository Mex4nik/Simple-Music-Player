import React from "react";
import scss from "./Playlist.module.scss";
import Item from "./item/Item";

const Playlist = ({ playlist, currentSelectedSongId, onSongSelect }) => {  
	return (
		<section className={scss.wrapper}>
			<h1 className={scss.wrapper__title}>My Playlist</h1>
			<div className={scss.wrapper__list}>
				{playlist.map((track) => (
					<Item key={track.id} track={track} currentSelectedSongId={currentSelectedSongId} onSelect={onSongSelect} />
				))}
			</div>
		</section>
	);
};

export default Playlist;
