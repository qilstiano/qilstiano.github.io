'use client';
import { FlapDisplay, Presets } from 'react-split-flap-effect';
import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import AboutMe from './components/AboutMe';
import Simulation from './components/Simluation';
import styles from './Home.module.css';

export default function HomePage() {
  const textArray = ['COMPUTER SCIENCE', 'GRAPHIC', 'GAME PROGRAMMING', '3D ARTIST', 'FULL-STACK'];
  const textArray1 = ['SOPHOMORE @ NUS', 'DESIGNER', 'HOBBYIST', '', 'WEB-DEV'];
  const [currentText, setCurrentText] = useState(textArray[0]);
  const [currentText1, setCurrentText1] = useState(textArray1[0]);
  const interval = 5000; // 5 seconds

  useEffect(() => {
    const changeText = () => {
      setCurrentText((prev) => {
        const currentIndex = textArray.indexOf(prev);
        const nextIndex = (currentIndex + 1) % textArray.length;
        return textArray[nextIndex];
      });
    };

    const changeText1 = () => {
      setCurrentText1((prev) => {
        const currentIndex = textArray1.indexOf(prev);
        const nextIndex = (currentIndex + 1) % textArray.length;
        return textArray1[nextIndex];
      });
    };

    const intervalId = setInterval(() => {
      changeText();
      changeText1();
    }, interval);
    return () => clearInterval(intervalId);
  }, [textArray, textArray1, interval]);

  return (
    <div className={styles.defaultBackground}>
      <div className={styles.containerOpener}>
      <img className={styles.grid1} src='./Grid-04.png' alt='Grid-04'/>
      <img className={styles.shape28} src='./Shape-28.png' alt='Shape-28'/>
        <video className={styles.backgroundVideo} autoPlay loop muted>
          <source src="/bg1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Navbar/>
          <div className={styles.largeLetters}>
            <span> 
            BRO KEEP YOUR WEBSITE SIMPLE <br />
            SO THAT IT'S <br />
            EASY TO <br />
            READ AND <br />
            UNDERSTAND <br />
            WHAT EXACTLY YOU DO <br />
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
            YOU HAVE THIS HUGE ASS <br />
            WALL OF FAKE MONOLOGUE <br />
            ON THE LEFT OF YOUR LANDING PAGE <br />
            YEAH, WHAT ABOUT IT? <br />
            I DON'T KNOW, MAN <br />
            ARE YOU SURE <br />
            ABOUT THIS? <br />
            </span>
          </div>
        <div className={`${styles.randomText} ${styles.text1}`}>
          *NOTE THE APROSTROPHE, IT'S IMPORTANT. 
           BTW, SOMETHING ANNOYING ABOUT MY NAME. 
           ON SOME WEBSITES YOU CAN'T TYPE THE APROSTROPHE 
           INTO CERTAIN FORMS. I HATE THOSE.
        </div>
        <div className={`${styles.randomText} ${styles.text2}`}>
          <h1> <span className={styles.textInline}> HELLO, <br /> MY NAME'S A'QIL* </span> </h1>
          <img className={styles.underlineScribble} src='./LINE-3.png' alt='Underline Scribble' />
          <div className={styles.flapDisplayContainer}>
            <FlapDisplay
              chars={Presets.ALPHANUM + ",!'()@"}
              length={currentText.length}
              value={currentText}
              className={'light'}
            />
          </div>
          <div className={styles.flapDisplayContainer}>
            <FlapDisplay
              chars={Presets.ALPHANUM + ",!'()@"}
              length={currentText1.length}
              value={currentText1}
              hinge={true}
            />
          </div>
        </div>
        {/* <div className={`${styles.randomText} ${styles.text3}`}>IS THIS CREATIVE ENOUGH <br /> FOR ME TO GET A JOB?</div>
        <div className={`${styles.randomText} ${styles.text4}`}>EVERYTHING YOU SEE IN THE BACK WAS MADE BY ME.</div> */}
      </div>
      <Simulation/>
    </div>
  );
}
