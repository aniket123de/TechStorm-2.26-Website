import React from 'react';
import EventDetail from '../EventDetail';
import roCombat from '../../../../assets/img/PIXELATED EVENT MASCOTS/RO-COMBAT.png';

const RoCombatEvent = () => {
    const eventData = {
        name: 'Ro-Combat',
        logo: roCombat,
        category: 'Robotics',
        description: 'Ro-Combat is the ultimate robot battle arena! Build a robust combat robot and face off against opponents in intense one-on-one battles. Use strategy, engineering excellence, and clever design to disable your opponent\'s robot while protecting yours. Weapons, flippers, and innovative mechanisms are encouraged. May the best bot win!',
        teamSize: '2-5 Members',
        duration: '4 Hours (Tournament Format)',
        venue: 'Combat Arena',
        rules: [
            'Robot weight: Maximum 20kg',
            'Dimensions: Fit within 60cm cube at start',
            'Wireless control mandatory',
            'No explosive or liquid projectiles',
            'Sharp weapons must have safety covers during inspection',
            'Three minutes per match',
            'Double elimination tournament format',
            'Damage to arena walls results in penalty'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹30,000' },
            { position: '2nd Prize', amount: '₹18,000' },
            { position: '3rd Prize', amount: '₹10,000' }
        ],
        contact: [
            {
                name: 'Combat Organizer',
                phone: '+91 98765 43222',
                email: 'rocombat@techstorm.com'
            },
            {
                name: 'Safety Officer',
                phone: '+91 98765 43223',
                email: 'safety@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default RoCombatEvent;
