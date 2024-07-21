import React from 'react';
import styles from './AboutMe.module.css';

const AboutMe = () => {
  return (
    <div className={styles.aboutMeSection}>
      <h2 className={styles.header}>{'{about me;}'}</h2>
      <div className={styles.intro}>
        <img src="/path/to/your/image.jpg" alt="About Me" className={styles.image} />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel volutpat felis. Duis vehicula convallis tortor vel vehicula. Cras tincidunt ex id mi consectetur, a dignissim quam facilisis. Nullam facilisis, justo ac hendrerit luctus, dui nisi tempus nulla, eu vulputate neque sem eu velit.
        </p>
      </div>
      <h3 className={styles.techHeader}>My Tech Stack</h3>
      <div className={styles.techStack}>
        <div className={styles.stackCategory}>
          <h4>Art</h4>
          <div className={styles.tickerContainer}>
            <div className={styles.ticker}>
              <span>Photoshop</span>
              <span>Blender</span>
              <span>Illustrator</span>
              <span>InDesign</span>
              <span>Photoshop</span>
              <span>Blender</span>
              <span>Illustrator</span>
              <span>InDesign</span>
             
              {/* Add more tech items as needed */}
            </div>
          </div>
        </div>
        <div className={styles.stackCategory}>
          <h4>Programming</h4>
          <div className={styles.tickerContainer}>
            <div className={styles.ticker}>
              <span>JavaScript</span>
              <span>Python</span>
              <span>React</span>
              <span>Node.js</span>
              <span>JavaScript</span>
              <span>Python</span>
              <span>React</span>
              <span>Node.js</span>
              
              {/* Add more tech items as needed */}
            </div>
          </div>
        </div>
      </div>
      <h3 className={styles.interestsHeader}>Other Interests</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel volutpat felis. Duis vehicula convallis tortor vel vehicula. Cras tincidunt ex id mi consectetur, a dignissim quam facilisis. Nullam facilisis, justo ac hendrerit luctus, dui nisi tempus nulla, eu vulputate neque sem eu velit.
      </p>
    </div>
  );
};

export default AboutMe;
