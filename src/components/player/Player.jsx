import React, { useCallback, useEffect, useRef, useState } from "react";
import scss from "./Player.module.scss";
import ProgressBar from "./progress-bar/ProgressBar";
import VolumeControl from "./volume-control/VolumeControl";

const Player = ({
	track,
	songChangeTrigger,
	prevSongChangeHandle,
	nextSongChangeHandle,
}) => {
	const [song, setSong] = useState("");
	const [isSongPlaying, setIsSongPlaying] = useState(false);

	const progressBarRef = useRef();
	const [timeProgress, setTimeProgress] = useState(0);
	const [timeDuration, setTimeDuration] = useState(0);
	const playAnimationRef = useRef();

	const [volume, setVolume] = useState(20);
	const [isMuteVolume, setIsMuteVolume] = useState(false);

	useEffect(() => {
		const trackSong = new Audio(track.audio);
		setSong(trackSong);

		trackSong.onloadedmetadata = (metadata) => {
			setTimeDuration(metadata.target.duration);
			progressBarRef.current.max = metadata.target.duration;
		};
	}, [track]);

	// Logic for autoplay
	// useEffect(() => {
	//   if (!firstSong.id) {
	//     setFirstSong(track);
	//     setIsFirstSong(false);
	//   } else if (firstSong.id !== track.id && !isFirstSong) {
	//     playSong();
	//   }
	// }, [song])

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

	const onVolumeChange = (volume) => {
		setVolume(volume);
	};

	useEffect(() => {
		if (song) {
			song.volume = +volume / 100;
			song.muted = isMuteVolume;
		}
	}, [volume, song, isMuteVolume]);

	const handleMuteVolume = () => {
		setIsMuteVolume(!isMuteVolume);
	};

	useEffect(() => {
		if (song) {
			song.pause();
			setIsSongPlaying(false);
		}
	}, [songChangeTrigger]);

	return (
		<section className={scss.player}>
			<div className={scss.player__wrapper}>
				<div className={scss.player__wrapper__cover}>
					<img src={track.cover} alt={track.name} />
				</div>
				<div className={scss.player__wrapper__description}>
					<span className={scss.player__wrapper__description__title}>
						{track.name}
					</span>
					<span className={scss.player__wrapper__description__artist}>
						{track.artist}
					</span>
				</div>
				<ProgressBar
					progressBarRef={progressBarRef}
					audio={song}
					timeProgress={timeProgress}
					timeDuration={timeDuration}
				/>
				<div className={scss.player__wrapper__controls}>
					<img
						src="/icons/play-previous.png"
						alt="Left arrow button"
						onClick={prevSongChangeHandle}
					/>
					{isSongPlaying ? (
						<img
							src="/icons/pause.png"
							alt="Pause button"
							onClick={pauseSong}
						/>
					) : (
						<img
							src="/icons/play-button.png"
							alt="Play button"
							onClick={playSong}
						/>
					)}
					<img
						src="/icons/play-next.png"
						alt="Right arrow button"
						onClick={nextSongChangeHandle}
					/>
				</div>
				<VolumeControl
					currectVolume={volume}
					onVolumeChange={onVolumeChange}
					isMuteVolume={isMuteVolume}
					handleMuteVolume={handleMuteVolume}
				/>
			</div>
		</section>
	);
};

export default Player;
