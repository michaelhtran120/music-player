import React, { useState, useRef, useEffect } from 'react';
import song1 from '../assets/ArsGratiaArtis.mp3';
import styles from '../styles/AudioPlayer.module.scss';

import { BsPlay, BsPause, BsSkipBackward, BsSkipForward } from 'react-icons/bs';

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalTime, setTotalTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayerRef = useRef();
  const progressBarRef = useRef();
  const animationRef = useRef();

  const handlePlayPause = () => {
    setIsPlaying((prevValue) => !prevValue);
  };

  useEffect(() => {
    if (isPlaying) {
      audioPlayerRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayerRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }, [isPlaying]);

  useEffect(() => {
    const seconds = Math.floor(audioPlayerRef.current.duration);
    setTotalTime(seconds);

    // setting max of the input range.
    progressBarRef.current.max = seconds;
    console.log(progressBarRef.current.max);
  }, [audioPlayerRef?.current?.loadedmetadata, audioPlayerRef?.current?.readyState]);

  const calculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const returnedMinutes = (minutes) => (minutes < 10 ? `0${minutes}` : `${minutes}`);
    const seconds = sec % 60;
    const returnedSeconds = (seconds) => (seconds < 10 ? `0${seconds}` : `${seconds}`);
    return `${returnedMinutes(minutes)}:${returnedSeconds(seconds)}`;
  };

  const changePlayerCurrentTime = () => {
    progressBarRef.current.style.setProperty(
      '--progressWidth',
      `${(progressBarRef.current.value / totalTime) * 100}%`,
    );
    setCurrentTime(progressBarRef.current.value);
  };

  const handleRangeChange = () => {
    audioPlayerRef.current.currentTime = progressBarRef.current.value;
    changePlayerCurrentTime();
  };

  const whilePlaying = () => {
    progressBarRef.current.value = audioPlayerRef.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  return (
    <div className={styles.audioPlayer}>
      <audio ref={audioPlayerRef} src={song1}></audio>
      <div className={styles.audioController}>
        <button className={styles.backwardButton}>
          <BsSkipBackward />
        </button>
        <button onClick={handlePlayPause} className={styles.playPauseButton}>
          {isPlaying ? <BsPause /> : <BsPlay />}
        </button>
        <button className={styles.forwardButton}>
          <BsSkipForward />
        </button>
      </div>
      {/* time display */}
      <div className={styles.currentTime}>{calculateTime(currentTime)}</div>
      <div>
        <input
          type='range'
          className={styles.progressBar}
          ref={progressBarRef}
          defaultValue='0'
          onChange={handleRangeChange}
        />
      </div>
      {/* duration */}
      <div className={styles.totalTime}>{totalTime ? calculateTime(totalTime) : '00:00'}</div>
    </div>
  );
}

export default AudioPlayer;
