import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { cloudinaryImages } from '../../../config/cloudinary';
import './WorkGallery.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import RetroCard from '../RetroCard/RetroCard';
const bgImg = cloudinaryImages.backgrounds.eventbg;
import AnimateOnScroll from '../ScrollAnimation/AnimateOnScroll';

// Event Images from Cloudinary
const codebeeImg = cloudinaryImages.events.codebee;
const hackstormImg = cloudinaryImages.events.hackstorm;
const technomaniaImg = cloudinaryImages.events.technomania;
const omegatrixImg = cloudinaryImages.events.omegatrix;
const techhuntImg = cloudinaryImages.events.techhunt;
const ronavigatorImg = cloudinaryImages.events.ronavigator;
const rocombatImg = cloudinaryImages.events.rocombat;
const rosoccerImg = cloudinaryImages.events.rosoccer;
const rosumoImg = cloudinaryImages.events.rosumo;
const roterranceImg = cloudinaryImages.events.roterrance;
const creativecanvasImg = cloudinaryImages.events.crreativecanvas;
const passionwithreelsImg = cloudinaryImages.events.passionwithreels;
const forzahorizonImg = cloudinaryImages.events.forzahorizon;
const fifamobileImg = cloudinaryImages.events.fifamobile;
const khetImg = cloudinaryImages.events.khet;

const galleryItems = [
    {
        id: '1',
        img: codebeeImg,
        tag: 'Coding',
        label: 'Code-Bee',
        description: 'Speed coding competition',
        cat: 'Coding',
        route: '/events/code-bee',
    },
    {
        id: '2',
        img: hackstormImg,
        tag: 'Hackathon',
        label: 'Hack Storm',
        description: '10-hour hacking sprint',
        cat: 'Coding',
        route: '/events/hack-storm',
    },
    {
        id: '3',
        img: technomaniaImg,
        tag: 'Technical',
        label: 'TechnoMania',
        description: 'Technical showcase event',
        cat: 'Coding',
        route: '/events/technomania',
    },
    {
        id: '4',
        img: omegatrixImg,
        tag: 'Brain Teaser',
        label: 'Omegatrix',
        description: 'Mind-bending puzzles',
        cat: 'Brain',
        route: '/events/omegatrix',
    },
    {
        id: '5',
        img: techhuntImg,
        tag: 'Brain Teaser',
        label: 'Tech Hunt',
        description: 'Technical treasure hunt',
        cat: 'Brain',
        route: '/events/tech-hunt',
    },
    {
        id: '6',
        img: ronavigatorImg,
        tag: 'Robotics',
        label: 'Ro-Navigator',
        description: 'Autonomous navigation challenge',
        cat: 'Robotics',
        route: '/events/ro-navigator',
    },
    {
        id: '7',
        img: rocombatImg,
        tag: 'Robotics',
        label: 'Ro-Combat',
        description: 'Robot battle arena',
        cat: 'Robotics',
        route: '/events/ro-combat',
    },
    {
        id: '8',
        img: rosoccerImg,
        tag: 'Robotics',
        label: 'Ro-Soccer',
        description: 'Robotic football match',
        cat: 'Robotics',
        route: '/events/ro-soccer',
    },
    {
        id: '9',
        img: rosumoImg,
        tag: 'Robotics',
        label: 'Ro-Sumo',
        description: 'Robot sumo wrestling',
        cat: 'Robotics',
        route: '/events/ro-sumo',
    },
    {
        id: '10',
        img: roterranceImg,
        tag: 'Robotics',
        label: 'Ro-Terrance',
        description: 'All-terrain rover race',
        cat: 'Robotics',
        route: '/events/ro-terrance',
    },
    {
        id: '11',
        img: creativecanvasImg,
        tag: 'Creative',
        label: 'Creative Canvas',
        description: 'Digital art competition',
        cat: 'Creative',
        route: '/events/creative-canvas',
    },
    {
        id: '12',
        img: passionwithreelsImg,
        tag: 'Creative',
        label: 'Passion with Reels',
        description: 'Short film showcase',
        cat: 'Creative',
        route: '/events/passion-with-reels',
    },
    {
        id: '13',
        img: forzahorizonImg,
        tag: 'Gaming',
        label: 'Forza Horizon',
        description: 'Racing wheel setup',
        cat: 'Gaming',
        route: '/events/forza-horizon',
    },
    {
        id: '14',
        img: fifamobileImg,
        tag: 'Gaming',
        label: 'FIFA Mobile',
        description: 'Football tournament',
        cat: 'Gaming',
        route: '/events/fifa-mobile',
    },
    {
        id: '15',
        img: khetImg,
        tag: 'Gaming',
        label: 'KHET',
        description: 'Laser chess competition',
        cat: 'Gaming',
        route: '/events/khet',
    },
]

