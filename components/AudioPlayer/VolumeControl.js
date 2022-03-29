import React from 'react';
import Image from 'next/image';
import styles from '../../styles/VolumeControl.module.scss';

const VolumeControl = React.forwardRef((props, ref) => {
  const { value, handleRangeChange, isOpen, setIsOpen } = props;
  return (
    <div className={styles.volumeWrapper}>
      <Image
        src='/volume.svg'
        alt='volume icon'
        width='24'
        height='24'
        onClick={setIsOpen}
        className={styles.volumeIcon}
      />
      {isOpen ? (
        <input type='range' ref={ref} onChange={handleRangeChange} value={value} name='volume' />
      ) : null}
    </div>
  );
});

export default VolumeControl;
