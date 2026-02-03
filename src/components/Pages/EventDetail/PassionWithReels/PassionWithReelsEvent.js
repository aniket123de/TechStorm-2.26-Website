import React from 'react';
import EventDetail from '../EventDetail';
import passionWithReels from '../../../../assets/img/PIXELATED EVENT MASCOTS/PASSION WITH REELS.png';

const PassionWithReelsEvent = () => {
    const eventData = {
        name: 'Passion with Reels',
        logo: passionWithReels,
        category: 'Creative',
        description: 'Passion with Reels is a short video creation competition perfect for the social media generation. Create engaging, creative short-form content that tells a story, spreads a message, or simply entertains. Whether it\'s comedy, drama, tech tips, or creative editing showcases - bring your passion and storytelling skills to create viral-worthy content!',
        teamSize: '1-4 Members',
        duration: '5 Hours',
        venue: 'Media Lab & Campus',
        rules: [
            'Video duration: 30-90 seconds',
            'Vertical format (9:16) required',
            'Content must be appropriate for all ages',
            'Basic editing is mandatory',
            'Can shoot anywhere on campus',
            'Use of personal props allowed',
            'Subtitle/caption usage encouraged',
            'Submit in MP4 format, 1080x1920 resolution'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹15,000' },
            { position: '2nd Prize', amount: '₹10,000' },
            { position: '3rd Prize', amount: '₹6,000' }
        ],
        contact: [
            {
                name: 'Content Head',
                phone: '+91 98765 43230',
                email: 'reels@techstorm.com'
            },
            {
                name: 'Video Coordinator',
                phone: '+91 98765 43231',
                email: 'passion@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default PassionWithReelsEvent;
