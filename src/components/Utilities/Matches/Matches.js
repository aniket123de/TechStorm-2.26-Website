import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import matchBgImg from '../../../assets/img/bg/match-bg.png';

// Import pixelated event mascots
import codeBee from '../../../assets/img/PIXELATED EVENT MASCOTS/CODE BEE.png';
import hackStorm from '../../../assets/img/PIXELATED EVENT MASCOTS/HACKSTORM.png';
import technomania from '../../../assets/img/PIXELATED EVENT MASCOTS/TECHNOMANIA.png';
import roNavigator from '../../../assets/img/PIXELATED EVENT MASCOTS/RO-NAVIGATOR.png';
import roCombat from '../../../assets/img/PIXELATED EVENT MASCOTS/RO-COMBAT.png';
import roSoccer from '../../../assets/img/PIXELATED EVENT MASCOTS/RO-SOCCER.png';
import roTerrance from '../../../assets/img/PIXELATED EVENT MASCOTS/RO-TERRANCE.png';
import techHunt from '../../../assets/img/PIXELATED EVENT MASCOTS/TECH HUNT.png';
import omegatrix from '../../../assets/img/PIXELATED EVENT MASCOTS/OMEGATRIX.png';
import creativeCanvas from '../../../assets/img/PIXELATED EVENT MASCOTS/CREATIVE CANVAS.png';
import passionWithReels from '../../../assets/img/PIXELATED EVENT MASCOTS/PASSION WITH REELS.png';
import khet from '../../../assets/img/PIXELATED EVENT MASCOTS/KHET.png';
import forzaHorizon from '../../../assets/img/PIXELATED EVENT MASCOTS/FORZA HORIZON.png';
import fifaMobile from '../../../assets/img/PIXELATED EVENT MASCOTS/FIFA Mobile.png';

import SectionTitle from '../SectionTitle/SectionTitle';
import RetroCard from '../RetroCard/RetroCard';

