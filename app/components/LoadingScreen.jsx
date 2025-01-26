'use client'
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const LoadingScreen = () => {
  const words = ["WELCOME", "TO", "THE", "BEST", "PORTFOLIO", "EVER", "!!!!!!"];
  const [currentWord, setCurrentWord] = useState(words[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setCurrentWord(words[index]);
      index = (index + 1) % words.length;
    }, 400);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(false), 3200); 
      return () => clearTimeout(timer);
    }, []);

  useEffect(() => {
    gsap.to(".loader", {
      opacity: 0,
      ease: "expo.out",
      delay: 2.7,
      duration: 2,
    });

    gsap.to(".bar", {
      height: "0%",
      ease: "power1.in",
      delay: 3.5,
      duration: 0.3,
      stagger: 0.015,
    });
  }, []);

  return (
    <div className="pointer-events-none fixed w-full h-screen z-50">
      <div className="absolute w-full h-full">
      <div className={`fixed flex flex-col items-center justify-center h-8 py-9 w-full text-center text-white text-[1vw] tracking-tight font-light font-garamond z-[100] transition-opacity duration-150 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          Websites take a while to load sometimes, you know. Just be patient.
        </div>
      <div className={`fixed flex flex-col items-center justify-center h-screen w-full text-center text-white text-[16vw]  font-light font-grotesk z-[100] transition-opacity duration-150 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {currentWord}
      </div>

        <div className="relative h-full w-full">
          {[...Array(25)].map((_, index) => (
            <div
              key={index}
              className={`bar absolute w-full h-[4%] bg-orange-700 rotate-180 origin-top`}
              style={{ top: `${(index + 1) * 4}%` }}
            >
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;