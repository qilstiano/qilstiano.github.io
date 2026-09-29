// App.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { FaGithub, FaFileAlt, FaEnvelope, FaLock, FaGlobe, FaBullhorn, FaCat } from 'react-icons/fa';
import { BsBookmarksFill } from "react-icons/bs";
import LoadingScreen from './LoadingScreen';
import SideAd from './SideAd';
import Membership from './Membership';
import DitherBanner from './DitherBanner';

const NAV_TABS = [
    { label: 'work', color: 'tab-green' },
    { label: 'blog', color: 'tab-purple' },
    { label: 'art', color: 'tab-red' },
    { label: 'contact', color: 'tab-gold' },
];

const BLOG_URL = 'https://peoples.prata.party';

// Inline glossy pill that sits in the flow of a sentence: [logo] Name.
// `tint` is a css class giving it a light shade of the company's colour.
function CoLink({ href, logo, tint, children }: { href: string; logo: string; tint: string; children: React.ReactNode }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={`gc-co ${tint}`}>
            <img src={logo} alt="" className="gc-co-logo" />
            {children}
        </a>
    );
}

function App() {
    const [loaded, setLoaded] = useState(false);
    const [showMembership, setShowMembership] = useState(false);
    const [sgTime, setSgTime] = useState('');

    // Live Singapore time (Asia/Singapore) for the taskbar clock.
    useEffect(() => {
        const tick = () => {
            setSgTime(
                new Intl.DateTimeFormat('en-GB', {
                    timeZone: 'Asia/Singapore',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                }).format(new Date())
            );
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const openMembership = () => setShowMembership(true);

    const handleEmail = () => {
        window.location.href = 'mailto:qilstianooo@gmail.com';
    };

    if (!loaded) {
        return <LoadingScreen onDone={() => setLoaded(true)} />;
    }

    return (
        <div className="gc-desktop">
            {/* Fake membership / premium page */}
            {showMembership && <Membership onClose={() => setShowMembership(false)} />}

            {/* Win98-style window on the sky desktop */}
            <div className="win98">
                <div className="win98-titlebar">
                    <span className="win98-title">
                        <img src="/brainfarts.png" alt="" className="win98-title-icon" />
                        Brainfart.
                    </span>
                    <span className="win98-controls">
                        <button className="win98-ctrl" aria-label="minimize">_</button>
                        <button className="win98-ctrl" aria-label="maximize">▢</button>
                        <button className="win98-ctrl win98-ctrl-close" aria-label="close">✕</button>
                    </span>
                </div>
                <div className="win98-menubar">
                    <span>File</span><span>Edit</span><span>View</span><span>Go</span><span>Help</span>
                    <span className="win98-menubar-meta">
                        <span className="gc-ver">Ver v2.96</span>
                        <span className="gc-visits">VISITS <b>076315</b></span>
                    </span>
                </div>

                <div className="win98-inner">
                    {/* Interactive dithered pixel banner */}
                    <DitherBanner title="hello!" />

                    {/* Announcement strip */}
                    <div className="gc-announce">
                        <FaBullhorn className="gc-announce-icon" />
                        <marquee scrollamount={5}>
                            check out my proudest work! https://www.greenhousegames.io &nbsp;•&nbsp; this site is under construction &nbsp;•&nbsp; sign my guestbook!!
                        </marquee>
                    </div>

                    {/* Tab nav bar */}
                    <div className="gc-tabs">
                        {NAV_TABS.map((t) => (
                            <a key={t.label} href="#" className={`gc-tab ${t.color}`}>
                                {t.label}
                            </a>
                        ))}
                    </div>

                    <div className="gc-layout">
                        {/* ---------- MAIN PANEL ---------- */}
                        <main className="gc-main">
                            <div className="gc-box gc-main-box">
                                <div className="gc-main-header">
                                    <span className="gc-filepath">root / docs / about_me_draft_1_final.md</span>
                                </div>

                                <h2 className="gc-section">about me</h2>
                                <div className="gc-about">
                                    <img
                                        src="/portrait.png"
                                        alt="portrait of A'qil"
                                        className="gc-avatar"
                                    />
                                    <div className="gc-bio">
                                        <p>
                                            hello i'm A'qil! i'm a Computer Science undergraduate from the National
                                            University of Singapore. i like cybersecurity and very much prefer to be
                                            building things/contributing to projects that actually matter to people +
                                            are not motivated by profits.
                                        </p>
                                    </div>
                                </div>

                                <div className="gc-bio gc-bio-full">
                                    <p>
                                        i'm proudest of my work when it has some positive impact on people/society
                                        and isn't some pointless LLM wrapper or the openclaw slop that you see
                                        everywhere on LinkedIn. my proudest work (so far) is the work i do over at{' '}
                                        <CoLink href="https://www.jalanjourney.com" logo="/jalan_journey_logo.png" tint="co-purple">Jalan Journey</CoLink>.
                                        as the CTO, i lead a pretty talented team of software engineers in building
                                        products to better education across ASEAN and beyond. i'm beyond lucky to have
                                        the opportunity to do what i love & value add to the education of so many while
                                        i'm at it.
                                    </p>
                                    <p>
                                        recently i solo-ed the building of{' '}
                                        <CoLink href="https://www.greenhousegames.io" logo="/gg_logo.svg" tint="co-green">Greenhouse Games</CoLink>,
                                        a catalogue that connects indie game developers, creators and artists with
                                        parents/children who seek a healthier version of screen time. the project was
                                        probably my deepest dive into software engineering, involving multiple services
                                        coordinating together, the use of cloud services like AWS S3 and Cloudfront,
                                        implementation of an auth system and in the future, the integration of a
                                        Stripe-based payments system. this project was extremely tough and challenging,
                                        with many sleepless nights programming, bug testing and running security reviews
                                        (as best as i could as a solo developer) and coordination with my non-technical
                                        counter parts and external coordination + user research with game developers and
                                        parents. it is by far, my proudest achievement in my tech career thus far. my
                                        biggest takeaway: software engineering is ridiculously hard but the payoff of
                                        seeing users happy with your product is unparalleled.
                                    </p>
                                    <p>
                                        i've interned as a Security Services intern over at{' '}
                                        <CoLink href="https://www.mufg.jp/english/index.html" logo="/mufg_logo.png" tint="co-red">MUFG</CoLink>{' '}
                                        and as a Founding Backend Engineer at{' '}
                                        <CoLink href="https://sg.linkedin.com/company/scorefintech" logo="/score_logo.jpg" tint="co-blue">Score Financial</CoLink>. these weren't ideal roles
                                        for me as, well, they basically do nothing for the masses of society but i gotta
                                        put food on my table. i'm optimistic that i'll come across some work in more
                                        socially beneficial sectors/projects in the future. i did learn a lot about
                                        full-stack engineering and security though from those opportunities. win some,
                                        lose some i guess. currently, i'm interning at{' '}
                                        <CoLink href="https://sg.rajahtannasia.com/" logo="/rajah-tann-singapore-logo-1.webp" tint="co-orange">Rajah &amp; Tann</CoLink>{' '}
                                        as the CISO/Cybersecurity Intern. 
                                    </p>
                                    <p>
                                        beyond the boring nerdy stuff, i enjoy torturing myself by running. before i
                                        run, i perform my usual rounds around the neighbourhood to inspect the stray
                                        cats to see if they're still as manja as usual. i enjoy reading too, usually on
                                        anything as long as i can look intellectual when i quote it in
                                        conversations/arguments. i attempt to sound verbose on a wide range of topics
                                        spanning tech, politics and life in my{' '}
                                        <a href={BLOG_URL} target="_blank" rel="noopener noreferrer" className="gc-link">blog</a>.
                                        i have a number of hobbies that come and go too, some interesting ones are:
                                        graphic design, 3D art and going to sleep at ungodly hours.
                                    </p>
                                    <p className="gc-farewell">
                                        have a nice day!
                                        <img src="/utya.gif" alt="" className="gc-farewell-gif" />
                                    </p>
                                </div>

                                <h2 className="gc-section">go and kaypoh more here</h2>
                                <div className="gc-social-row">
                                    <a href="https://github.com/qilstiano" target="_blank" rel="noopener noreferrer" className="gc-social-btn">
                                        <FaGithub className="gc-btn-icon" /> github
                                    </a>
                                    <a href={BLOG_URL} target="_blank" rel="noopener noreferrer" className="gc-social-btn">
                                        <BsBookmarksFill className="gc-btn-icon" /> blog
                                    </a>
                                    <button onClick={openMembership} className="gc-social-btn gc-social-locked">
                                        <FaLock className="gc-btn-icon" /> resume
                                    </button>
                                    <button onClick={handleEmail} className="gc-social-btn">
                                        <FaEnvelope className="gc-btn-icon" /> email
                                    </button>
                                </div>
                                <p className="gc-resume-note">
                                    <FaLock className="gc-note-icon" /> resume is a <b>PREMIUM</b> feature. <button className="gc-inline-upgrade" onClick={openMembership}>upgrade to unlock →</button>
                                </p>
                            </div>

                            <div className="gc-footer">
                                © 2004 Brainfart Inc. &nbsp;•&nbsp; made with a computer &nbsp;•&nbsp; @recruiters i am very serious about my work i promise
                            </div>
                        </main>

                        {/* ---------- RIGHT SIDEBAR: inline ad ---------- */}
                        <aside className="gc-sidebar">
                            <SideAd onUpgrade={openMembership} />
                        </aside>
                    </div>
                </div>
                {/* end win98-inner */}
            </div>
            {/* end win98 window */}

            {/* Fake taskbar */}
            <div className="win98-taskbar">
                <button className="win98-start">
                    <img src="/brainfarts.png" alt="" className="win98-start-icon" />
                    OS
                </button>
                <div className="win98-task"><FaGlobe className="gc-btn-icon" /> A'qil's Portfolio</div>
                <div className="win98-tray">
                    <span className="win98-clock">{sgTime || '--:--'}</span>
                </div>
            </div>
        </div>
    );
}

export default App;
