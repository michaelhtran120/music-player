import React from 'react';
import Head from 'next/head';
import styles from '../styles/About.module.scss';

function about() {
  return (
    <div>
      <Head>
        <title>Michael Tran&#39;s Music Recommender About Page</title>
        <meta name='description' content='Michael Tran&#39;s Music Recommender About Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <h1>About This Project</h1>
        <div className={styles.textWrapper}>
          This application was built to share some music that can't be found on any streaming
          platform. The goal of this was to share my music taste and interesting songs that I have
          discovered over the years.
          <br />
          <br />I really enjoyed the process of building out a audio player from scratch. Required
          assistance from several resources to help build out the progress bar animation ( the use
          of requestAnimationFrame), but digging for the audio meta data and figuring out how to
          utilize input type='range' to really control audio and volume was interesting. Also wanted
          to try out using NextJS React framework.
          <br />
          <br />I am by no means an audiophile, but I do love music in my own way and the impact it
          has had on my life. If you like any of these tracks that I share here or if you would like
          to talk about music, please reach out!
        </div>
      </main>
    </div>
  );
}

export default about;
