import React, { useState } from 'react';
import herobg from '../../../../assets/img/herobg.png';
import heroph from '../../../../assets/img/heroph.png';
import iplogo from '../../../../assets/img/logo/iplogo.png';
import pcmain from '../../../../assets/img/pcmain.png';
import pcstart from '../../../../assets/img/pcstart.png';
import Button8bit from '../../Button/Button8bit';
import AnimateOnScroll from '../../ScrollAnimation/AnimateOnScroll';

const heroInformation = {
    id: "1",
    titleTag: "#TECHSTORM 2026",
    title: "Play the Past, Build the Future",
    btnText: "Register Now",
}
const { titleTag, title, btnText } = heroInformation;

const HeroOne = () => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <section id="home" className="slider-area slider-four fix p-relative" style={{ position: 'relative', minHeight: '100vh' }}>
            {/* Background Image - Desktop */}
            <div className="d-none d-lg-block" style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                zIndex: 0,
                overflow: 'hidden',
                willChange: 'transform',
                backfaceVisibility: 'hidden'
            }}>
                <img 
                    src={herobg}
                    alt="Hero Background"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                        transform: 'translateZ(0)',
                        opacity: 0.6
                    }}
                />
                {/* Gradient overlay at bottom for blending */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '200px',
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 100%)',
                    zIndex: 1
                }}></div>
            </div>
            {/* Background Image - Mobile */}
            <div className="d-lg-none" style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                zIndex: 0,
                overflow: 'hidden',
                willChange: 'transform',
                backfaceVisibility: 'hidden'
            }}>
                <img 
                    src={heroph}
                    alt="Hero Background Mobile"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                        transform: 'translateZ(0)',
                        opacity: 0.6
                    }}
                />
                {/* Gradient overlay at bottom for blending */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '150px',
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 100%)',
                    zIndex: 1
                }}></div>
            </div>
            <div className="slider-active" style={{ position: 'relative', zIndex: 1 }}>
                <div className="single-slider slider-bg d-flex align-items-center" style={{ background: 'transparent', minHeight: '100vh' }}>
                    <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: '100px' }}>
                        <div className="row justify-content-center pt-50">
                            <div className="col-lg-1 col-md-1 d-none d-lg-block"></div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="slider-content s-slider-content">
                                    {/* IP Logo */}
                                    <AnimateOnScroll animation="hero-title" className="d-none d-lg-block">
                                        <div style={{
                                            marginBottom: '40px',
                                            textAlign: 'left'
                                        }}>
                                            <img 
                                                src={iplogo} 
                                                alt="Event IP Logo" 
                                                style={{
                                                    width: '100%',
                                                    maxWidth: '650px',
                                                    height: 'auto',
                                                    filter: 'drop-shadow(0 0 30px rgba(255, 192, 16, 0.8))',
                                                    transform: 'scale(1.1)'
                                                }}
                                            />
                                        </div>
                                    </AnimateOnScroll>
                                    
                                    {/* Mobile Logo */}
                                    <AnimateOnScroll animation="hero-title" className="d-lg-none">
                                        <div style={{
                                            marginBottom: '30px',
                                            textAlign: 'center'
                                        }}>
                                            <img 
                                                src={iplogo} 
                                                alt="Event IP Logo" 
                                                style={{
                                                    width: '100%',
                                                    maxWidth: '350px',
                                                    height: 'auto',
                                                    filter: 'drop-shadow(0 0 20px rgba(255, 192, 16, 0.8))'
                                                }}
                                            />
                                        </div>
                                    </AnimateOnScroll>
                                    
                                    {/* Mobile PC Image - Single pcmain only */}
                                    <div className="d-block d-lg-none" style={{
                                        textAlign: 'center',
                                        marginBottom: '30px',
                                        display: 'block'
                                    }}>
                                        <img 
                                            src={pcmain}
                                            alt="PC"
                                            style={{
                                                width: '100%',
                                                maxWidth: '300px',
                                                height: 'auto',
                                                filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))',
                                                display: 'block',
                                                margin: '0 auto'
                                            }}
                                        />
                                    </div>
                                    
                                    {/* Desktop Text Content */}
                                    <AnimateOnScroll animation="hero-subtitle" className="d-none d-lg-block">
                                        <h5>{titleTag}</h5>
                                    </AnimateOnScroll>
                                    <AnimateOnScroll animation="hero-subtitle" delay={100} className="d-none d-lg-block">
                                        <h2>{title}</h2>
                                    </AnimateOnScroll>
                                    <AnimateOnScroll animation="hero-subtitle" delay={200} className="d-none d-lg-block">
                                        <p style={{color: '#fff', fontSize: '18px', marginBottom: '30px'}}>{'INSERT COIN to begin your journey at the ultimate technical fest experience. Where retro meets revolution.'}</p>
                                    </AnimateOnScroll>
                                    
                                    {/* Buttons - Mobile */}
                                    <AnimateOnScroll animation="hero-cta" className="d-lg-none">
                                        <div className="slider-btn btn-8bit-group" style={{
                                            display: 'flex',
                                            gap: '20px',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '100%',
                                            flexDirection: 'column',
                                            marginTop: '30px'
                                        }}>
                                            <Button8bit to={'/contact'} variant="primary" size="large">
                                                {btnText}
                                            </Button8bit>
                                            <Button8bit to={'/about'} variant="outline" size="large">
                                                {'Explore Events'}
                                            </Button8bit>
                                        </div>
                                    </AnimateOnScroll>
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-5 d-none d-lg-block">
                                {/* PC Image with Hover Effect */}
                                <div 
                                    className="pc-container d-none d-lg-block"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    style={{
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '500px',
                                        marginTop: '-100px'
                                    }}
                                >
                                    <img 
                                        src={pcmain}
                                        alt="PC Main"
                                        style={{
                                            width: '100%',
                                            maxWidth: '500px',
                                            height: 'auto',
                                            filter: 'drop-shadow(0 10px 40px rgba(0, 0, 0, 0.5))',
                                            transition: 'opacity 0.3s ease-in-out',
                                            opacity: isHovered ? 0 : 1,
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%) translateZ(0)',
                                            willChange: 'opacity',
                                            backfaceVisibility: 'hidden'
                                        }}
                                    />
                                    <img 
                                        src={pcstart}
                                        alt="PC Start"
                                        style={{
                                            width: '100%',
                                            maxWidth: '500px',
                                            height: 'auto',
                                            filter: 'drop-shadow(0 10px 40px rgba(0, 0, 0, 0.5))',
                                            transition: 'opacity 0.3s ease-in-out',
                                            opacity: isHovered ? 1 : 0,
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%) translateZ(0)',
                                            willChange: 'opacity',
                                            backfaceVisibility: 'hidden'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Buttons positioned in lower right - Desktop only */}
                        <AnimateOnScroll animation="hero-cta" className="d-none d-lg-block">
                            <div className="slider-btn btn-8bit-group" style={{
                                position: 'absolute',
                                bottom: '0px',
                                right: '80px',
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '30px',
                                alignItems: 'center',
                                zIndex: 10
                            }}>
                                <Button8bit to={'/contact'} variant="primary" size="large">
                                    {btnText}
                                </Button8bit>
                                <Button8bit to={'/about'} variant="primary" size="large">
                                    {'Explore Events'}
                                </Button8bit>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </div>
            </div>
        </section>
    );
}


export default HeroOne;