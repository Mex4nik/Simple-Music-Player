import React from "react";
import scss from "./ProgressBar.module.scss";
import { formatTime } from "../../../helpers/formatTime";

const ProgressBar = ({ progressBarRef, audio, timeProgress, timeDuration }) => {
	const handleProgressChange = () => {
		audio.currentTime = progressBarRef.current.value;
	};

	return (
		<div className={scss.progress}>
			<span
				className={`${scss.progress__time} ${scss.progress__time__current}`}
			>
				{formatTime(timeProgress)}
			</span>
			<input
				type="range"
				ref={progressBarRef}
				defaultValue={0}
				onChange={handleProgressChange}
			/>
			<span className={scss.progress__time}>{formatTime(timeDuration)}</span>
		</div>
	);
};

export default ProgressBar;
