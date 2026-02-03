import React from 'react';
import EventDetail from '../EventDetail';
import roTerrance from '../../../../assets/img/PIXELATED EVENT MASCOTS/RO-TERRANCE.png';

const RoTerranceEvent = () => {
    const eventData = {
        name: 'Ro-Terrance',
        logo: roTerrance,
        category: 'Robotics',
        description: 'Ro-Terrance is an all-terrain robot challenge that tests your bot\'s ability to traverse various obstacles and challenging terrains. From steep inclines to narrow bridges, sand pits to rocky paths, your robot must conquer it all. Design a versatile, robust robot with exceptional mobility to emerge victorious in this grueling test of mechanical engineering.',
        teamSize: '2-4 Members',
        duration: '3 Hours',
        venue: 'Outdoor Arena',
        rules: [
            'Robot dimensions: Max 40cm x 40cm x 40cm',
            'Manual or autonomous control allowed',
            'Must complete all terrain sections',
            'Time and penalty-based scoring',
            'Two attempts allowed',
            'Must carry minimum 1kg payload',
            'No flying mechanisms',
            'Battery voltage: Max 24V'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹18,000' },
            { position: '2nd Prize', amount: '₹12,000' },
            { position: '3rd Prize', amount: '₹7,000' }
        ],
        contact: [
            {
                name: 'Terrain Master',
                phone: '+91 98765 43226',
                email: 'roterrance@techstorm.com'
            },
            {
                name: 'Field Coordinator',
                phone: '+91 98765 43227',
                email: 'terrain@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default RoTerranceEvent;
