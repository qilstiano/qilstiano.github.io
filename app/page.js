'use client'
import { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import LoadingScreen from './components/LoadingScreen';
import './globals.css';

export default function Home() {
  const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 });

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

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <LoadingScreen/>
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
            <p className="text-[12vw] ">muhammad-a'qil*</p>
            <p className="text-md font-helveticaMedium"> *yup my name has an aprostrophe</p>
            <p className="text-md font-helveticaMedium"> PORTFOLIO I.</p>
          </div>
          <div className="max-w-[100%] px-2 py-3 text-4xl font-helveticaMedium my-9">
          <span>
            <span className=" hover:gradient-effect ">
              1. SOPHOMORE @ NUS COMPUTER SCIENCE
            </span>{' '}
            <span className=" hover:gradient-effect ">
              2. CHIEF TECHNOLOGY OFFICER @ JALAN JOURNEY
            </span>{' '}
            <span className=" hover:gradient-effect ">
              3. ASPIRING RED TEAM/PENTESTING SPECIALIST
            </span>{' '}
            <span className=" hover:gradient-effect ">
              4. FULLSTACK DEVELOPER (WEB)
            </span>{' '}
            <span className=" hover:gradient-effect ">
              5. ASPIRING AI/ML ENGINEER
            </span>{' '}
            <span className="hover:gradient-effect ">
              6. HOBBYIST GRAPHIC DESIGNER
            </span>{' '}
            <span className=" hover:gradient-effect ">
              7. CAT LOVER
            </span>
          </span>
          </div>
        </div>
      </div>
    </div>
  );
}