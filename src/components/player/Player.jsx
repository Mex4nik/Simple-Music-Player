import React from "react";
import scss from "./Player.module.scss";

const Player = ({ track }) => {
	console.log(track);

	return (
		<section className={scss.wrapper}>
			<div className={scss.wrapper__cover}>
				<img src={track.cover} alt={track.name} />
			</div>
			<div className={scss.wrapper__description}>
				<span className={scss.wrapper__description__title}>{track.name}</span>
				<span className={scss.wrapper__description__artist}>
					{track.artist}
				</span>
			</div>
			<div className={scss.wrapper__controls}>
				<img src="/icons/play-previous.png" alt="Left arrow button" />
				<img src="/icons/play-button.png" alt="Play button" />
				<img src="/icons/play-next.png" alt="Right arrow button" />
			</div>
		</section>
	);
};

export default Player;
