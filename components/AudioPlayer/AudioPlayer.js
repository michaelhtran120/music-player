import React, { useState, useRef, useEffect, useCallback } from 'react';
import { musicData } from '../../data';
import { server } from '../../config/index';
import styles from '../../styles/AudioPlayer.module.scss';

import { BsPlay, BsPause, BsSkipBackward, BsSkipForward } from 'react-icons/bs';
import ProgressBar from './ProgressBar';

function AudioPlayer({ songs }) {
  // console.log(songs);
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [songIndex, setSongIndex] = useState(0);

  const audioPlayerRef = useRef();
  const progressBarRef = useRef();
  const animationRef = useRef();

  const handlePlayPause = () => {
    setIsPlaying((prevValue) => !prevValue);
  };

  const nextSong = () => {
    setSongIndex((prev) => {
      if (prev === songs.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
    changePlayerCurrentTime();
  };

  const handleRangeChange = () => {
    audioPlayerRef.current.currentTime = progressBarRef.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = useCallback(() => {
    progressBarRef.current.style.setProperty(
      '--progressWidth',
      `${Math.ceil((progressBarRef.current.value / totalTime) * 100)}%`,
    );
    setCurrentTime(progressBarRef.current.value);
  }, [totalTime]);

  const whilePlaying = () => {
    progressBarRef.current.value = audioPlayerRef.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
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
    console.log(songs);
    console.log(songIndex);
    const seconds = Math.floor(songs[songIndex].duration);
    setTotalTime(seconds);
    console.log(totalTime);

    // setting max of the input range.
    progressBarRef.current.max = seconds;
  }, [songIndex]);

  useEffect(() => {
    if (currentTime == totalTime) {
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
