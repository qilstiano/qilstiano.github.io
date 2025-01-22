import React from 'react';
import styles from './AboutMe.module.css';
import Simulation from './Simluation';

const AboutMe = () => {

  const asciiart = `
         $$\\                             $$\\
         $$ |                            $$ |
$$$$$$\\  $$$$$$$\\   $$$$$$\\  $$\\   $$\\ $$$$$$\\         $$$$$$\\$$$$\\   $$$$$$\\
\\____$$\\ $$  __$$\\ $$  __$$\\ $$ |  $$ |\\_$$  _|        $$  _$$  _$$\\ $$  __$$\\
$$$$$$$| $$ |  $$ |$$ /  $$ |$$ |  $$ |  $$ |          $$ / $$ / $$ |$$$$$$$$ |
$$__$$ | $$ |  $$  |$$ |  $$ |$$ |  $$ |  $$ |$$\\      $$ | $$ | $$ |$$   ____|
\\$$$$$$$| $$$$$$$  |\\$$$$$$  |\\$$$$$$  |  \\$$$$  |     $$ | $$ | $$ |\\$$$$$$$\\
 \\______| \\_______/  \\______/  \\______/    \\____/      \\__| \\__| \\__| \\_______| 
 `;

  return (
    <div className={styles.aboutMeContainer}>
      <div>
        <pre className={styles.asciiArt} dangerouslySetInnerHTML={{ __html: asciiart }} />
      </div>
      <Simulation/>
    </div>
    
  );
};

export default AboutMe;
