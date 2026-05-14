// App.tsx
'use client';
import React from 'react';
import { FaGithub, FaBlog, FaFileAlt, FaEnvelope } from 'react-icons/fa';

function App() {
    // Handle resume download
    const handleResumeDownload = () => {
        const link = document.createElement('a');
        link.href = '/my_freakin_resume.pdf';
        link.download = 'my_freakin_resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Handle email
    const handleEmail = () => {
        window.location.href = 'mailto:qilstianooo@gmail.com';
    };

    return (
        <div className="container">
            {/* Hero Section - Full viewport height */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="greeting-wrapper">
                        <span className="greeting-line">hey!</span>
                    </div>
                    <div className="bio">
                        <p>
                            hello i'm A'qil! i'm a Computer Science undergraduate from the National University of Singapore.
                            i like cybersecurity and very much prefer to be building things/contributing
                            to projects that actually matter to people + are not motivated by profits. 
                        </p>
                        <br></br>
                        <p>
                            i'm proudest of my work when it has some
                            positive impact on people/society and isn't some pointless LLM wrapper or the openclaw slop that you see everywhere on LinkedIn.
                            my proudest work (so far) is the work i do over at <a href="https://www.jalanjourney.com" target="_blank" rel="noopener noreferrer" className="inline-link">Jalan Journey</a>. as the CTO, i lead a pretty talented team of software engineers in building products
                            to better education across ASEAN and beyond. i'm beyond lucky to have the opportunity to do what i love & value add to the education of so many while i'm at it.
                        </p>
                        <br></br>
                        <p>
                            i've interned as a Security Services intern over at <a href="https://www.mufg.jp/english/index.html" target="_blank" rel="noopener noreferrer" className="inline-link">MUFG</a> and as a Founding Backend Engineer at Score Financial. 
                            these weren't ideal roles for me as, well, they basically do nothing for the masses of society but i gotta put food on my table. i'm optimistic that i'll come across some work in more
                            socially beneficial sectors/projects in the future. i did learn a lot about full-stack engineering and security though from those opportunities. win some, lose some i guess.
                        </p>
                        <br></br>
                        <p>
                            beyond the boring nerdy stuff, i enjoy torturing myself by running. before i run, i perform my usual rounds around the neighbourhood to inspect the stray cats to see if they're still as manja
                            as usual. i enjoy reading too, usually on anything as long as i can look intellectual when i quote it in conversations/arguments. i attempt to sound verbose on a wide range of 
                            topics spanning tech, politics and life in my <a href='https://www.notion.so/Ruhi-2844ee3a19d680609058ce40b9cdb6e3?source=copy_link' target="_blank" rel="noopener noreferrer" className="inline-link">blog</a>. i have a number of hobbies that come and go too, some interesting ones are: graphic design, 3D art and falling asleep at ungodly hours. 
                        </p>
                        <br></br>
                        <span className="farewell-line">have a nice day!</span>
                    </div>
                    <div className="social-links">
                        <div className="kaypoh-line">
                            <span className="kaypoh-text">go and kaypoh more here:</span>
                            <div className="kaypoh-icons">
                                <a href="https://github.com/qilstiano" target="_blank" rel="noopener noreferrer">
                                    <FaGithub /> github
                                </a>
                                <span className="link-separator">/</span>
                                <a href="https://www.notion.so/Ruhi-2844ee3a19d680609058ce40b9cdb6e3?source=copy_link" target="_blank" rel="noopener noreferrer">
                                    <FaBlog /> blog
                                </a>
                            </div>
                        </div>
                        <div className="contact-line">
                            <button onClick={handleResumeDownload} className="link-button">
                                <FaFileAlt /> resume
                            </button>
                            <span className="link-separator">/</span>
                            <button onClick={handleEmail} className="link-button">
                                <FaEnvelope /> email
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;