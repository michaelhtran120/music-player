import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from '../../styles/AudioPlayer.module.scss';

import { BsPlay, BsPause, BsSkipBackward, BsSkipForward } from 'react-icons/bs';
import ProgressBar from './ProgressBar';

function AudioPlayer({ songs, isPlaying, setIsPlaying, songIndex, handleChangeSong }) {
  // const [isPlaying, setIsPlaying] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [volumeValue, setVolumeValue] = useState('100');

  const audioPlayerRef = useRef();
  const progressBarRef = useRef();
  const animationRef = useRef();
  const audioPlayerVolumeRef = useRef();
  const firstUpdate = useRef(true);

  const handlePlayPause = () => {
    setIsPlaying((prevValue) => !prevValue);
  };

  const nextSong = () => {
    handleChangeSong((prev) => {
      if (prev === songs.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
    changePlayerCurrentTime();
    if (!isPlaying) {
      handlePlayPause();
    }
  };

  const handleProgressRangeChange = () => {
    audioPlayerRef.current.currentTime = progressBarRef.current.value;
    changePlayerCurrentTime();
  };

  const handleVolumeRangeChange = () => {
    audioPlayerRef.current.volume = parseInt(audioPlayerVolumeRef.current.value) / 100;
    audioPlayerVolumeRef.current.style.setProperty(
      '--volumeWidth',
      `${Math.ceil(audioPlayerRef.current.volume * 125)}px`,
    );
    setVolumeValue(audioPlayerRef.current.volume * 100);
  };
  useEffect(() => {
    if (audioPlayerVolumeRef?.current) {
      audioPlayerVolumeRef.current.style.setProperty(
        '--volumeWidth',
        `${Math.ceil(audioPlayerRef.current.volume * 125)}px`,
      );
    }
  }, [isVolumeOpen]);

  const changePlayerCurrentTime = useCallback(() => {
    progressBarRef.current.style.setProperty(
      '--progressWidth',
      `${Math.ceil((progressBarRef.current.value / totalTime) * 100)}%`,
    );
    setCurrentTime(progressBarRef.current.value);
  }, [totalTime]);

  const whilePlaying = () => {
    if (audioPlayerRef.current !== null && isPlaying) {
      progressBarRef.current.value = audioPlayerRef.current.currentTime;
      changePlayerCurrentTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioPlayerRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayerRef.current.pause();
      animationRef.current = requestAnimationFrame(whilePlaying);
      // cancelAnimationFrame(animationRef.current);
    }
  }, [isPlaying, whilePlaying]);

  useEffect(() => {
    const seconds = Math.floor(songs[songIndex].duration);
    setTotalTime(seconds);

    // setting max of the input range.
    progressBarRef.current.max = seconds;
  }, [songIndex]);

  useEffect(() => {
    if (currentTime == totalTime && !firstUpdate.current) {
      nextSong();
    }
  }, [currentTime, totalTime]);

  return (
    <>
      <div className={styles.marqueeWrapper}>
        <div className={isPlaying ? styles.songInfo : styles.songInfoDisabled}>
          <span>Now Playing - </span>
          <span>{songs[songIndex]?.artist}</span> <span> - </span>
          <span>{songs[songIndex]?.title}</span>
        </div>
      </div>
      <div className={styles.audioPlayer}>
        <audio
          ref={audioPlayerRef}
          src={`https://docs.google.com/uc?export=download&id=${songs[songIndex]?.driveId}`}
        ></audio>

        <div className={styles.audioController}>
          <button className={styles.backwardButton}>
            <BsSkipBackward />
          </button>
          <button onClick={handlePlayPause} className={styles.playPauseButton}>
            {isPlaying ? <BsPause /> : <BsPlay />}
          </button>
          <button className={styles.forwardButton} onClick={nextSong}>
            <BsSkipForward />
          </button>
        </div>
        <ProgressBar
          handleRangeInputChange={handleProgressRangeChange}
          currentTime={currentTime}
          totalTime={totalTime}
          ref={progressBarRef}
        />
        <div className={styles.volumeWrapper}>
          <button onClick={() => setIsVolumeOpen((prev) => !prev)}>Volume</button>
          {isVolumeOpen ? (
            <input
              type='range'
              ref={audioPlayerVolumeRef}
              onChange={handleVolumeRangeChange}
              value={volumeValue}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default AudioPlayer;
