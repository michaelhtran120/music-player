import React, { useState, useRef, useEffect, useCallback } from 'react';
import { musicData } from '../../data';
import { server } from '../../config/index';
import styles from '../../styles/AudioPlayer.module.scss';

import { BsPlay, BsPause, BsSkipBackward, BsSkipForward } from 'react-icons/bs';
import ProgressBar from './ProgressBar';

function AudioPlayer({ songs }) {
  // console.log(songs);
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalTime, setTotalTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [songIndex, setSongIndex] = useState(1);

  const audioPlayerRef = useRef();
  const progressBarRef = useRef();
  const animationRef = useRef();

  const handlePlayPause = () => {
    setIsPlaying((prevValue) => !prevValue);
  };

  const handleNextClick = () => {
    setSongIndex((prev) => {
      if (prev === songs.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  const handleRangeChange = () => {
    audioPlayerRef.current.currentTime = progressBarRef.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = useCallback(() => {
    progressBarRef.current.style.setProperty(
      '--progressWidth',
      `${(progressBarRef.current.value / totalTime) * 100}%`,
    );
    setCurrentTime(progressBarRef.current.value);
  }, [totalTime]);

  const whilePlaying = useCallback(() => {
    progressBarRef.current.value = audioPlayerRef.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }, [changePlayerCurrentTime]);

  useEffect(() => {
    if (isPlaying) {
      audioPlayerRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayerRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }, [isPlaying, whilePlaying]);

  useEffect(() => {
    const seconds = Math.floor(audioPlayerRef.current.duration);
    setTotalTime(seconds);

    // setting max of the input range.
    progressBarRef.current.max = seconds;
  }, [audioPlayerRef?.current?.loadedmetadata, audioPlayerRef?.current?.readyState]);

  useEffect(() => {
    if (currentTime == totalTime) {
      handlePlayPause();
      audioPlayerRef.current.currentTime = 0;
    }
  }, [currentTime, totalTime]);

  return (
    <>
      <div className={styles.audioPlayer}>
        <audio
          ref={audioPlayerRef}
          src={`https://docs.google.com/uc?export=download&id=${songs[songIndex]?.driveId}`}
        ></audio>
        <div className={isPlaying ? styles.songInfo : styles.songInfoDisabled}>
          <span>Now Playing - </span>
          <span>{songs[songIndex]?.artist}</span> <span> - </span>
          <span>{songs[songIndex]?.title}</span>
        </div>
        <div className={styles.audioController}>
          <button className={styles.backwardButton}>
            <BsSkipBackward />
          </button>
          <button onClick={handlePlayPause} className={styles.playPauseButton}>
            {isPlaying ? <BsPause /> : <BsPlay />}
          </button>
          <button className={styles.forwardButton} onClick={handleNextClick}>
            <BsSkipForward />
          </button>
        </div>
        <ProgressBar
          handleRangeInputChange={handleRangeChange}
          currentTime={currentTime}
          totalTime={totalTime}
          ref={progressBarRef}
        />
      </div>
    </>
  );
}

export default AudioPlayer;
