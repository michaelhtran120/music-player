import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Nav/Nav.module.scss';

const Nav = () => {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <ul>
        <li className={router.pathname == '/' ? styles.activeLink : styles.inactiveLink}>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <h1>M's Sounds</h1>
        </li>
        <li className={router.pathname == '/about' ? styles.activeLink : styles.inactiveLink}>
          <Link href='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
