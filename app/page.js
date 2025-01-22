'use client'
import Head from 'next/head';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/navbar';
import Simulation from './components/archive/Simluation';

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      {/* <LoadingScreen className="pointer-events-none z-51"/> */}
      
      <div className="">
        <Navbar/>
        <Simulation className="fixed w-full h-screen"/>
        {/* <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: "url('./BrillWallpaperNoText.png')" }}
        ></div> */}

        <div className="absolute inset-0 py-10 text-white flex flex-col items-start">
          <div className="px-2 mb-4 rounded-md font-helveticaMedium">
            <p className="text-[6vw]">MUHAMMAD A'QIL</p>
            <p className="text-[2vw]"> PORTFOLIO I.</p>
          </div>
          <div className="max-w-7xl border-2 border-white px-2 text-[2vw] font-helveticaMedium">
            <span><span className='font-garamond'>1.</span> SOPHOMORE @ NUS COMPUTER SCIENCE <span className='font-garamond'>2.</span> CHIEF TECHNOLOGY OFFICER @ JALAN JOURNEY</span>
          </div>
        </div>
      </div>
    </div>
  );
}