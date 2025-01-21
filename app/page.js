import Head from 'next/head';
import Navbar from './components/navbar';

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <Head>
        <title>Muhammad A'qil - Brutalist Portfolio</title>
        <meta name="description" content="Muhammad A'qil's Brutalist Portfolio" />
      </Head>

      <Navbar/>
      <div className=''>
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: "url('/BrillWallpaperNoText.png')" }}
        ></div>

        {/* Overlaying Text Chaos */}
        <div className="absolute inset-0 py-10 text-white ">
          <h1 className="text-[3vw] px-2 rounded-md bg- font-helveticaMedium border-2 border-white absolute">
            <underline>WELCOME</underline> TO THE PORTFOLIO OF <br></br> <h1 className="vertical">MUHAMMAD A'QIL</h1>
          </h1>
        </div>
      </div>
    </div>
  );
}