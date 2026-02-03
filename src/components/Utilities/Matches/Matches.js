import React from 'react';
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
        <section id="match" className="match-area pt-60 pb-90" style={{ background: `url(${matchBgImg})`, overflow: 'visible' }}>
            <div className="container" style={{ overflow: 'visible' }}>
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
                <div className="row" style={{ paddingTop: '20px', overflow: 'visible' }}>
                    {
                        events.map((event, index) => {
                            const { logo, name } = event;
                            return (
                                <div key={index} className="col-lg-4 col-md-6 col-sm-6 mb-40 wow fadeInUp animated" data-animation="fadeInUp" data-delay={`${0.1 * index}s`} style={{ paddingTop: '10px' }}>
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