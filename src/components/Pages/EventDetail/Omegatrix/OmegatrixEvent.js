import React from 'react';
import EventDetail from '../EventDetail';
import omegatrix from '../../../../assets/img/PIXELATED EVENT MASCOTS/OMEGATRIX.png';

const OmegatrixEvent = () => {
    const eventData = {
        name: 'Omegatrix',
        logo: omegatrix,
        category: 'Brain Teaser',
        description: 'Omegatrix challenges your logical reasoning and analytical thinking. This brain teaser event features puzzles, riddles, and mind-bending challenges that will push your cognitive abilities to the limit. From mathematical puzzles to lateral thinking problems, each round gets progressively harder. Only the sharpest minds will prevail!',
        teamSize: '1-2 Members',
        duration: '2 Hours',
        venue: 'Quiz Hall',
        rules: [
            'Individual or teams of 2 allowed',
            'No electronic devices except provided materials',
            'Calculators may be provided for specific rounds',
            'Time limits strictly enforced',
            'Answers must be submitted in specified format',
            'Negative marking may apply in some rounds',
            'No communication between teams'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹12,000' },
            { position: '2nd Prize', amount: '₹8,000' },
            { position: '3rd Prize', amount: '₹5,000' }
        ],
        contact: [
            {
                name: 'Quiz Master',
                phone: '+91 98765 43216',
                email: 'omegatrix@techstorm.com'
            },
            {
                name: 'Coordinator',
                phone: '+91 98765 43217',
                email: 'quiz@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default OmegatrixEvent;
