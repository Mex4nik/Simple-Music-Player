import React, { useCallback, useEffect, useRef, useState } from "react";
import scss from "./Player.module.scss";
import ProgressBar from "./progress-bar/ProgressBar";
import VolumeControl from "./volume-control/VolumeControl";

const Player = ({ track }) => {
	const [song, setSong] = useState("");
	const [isSongPlaying, setIsSongPlaying] = useState(false);
	const progressBarRef = useRef();
	const [timeProgress, setTimeProgress] = useState(0);
	const [timeDuration, setTimeDuration] = useState(0);
	const playAnimationRef = useRef();

	useEffect(() => {
		const trackSong = new Audio(track.audio);
		setSong(trackSong);

		trackSong.onloadedmetadata = (metadata) => {
			setTimeDuration(metadata.target.duration);
			progressBarRef.current.max = metadata.target.duration;
		};
	}, [track]);

	const repeat = useCallback(() => {
		const currentTime = song.currentTime;
		setTimeProgress(currentTime);
		progressBarRef.current.value = currentTime;
		progressBarRef.current.style.setProperty(
			"--range-progress",
			`${(progressBarRef.current.value / timeDuration) * 100}%`
		);

		playAnimationRef.current = requestAnimationFrame(repeat);
	}, [song, timeDuration, progressBarRef, setTimeProgress]);

	useEffect(() => {
		playAnimationRef.current = requestAnimationFrame(repeat);
	}, [isSongPlaying, song, repeat]);

	const playSong = () => {
		song.play();
		setIsSongPlaying(true);
	};

	const pauseSong = () => {
		song.pause();
		setIsSongPlaying(false);
	};

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
			<ProgressBar
				progressBarRef={progressBarRef}
				audio={song}
				timeProgress={timeProgress}
				timeDuration={timeDuration}
			/>
			<div className={scss.wrapper__controls}>
				<img src="/icons/play-previous.png" alt="Left arrow button" />
				{isSongPlaying ? (
					<img src="/icons/pause.png" alt="Pause button" onClick={pauseSong} />
				) : (
					<img
						src="/icons/play-button.png"
						alt="Play button"
						onClick={playSong}
					/>
				)}
				<img src="/icons/play-next.png" alt="Right arrow button" />
			</div>
			<VolumeControl />
		</section>
	);
};

export default Player;
