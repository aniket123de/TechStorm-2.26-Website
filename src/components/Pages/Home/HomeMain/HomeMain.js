import React, { Fragment, useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import About from '../../../Utilities/About/About';
import Cta from '../../../Utilities/Cta/Cta';
import BlogOne from '../../../Utilities/Blog/BlogOne/BlogOne';
import HeroOne from '../../../Utilities/Hero/HeroOne/HeroOne';
import WorkGallery from '../../../Utilities/WorkGallery/WorkGallery';
import Carousel8bit from '../../../Utilities/LiveStreamingVideo/Carousel8bit/Carousel8bit';
import EventTicker from '../../../Utilities/EventTicker/EventTicker';
import RetroGameConsole from '../../Gallery/RetroGameConsole';
import { cloudinaryImages } from '../../../../config/cloudinary';
const retroArcadeBg = cloudinaryImages.backgrounds.retroarcade;

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const arcadeRef = useRef(null);
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' && window.innerWidth < 1024
    );

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        const el = arcadeRef.current;
        if (!el) return;

        const anim = gsap.fromTo(
            el,
            { opacity: 0, y: 90 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    once: true,
                },
            }
        );

        return () => {
            if (anim.scrollTrigger) anim.scrollTrigger.kill();
        };
    }, []);

    return (
        <Fragment>

            {/* Hero Component */}
            <HeroOne />

            {/* Event Ticker */}
            <EventTicker />

            {/* About Component */}
            <About />

            {/* Retro Arcade — desktop only (hidden on mobile) */}
            {!isMobile && <section
                ref={arcadeRef}
                style={{
                    backgroundImage: `linear-gradient(180deg, rgba(5,5,15,0.70) 0%, rgba(0,10,30,0.55) 40%, rgba(5,5,15,0.75) 100%), url(${retroArcadeBg})`,
                    backgroundSize: '110% auto',
                    backgroundPosition: 'center center',
                    backgroundAttachment: 'scroll',
                    backgroundRepeat: 'no-repeat',
                    padding: '60px 0 70px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Pixel-grid background */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        backgroundImage:
                            'linear-gradient(rgba(255,107,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.03) 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                        zIndex: 0,
                    }}
                />

                {/* Top fade — blends from About section's dark bottom */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '140px',
                        background: 'linear-gradient(to bottom, #0a0a0a 0%, transparent 100%)',
                        pointerEvents: 'none',
                        zIndex: 1,
                    }}
                />

                {/* Bottom fade — blends into WorkGallery's dark bg */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '140px',
                        background: 'linear-gradient(to top, #05030a 0%, transparent 100%)',
                        pointerEvents: 'none',
                        zIndex: 1,
                    }}
                />

                {/* Section heading */}
                <div
                    style={{
                        position: 'relative',
                        zIndex: 1,
                        textAlign: 'center',
                        marginBottom: '40px',
                        padding: '0 20px',
                    }}
                >
                    <div
                        style={{
                            fontFamily: "'VT323', monospace",
                            fontSize: 'clamp(14px, 4vw, 18px)',
                            color: 'var(--orange, #FF6B00)',
                            letterSpacing: '6px',
                            marginBottom: '8px',
                        }}
                    >
                        &gt; TURN ON THE ARCADE TO CONTINUE
                    </div>
                    <div
                        role="heading"
                        aria-level="2"
                        style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: 'clamp(18px, 2.4vw, 30px)',
                            color: 'var(--yellow, #FFD700)',
                            textShadow: '4px 4px 0 var(--orange, #FF6B00)',
                            letterSpacing: '2px',
                            margin: 0,
                            lineHeight: 1.4,
                        }}
                    >
                        RETRO ARCADE
                    </div>
                </div>

                {/* Console */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <RetroGameConsole />
                </div>
            </section>}

            {/* Gallery Component */}
            <WorkGallery/>

            {/* 8-bit Carousel Component */}
            <Carousel8bit />

            {/* Cta Component */}
            <Cta />

            {/* Blog Component */}
            <BlogOne />

        </Fragment>
    );
}

export default Home;