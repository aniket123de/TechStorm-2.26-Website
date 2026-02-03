import React from 'react';
import EventDetail from '../EventDetail';
import hackStorm from '../../../../assets/img/PIXELATED EVENT MASCOTS/HACKSTORM.png';

const HackStormEvent = () => {
    const eventData = {
        name: 'Hack Storm',
        logo: hackStorm,
        category: 'Coding',
        description: 'Hack Storm is an intensive hackathon where innovation meets implementation. Teams will have 24 hours to develop a working prototype that solves real-world problems. Whether you\'re into web development, mobile apps, IoT, or AI/ML, this is your chance to build something amazing. Bring your ideas, form your dream team, and code your way to victory!',
        teamSize: '2-4 Members',
        duration: '24 Hours',
        venue: 'Main Auditorium',
        rules: [
            'Teams must have 2-4 members',
            'Project must be started from scratch during the event',
            'All code must be original work of the team',
            'Open source libraries and frameworks are allowed',
            'Teams must present their project to judges',
            'Internet access will be provided',
            'Food and beverages will be provided throughout',
            'Teams can use any programming language or framework'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹50,000' },
            { position: '2nd Prize', amount: '₹30,000' },
            { position: '3rd Prize', amount: '₹20,000' }
        ],
        contact: [
            {
                name: 'Hack Coordinator',
                phone: '+91 98765 43212',
                email: 'hackstorm@techstorm.com'
            },
            {
                name: 'Tech Support',
                phone: '+91 98765 43213',
                email: 'support@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default HackStormEvent;
