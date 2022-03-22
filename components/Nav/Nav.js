import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Nav.module.scss';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <h1>Michael's Music Recommender</h1>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
