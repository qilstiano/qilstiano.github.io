'use client';
import React from 'react';

interface SideAdProps {
    onUpgrade: () => void;
}

// An inline sidebar ad block (like the display ads that sit alongside page
// content). Promotes the "Premium" upgrade needed to unlock the resume.
export default function SideAd({ onUpgrade }: SideAdProps) {
    return (
        <div className="sidead">
            <div className="sidead-bar">
                <span>Advertisement</span>
                <span className="sidead-info">ⓘ</span>
            </div>
            <div className="sidead-body">
                <img src="/utya-flexing.gif" alt="" className="sidead-logo-gif" />
                <div className="sidead-title">Upgrade to PREMIUM now!</div>
                <div className="sidead-text">
                    Unlock my resume and more.
                    <br />
                    <span className="sidead-strike">$99</span> <b>from $0*</b>
                </div>
                <button className="sidead-cta" onClick={onUpgrade}>
                    Upgrade now!
                </button>
                <div className="sidead-foot">*Terms and conditions apply. Extra charges may apply. I may take over your bank account.</div>
            </div>
        </div>
    );
}
