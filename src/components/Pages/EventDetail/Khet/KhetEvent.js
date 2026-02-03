import React from 'react';
import EventDetail from '../EventDetail';
import khet from '../../../../assets/img/PIXELATED EVENT MASCOTS/KHET.png';

const KhetEvent = () => {
    const eventData = {
        name: 'KHET',
        logo: khet,
        category: 'Gaming',
        description: 'KHET (originally called Deflexion) is a laser game of strategy that combines elements of chess with lasers! Two players alternate moving Egyptian-themed pieces that have mirrors on their faces, using them to redirect laser beams. The objective is to illuminate your opponent\'s Pharaoh piece while protecting your own. A perfect blend of strategy, geometry, and tactical thinking!',
        teamSize: '1-2 Members',
        duration: '2 Hours',
        venue: 'Board Game Arena',
        rules: [
            'Individual or teams of 2 allowed',
            'Standard KHET 2.0 rules apply',
            'Players alternate turns',
            'Laser fired at end of each turn',
            'Matches are best of 3 games',
            'Time limit: 20 minutes per game',
            'Draw after time limit goes to sudden death',
            'Tournament format: Swiss system followed by top 4 knockout'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹7,000' },
            { position: '2nd Prize', amount: '₹4,500' },
            { position: '3rd Prize', amount: '₹2,500' }
        ],
        contact: [
            {
                name: 'Board Game Master',
                phone: '+91 98765 43236',
                email: 'khet@techstorm.com'
            },
            {
                name: 'Strategy Coordinator',
                phone: '+91 98765 43237',
                email: 'boardgames@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default KhetEvent;
