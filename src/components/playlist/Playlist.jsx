import React from "react";
import scss from "./Playlist.module.scss";
import Item from "./item/Item";

const Playlist = ({playlist}) => {  
	return (
		<section className={scss.wrapper}>
			<h1 className={scss.wrapper__title}>My Playlist</h1>
			<div className={scss.wrapper__list}>
				{playlist.map((track) => (
					<Item key={track.id} track={track} />
				))}
			</div>
		</section>
	);
};

export default Playlist;
