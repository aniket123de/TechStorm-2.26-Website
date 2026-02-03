import React from 'react';
import EventDetail from '../EventDetail';
import creativeCanvas from '../../../../assets/img/PIXELATED EVENT MASCOTS/CREATIVE CANVAS.png';

const CreativeCanvasEvent = () => {
    const eventData = {
        name: 'Creative Canvas',
        logo: creativeCanvas,
        category: 'Creative',
        description: 'Creative Canvas is a digital art and design competition where imagination knows no bounds. Create stunning visual content using graphic design tools, photo manipulation, or digital illustration. From poster design to logo creation, UI/UX mockups to digital art, showcase your creative genius and design thinking. Theme will be revealed on the event day!',
        teamSize: '1-2 Members',
        duration: '3 Hours',
        venue: 'Design Studio',
        rules: [
            'Individual or teams of 2 allowed',
            'Any digital design software can be used',
            'Theme will be announced at the start',
            'Work must be original and created during event',
            'Stock images usage limited to 20%',
            'Final submission in PNG/JPG format',
            'Resolution minimum: 1920x1080',
            'Bring your own laptop and software'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹12,000' },
            { position: '2nd Prize', amount: '₹8,000' },
            { position: '3rd Prize', amount: '₹5,000' }
        ],
        contact: [
            {
                name: 'Design Head',
                phone: '+91 98765 43228',
                email: 'creative@techstorm.com'
            },
            {
                name: 'Art Director',
                phone: '+91 98765 43229',
                email: 'canvas@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default CreativeCanvasEvent;
