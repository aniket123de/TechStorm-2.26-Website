import React from 'react';
import EventDetail from '../EventDetail';
import roNavigator from '../../../../assets/img/PIXELATED EVENT MASCOTS/RO-NAVIGATOR.png';

const RoNavigatorEvent = () => {
    const eventData = {
        name: 'Ro-Navigator',
        logo: roNavigator,
        category: 'Robotics',
        description: 'Ro-Navigator is an autonomous robot navigation challenge where your bot must navigate through a complex maze filled with obstacles. Using sensors and intelligent programming, guide your robot from start to finish in the shortest time possible. This event tests your skills in robotics, sensor integration, and algorithm implementation.',
        teamSize: '2-4 Members',
        duration: '2.5 Hours',
        venue: 'Robotics Arena',
        rules: [
            'Robot dimensions: Max 30cm x 30cm x 30cm',
            'Must be autonomous (no manual control during run)',
            'Any microcontroller/processor allowed',
            'Multiple sensors can be used',
            'Three attempts per team',
            'Best time will be considered',
            'Touching obstacles results in time penalty',
            'Wireless communication is prohibited'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹20,000' },
            { position: '2nd Prize', amount: '₹12,000' },
            { position: '3rd Prize', amount: '₹8,000' }
        ],
        contact: [
            {
                name: 'Robotics Head',
                phone: '+91 98765 43220',
                email: 'ronavigator@techstorm.com'
            },
            {
                name: 'Technical Support',
                phone: '+91 98765 43221',
                email: 'robotics@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default RoNavigatorEvent;
