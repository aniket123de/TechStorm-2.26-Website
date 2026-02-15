import React from 'react';
import EventDetail from '../EventDetail';
import forzaHorizon from '../../../../assets/img/PIXELATED EVENT MASCOTS/FORZA HORIZON.png';
import forzaHorizonBanner from '../../../../assets/img/event_specific_pictures/games/forza_horizon.png';

const ForzaHorizonEvent = () => {
    const eventData = {
        name: 'Forza Horizon',
        logo: forzaHorizon,
        category: 'Gaming',
        breadcrumbBg: forzaHorizonBanner,
        description: 'Forza Horizon brings high-octane racing action to TechStorm! Compete in the ultimate racing simulation where speed, skill, and strategy collide. Master different tracks, perfect your racing lines, and leave your opponents in the dust. Whether you\'re a casual racer or a sim-racing pro, this tournament will test your driving abilities to the limit.',
        teamSize: '1 Member',
        duration: '4 Hours',
        venue: 'Gaming Zone A',
        rules: [
            'Individual competition only',
            'Tournament format: Qualifying + Finals',
            'Standardized vehicle selection for fair play',
            'Manual transmission only in finals',
            'Three laps per race',
            'Crashing or ramming results in penalties',
            'Controller or wheel setup provided',
            'Top 8 from qualifying advance to finals'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹10,000' },
            { position: '2nd Prize', amount: '₹6,000' },
            { position: '3rd Prize', amount: '₹4,000' }
        ],
        contact: [
            {
                name: 'Gaming Head',
                phone: '+91 98765 43232',
                email: 'forza@techstorm.com'
            },
            {
                name: 'Tournament Admin',
                phone: '+91 98765 43233',
                email: 'racing@techstorm.com'
            }
        ],
        registerButton: {
            text: 'Register Now',
            link: 'https://forms.gle/your-registration-form-link'
        }
    };

    return <EventDetail eventData={eventData} />;
};

export default ForzaHorizonEvent;
