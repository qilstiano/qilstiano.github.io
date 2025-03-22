'use client';
import { useEffect, useRef, useState } from 'react';

export default function AboutMe() {
  const [pixelation, setPixelation] = useState(20); // Initial pixelation level
  const imageRef = useRef(null);

  useEffect(() => {
    // Gradually reduce pixelation over time
    const interval = setInterval(() => {
      setPixelation((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 50); // Adjust the speed of the effect here

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 bg-black/10 backdrop-blur-xl rounded-lg p-6 border border-white/20">
      <div className="flex items-start gap-4">
        {/* Image with pixelation effect */}
        <div
          ref={imageRef}
          className="w-24 h-24 flex-shrink-0 relative overflow-hidden"
          style={{
            filter: `blur(${pixelation}px)`,
            transition: 'filter 0.1s ease-out',
          }}
        >
          <img
            src="./a'qil.png"
            alt="Your Image"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Text content */}
        <div className="flex flex-col">
          <p className="text-lg mb-4 font-grotesk">
            hello! i'm A'qil. i'm an undergraduate @ NUS CS with a keen interest in red team operations and
            machine learning. i also love developing software, websites and games professionally and in my downtime. i love
            cats and gaming too :D
          </p>
          <a href="/about" className="text-sm text-blue-400 hover:underline">
            Read More →
          </a>
        </div>
      </div>
    </div>
  );
}