'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css'; // Assuming CSS modules are being used

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <Link legacyBehavior href="/"><a className={styles.navButton}>About Me</a></Link>
      <Link legacyBehavior href="/process"><a className={styles.navButton}>My Work</a></Link>
      <Link legacyBehavior href="/blog"><a className={styles.navButton}>Blog</a></Link>
      <Link legacyBehavior href="/contact"><a className={styles.navButton}>Contact Me</a></Link>
    </div>
  );
}

export default Navbar;
