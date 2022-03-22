export const calculateTime = (sec) => {
  const minutes = Math.floor(sec / 60);
  const returnedMinutes = (minutes) => (minutes < 10 ? `0${minutes}` : `${minutes}`);
  const seconds = sec % 60;
  const returnedSeconds = (seconds) => (seconds < 10 ? `0${seconds}` : `${seconds}`);
  return `${returnedMinutes(minutes)}:${returnedSeconds(seconds)}`;
};