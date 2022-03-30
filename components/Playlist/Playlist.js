import React from 'react';
import styles from '../../styles/Playlist/Playlist.module.scss';

function Playlist({ songs, handleChangeSong, songIndex }) {
  return (
    <div className={styles.playlistWrapper}>
      <ul>
        {songs.map((song) => {
          return (
            <li
              key={song.id}
              id={song.id}
              onClick={() => handleChangeSong(song.id)}
              className={songIndex == song.id ? styles.active : ''}
            >
              {song.artist} - {song.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Playlist;
