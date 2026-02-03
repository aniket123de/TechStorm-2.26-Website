import React from 'react';
import EventDetail from '../EventDetail';
import fifaMobile from '../../../../assets/img/PIXELATED EVENT MASCOTS/FIFA Mobile.png';

const FifaMobileEvent = () => {
    const eventData = {
        name: 'FIFA Mobile',
        logo: fifaMobile,
        category: 'Gaming',
        description: 'FIFA Mobile brings the world\'s most popular sport to your fingertips! Compete in intense mobile football matches, build your ultimate team, and showcase your gaming skills. From tactical gameplay to lightning-fast reflexes, prove that you\'re the best FIFA Mobile player in the tournament. Glory awaits the champion!',
        teamSize: '1 Member',
        duration: '3 Hours',
        venue: 'Gaming Zone B',
        rules: [
            'Individual tournament format',
            'Bring your own device (smartphone/tablet)',
            'Same team overall rating for all participants',
            'Latest game version required',
            'Stable internet connection mandatory',
            'Match duration: 6 minutes',
            'Single elimination brackets',
            'No third-party tools or mods allowed'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹8,000' },
            { position: '2nd Prize', amount: '₹5,000' },
            { position: '3rd Prize', amount: '₹3,000' }
        ],
        contact: [
            {
                name: 'Mobile Gaming Head',
                phone: '+91 98765 43234',
                email: 'fifa@techstorm.com'
            },
            {
                name: 'Match Coordinator',
                phone: '+91 98765 43235',
                email: 'mobile@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default FifaMobileEvent;
