import React from 'react';
import EventDetail from '../EventDetail';
import techHunt from '../../../../assets/img/PIXELATED EVENT MASCOTS/TECH HUNT.png';

const TechHuntEvent = () => {
    const eventData = {
        name: 'Tech Hunt',
        logo: techHunt,
        category: 'Brain Teaser',
        description: 'Tech Hunt is an exciting treasure hunt meets tech quiz event. Navigate through campus following cryptic clues, solve technical riddles, and crack codes to reach the final destination. This event combines physical activity with mental challenges, testing both your technical knowledge and problem-solving abilities in a fun, engaging format.',
        teamSize: '3-4 Members',
        duration: '3 Hours',
        venue: 'Campus-wide',
        rules: [
            'Teams must have 3-4 members',
            'All team members must stay together',
            'Use of mobile phones only for official app',
            'Damaging property will lead to disqualification',
            'Time penalties for wrong submissions',
            'Follow campus rules and regulations',
            'First team to complete all checkpoints wins',
            'Respect other teams and participants'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹15,000' },
            { position: '2nd Prize', amount: '₹10,000' },
            { position: '3rd Prize', amount: '₹6,000' }
        ],
        contact: [
            {
                name: 'Hunt Master',
                phone: '+91 98765 43218',
                email: 'techhunt@techstorm.com'
            },
            {
                name: 'Support Team',
                phone: '+91 98765 43219',
                email: 'hunt@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default TechHuntEvent;
