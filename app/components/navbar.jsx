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

  // Function to scramble text
  const scrambleText = (event) => {
    const originalText = event.target.innerText;
    let scrambledText = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let scrambleInterval;

    // Start scrambling
    scrambleInterval = setInterval(() => {
      scrambledText = originalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' '; // Preserve spaces
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join('');
      event.target.innerText = scrambledText;
    }, 100);

    // Stop scrambling after 1 second
    setTimeout(() => {
      clearInterval(scrambleInterval);
      event.target.innerText = originalText; // Restore original text
    }, 400);

    // Restore original text if the user stops hovering early
    event.target.addEventListener('mouseleave', () => {
      clearInterval(scrambleInterval);
      event.target.innerText = originalText;
    }, { once: true });
  };

  return (
    <div className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <Link legacyBehavior href="/">
        <a className={styles.navButton} onMouseEnter={scrambleText}>About Me</a>
      </Link>
      <Link legacyBehavior href="/process">
        <a className={styles.navButton} onMouseEnter={scrambleText}>My Work</a>
      </Link>
      <Link legacyBehavior href="/contact">
        <a className={styles.navButton} onMouseEnter={scrambleText}>Contact Me</a>
      </Link>
      <Link legacyBehavior href="/blog">
        <a className={styles.navButton} onMouseEnter={scrambleText}>Blog</a>
      </Link>
    </div>
  );
}

export default Navbar;