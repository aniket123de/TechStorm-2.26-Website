import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import bgImg from '../../../assets/img/bg/trendiang-bg.png';


import SectionTitle from '../SectionTitle/SectionTitle';
import RetroCard from '../RetroCard/RetroCard';
import AnimateOnScroll from '../ScrollAnimation/AnimateOnScroll';

// Event Images
import codebeeImg from '../../../assets/img/events/codebee.png';
import hackstormImg from '../../../assets/img/events/hackstorm.png';
import technomaniaImg from '../../../assets/img/events/technomania.png';
import omegatrixImg from '../../../assets/img/events/omegatrix.png';
import techhuntImg from '../../../assets/img/events/techhunt.png';
import ronavigatorImg from '../../../assets/img/events/ronavigator.png';
import rocombatImg from '../../../assets/img/events/rocombat.png';
import rosoccerImg from '../../../assets/img/events/rosoccer.png';
import roterranceImg from '../../../assets/img/events/roterrance.png';
import creativecanvasImg from '../../../assets/img/events/crreativecanvas.png';
import passionwithreelsImg from '../../../assets/img/events/passionwithreels.png';
import forzahorizonImg from '../../../assets/img/events/forzahorizon.png';
import fifamobileImg from '../../../assets/img/events/fifamobile.png';
import khetImg from '../../../assets/img/events/khet.png';

const galleryItems = [
    {
        id: '1',
        img: codebeeImg,
        tag: 'Coding',
        label: 'Code-Bee',
        description: 'Speed coding competition',
        cat: 'Coding',
    },
    {
        id: '2',
        img: hackstormImg,
        tag: 'Hackathon',
        label: 'Hack Storm',
        description: '24-hour innovation sprint',
        cat: 'Coding',
    },
    {
        id: '3',
        img: technomaniaImg,
        tag: 'Technical',
        label: 'TechnoMania',
        description: 'Technical showcase event',
        cat: 'Coding',
    },
    {
        id: '4',
        img: omegatrixImg,
        tag: 'Brain Teaser',
        label: 'Omegatrix',
        description: 'Mind-bending puzzles',
        cat: 'Brain',
    },
    {
        id: '5',
        img: techhuntImg,
        tag: 'Brain Teaser',
        label: 'Tech Hunt',
        description: 'Technical treasure hunt',
        cat: 'Brain',
    },
    {
        id: '6',
        img: ronavigatorImg,
        tag: 'Robotics',
        label: 'Ro-Navigator',
        description: 'Autonomous navigation challenge',
        cat: 'Robotics',
    },
    {
        id: '7',
        img: rocombatImg,
        tag: 'Robotics',
        label: 'Ro-Combat',
        description: 'Robot battle arena',
        cat: 'Robotics',
    },
    {
        id: '8',
        img: rosoccerImg,
        tag: 'Robotics',
        label: 'Ro-Soccer',
        description: 'Robotic football match',
        cat: 'Robotics',
    },
    {
        id: '9',
        img: roterranceImg,
        tag: 'Robotics',
        label: 'Ro-Terrance',
        description: 'All-terrain rover race',
        cat: 'Robotics',
    },
    {
        id: '10',
        img: creativecanvasImg,
        tag: 'Creative',
        label: 'Creative Canvas',
        description: 'Digital art competition',
        cat: 'Creative',
    },
    {
        id: '11',
        img: passionwithreelsImg,
        tag: 'Creative',
        label: 'Passion with Reels',
        description: 'Short film showcase',
        cat: 'Creative',
    },
    {
        id: '12',
        img: forzahorizonImg,
        tag: 'Gaming',
        label: 'Forza Horizon',
        description: 'Racing wheel setup',
        cat: 'Gaming',
    },
    {
        id: '13',
        img: fifamobileImg,
        tag: 'Gaming',
        label: 'FIFA Mobile',
        description: 'Football tournament',
        cat: 'Gaming',
    },
    {
        id: '14',
        img: khetImg,
        tag: 'Gaming',
        label: 'KHET',
        description: 'Laser chess competition',
        cat: 'Gaming',
    },
]

