import React, { Fragment, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import RetroCard from '../../Utilities/RetroCard/RetroCard';
import './EventDetail.css';

const EventDetail = ({ eventData }) => {
    const { 
        name, 
        logo, 
        category, 
        description, 
        rules, 
        prizes, 
        teamSize, 
        duration, 
        venue,
        contact,
        entryFee,
        qrCode,
        paymentLink,
        previousYearImages,
        coordinators,
        breadcrumbBg
    } = eventData;

    const scrollContainerRef = useRef(null);
    const autoScrollInterval = useRef(null);
    const pauseTimeout = useRef(null);

    // Dummy placeholder images - replace with actual event photos later
    const dummyImages = [
        'https://via.placeholder.com/400x300/1a0e22/ffc010?text=Event+Photo+1',
        'https://via.placeholder.com/400x300/1a0e22/00ffea?text=Event+Photo+2',
        'https://via.placeholder.com/400x300/1a0e22/ffc010?text=Event+Photo+3',
        'https://via.placeholder.com/400x300/1a0e22/00ffea?text=Event+Photo+4',
        'https://via.placeholder.com/400x300/1a0e22/ffc010?text=Event+Photo+5',
        'https://via.placeholder.com/400x300/1a0e22/00ffea?text=Event+Photo+6',
    ];

    // Use provided images or fall back to dummy images
    const galleryImages = (previousYearImages && previousYearImages.length > 0) 
        ? previousYearImages 
        : dummyImages;

    // Start auto-scroll
    const startAutoScroll = () => {
        if (autoScrollInterval.current) return;
        
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        autoScrollInterval.current = setInterval(() => {
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            
            if (scrollContainer.scrollLeft >= maxScroll) {
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

    useEffect(() => {
        startAutoScroll();
        return () => {
            stopAutoScroll();
            if (pauseTimeout.current) {
                clearTimeout(pauseTimeout.current);
            }
        };
    }, []);

    // Navigation handlers for gallery
    const handlePrevious = () => {
        if (scrollContainerRef.current) {
            // Pause auto-scroll
            stopAutoScroll();
            
            // Scroll left
            scrollContainerRef.current.scrollLeft -= 420;
            
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
            scrollContainerRef.current.scrollLeft += 420;
            
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

    return (
        <Fragment>
            {/* Event Name Section */}
            <section className="event-name-section" style={breadcrumbBg ? {
                backgroundImage: `linear-gradient(rgba(26, 14, 34, 0.7), rgba(26, 14, 34, 0.7)), url(${breadcrumbBg})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center'
            } : {}}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="event-name-heading">
                                <h1 className="event-title-white">{name.split(' ')[0]}</h1>
                                {name.split(' ').slice(1).join(' ') && (
                                    <h1 className="event-title-gold">{name.split(' ').slice(1).join(' ')}</h1>
                                )}
                                <div className="heading-brush"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Event Section */}
            <section className="about-event-section pt-60 pb-60">
                <div className="container">
                    <div className="row">
                        {/* Left: Scrollable Pictures */}
                        <div className="col-lg-6 mb-40">
                            <div style={{ position: 'relative' }}>
                                {/* Previous Button */}
                                <button 
                                    onClick={handlePrevious}
                                    className="gallery-nav-btn gallery-nav-prev"
                                    style={{
                                        position: 'absolute',
                                        left: '-20px',
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
                                    className="gallery-nav-btn gallery-nav-next"
                                    style={{
                                        position: 'absolute',
                                        right: '-20px',
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

                                <div className="pictures-scroll-container" ref={scrollContainerRef}>
                                {galleryImages.concat(galleryImages).map((image, index) => (
                                    <div key={index} className="scroll-image-wrapper">
                                        <img src={image} alt={`${name} Gallery ${index + 1}`} className="scroll-image" />
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: About Event */}
                        <div className="col-lg-6 mb-40">
                            <div className="about-heading">
                                <h2 className="heading-white">ABOUT</h2>
                                <h2 className="heading-gold">EVENT</h2>
                                <div className="heading-brush"></div>
                            </div>
                            <div className="about-content">
                                <p className="about-text" style={{ 
                                    color: '#ffffff', 
                                    fontSize: '14px',
                                    lineHeight: '1.8',
                                    fontFamily: 'Arial, sans-serif',
                                    margin: 0,
                                    padding: 0,
                                    display: 'block',
                                    textShadow: '0 0 5px rgba(255,255,255,0.5)'
                                }}>
                                    {description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Event Rules Section */}
            <section className="event-rules-section pt-30 pb-60">
                <div className="container">
                    <div className="row">
                        {/* Left: Entry Fee & Payment */}
                        <div className="col-lg-6 mb-40" style={{ paddingLeft: '80px' }}>
                            <div className="entry-heading">
                                <h2 className="heading-white">ENTRY</h2>
                                <h2 className="heading-gold">FEE</h2>
                                <div className="heading-brush"></div>
                            </div>
                            <div className="entry-content">
                                <div className="fee-category">
                                    <h4 style={{ 
                                        color: '#ffc010', 
                                        fontSize: '16px', 
                                        fontFamily: 'Press Start 2P',
                                        marginBottom: '10px'
                                    }}>
                                        For BPPIMT students
                                    </h4>
                                    <div className="fee-amount">
                                        <span className="fee-icon">💰</span>
                                        <span className="fee-text">₹80 per team</span>
                                    </div>
                                </div>

                                <div className="fee-category" style={{ marginTop: '30px' }}>
                                    <h4 style={{ 
                                        color: '#00ffea', 
                                        fontSize: '16px', 
                                        fontFamily: 'Press Start 2P',
                                        marginBottom: '10px'
                                    }}>
                                        For outside students
                                    </h4>
                                    <div className="fee-amount">
                                        <span className="fee-icon">💰</span>
                                        <span className="fee-text">₹100 per team</span>
                                    </div>
                                </div>

                                {/* Team Size Container */}
                                <div className="nes-container is-centered is-dark with-title" style={{ marginTop: '40px' }}>
                                    <p className="title">Team Size Options</p>
                                    <p style={{ 
                                        textAlign: 'center', 
                                        fontSize: '20px',
                                        margin: '20px 0'
                                    }}>
                                        Solo / Duo / Thrice
                                    </p>
                                </div>

                                {qrCode && (
                                    <div className="qr-section">
                                        <h4 className="qr-title">Scan to Pay</h4>
                                        <div className="qr-code-wrapper">
                                            <img src={qrCode} alt="Payment QR Code" className="qr-code" />
                                        </div>
                                    </div>
                                )}
                                {paymentLink && (
                                    <div className="payment-link-section">
                                        <a href={paymentLink} target="_blank" rel="noopener noreferrer" className="payment-button">
                                            <span>PAY ONLINE</span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: Rules */}
                        <div className="col-lg-6 mb-40">
                            <div className="rules-heading">
                                <h2 className="heading-white">EVENT</h2>
                                <h2 className="heading-gold">RULES</h2>
                                <div className="heading-brush"></div>
                            </div>
                            <div className="rules-content">
                                <ul className="rules-list-new">
                                    {rules.map((rule, index) => (
                                        <li key={index}>
                                            <span className="rule-bullet">▸</span>
                                            <span className="rule-text">{rule}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Coordinators Section */}
            <section className="coordinators-section pt-30 pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="coordinator-heading">
                                <h2 className="heading-white">COORDINATORS &</h2>
                                <h2 className="heading-gold">VOLUNTEERS</h2>
                                <div className="heading-brush"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-40">
                        {coordinators && coordinators.length > 0 ? (
                            coordinators.map((coordinator, index) => (
                                <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-30">
                                    <div className="coordinator-card">
                                        <div className="coordinator-avatar">
                                            {coordinator.image ? (
                                                <img src={coordinator.image} alt={coordinator.name} />
                                            ) : (
                                                <div className="avatar-placeholder">
                                                    {coordinator.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="coordinator-name">{coordinator.name}</h4>
                                        <p className="coordinator-role">{coordinator.role || 'Coordinator'}</p>
                                        <div className="coordinator-contacts">
                                            <p className="coord-phone">{coordinator.phone}</p>
                                            <p className="coord-email">{coordinator.email}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : contact && contact.length > 0 ? (
                            contact.map((person, index) => (
                                <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-30">
                                    <div className="coordinator-card">
                                        <div className="coordinator-avatar">
                                            <div className="avatar-placeholder">
                                                {person.name.charAt(0)}
                                            </div>
                                        </div>
                                        <h4 className="coordinator-name">{person.name}</h4>
                                        <p className="coordinator-role">Contact Person</p>
                                        <div className="coordinator-contacts">
                                            <p className="coord-phone">{person.phone}</p>
                                            <p className="coord-email">{person.email}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : null}
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default EventDetail;
