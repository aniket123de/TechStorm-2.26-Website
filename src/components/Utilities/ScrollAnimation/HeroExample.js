/**
 * Example Hero Section with Retro Arcade Animations
 * 
 * This example demonstrates how to create an engaging hero section
 * with smooth scroll animations for a tech fest website.
 */

import React from 'react';
import AnimateOnScroll from '../ScrollAnimation/AnimateOnScroll';

const HeroExample = () => {
    return (
        <section className="hero-section" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a0e22 0%, #2d1b3d 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        
                        {/* Main Hero Title - Premium entrance */}
                        <AnimateOnScroll animation="hero-title">
                            <h1 style={{
                                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                                fontWeight: 'bold',
                                color: '#ffc010',
                                textTransform: 'uppercase',
                                marginBottom: '20px',
                                textShadow: '0 0 20px rgba(255, 192, 16, 0.5)'
                            }}>
                                TECH FEST 2026
                            </h1>
                        </AnimateOnScroll>

                        {/* Subtitle - Delayed entrance */}
                        <AnimateOnScroll animation="hero-subtitle">
                            <p style={{
                                fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                                color: '#00ffea',
                                marginBottom: '40px',
                                fontWeight: '300'
                            }}>
                                The Ultimate Gaming & Tech Experience
                            </p>
                        </AnimateOnScroll>

                        {/* CTA Button - Final element with more delay */}
                        <AnimateOnScroll animation="hero-cta">
                            <button style={{
                                padding: '15px 40px',
                                fontSize: '1.2rem',
                                background: '#ffc010',
                                color: '#1a0e22',
                                border: '3px solid #ffc010',
                                borderRadius: '0',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                transition: 'all 0.3s ease',
                                boxShadow: '5px 5px 0 rgba(0, 0, 0, 0.3)'
                            }}>
                                Register Now
                            </button>
                        </AnimateOnScroll>

                    </div>
                </div>

                {/* Feature Pills - Staggered reveal */}
                <div className="row mt-5">
                    <div className="col-lg-12">
                        <div className="d-flex justify-content-center flex-wrap gap-3">
                            
                            <AnimateOnScroll animation="fade-scale" delay={200}>
                                <div style={{
                                    padding: '10px 20px',
                                    background: 'rgba(255, 192, 16, 0.1)',
                                    border: '2px solid #ffc010',
                                    color: '#ffc010'
                                }}>
                                    15+ Events
                                </div>
                            </AnimateOnScroll>

                            <AnimateOnScroll animation="fade-scale" delay={300}>
                                <div style={{
                                    padding: '10px 20px',
                                    background: 'rgba(0, 255, 234, 0.1)',
                                    border: '2px solid #00ffea',
                                    color: '#00ffea'
                                }}>
                                    $50K Prize Pool
                                </div>
                            </AnimateOnScroll>

                            <AnimateOnScroll animation="fade-scale" delay={400}>
                                <div style={{
                                    padding: '10px 20px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '2px solid #ffffff',
                                    color: '#ffffff'
                                }}>
                                    1000+ Participants
                                </div>
                            </AnimateOnScroll>

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HeroExample;
