import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import bgImg from '../../../assets/img/bg/trendiang-bg.png';


import SectionTitle from '../SectionTitle/SectionTitle';
import LiveStreamingVideo from '../LiveStreamingVideo/LiveStreamingVideo';

import workImg1 from '../../../assets/img/gallery/protfolio-img01.png';
import workImg2 from '../../../assets/img/gallery/protfolio-img02.png';
import workImg3 from '../../../assets/img/gallery/protfolio-img03.png';
import workImg4 from '../../../assets/img/gallery/protfolio-img04.png';
import workImg5 from '../../../assets/img/gallery/protfolio-img05.png';
import workImg6 from '../../../assets/img/gallery/protfolio-img06.png';
import workImg7 from '../../../assets/img/gallery/protfolio-img07.png';
import workImg8 from '../../../assets/img/gallery/protfolio-img08.png';

const galleryItems = [
    {
        id: '1',
        img: workImg1,
        tag: 'Coding',
        label: 'Code-Bee',
        description: 'Speed coding competition',
        cat: 'Coding',
    },
    {
        id: '2',
        img: workImg2,
        tag: 'Hackathon',
        label: 'Hack Storm',
        description: '24-hour innovation sprint',
        cat: 'Coding',
    },
    {
        id: '3',
        img: workImg1,
        tag: 'Technical',
        label: 'TechnoMania',
        description: 'Technical showcase event',
        cat: 'Coding',
    },
    {
        id: '4',
        img: workImg5,
        tag: 'Brain Teaser',
        label: 'Omegatrix',
        description: 'Mind-bending puzzles',
        cat: 'Brain',
    },
    {
        id: '5',
        img: workImg6,
        tag: 'Brain Teaser',
        label: 'Tech Hunt',
        description: 'Technical treasure hunt',
        cat: 'Brain',
    },
    {
        id: '6',
        img: workImg7,
        tag: 'Robotics',
        label: 'Ro-Navigator',
        description: 'Autonomous navigation challenge',
        cat: 'Robotics',
    },
    {
        id: '7',
        img: workImg3,
        tag: 'Robotics',
        label: 'Ro-Combat',
        description: 'Robot battle arena',
        cat: 'Robotics',
    },
    {
        id: '8',
        img: workImg8,
        tag: 'Robotics',
        label: 'Ro-Soccer',
        description: 'Robotic football match',
        cat: 'Robotics',
    },
    {
        id: '9',
        img: workImg7,
        tag: 'Robotics',
        label: 'Ro-Terrance',
        description: 'All-terrain rover race',
        cat: 'Robotics',
    },
    {
        id: '10',
        img: workImg5,
        tag: 'Creative',
        label: 'Creative Canvas',
        description: 'Digital art competition',
        cat: 'Creative',
    },
    {
        id: '11',
        img: workImg6,
        tag: 'Creative',
        label: 'Passion with Reels',
        description: 'Short film showcase',
        cat: 'Creative',
    },
    {
        id: '12',
        img: workImg4,
        tag: 'Gaming',
        label: 'Forza Horizon',
        description: 'Racing wheel setup',
        cat: 'Gaming',
    },
    {
        id: '13',
        img: workImg8,
        tag: 'Gaming',
        label: 'FIFA Mobile',
        description: 'Football tournament',
        cat: 'Gaming',
    },
    {
        id: '14',
        img: workImg2,
        tag: 'Gaming',
        label: 'KHET',
        description: 'Laser chess competition',
        cat: 'Gaming',
    },
]

const WorkGallery = () => {
    const [items, setItems] = useState(galleryItems);
    const scrollContainerRef = React.useRef(null);

    const fliterItem = (cat) => {
        const filterUpdate = galleryItems.filter((currentItem) => {
            return currentItem.cat === cat;
        })
        setItems(filterUpdate);
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
                    <div className="row align-items-center mb-30 wow fadeInUp animated" data-animation="fadeInRight" data-delay=".4s">
                        <div className="col-lg-12 d-flex justify-content-between align-items-center">
                            <SectionTitle
                                titlefirst='All'
                                titleSec='Events' />
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
                            <div className="my-masonry wow fadeInDown animated" data-animation="fadeInRight" data-delay=".4s">
                                <div className="button-group filter-button-group ">
                                    <button className="active" onClick={() => setItems(galleryItems)}>All</button>
                                    <button onClick={() => fliterItem('Coding')}>
                                        {'Coding'}
                                    </button>
                                    <button onClick={() => fliterItem('Robotics')}>
                                        {'Robotics'}
                                    </button>
                                    <button onClick={() => fliterItem('Gaming')}>
                                        {'Gaming'}
                                    </button>
                                    <button onClick={() => fliterItem('Brain')}>
                                        {'Brain Teaser'}
                                    </button>
                                    <button onClick={() => fliterItem('Creative')}>
                                        {'Creative'}
                                    </button>
                                </div>
                            </div>
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
                    >
                        {
                            items.map(item => {
                                const { id, img, tag, label, description } = item
                                return (
                                    <div className="grid-item" key={id} style={{ minWidth: '350px', maxWidth: '350px', flexShrink: 0 }}>
                                        <Link to={img} className="popup-image">
                                            <figure className="gallery-image" style={{ margin: 0 }}>
                                                <img src={img} alt="img" className="img" style={{ height: '350px', objectFit: 'cover' }} />
                                                <figcaption style={{ padding: '15px' }}>
                                                    <span style={{ fontSize: '12px', padding: '4px 12px' }}>{tag}</span>
                                                    <h4 style={{ fontSize: '18px', margin: '10px 0 5px' }}>{label}</h4>
                                                    <p style={{ fontSize: '13px', margin: 0 }}>{description}</p>
                                                </figcaption>
                                            </figure>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <LiveStreamingVideo />
            </div>
        </section>
    );
}


export default WorkGallery;