const Matches = () => {
    const [hoveredIndex, setHoveredIndex] = React.useState(null);
    const [activeFilter, setActiveFilter] = React.useState('All');
    const scrollContainerRef = useRef(null);
    const autoScrollInterval = useRef(null);
    const pauseTimeout = useRef(null);
    
    // Start auto-scroll
    const startAutoScroll = () => {
        if (autoScrollInterval.current) return;
        
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        autoScrollInterval.current = setInterval(() => {
            if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
                scrollContainer.scrollLeft = 0;
            } else {
                scrollContainer.scrollLeft += 1;
            }
        }, 30);
    };

    // Stop auto-scroll
    const stopAutoScroll = () => {
        if (autoScrollInterval.current) {
            clearInterval(autoScrollInterval.current);
            autoScrollInterval.current = null;
        }
    };

    // Auto-scroll functionality for pictures album
    useEffect(() => {
        startAutoScroll();
        return () => stopAutoScroll();
    }, []);

    // Navigation handlers
    const handlePrevious = () => {
        if (scrollContainerRef.current) {
            // Pause auto-scroll
            stopAutoScroll();
            
            // Scroll left
            scrollContainerRef.current.scrollLeft -= 320;
            
            // Clear any existing timeout
            if (pauseTimeout.current) {
                clearTimeout(pauseTimeout.current);
            }
            
            // Resume auto-scroll after 3 seconds
            pauseTimeout.current = setTimeout(() => {
                startAutoScroll();
            }, 3000);
        }
    };

    const handleNext = () => {
        if (scrollContainerRef.current) {
            // Pause auto-scroll
            stopAutoScroll();
            
            // Scroll right
            scrollContainerRef.current.scrollLeft += 320;
            
            // Clear any existing timeout
            if (pauseTimeout.current) {
                clearTimeout(pauseTimeout.current);
            }
            
            // Resume auto-scroll after 3 seconds
            pauseTimeout.current = setTimeout(() => {
                startAutoScroll();
            }, 3000);
        }
    };

    // Sample gallery images - you can replace these with actual event photos
    const galleryImages = [
        codeBee,
        hackStorm,
        technomania,
        omegatrix,
        techHunt,
        roNavigator,
        roCombat,
        roSoccer,
        roTerrance,
        creativeCanvas,
        passionWithReels,
        forzaHorizon,
        fifaMobile,
        khet,
    ];
    
    const allEvents = [
        { logo: codeBee, name: 'Code-Bee', category: 'Technical', url: '/events/code-bee' },
        { logo: hackStorm, name: 'Hack Storm', category: 'Technical', url: '/events/hack-storm' },
        { logo: technomania, name: 'TechnoMania', category: 'Technical', url: '/events/technomania' },
        { logo: omegatrix, name: 'Omegatrix', category: 'Brain Teaser', url: '/events/omegatrix' },
        { logo: techHunt, name: 'Tech Hunt', category: 'Brain Teaser', url: '/events/tech-hunt' },
        { logo: roNavigator, name: 'Ro-Navigator', category: 'Rover', url: '/events/ro-navigator' },
        { logo: roCombat, name: 'Ro-Combat', category: 'Rover', url: '/events/ro-combat' },
        { logo: roSoccer, name: 'Ro-Soccer', category: 'Rover', url: '/events/ro-soccer' },
        { logo: roTerrance, name: 'Ro-Terrance', category: 'Rover', url: '/events/ro-terrance' },
        { logo: creativeCanvas, name: 'Creative Canvas', category: 'Creative', url: '/events/creative-canvas' },
        { logo: passionWithReels, name: 'Passion with Reels', category: 'Creative', url: '/events/passion-with-reels' },
        { logo: forzaHorizon, name: 'Forza Horizon', category: 'Games', url: '/events/forza-horizon' },
        { logo: fifaMobile, name: 'FIFA Mobile', category: 'Games', url: '/events/fifa-mobile' },
        { logo: khet, name: 'KHET', category: 'Games', url: '/events/khet' },
    ];

    const [filteredEvents, setFilteredEvents] = React.useState(allEvents);

    const filterEvents = (category) => {
        setActiveFilter(category);
        if (category === 'All') {
            setFilteredEvents(allEvents);
        } else {
            const filtered = allEvents.filter(event => {
                if (category === 'Coding') return event.category === 'Technical';
                if (category === 'Robotics') return event.category === 'Rover';
                if (category === 'Gaming') return event.category === 'Games';
                if (category === 'Brain Teaser') return event.category === 'Brain Teaser';
                if (category === 'Creative') return event.category === 'Creative';
                return false;
            });
            setFilteredEvents(filtered);
        }
    };

    const events = filteredEvents.length > 0 ? filteredEvents : allEvents;

    return (
        <section id="match" className="match-area pt-60 pb-90" style={{ background: `url(${matchBgImg})` }}>
            <div className="container">
                {/* Auto-scrolling Pictures Album */}
                <div className="row mb-50">
                    <div className="col-lg-12">
                        <div style={{ marginBottom: '30px' }}>
                            <h2 style={{ 
                                fontSize: '48px', 
                                textAlign: 'center', 
                                marginBottom: '20px',
                                color: '#ffffff'
                            }}>
                                Previous Year <span style={{ 
                                    color: '#ffc010',
                                    fontFamily: "'Minecraft', monospace",
                                    fontWeight: 600
                                }}>Gallery</span>
                            </h2>
                            <div style={{
                                height: '4px',
                                width: '60px',
                                background: '#ffc010',
                                margin: '0 auto 30px',
                                transition: '0.3s'
                            }}></div>
                        </div>
                        <div style={{ position: 'relative' }}>
                            {/* Previous Button */}
                            <button 
                                onClick={handlePrevious}
                                style={{
                                    position: 'absolute',
                                    left: '-50px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '40px',
                                    height: '40px',
                                    background: '#ffc010',
                                    border: '3px solid #000',
                                    borderRadius: '0',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: '#000',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.5)',
                                    zIndex: 10,
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#00ffea';
                                    e.target.style.transform = 'translateY(-50%) scale(1.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = '#ffc010';
                                    e.target.style.transform = 'translateY(-50%) scale(1)';
                                }}
                            >
                                ‹
                            </button>

                            {/* Next Button */}
                            <button 
                                onClick={handleNext}
                                style={{
                                    position: 'absolute',
                                    right: '-50px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '40px',
                                    height: '40px',
                                    background: '#ffc010',
                                    border: '3px solid #000',
                                    borderRadius: '0',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: '#000',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.5)',
                                    zIndex: 10,
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#00ffea';
                                    e.target.style.transform = 'translateY(-50%) scale(1.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = '#ffc010';
                                    e.target.style.transform = 'translateY(-50%) scale(1)';
                                }}
                            >
                                ›
                            </button>

                            <div 
                                ref={scrollContainerRef}
                                style={{
                                    display: 'flex',
                                    gap: '20px',
                                    overflowX: 'hidden',
                                    overflowY: 'hidden',
                                    padding: '20px 0',
                                    scrollBehavior: 'smooth',
                                    background: 'rgba(26, 14, 34, 0.5)',
                                    border: '3px solid #ffc010',
                                    borderRadius: '10px',
                                    boxShadow: '0 0 20px rgba(255, 192, 16, 0.3)',
                                }}
                            >
                            {galleryImages.concat(galleryImages).map((image, index) => (
                                <div 
                                    key={index}
                                    style={{
                                        minWidth: '300px',
                                        height: '200px',
                                        flexShrink: 0,
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        border: '2px solid #00ffea',
                                        boxShadow: '0 0 15px rgba(0, 255, 234, 0.4)',
                                        background: '#1a0e22',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '20px'
                                    }}
                                >
                                    <img 
                                        src={image} 
                                        alt={`Gallery ${index + 1}`}
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'contain',
                                            imageRendering: 'pixelated',
                                            filter: 'drop-shadow(0 0 10px rgba(0, 255, 234, 0.5))'
                                        }}
                                    />
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row align-items-center mb-30">
                    <div className="col-lg-12">
                        <SectionTitle titlefirst='Featured' titleSec='Events' />
                    </div>
                    <div className="col-lg-12">
                        <div className="my-masonry wow fadeInDown animated" data-animation="fadeInRight" data-delay=".4s">
                            <div className="button-group filter-button-group" style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <button className={activeFilter === 'All' ? 'active' : ''} onClick={() => filterEvents('All')}>All</button>
                                <button className={activeFilter === 'Coding' ? 'active' : ''} onClick={() => filterEvents('Coding')}>Coding</button>
                                <button className={activeFilter === 'Robotics' ? 'active' : ''} onClick={() => filterEvents('Robotics')}>Robotics</button>
                                <button className={activeFilter === 'Gaming' ? 'active' : ''} onClick={() => filterEvents('Gaming')}>Gaming</button>
                                <button className={activeFilter === 'Brain Teaser' ? 'active' : ''} onClick={() => filterEvents('Brain Teaser')}>Brain Teaser</button>
                                <button className={activeFilter === 'Creative' ? 'active' : ''} onClick={() => filterEvents('Creative')}>Creative</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        events.map((event, index) => {
                            const { logo, name, url } = event;
                            return (
                                <div key={index} className="col-lg-4 col-md-6 col-sm-6 mb-40 wow fadeInUp animated" data-animation="fadeInUp" data-delay={`${0.1 * index}s`}>
                                    <Link to={url} style={{ textDecoration: 'none' }}>
                                        <RetroCard 
                                        bg={hoveredIndex === index ? '#1a3d3d' : '#1a0e22'}
                                        textColor={hoveredIndex === index ? '#00ffea' : '#ffffff'}
                                        borderColor={hoveredIndex === index ? '#00ffea' : '#ffc010'}
                                        shadowColor={hoveredIndex === index ? '#00ffea' : '#ffc010'}
                                        style={{
                                            width: '100%',
                                            aspectRatio: '16/9',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '20px',
                                            cursor: 'pointer',
                                            transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)',
                                        }}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                        {/* Mascot image */}
                                        <img src={logo} alt={name} style={{ 
                                            maxWidth: '70%', 
                                            maxHeight: '65%', 
                                            objectFit: 'contain',
                                            filter: hoveredIndex === index ? 'drop-shadow(0 0 20px rgba(0, 255, 234, 0.8))' : 'drop-shadow(0 0 15px rgba(255, 192, 16, 0.6))',
                                            marginBottom: '15px',
                                            imageRendering: 'pixelated'
                                        }} />
                                        
                                        {/* Event name */}
                                        <h4 style={{ 
                                            fontSize: '16px', 
                                            margin: 0,
                                            textAlign: 'center',
                                            fontFamily: '"Press Start 2P", system-ui',
                                            lineHeight: '1.4'
                                        }}>{name}</h4>
                                    </RetroCard>
                                </Link>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </section>
    );
}

export default Matches;