'use client';
import React, { useEffect, useState } from 'react';

const STATUS_MESSAGES = [
    'Starting up...',
    'Farting...',
    'Sharting...',
    'calling ur mom...',
    'scrolling reels...',
    'Being pretentious...',
    'Ok almost there...',
    'Fluffing resume...',
    'Almost there bro...',
    'Welcome!',
];

interface LoadingScreenProps {
    onDone: () => void;
}

export default function LoadingScreen({ onDone }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [statusIndex, setStatusIndex] = useState(0);

    useEffect(() => {
        // Quick, slightly non-linear progress. Occasional tiny stalls for
        // character, but overall ~1.5-2s so visitors aren't kept waiting.
        let current = 0;
        const interval = setInterval(() => {
            const bump = Math.random() < 0.15 ? 1 : Math.random() * 14 + 6;
            current = Math.min(100, current + bump);
            setProgress(current);
            setStatusIndex(Math.min(
                STATUS_MESSAGES.length - 1,
                Math.floor((current / 100) * STATUS_MESSAGES.length)
            ));
            if (current >= 100) {
                clearInterval(interval);
                setTimeout(onDone, 350);
            }
        }, 130);

        return () => clearInterval(interval);
    }, [onDone]);

    return (
        <div className="aqua-loader">
            <div className="aqua-loader-window">
                <div className="aqua-loader-titlebar">
                    <span className="aqua-lights">
                        <span className="aqua-light aqua-light-red" />
                        <span className="aqua-light aqua-light-yellow" />
                        <span className="aqua-light aqua-light-green" />
                    </span>
                    <span className="aqua-loader-titletext">loader.js</span>
                    <span className="aqua-lights-spacer" />
                </div>
                <div className="aqua-loader-body">
                    <img src="/200w.gif" alt="loading" className="aqua-loader-cat" />
                    <p className="aqua-loader-status">{STATUS_MESSAGES[statusIndex]}</p>
                    <div className="aqua-progress-outer">
                        <div
                            className="aqua-progress-inner"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="aqua-loader-pct">{Math.floor(progress)}%</p>
                </div>
            </div>
        </div>
    );
}
