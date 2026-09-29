'use client';
import React, { useEffect } from 'react';

interface Tier {
    name: string;
    price: string;
    period: string;
    tagline: string;
    perks: string[];
    cta: string;
    best?: boolean;
    accent: string; // css class
    unlocks?: boolean; // paid tiers actually download the resume
}

const TIERS: Tier[] = [
    {
        name: 'FREELOADER',
        price: '$0',
        period: 'forever',
        tagline: 'Lame.',
        accent: 'tier-gray',
        perks: [
            '✔ Read this website',
            '✔ Look at the locked resume button',
            '✘ The resume',
            '✘ Happiness',
        ],
        cta: 'Not now',
    },
    {
        name: 'PROFESSIONAL',
        price: '$29.99',
        period: '/ month',
        tagline: 'For serious recruiters who will ghost me after 6 rounds.',
        accent: 'tier-gold',
        best: true,
        unlocks: true,
        perks: [
            '✔ UNLOCK MY RESUME (PDF!)',
            '✔ 1 (one*) firm virtual handshake',
            '✔ Fewer ads experience',
        ],
        cta: 'Upgrade to Pro',
    },
    {
        name: 'ENTERPRISE™',
        price: '$4,999',
        period: '/ hour / seat',
        tagline: 'ok we circle back and KIV.',
        accent: 'tier-purple',
        unlocks: true,
        perks: [
            '✔ Everything in Professional',
            '✔ The same resume but using fancier font',
            '✔ Dedicated 24/7 support line (surcharge: $100 per call)',
        ],
        cta: 'Talk to Sales (my mom)',
    },
];

interface MembershipProps {
    onClose: () => void;
}

export default function Membership({ onClose }: MembershipProps) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handlePurchase = (tier: Tier) => {
        if (tier.unlocks) {
            // Paid tiers actually download the resume. No prompts.
            const link = document.createElement('a');
            link.href = '/my_freakin_resume.pdf';
            link.download = 'my_freakin_resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        onClose();
    };

    return (
        <div className="mem-overlay">
            <div className="mem-window">
                <div className="mem-titlebar">
                    <span className="mem-lights">
                        <button className="mem-light mem-light-red" onClick={onClose} aria-label="close" />
                        <span className="mem-light mem-light-yellow" />
                        <span className="mem-light mem-light-green" />
                    </span>
                    <span className="mem-titletext">Memberships</span>
                    <span className="mem-lights-spacer" />
                </div>
                <div className="mem-body">
                    <h1 className="mem-headline">CHOOSE YOUR PLAN</h1>
                    <p className="mem-sub">
                        You think everything can be free meh. Of course lah cannot. 
                        But ok no worries, can cancel anytime (see my mood).
                    </p>

                    <div className="mem-tiers">
                        {TIERS.map((t) => (
                            <div key={t.name} className={`mem-tier ${t.accent} ${t.best ? 'mem-tier-best' : ''}`}>
                                {t.best && <div className="mem-best-badge">MOST POPULAR</div>}
                                <div className="mem-tier-name">{t.name}</div>
                                <div className="mem-tier-price">
                                    {t.price}<span>{t.period}</span>
                                </div>
                                <div className="mem-tier-tagline">{t.tagline}</div>
                                <ul className="mem-perks">
                                    {t.perks.map((p, i) => (
                                        <li key={i}>{p}</li>
                                    ))}
                                </ul>
                                <button className="mem-tier-cta" onClick={() => handlePurchase(t)}>
                                    {t.cta}
                                </button>
                            </div>
                        ))}
                    </div>

                    <p className="mem-fineprint">
                        * Prices in SGD. No refunds. Terms and conditions apply. No public terms and conditions are available.
                        lol
                    </p>
                    <button className="mem-nothanks" onClick={onClose}>
                        No thanks!
                    </button>
                </div>
            </div>
        </div>
    );
}
