import { musicData } from '../../../data';

export default function handler(req, res) {
  const musicInfo = musicData.map((song) => {
    return {
      id: song.id,
      title: song.title,
      artist: song.artist,
      genre: song.genre,
      driveId: song.driveId,
    };
  });
  res.status(200).json(musicInfo);
}
