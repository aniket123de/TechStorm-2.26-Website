import React from 'react';
import matchBgImg from '../../../assets/img/bg/match-bg.png';

// Cloudinary base URL
const CLOUDINARY_BASE = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox";

// Pixelated event mascots from Cloudinary
const codeBee = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/CODE%20BEE`;
const hackStorm = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/HACKSTORM`;
const technomania = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/TECHNOMANIA`;
const roNavigator = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/RO-NAVIGATOR`;
const roCombat = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/RO-COMBAT`;
const roSoccer = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/RO-SOCCER`;
const roTerrance = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/RO-TERRANCE`;
const techHunt = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/TECH%20HUNT`;
const omegatrix = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/OMEGATRIX`;
const creativeCanvas = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/CREATIVE%20CANVAS`;
const passionWithReels = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/PASSION%20WITH%20REELS`;
const khet = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/KHET`;
const forzaHorizon = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/FORZA%20HORIZON`;
const fifaMobile = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/FIFA%20Mobile`;
const rosumo = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/rosumo`;

import SectionTitle from '../SectionTitle/SectionTitle';
import RetroCard from '../RetroCard/RetroCard';
import AnimateOnScroll from '../ScrollAnimation/AnimateOnScroll';

const MatchesAnimated = () => {
    const [hoveredIndex, setHoveredIndex] = React.useState(null);
    const [activeFilter, setActiveFilter] = React.useState('All');
    
    const allEvents = [
        { logo: codeBee, name: 'Code-Bee', category: 'Technical' },
        { logo: hackStorm, name: 'Hack Storm', category: 'Technical' },
        { logo: technomania, name: 'TechnoMania', category: 'Technical' },
        { logo: omegatrix, name: 'Omegatrix', category: 'Brain Teaser' },
        { logo: techHunt, name: 'Tech Hunt', category: 'Brain Teaser' },
        { logo: roNavigator, name: 'Ro-Navigator', category: 'Rover' },
        { logo: roCombat, name: 'Ro-Combat', category: 'Rover' },
        { logo: roSoccer, name: 'Ro-Soccer', category: 'Rover' },
        { logo: roTerrance, name: 'Ro-Terrance', category: 'Rover' },
        { logo: creativeCanvas, name: 'Creative Canvas', category: 'Creative' },
        { logo: passionWithReels, name: 'Passion with Reels', category: 'Creative' },
        { logo: forzaHorizon, name: 'Forza Horizon', category: 'Games' },
        { logo: fifaMobile, name: 'FIFA Mobile', category: 'Games' },
        { logo: khet, name: 'KHET', category: 'Games' },
        { logo: rosumo, name: 'Rosumo', category: 'Rover' },
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
                <div className="row align-items-center mb-30">
                    <div className="col-lg-12">
                        {/* Animated Section Title */}
                        <AnimateOnScroll animation="section-title-wrapper">
                            <SectionTitle titlefirst='Featured' titleSec='Events' className="gallery-heading-title" />
                        </AnimateOnScroll>
                    </div>
                    <div className="col-lg-12">
                        {/* Animated Filter Buttons */}
                        <AnimateOnScroll animation="fade-slide-up-subtle" delay={100}>
                            <div className="my-masonry" data-animation="fadeInRight" data-delay=".4s">
                                <div className="button-group filter-button-group" style={{ textAlign: 'center', marginBottom: '20px' }}>
                                    <button className={activeFilter === 'All' ? 'active' : ''} onClick={() => filterEvents('All')}>All</button>
                                    <button className={activeFilter === 'Coding' ? 'active' : ''} onClick={() => filterEvents('Coding')}>Coding</button>
                                    <button className={activeFilter === 'Robotics' ? 'active' : ''} onClick={() => filterEvents('Robotics')}>Robotics</button>
                                    <button className={activeFilter === 'Gaming' ? 'active' : ''} onClick={() => filterEvents('Gaming')}>Gaming</button>
                                    <button className={activeFilter === 'Brain Teaser' ? 'active' : ''} onClick={() => filterEvents('Brain Teaser')}>Brain Teaser</button>
                                    <button className={activeFilter === 'Creative' ? 'active' : ''} onClick={() => filterEvents('Creative')}>Creative</button>
                                </div>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </div>
                <div className="row">
                    {
                        events.map((event, index) => {
                            const { logo, name } = event;
                            // Calculate staggered delay (100ms per card, max 500ms)
                            const delay = (index % 6) * 100;
                            
                            return (
                                <div key={index} className="col-lg-4 col-md-6 col-sm-6 mb-40">
                                    {/* Animated Event Card with stagger effect */}
                                    <AnimateOnScroll 
                                        animation="event-card" 
                                        delay={delay}
                                        threshold={0.1}
                                    >
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
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                        >
                                            <div style={{
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <img 
                                                    src={logo} 
                                                    alt={name}
                                                    style={{
                                                        width: '80%',
                                                        height: 'auto',
                                                        objectFit: 'contain',
                                                        imageRendering: 'pixelated',
                                                        marginBottom: '15px'
                                                    }}
                                                />
                                                <h3 style={{
                                                    fontSize: '1.2rem',
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    margin: 0,
                                                    textTransform: 'uppercase',
                                                    fontFamily: 'Press Start 2P, monospace'
                                                }}>
                                                    {name}
                                                </h3>
                                            </div>
                                        </RetroCard>
                                    </AnimateOnScroll>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </section>
    );
};

export default MatchesAnimated;
