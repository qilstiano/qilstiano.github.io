import Head from 'next/head';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/navbar';

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      {/* <LoadingScreen className="pointer-events-none"/> */}
      
      <div className="">
        <Navbar/>
        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: "url('/BrillWallpaperNoText.png')" }}
        ></div>

        <div className="absolute inset-0 py-10 text-white flex flex-col items-start">
          <div className="text-[4vw] px-2 mb-4 rounded-md font-helveticaMedium border-2 border-white">
            WELCOME TO THE PORTFOLIO OF <br /> <p className="">MUHAMMAD A'QIL</p>
          </div>
          <div className="border-2 border-white px-2 font-helveticaMedium">
            <span>I AM A: <span className='font-garamond'>1.</span> SOPHOMORE @ NUS COMPUTER SCIENCE</span>
          </div>
        </div>
      </div>
    </div>
  );
}