import React from 'react';
import styles from '../../styles/AudioPlayer/ProgressBar.module.scss';
import { calculateTime } from '../../Utils/calculateTime';

const ProgressBar = React.forwardRef((props, ref) => {
  const { handleRangeInputChange, currentTime, totalTime } = props;

  return (
    <div className={styles.progressBarAndTime}>
      {/* time display */}
      <div className={styles.currentTime}>{calculateTime(currentTime)}</div>
      <input
        type='range'
        className={styles.progressBar}
        ref={ref}
        defaultValue='0'
        onChange={handleRangeInputChange}
      />

      {/* duration */}
      <div className={styles.totalTime}>{totalTime ? calculateTime(totalTime) : '00:00'}</div>
    </div>
  );
});

export default ProgressBar;
