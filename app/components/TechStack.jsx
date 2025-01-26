'use client';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Chevron icons
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiAmazonwebservices,
  SiTensorflow,
  SiPython,
  SiKeras,
  SiPytorch,
  SiAdobephotoshop,
  SiAdobepremierepro,
} from 'react-icons/si'; // Tech stack icons
import { TbBrandCSharp, TbBrandBlender } from "react-icons/tb";
import { FaJava } from "react-icons/fa";
import { IoLogoFigma } from "react-icons/io5";

const TechStackCarousel = () => {
  // Categories for the tech stack
  const categories = [
    {
      label: 'Frontend',
      tools: [
        { name: 'Next.js', icon: <SiNextdotjs className="w-6 h-6" /> },
        { name: 'React', icon: <SiReact className="w-6 h-6" /> },
        { name: 'Tailwind', icon: <SiTailwindcss className="w-6 h-6" /> },
        { name: 'HTML', icon: <SiHtml5 className="w-6 h-6" /> },
        { name: 'CSS', icon: <SiCss3 className="w-6 h-6" /> },
      ],
    },
    {
      label: 'Backend',
      tools: [
        { name: 'Java', icon: <FaJava className="w-6 h-6" /> },
        { name: 'C#', icon: <TbBrandCSharp className="w-6 h-6" /> },
        { name: 'Node.js', icon: <SiNodedotjs className="w-6 h-6" /> },
        { name: 'AWS', icon: <SiAmazonwebservices className="w-6 h-6" /> },
      ],
    },
    {
      label: 'AI/ML',
      tools: [
        { name: 'TensorFlow', icon: <SiTensorflow className="w-6 h-6" /> },
        { name: 'Python', icon: <SiPython className="w-6 h-6" /> },
        { name: 'Keras', icon: <SiKeras className="w-6 h-6" /> },
        { name: 'PyTorch', icon: <SiPytorch className="w-6 h-6" /> },
      ],
    },
    {
      label: 'Design/3D',
      tools: [
        { name: 'Blender', icon: <TbBrandBlender className="w-6 h-6" /> },
        { name: 'Figma', icon: <IoLogoFigma className="w-6 h-6" /> },
        { name: 'Photoshop', icon: <SiAdobephotoshop className="w-6 h-6" /> },
        { name: 'Premiere Pro', icon: <SiAdobepremierepro className="w-6 h-6" /> },
      ],
    },
  ];

  // State to track the current category index
  const [currentIndex, setCurrentIndex] = useState(0);

  // State to track the mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // State to track if the GIF should be visible
  const [isGifVisible, setIsGifVisible] = useState(false);

  // Function to handle category change
  const handleCategoryChange = (direction) => {
    if (direction === 'next') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    } else {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? categories.length - 1 : prevIndex - 1
      );
    }
  };

  // Function to handle mouse movement
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left, // X position relative to the carousel
      y: e.clientY - rect.top, // Y position relative to the carousel
    });
  };

  // Function to handle hover over "my tecc stacc"
  const handleHover = () => {
    setIsGifVisible(true);
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setIsGifVisible(false);
  };

  // Current category to display
  const currentCategory = categories[currentIndex];

  return (
    <div
      className="flex-1 bg-black/10 backdrop-blur-xl rounded-lg p-4 border border-white/20 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Carousel Navigation Arrows */}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-all"
        onClick={() => handleCategoryChange('prev')}
      >
        <FaChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-all"
        onClick={() => handleCategoryChange('next')}
      >
        <FaChevronRight className="w-6 h-6" />
      </button>

      {/* Tech Stack Content */}
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
        className="relative text-2xl"
      >
        my tecc stacc
      </div>

      {/* GIF that follows the mouse */}
      {isGifVisible && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)', // Center the GIF on the cursor
          }}
        >
          <img
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmhqZWd0cTI4Z3V4bHQ3aWFvdDlicXBoaDE2dzcyNDM5YW41eWNydiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7NoNw4pMNTvgc/giphy.gif"
            alt="Fun GIF"
            className="w-16 h-16" // Adjust size as needed
          />
        </div>
      )}

      <div className="text-start">
        <p className="text-xl font-bold lowercase mb-4">{currentCategory.label}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {currentCategory.tools.map((tool, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-evenly w-24" // Fixed width for each tool container
            >
              <div className="w-12 h-12 flex items-center justify-evenly bg-white/10 rounded-lg">
                {tool.icon}
              </div>
              <p className="text-sm mt-2 text-center">{tool.name}</p> {/* Center-align text */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackCarousel;