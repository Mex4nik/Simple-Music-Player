import React from "react";
import scss from "./Item.module.scss";

const Item = ({ track }) => {
	return (
		<div className={`${scss.wrapper} ${track.active ? `${scss.wrapper__active}` : ''}`}>
			<div className={scss.wrapper__cover}>
				<img src={track.cover} alt={track.name} />
			</div>
			<div className={scss.wrapper__description}>
				<span className={scss.wrapper__description__title}>{track.name}</span>
				<span className={scss.wrapper__description__artist}>
					{track.artist}
				</span>
			</div>
		</div>
	);
};

export default Item;
