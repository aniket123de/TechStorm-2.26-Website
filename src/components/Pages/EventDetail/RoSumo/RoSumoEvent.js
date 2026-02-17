import React from 'react';
import EventDetail from '../EventDetail';
import roSumo from '../../../../assets/img/PIXELATED EVENT MASCOTS/rosumo.png';
import roSumoBanner from '../../../../assets/img/event_specific_pictures/robotics/ro_sumo.png';
import { getCloudinaryUrl } from '../../../../config/cloudinary';

const RoSumoEvent = () => {
    const eventData = {
        previousYearImages: [
            getCloudinaryUrl('pictures_of_gallery/Ro Sumo', 'sumo1.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Ro Sumo', 'sumo2.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Ro Sumo', 'sumo3.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
        ],
        name: 'Ro-Sumo',
        logo: roSumo,
        category: 'Robotics',
        breadcrumbBg: roSumoBanner,
        description: 'Ro-Sumo is a thrilling robotics event where participants design and build autonomous or remote-controlled robots to compete in a sumo-style battle. The objective is to push the opponent’s robot out of the ring while staying within the boundaries. This event tests your engineering, strategy, and control skills in a fast-paced, competitive environment.',
        teamSize: '2-4 Members',
        duration: '2 Hours',
        venue: 'Robotics Arena',
        registerButton: {
            text: 'Register Now',
            link: 'https://forms.gle/your-registration-form-link'
        },
        rules: [
            'Robots must fit within a 20cm x 20cm footprint at the start of the match.',
            'Maximum weight: 3kg.',
            'Robots can be autonomous or remote-controlled.',
            'No weapons or devices intended to damage the opponent’s robot.',
            'No liquids, projectiles, or entangling devices allowed.',
            'The match starts on the referee’s signal.',
            'The first robot to push the other out of the ring wins the round.',
            'Best of 3 rounds determines the winner.',
            'If both robots leave the ring simultaneously, the round is replayed.',
            'Judges’ decisions are final.',
            'Teams must adhere to all safety instructions.'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹10,000' },
            { position: '2nd Prize', amount: '₹6,000' },
            { position: '3rd Prize', amount: '₹4,000' }
        ],
        contact: [
            {
                name: 'Sumo Coordinator',
                phone: '+91 98765 43240',
                email: 'rosumo@techstorm.com'
            },
            {
                name: 'Arena Manager',
                phone: '+91 98765 43241',
                email: 'arena@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default RoSumoEvent;
