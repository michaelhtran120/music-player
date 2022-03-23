import React from 'react';

function Playlist({ songs, handleChangeSong}) {
  return (
    <div className='playlistWrapper'>
      <ul>
        {songs.map((song, index) => {
          return (
            <li
              key={song.id}
              id={song.index}
              onClick={() => handleChangeSong(index)}
            >
              {song.genre} -{song.artist} - {song.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Playlist;
