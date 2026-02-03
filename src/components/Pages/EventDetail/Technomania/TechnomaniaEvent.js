import React from 'react';
import EventDetail from '../EventDetail';
import technomania from '../../../../assets/img/PIXELATED EVENT MASCOTS/TECHNOMANIA.png';

const TechnomaniaEvent = () => {
    const eventData = {
        name: 'TechnoMania',
        logo: technomania,
        category: 'Coding',
        description: 'TechnoMania is a technical extravaganza featuring multiple rounds of technical challenges. From debugging to system design, from API development to database optimization - this event tests your complete development stack knowledge. It\'s not just about coding; it\'s about understanding the entire software development lifecycle and making smart technical decisions under pressure.',
        teamSize: '1-3 Members',
        duration: '4 Hours',
        venue: 'Tech Arena',
        rules: [
            'Teams can have 1-3 participants',
            'Event consists of multiple rounds',
            'Time limits apply for each round',
            'Collaboration within team is allowed',
            'External help or communication is prohibited',
            'Participants must bring valid ID proof',
            'Partial marks will be awarded for incomplete solutions'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹25,000' },
            { position: '2nd Prize', amount: '₹15,000' },
            { position: '3rd Prize', amount: '₹10,000' }
        ],
        contact: [
            {
                name: 'Event Manager',
                phone: '+91 98765 43214',
                email: 'technomania@techstorm.com'
            },
            {
                name: 'Assistant Manager',
                phone: '+91 98765 43215',
                email: 'events@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default TechnomaniaEvent;
