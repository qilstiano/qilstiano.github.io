'use client';
import Link from 'next/link';  // Import Link component from Next.js
import styles from './Navbar.module.css';  // Assuming the CSS file is in the same folder

function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link legacyBehavior href="/"><a className={styles.navButton}>My Work</a></Link>
      <Link legacyBehavior href="/process"><a className={styles.navButton}>My Process</a></Link>
      <Link legacyBehavior href="/about"><a className={styles.navButton}>About Me</a></Link>
      <Link legacyBehavior href="/blog"><a className={styles.navButton}>Blog</a></Link>
      <Link legacyBehavior href="/contact"><a className={styles.navButton}>Contact Me</a></Link>
    </div>
  );
}

export default Navbar;
