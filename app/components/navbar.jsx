'use client';
import { useState } from 'react';
import styles from './Navbar.module.css';
import { useRouter } from 'next/router';

function Navbar() {
  const router = useRouter();

  return (
    <div className={styles.navbar}>
      <button className={styles.navButton} onClick={() => router.push('/')}>My Work</button>
      <button className={styles.navButton} onClick={() => router.push('/process')}>My Process</button>
      <button className={styles.navButton} onClick={() => router.push('/about')}>About Me</button>
      <button className={styles.navButton} onClick={() => router.push('/blog')}>Blog</button>
      <button className={styles.navButton} onClick={() => router.push('/contact')}>Contact Me</button>
    </div>
  );
}

export default Navbar;
