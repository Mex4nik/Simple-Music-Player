import React, { useEffect, useState } from "react";
import scss from "./Playlist.module.scss";
import Item from "./item/Item";
import chillHop from "../../api/chillHop";

const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    setPlaylist(chillHop())
  }, [])
  
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
