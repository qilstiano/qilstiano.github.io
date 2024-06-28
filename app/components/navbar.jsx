'use client';
import { useState } from 'react';
import styles from './Navbar.module.css';
import { useRouter } from 'next/navigation';

function Navbar() {

  const router = useRouter();

  return (
    <div className={styles.navbar}>
      <button onClick={() => router.push('/')}>My Work</button>
      
      <button onClick={() => router.push('/')}>My Process</button>
      
      <button onClick={() => router.push('/')}>About Me</button>
      
      <button onClick={() => router.push('/')}>Blog</button>

      <button onClick={() => router.push('/')}>Contact</button>
    </div>
  );
}

export default Navbar;