const WorkGallery = () => {
    const [items, setItems] = useState(galleryItems);
    const [activeFilter, setActiveFilter] = useState('All');
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const scrollContainerRef = React.useRef(null);

    const fliterItem = (cat) => {
        setActiveFilter(cat);
        const filterUpdate = galleryItems.filter((currentItem) => {
            return currentItem.cat === cat;
        })
        setItems(filterUpdate);
    }

    const showAllItems = () => {
        setActiveFilter('All');
        setItems(galleryItems);
    }

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 320; // card width + gap
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                const maxScroll = container.scrollWidth - container.clientWidth;
                const scrollAmount = 370 * 4; // 4 cards (350px width + 20px gap)
                
                // If we're at or near the end, scroll back to start
                if (container.scrollLeft >= maxScroll - 10) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Scroll 4 cards at once
                    container.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                }
            }
        }, 3000); // 3 seconds

        return () => clearInterval(interval);
    }, [items]);


    return (
        <section id="work" className="pt-120 pb-120" style={{ background: `url(${bgImg}) no-repeat` }}>
            <div className="container-fluid px-4">
                <div className="portfolio ">
                    <div className="row align-items-center mb-30">
                        <div className="col-lg-12 d-flex justify-content-between align-items-center">
                            <AnimateOnScroll animation="section-title-wrapper">
                                <SectionTitle
                                    titlefirst='All Events'
                                    titleSec='' />
                            </AnimateOnScroll>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button 
                                    onClick={() => scroll('left')}
                                    style={{
                                        background: '#ffc010',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '50px',
                                        height: '50px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '20px',
                                        color: '#1a0e22',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => e.target.style.background = '#e6ad0e'}
                                    onMouseOut={(e) => e.target.style.background = '#ffc010'}
                                >
                                    ←
                                </button>
                                <button 
                                    onClick={() => scroll('right')}
                                    style={{
                                        background: '#ffc010',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '50px',
                                        height: '50px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '20px',
                                        color: '#1a0e22',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => e.target.style.background = '#e6ad0e'}
                                    onMouseOut={(e) => e.target.style.background = '#ffc010'}
                                >
                                    →
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <AnimateOnScroll animation="fade-slide-up-subtle" delay={100}>
                                <div className="my-masonry">
                                    <div className="button-group filter-button-group ">
                                    <button className={activeFilter === 'All' ? 'active' : ''} onClick={showAllItems}>All</button>
                                    <button className={activeFilter === 'Coding' ? 'active' : ''} onClick={() => fliterItem('Coding')}>
                                        {'Coding'}
                                    </button>
                                    <button className={activeFilter === 'Robotics' ? 'active' : ''} onClick={() => fliterItem('Robotics')}>
                                        {'Robotics'}
                                    </button>
                                    <button className={activeFilter === 'Gaming' ? 'active' : ''} onClick={() => fliterItem('Gaming')}>
                                        {'Gaming'}
                                    </button>
                                    <button className={activeFilter === 'Brain' ? 'active' : ''} onClick={() => fliterItem('Brain')}>
                                        {'Brain Teaser'}
                                    </button>
                                        <button className={activeFilter === 'Creative' ? 'active' : ''} onClick={() => fliterItem('Creative')}>
                                            {'Creative'}
                                        </button>
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </div>
                    <div 
                        ref={scrollContainerRef}
                        style={{
                            display: 'flex',
                            overflowX: 'auto',
                            gap: '20px',
                            paddingBottom: '20px',
                            scrollBehavior: 'smooth',
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#ffc010 #1a0e22'
                        }}
                        className="gallery-scroll-container"
                    >
                        {
                            items.map((item, index) => {
                                const { id, img, tag, label, description } = item
                                const delay = (index % 6) * 100;
                                return (
                                    <AnimateOnScroll 
                                        key={id}
                                        animation="fade-scale" 
                                        delay={delay}
                                    >
                                        <div 
                                            className="grid-item gallery-card-wrapper" 
                                            style={{ 
                                                minWidth: '350px', 
                                                maxWidth: '350px', 
                                                flexShrink: 0 
                                            }}
                                        >
                                        <RetroCard 
                                            bg={hoveredIndex === index ? '#1a3d3d' : '#1a0e22'}
                                            textColor={hoveredIndex === index ? '#00ffea' : '#ffffff'}
                                            borderColor={hoveredIndex === index ? '#00ffea' : '#ffc010'}
                                            shadowColor={hoveredIndex === index ? '#00ffea' : '#ffc010'}
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                padding: '0',
                                                overflow: 'hidden',
                                                cursor: 'pointer',
                                                transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)',
                                            }}
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                        >
                                            <Link to={img} className="popup-image" style={{ textDecoration: 'none', color: 'inherit', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                                <div className="gallery-image-container" style={{ 
                                                    width: '100%',
                                                    paddingBottom: '80%', 
                                                    position: 'relative',
                                                    overflow: 'hidden' 
                                                }}>
                                                    <img 
                                                        src={img} 
                                                        alt={label} 
                                                        style={{ 
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            width: '100%', 
                                                            height: '100%', 
                                                            objectFit: 'cover',
                                                            imageRendering: 'pixelated'
                                                        }} 
                                                    />
                                                </div>
                                                <div style={{ 
                                                    padding: '15px', 
                                                    flex: '1',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center'
                                                }}>
                                                    <span 
                                                        style={{ 
                                                            fontSize: '10px', 
                                                            padding: '4px 8px',
                                                            border: `2px solid ${hoveredIndex === index ? '#1a0e22' : '#ffc010'}`,
                                                            display: 'inline-block',
                                                            width: 'fit-content',
                                                            marginBottom: '10px',
                                                            fontFamily: '"Press Start 2P", system-ui'
                                                        }}
                                                    >
                                                        {tag}
                                                    </span>
                                                    <h4 style={{ 
                                                        fontSize: '14px', 
                                                        margin: '0 0 8px',
                                                        fontFamily: '"Press Start 2P", system-ui',
                                                        lineHeight: '1.4'
                                                    }}>
                                                        {label}
                                                    </h4>
                                                    <p style={{ 
                                                        fontSize: '11px', 
                                                        margin: 0,
                                                        opacity: 0.9,
                                                        lineHeight: '1.6'
                                                    }}>
                                                        {description}
                                                    </p>
                                                </div>
                                            </Link>
                                        </RetroCard>
                                        </div>
                                    </AnimateOnScroll>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}


export default WorkGallery;