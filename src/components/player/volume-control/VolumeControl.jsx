import React from "react";
import scss from "./VolumeControl.module.scss";

const VolumeControl = ({
	currectVolume,
	onVolumeChange,
	isMuteVolume,
	handleMuteVolume,
}) => {
	return (
		<div className={scss.volume}>
			<div className={scss.volume__icon} onClick={handleMuteVolume}>
				{isMuteVolume || currectVolume <= 0 ? (
					<img src="./icons/volume-mute.png" alt="Volume mute" />
				) : currectVolume < 50 ? (
					<img src="./icons/volume-low.png" alt="Volume mute" />
				) : (
					<img src="./icons/volume-high.png" alt="Volume mute" />
				)}
			</div>
			<input
				className={scss.volume__slider}
				type="range"
				min={0}
				max={100}
				value={currectVolume}
				onChange={(e) => onVolumeChange(e.target.value)}
			/>
		</div>
	);
};

export default VolumeControl;
