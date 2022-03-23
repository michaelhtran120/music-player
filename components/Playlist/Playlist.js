import React from 'react';
import styles from '../../styles/Playlist.module.scss';

function Playlist({ songs, handleChangeSong }) {
  return (
    <div className={styles.playlistWrapper}>
      <ul>
        {songs.map((song, index) => {
          return (
            <li key={song.id} id={song.index} onClick={() => handleChangeSong(index)}>
              {song.genre} -{song.artist} - {song.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Playlist;
