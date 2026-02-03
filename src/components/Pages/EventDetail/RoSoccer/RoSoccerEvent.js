import React from 'react';
import EventDetail from '../EventDetail';
import roSoccer from '../../../../assets/img/PIXELATED EVENT MASCOTS/RO-SOCCER.png';

const RoSoccerEvent = () => {
    const eventData = {
        name: 'Ro-Soccer',
        logo: roSoccer,
        category: 'Robotics',
        description: 'Ro-Soccer brings the beautiful game to the robotics world! Control your custom-built robot to score goals against opponent teams. This event requires precise mechanical design, responsive controls, and strategic gameplay. Form your robotic team and compete in this thrilling tournament where engineering meets sports.',
        teamSize: '3-5 Members',
        duration: '4 Hours (League Format)',
        venue: 'Robo Sports Arena',
        rules: [
            'Each team operates 2 robots simultaneously',
            'Robot dimensions: Max 25cm x 25cm x 25cm each',
            'Manual wireless control required',
            'Match duration: 10 minutes',
            'Standard football rules adapted for robots',
            'Damaging opponent robot is prohibited',
            'Power supply: Must be onboard battery',
            'League followed by knockout rounds'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹25,000' },
            { position: '2nd Prize', amount: '₹15,000' },
            { position: '3rd Prize', amount: '₹10,000' }
        ],
        contact: [
            {
                name: 'Soccer Referee',
                phone: '+91 98765 43224',
                email: 'rosoccer@techstorm.com'
            },
            {
                name: 'Arena Manager',
                phone: '+91 98765 43225',
                email: 'arena@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default RoSoccerEvent;
