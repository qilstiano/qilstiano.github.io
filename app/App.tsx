// App.tsx
'use client';
import React from 'react';
import { FaGithub, FaBlog, FaFileAlt, FaEnvelope } from 'react-icons/fa';

function App() {
    // Handle resume download
    const handleResumeDownload = () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
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
                        <span className="greeting-line">hi! i'm A'qil</span>
                    </div>
                    <div className="bio">
                        <p>
                            i'm a Computer Science undergraduate from the National University of Singapore.
                            i like cybersecurity and very much prefer to be building things/contributing
                            to projects that actually matter to people, not for profits. i'm proudest of my work when it has some
                            positive impact on people/society and isn't some pointless LLM wrapper or the openclaw slop that you see everywhere on LinkedIn.
                            my proudest work (so far) is the work i do over at <a href="https://www.jalanjourney.com" target="_blank" rel="noopener noreferrer" className="inline-link">Jalan Journey</a>. i also like cats :)
                        </p>
                    </div>
                    <div className="social-links">
                        <div className="kaypoh-line">
                            <span className="kaypoh-text">go and kaypoh me here:</span>
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