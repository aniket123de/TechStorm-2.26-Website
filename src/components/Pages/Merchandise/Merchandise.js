import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../Utilities/Breadcrumb/Breadcrumb';
import merchBg from '../../../assets/img/merch.webp';
import merchPhBg from '../../../assets/img/MERCHPH.webp';

const MOBILE_BREAKPOINT = 768;

const Merchandise = () => {
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT
    );

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const bg = isMobile ? merchPhBg : merchBg;

    return (
        <React.Fragment>
            <section
                style={{
                    minHeight: '90vh',
                    background: `linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(13,0,16,0.65) 60%, rgba(0,0,0,0.72) 100%), url(${bg}) center center / cover no-repeat fixed`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '60px 20px',
                }}
            >
                <div
                    style={{
                        textAlign: 'center',
                        maxWidth: '600px',
                    }}
                >
                    <div
                        style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: 'clamp(28px, 5vw, 56px)',
                            color: '#FFD700',
                            textShadow: '4px 4px 0 #FF6B00, 0 0 30px rgba(255,107,0,0.6)',
                            marginBottom: '24px',
                            lineHeight: 1.3,
                        }}
                    >
                        MERCHANDISE
                    </div>
                    <div
                        style={{
                            fontFamily: "'VT323', monospace",
                            fontSize: 'clamp(20px, 4vw, 28px)',
                            color: '#ffc010',
                            letterSpacing: '4px',
                            marginBottom: '32px',
                        }}
                    >
                        COMING SOON
                    </div>
                    <p
                        style={{
                            fontFamily: "'VT323', monospace",
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: 'clamp(18px, 2vw, 16px)',
                            lineHeight: 1.8,
                            margin: 0,
                        }}
                    >
                        Official TechStorm merchandise is on its way.
                        Stay tuned for exclusive gear, collectibles, and more!
                    </p>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Merchandise;
