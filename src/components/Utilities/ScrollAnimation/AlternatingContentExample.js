/**
 * Alternating Content Section with Scroll Animations
 * 
 * Perfect for About sections, Features, or Timeline layouts
 * Shows content sliding in from alternating sides
 */

import React from 'react';
import AnimateOnScroll from '../ScrollAnimation/AnimateOnScroll';

const AlternatingContentExample = () => {
    const features = [
        {
            title: 'Coding Competitions',
            description: 'Challenge yourself with algorithmic problems, hackathons, and competitive programming events.',
            icon: '💻',
            color: '#ffc010'
        },
        {
            title: 'Robotics Battles',
            description: 'Build, program, and compete with autonomous robots in various challenging arenas.',
            icon: '🤖',
            color: '#00ffea'
        },
        {
            title: 'Gaming Tournaments',
            description: 'Compete in popular esports titles with players from across the region for massive prizes.',
            icon: '🎮',
            color: '#ff6b9d'
        },
        {
            title: 'Creative Showcases',
            description: 'Display your artistic talents through design, photography, and multimedia competitions.',
            icon: '🎨',
            color: '#a78bfa'
        }
    ];

    return (
        <section style={{
            padding: '80px 0',
            background: '#1a0e22'
        }}>
            <div className="container">
                
                {/* Section Header */}
                <AnimateOnScroll animation="section-title-wrapper">
                    <div className="text-center mb-5">
                        <h2 style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            color: '#ffc010',
                            marginBottom: '10px'
                        }}>
                            What We Offer
                        </h2>
                        <p style={{
                            fontSize: '1.2rem',
                            color: '#ffffff',
                            opacity: 0.8
                        }}>
                            Dive into the world of technology and gaming
                        </p>
                    </div>
                </AnimateOnScroll>

                {/* Alternating Feature Blocks */}
                {features.map((feature, index) => {
                    const isEven = index % 2 === 0;
                    const animation = isEven ? 'slide-in-left' : 'slide-in-right';
                    
                    return (
                        <AnimateOnScroll 
                            key={index}
                            animation={animation}
                            delay={0}
                        >
                            <div className="row align-items-center mb-5 pb-4">
                                
                                {/* Icon/Image Side */}
                                <div className={`col-lg-5 ${isEven ? 'order-1' : 'order-2'}`}>
                                    <div style={{
                                        fontSize: '120px',
                                        textAlign: 'center',
                                        background: `linear-gradient(135deg, ${feature.color}22 0%, ${feature.color}11 100%)`,
                                        borderRadius: '20px',
                                        padding: '40px',
                                        border: `3px solid ${feature.color}`,
                                        boxShadow: `0 0 30px ${feature.color}33`
                                    }}>
                                        {feature.icon}
                                    </div>
                                </div>

                                {/* Text Content Side */}
                                <div className={`col-lg-6 offset-lg-1 ${isEven ? 'order-2' : 'order-1'}`}>
                                    <h3 style={{
                                        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                                        color: feature.color,
                                        marginBottom: '20px',
                                        fontWeight: 'bold'
                                    }}>
                                        {feature.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '1.1rem',
                                        color: '#ffffff',
                                        lineHeight: '1.8',
                                        opacity: 0.9
                                    }}>
                                        {feature.description}
                                    </p>
                                    <button style={{
                                        marginTop: '20px',
                                        padding: '12px 30px',
                                        background: 'transparent',
                                        color: feature.color,
                                        border: `2px solid ${feature.color}`,
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        Learn More →
                                    </button>
                                </div>

                            </div>
                        </AnimateOnScroll>
                    );
                })}

            </div>
        </section>
    );
};

export default AlternatingContentExample;
