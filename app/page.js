'use client'
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import styles from './Home.module.css';

export default function HomePage() {
  return (
    <div className={styles.defaultBackground}>
      
      <div className={styles.containerOpener}>
        <Navbar/>
        <div className={styles.largeLetters}>
        KEEP YOUR
        WEBSITE MINIMAL <br />
        SO THAT IT'S <br />
        EASY TO <br />
        READ AND <br />
        UNDERSTAND <br />
        WHAT EXACTLY YOU <br />
        DO IN YOUR PORTFOLIO <br />
        BUT WHAT IF THAT'S <br />
        NOT WHAT I WANT? <br />
        I DON'T KNOW... <br />
        IT LOOKS TOO STERILE. <br />
        LET'S GO FOR <br />
        SOMETHING A BIT MORE <br /> 
        EXPERIMENTAL LAH. <br />
        SURE I GUESS BUT <br />
        YOU SURE THAT IT <br />
        WILL BE EASY TO READ? <br />
        I DON'T KNOW BUT <br />
        I DON'T CARE ALSO <br />
        I JUST WANT TO MAKE A <br />
        COOL LOOKING WEBSITE <br />
        YOU ALWAYS TRY SO HARD <br />
        TO BE DIFFERENT BRO <br />
        YEAH OF COURSE LOL <br />
        WHY WOULD I CHOOSE <br />
        TO BE BORING? <br />
        FOR GOD'S SAKE <br />
        YOU HAVE A RENAISSANCE ERA <br />
        PAINTING OF A RAVEN <br />
        AS YOUR COVER IMAGE <br />
        </div>
        <div className={`${styles.randomText} ${styles.text1}`}>WOW IMAGINE OPENING A PORTFOLIO PAGE </div>
        <div className={`${styles.randomText} ${styles.text2}`}>Another piece of text over here.</div>
        <div className={`${styles.randomText} ${styles.text3}`}>And yet another one here.</div>
        <div className={`${styles.randomText} ${styles.text4}`}>More text flying around here.</div>
      </div>
    </div>
     
  );
}

