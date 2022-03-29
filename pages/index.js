import Head from 'next/head';

import React, { useState } from 'react';

import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import Playlist from '../components/Playlist/Playlist';

import { server } from '../config/index';

import styles from '../styles/Home.module.scss';

export default function Home({ songs }) {
  const [songIndex, setSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const changeSong = (id) => {
    if (!isPlaying) {
      setSongIndex(id);
      setIsPlaying((prev) => !prev);
    }
    setSongIndex(id);
  };

  return (
    <div>
      <Head>
        <title>Michael Tran&#39;s Music Recommender</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Playlist songs={songs} handleChangeSong={changeSong} songIndex={songIndex} />
        <AudioPlayer
          songs={songs}
          songIndex={songIndex}
          handleChangeSong={setSongIndex}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${server}/api/songs`);
  const songs = await res.json();
  console.log(songs);

  if (songs) {
    return {
      props: {
        songs: songs,
      },
    };
  }

  return {
    props: {},
  };
}
