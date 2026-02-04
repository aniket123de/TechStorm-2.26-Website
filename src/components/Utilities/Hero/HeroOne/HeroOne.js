import React, { useState } from 'react';
import { cloudinaryImages } from '../../../../config/cloudinary';
import { Dialog, DialogTrigger, DialogContent, DialogBody } from '../../../ui/8bit/dialog';
import iplogo from '../../../../assets/img/logo/iplogo.png';
import heroVideo from '../../../../assets/img/HERO.mp4';
import Button8bit from '../../Button/Button8bit';
import AnimateOnScroll from '../../ScrollAnimation/AnimateOnScroll';

const herobg = cloudinaryImages.root.herobg;
const heroph = cloudinaryImages.root.heroph;
const pcmain = cloudinaryImages.root.pcmain;
const pcstart = cloudinaryImages.root.pcstart;

const heroInformation = {
    id: "1",
    titleTag: "#TECHSTORM 2026",
    title: "Play the Past, Build the Future",
    btnText: "Register Now",
}
const { titleTag, title, btnText } = heroInformation;

const HeroOne = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const handleDialogChange = (open) => {
        console.log('Dialog state changing to:', open);
        setIsDialogOpen(open);
    };
    
    return (
        <section id="home" className="slider-area slider-four fix p-relative" style={{ position: 'relative', minHeight: '85vh', isolation: 'isolate', zIndex: 1 }}>
            {/* Background Image - Desktop */}
            <div className="d-none d-lg-block" style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                zIndex: 0,
                overflow: 'hidden'
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
                overflow: 'hidden'
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
            <div className="slider-active" style={{ position: 'relative', zIndex: 2 }}>
                <div className="single-slider slider-bg d-flex align-items-center" style={{ background: 'transparent', minHeight: '85vh' }}>
                    <div className="container" style={{ position: 'relative', zIndex: 3, paddingBottom: '60px' }}>
                        <div className="row justify-content-center pt-50">
                            <div className="col-lg-1 col-md-1 d-none d-lg-block"></div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="slider-content s-slider-content">
                                    {/* IP Logo */}
                                    <AnimateOnScroll animation="hero-title" className="d-none d-lg-block">
                                        <div style={{
                                            marginBottom: '25px',
                                            textAlign: 'left'
                                        }}>
                                            <img 
                                                src={iplogo} 
                                                alt="Event IP Logo" 
                                                style={{
                                                    width: '100%',
                                                    maxWidth: '610px',
                                                    height: 'auto',
                                                    filter: 'drop-shadow(0 0 30px rgba(255, 192, 16, 0.8))',
                                                    transform: 'scale(1.0)'
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
                                        <p style={{color: '#fff', fontSize: '18px', marginBottom: '20px'}}>{'INSERT COIN to begin your journey at the ultimate technical fest experience. Where retro meets revolution.'}</p>
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
                                            <Button8bit to={'/about'} variant="primary" size="large">
                                                {'Explore Events'}
                                            </Button8bit>
                                        </div>
                                    </AnimateOnScroll>
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-5 d-none d-lg-block">
                                {/* PC Image with Hover Effect and Video Dialog */}
                                <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
                                    <DialogTrigger>
                                        <div 
                                            className="pc-container"
                                            onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                            style={{
                                                position: 'relative',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '500px',
                                                marginTop: '-100px',
                                                cursor: isHovered ? 'pointer' : 'default'
                                            }}
                                        >
                                            <img 
                                                src={pcmain}
                                                alt="PC Main"
                                                style={{
                                                    width: '100%',
                                                    maxWidth: '420px',
                                                    height: 'auto',
                                                    filter: 'drop-shadow(0 10px 40px rgba(0, 0, 0, 0.5))',
                                                    transition: 'opacity 0.3s ease-in-out',
                                                    opacity: isHovered ? 0 : 1,
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)'
                                                }}
                                            />
                                            <img 
                                                src={pcstart}
                                                alt="PC Start - Click to Play"
                                                style={{
                                                    width: '100%',
                                                    maxWidth: '420px',
                                                    height: 'auto',
                                                    filter: 'drop-shadow(0 10px 40px rgba(0, 0, 0, 0.5))',
                                                    transition: 'all 0.3s ease-in-out',
                                                    opacity: isHovered ? 1 : 0,
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)'
                                                }}
                                            />
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogBody>
                                            <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000' }}>
                                                <video
                                                    controls
                                                    autoPlay
                                                    onEnded={() => handleDialogChange(false)}
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'contain'
                                                    }}
                                                >
                                                    <source src={heroVideo} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        </DialogBody>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                        {/* Buttons positioned in lower right - Desktop only */}
                        <AnimateOnScroll animation="hero-cta" className="d-none d-lg-block">
                            <div className="slider-btn btn-8bit-group" style={{
                                position: 'absolute',
                                bottom: '0px',
                                left: '78%',
                                transform: 'translateX(-50%)',
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '30px',
                                alignItems: 'center',
                                zIndex: 100
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