const WorkGallery = () => {
    const [items, setItems] = useState(galleryItems);
    const [activeFilter, setActiveFilter] = useState('All');
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
            const firstCard = scrollContainerRef.current.querySelector('.gallery-card-wrapper');
            if (firstCard) {
                const cardWidth = firstCard.offsetWidth;
                const computedStyle = window.getComputedStyle(scrollContainerRef.current);
                const gap = parseInt(computedStyle.gap) || 20;
                const scrollAmount = cardWidth + gap;
                scrollContainerRef.current.scrollBy({
                    left: direction === 'left' ? -scrollAmount : scrollAmount,
                    behavior: 'smooth'
                });
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                const firstCard = container.querySelector('.gallery-card-wrapper');
                
                if (firstCard) {
                    const maxScroll = container.scrollWidth - container.clientWidth;
                    const cardWidth = firstCard.offsetWidth;
                    const computedStyle = window.getComputedStyle(container);
                    const gap = parseInt(computedStyle.gap) || 20;
                    const scrollAmount = cardWidth + gap;
                    
                    if (container.scrollLeft >= maxScroll - 10) {
                        container.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        container.scrollBy({
                            left: scrollAmount,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [items]);


    return (
        <section
            id="work"
            className="pt-120 pb-120"
            style={{
                paddingTop: '60px',
                backgroundColor: '#05030a',
                backgroundImage: `url(${bgImg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center top',
                backgroundAttachment: 'scroll',
                position: 'relative',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                        'linear-gradient(to bottom,' +
                        'rgba(0, 0, 0, 0.85) 0%,' +
                        'rgba(0, 0, 0, 0.4) 25%,' +
                        'rgba(0, 0, 0, 0.25) 65%,' +
                        'rgba(0, 0, 0, 0.15) 88%,' +
                        'rgba(0, 0, 0, 0.0) 100%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            ></div>

            {/* Left side fade — full section height, desktop only */}
            <div className="gallery-side-fade gallery-side-fade--left"></div>
            {/* Right side fade — full section height, desktop only */}
            <div className="gallery-side-fade gallery-side-fade--right"></div>
            
            <div className="container-fluid gallery-container" style={{ position: 'relative', zIndex: 1, paddingLeft: isMobile ? '15px' : '60px', paddingRight: isMobile ? '15px' : '60px' }}>
                <div className="portfolio">
                    <div className="row align-items-center mb-30">
                        {/*
                         * Title row: position:relative so the absolutely-centred
                         * SectionTitle sits within this row, while the nav arrows
                         * stay pushed to the right via justify-content-end.
                         */}
                        <div
                            className="col-lg-12 d-flex justify-content-end align-items-center"
                            style={{ position: 'relative', minHeight: '120px' }}
                        >
                            {/* Centred heading — absolutely positioned so arrows don't shift */}
                            <AnimateOnScroll animation="section-title-wrapper">
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '8px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        textAlign: 'center',
                                        whiteSpace: 'nowrap',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    <SectionTitle
                                        titlefirst='All Events'
                                        titleSec=''
                                                     className="gallery-heading-title"
                                                     /* Use the gallery-heading-title class so this
                                                         section uses the same pixel/8-bit font as other
                                                         section headings and the decorative image is
                                                         hidden via existing styles. */
                                    />
                                </div>
                            </AnimateOnScroll>

                            {/* Navigation arrows stay right-aligned */}
                            <div style={{ display: 'flex', gap: '10px' }} className="gallery-nav-buttons">
                                <button 
                                    onClick={() => scroll('left')}
                                    className="gallery-nav-btn"
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
                                    className="gallery-nav-btn"
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
                                    <div className="button-group filter-button-group">
                                        <button className={activeFilter === 'All' ? 'active' : ''} onClick={showAllItems}>All</button>
                                        <button className={activeFilter === 'Coding' ? 'active' : ''} onClick={() => fliterItem('Coding')}>
                                            {'Technicals'}
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
                            paddingTop: '30px',
                            paddingBottom: '30px',
                            scrollBehavior: 'smooth',
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#ffc010 #1a0e22'
                        }}
                        className="gallery-scroll-container"
                    >
                        {
                            items.map((item, index) => {
                                const { id, img, tag, label, description, route } = item
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
                                                transform: hoveredIndex === index ? 'scale(1.02)' : 'scale(1)',
                                            }}
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                        >
                                            <Link to={route} className="popup-image" style={{ textDecoration: 'none', color: 'inherit', height: '100%', display: 'flex', flexDirection: 'column' }}>
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
            {/* Bottom fade blend into next section */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '160px',
                    background: 'linear-gradient(to bottom, transparent 0%, #05030a 100%)',
                    pointerEvents: 'none',
                    zIndex: 2,
                }}
            />
        </section>
    );
}


export default WorkGallery;
