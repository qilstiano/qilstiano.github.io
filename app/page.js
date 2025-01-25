'use client';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import LoadingScreen from './components/LoadingScreen';
import LoopingWords from './components/LoopingWords';
import './globals.css';

export default function Home() {
  const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 });
  const targetName = "muhammad-a'qil*";
  const [displayName, setDisplayName] = useState('');
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-[]{}";
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 }); // Track cursor position

  // Name shuffling effect with a 5-second delay
  useEffect(() => {
    const delay = 3500; // 5-second delay
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
      }, 100); // Speed of shuffling effect

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, []);

  // Calculate grid size based on window dimensions
  useEffect(() => {
    const calculateGridSize = () => {
      const cellSize = 50; // Size of each grid cell in pixels
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
      if (gridCells.length === 0) return; // Skip if no grid cells are found

      const numberOfCellsToFill = 30; // Number of cells to animate at once
      const cellsToAnimate = new Set(); // Use a Set to avoid duplicates

      // Select unique random cells
      while (cellsToAnimate.size < numberOfCellsToFill) {
        const randomIndex = Math.floor(Math.random() * gridCells.length);
        cellsToAnimate.add(gridCells[randomIndex]);
      }

      // Apply animation to the selected cells
      cellsToAnimate.forEach((cell) => {
        cell.style.animation = 'glow 2s ease';
      });

      // Reset animation after it completes
      setTimeout(() => {
        cellsToAnimate.forEach((cell) => {
          cell.style.animation = '';
        });
      }, 2000);
    };

    // Animate random cells every 500ms
    const interval = setInterval(animateRandomCells, 500);

    return () => {
      clearInterval(interval); // Cleanup interval on unmount
    };
  }, [gridSize]); // Run this effect whenever gridSize changes

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
            <p className="text-[9vw]">{displayName || targetName}</p>
            <p className="text-md font-helveticaMedium"> *yup my name has an apostrophe</p>
            <p className="text-md font-helveticaMedium"> PORTFOLIO I.</p>
          </div>
          <LoopingWords />
        </div>
      </div>
    </div>
  );
}