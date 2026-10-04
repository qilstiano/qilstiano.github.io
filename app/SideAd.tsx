'use client';
import React from 'react';

interface SideAdProps {
    onUpgrade: () => void;
}

// An inline sidebar promo block. Named with neutral classes (promo-*) and a
// non-ad label so content/ad blockers don't cosmetically hide it.
export default function SideAd({ onUpgrade }: SideAdProps) {
    return (
        <div className="promo-card">
            <div className="promo-bar">
                <span>A word from our sponsor</span>
                <span className="promo-info">ⓘ</span>
            </div>
            <div className="promo-body">
                <img src="/utya-flexing.gif" alt="" className="promo-logo-gif" />
                <div className="promo-title">Upgrade to PREMIUM now!</div>
                <div className="promo-text">
                    Unlock my resume and more.
                    <br />
                    <span className="promo-strike">$99</span> <b>from $0*</b>
                </div>
                <button className="promo-cta" onClick={onUpgrade}>
                    Upgrade now!
                </button>
                <div className="promo-foot">*Terms and conditions apply. Extra charges may apply. I may take over your bank account.</div>
            </div>
        </div>
    );
}
