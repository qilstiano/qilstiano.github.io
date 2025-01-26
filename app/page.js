'use client';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import LoadingScreen from './components/LoadingScreen';
import LoopingWords from './components/LoopingWords';
import TechStackCarousel from './components/TechStack';
import './globals.css';

export default function Home() {
  const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 });
  const targetName = "muhammad-a'qil*";
  const [displayName, setDisplayName] = useState('');
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-[]{}";
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Name shuffling effect with a 5-second delay
  useEffect(() => {
    const delay = 3500;
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < targetName.length) {
          setDisplayName((prev) =>
            targetName
              .split('')
              .map((char, idx) => (idx <= currentIndex ? char : characters[Math.floor(Math.random() * characters.length)]))
              .join('')
          );
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  // Calculate grid size based on window dimensions
  useEffect(() => {
    const calculateGridSize = () => {
      const cellSize = 50;
      const rows = Math.ceil(window.innerHeight / cellSize);
      const cols = Math.ceil(window.innerWidth / cellSize);
      setGridSize({ rows, cols });
    };

    calculateGridSize();
    window.addEventListener('resize', calculateGridSize);

    return () => {
      window.removeEventListener('resize', calculateGridSize);
    };
  }, []);

  // Animate random grid cells
  useEffect(() => {
    const gridCells = document.querySelectorAll('.grid-cell');

    const animateRandomCells = () => {
      if (gridCells.length === 0) return;

      const numberOfCellsToFill = 30;
      const cellsToAnimate = new Set();

      while (cellsToAnimate.size < numberOfCellsToFill) {
        const randomIndex = Math.floor(Math.random() * gridCells.length);
        cellsToAnimate.add(gridCells[randomIndex]);
      }

      cellsToAnimate.forEach((cell) => {
        cell.style.animation = 'glow 2s ease';
      });

      setTimeout(() => {
        cellsToAnimate.forEach((cell) => {
          cell.style.animation = '';
        });
      }, 2000);
    };

    const interval = setInterval(animateRandomCells, 500);

    return () => {
      clearInterval(interval);
    };
  }, [gridSize]);

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-auto">
      <LoadingScreen />
      <div id="background" className="absolute inset-0 z-0 grid-background">
        {Array.from({ length: gridSize.rows * gridSize.cols }).map((_, index) => (
          <div key={index} className="grid-cell"></div>
        ))}
      </div>

      {/* Black to Transparent Gradient Overlay */}
      <div
        className="absolute inset-0 z-15 gradient-overlay"
        style={{
          background: 'linear-gradient(to right, black 40%, transparent)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
        }}
      ></div>

      <div className="absolute inset-0 z-10 noise-texture"></div>

      {/* Content */}
      <div className="relative z-20">
        <Navbar />
        <div className="absolute inset-0 text-white flex flex-col items-start my-4">
          <div className="px-4 rounded-md font-grotesk">
            <p className="text-[10vw] sm:text-[9vw] md:text-[10vw]">{displayName || targetName}</p>
            <p className="text-[1vw] sm:text-[1vw] md:text-[2vw] font-helveticaMedium"> *yup my name has an aprostrophe</p>
            <p className="text-[1vw] sm:text-[0.5vw] md:text-[1vw] font-helveticaMedium"> PORTFOLIO I.</p>
          </div>
          <LoopingWords />
          <div className="flex flex-col sm:flex-row gap-2 px-2 w-full">
            {/* Segment 1: About Me */}
            <div className="flex-1 bg-black/10 backdrop-blur-xl rounded-lg p-6 border border-white/20">
              <div className="flex items-start gap-4">
                <img src="./a'qil.png" alt="Your Image" className="w-16 h-16 flex-shrink-0" />
                <div className="flex flex-col">
                  <p className="text-lg mb-4 font-grotesk">
                    hello! i'm A'qil. i'm an undergraduate @ NUS CS with a keen interest in red team operations and 
                    machine learning. i also love developing software, websites and games professionally and in my downtime. i love 
                    cats and gaming too :D
                  </p>
                  <a href="/about" className="text-sm text-blue-400 hover:underline">Read More →</a>
                </div>
              </div>
            </div>

            {/* Segment 2: Tech Stack Carousel */}
            <TechStackCarousel className=""/>
            
          </div>
        </div>
      </div>
    </div>
  );
}