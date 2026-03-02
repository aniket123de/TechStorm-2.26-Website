import React from 'react';
import RegistrationForm from './RegistrationForm';

const hackStormBanner = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/event_specific_pictures/hackstorm/hstorm";

const HackStormRegistration = () => {
    const eventConfig = {
        eventName: 'HackStorm',
        breadcrumbBg: hackStormBanner,
        entryFee: '₹200 per team',
        minTeamSize: 2,
        maxTeamSize: 4,
        teamSizeOptions: [
            { value: '2', label: 'Duo (2 Members)' },
            { value: '3', label: 'Trio (3 Members)' },
            { value: '4', label: 'Squad (4 Members)' }
        ],
        customFields: [
            {
                label: 'Project Idea/Theme',
                type: 'textarea',
                required: true,
                placeholder: 'Briefly describe your hackathon project idea or preferred theme'
            },
            {
                label: 'Technical Stack Expertise',
                type: 'text',
                required: true,
                placeholder: 'e.g., MERN, Django, Flutter, etc.'
            },
            {
                label: 'GitHub Profile URL',
                type: 'text',
                required: false,
                placeholder: 'https://github.com/username'
            },
            {
                label: 'Previous Hackathon Experience',
                type: 'select',
                required: true,
                options: ['First Time', '1-2 Hackathons', '3-5 Hackathons', '5+ Hackathons']
            }
        ]
    };

    return <RegistrationForm eventConfig={eventConfig} />;
};

export default HackStormRegistration;
