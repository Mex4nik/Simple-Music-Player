import React from "react";
import scss from "./ProgressBar.module.scss";
import { formatTime } from "../../../helpers/formatTime";

const ProgressBar = ({ progressBarRef, audio, timeProgress, timeDuration }) => {
	const handleProgressChange = () => {
		audio.currentTime = progressBarRef.current.value;
	};

	return (
		<div className={scss.progress}>
			<span>{formatTime(timeProgress)}</span>
			<input
				type="range"
				ref={progressBarRef}
				defaultValue={0}
				onChange={handleProgressChange}
			/>
			<span>{formatTime(timeDuration)}</span>
		</div>
	);
};

export default ProgressBar;
