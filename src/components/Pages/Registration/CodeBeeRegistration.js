import React from 'react';
import RegistrationForm from './RegistrationForm';

const codeBeeGif = "https://res.cloudinary.com/ds3vepmkd/image/upload/v1772034191/eoorox/event_specific_pictures/codebee/codebeefibg.gif";

const CodeBeeRegistration = () => {
    const eventConfig = {
        eventName: 'Code-Bee',
        breadcrumbBg: codeBeeGif,
        entryFee: '₹80 per team',
        minTeamSize: 1,
        maxTeamSize: 2,
        teamSizeOptions: [
            { value: '1', label: 'Solo (1 Member)' },
            { value: '2', label: 'Duo (2 Members)' }
        ],
        customFields: [
            {
                label: 'Preferred Programming Language',
                type: 'select',
                required: true,
                placeholder: 'Select your preferred language',
                options: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'Other']
            },
            {
                label: 'Have you participated in coding competitions before?',
                type: 'select',
                required: true,
                options: ['Yes', 'No']
            },
            {
                label: 'Tell us about your coding experience',
                type: 'textarea',
                required: false,
                placeholder: 'Share your coding journey, projects, achievements...'
            }
        ]
    };

    return <RegistrationForm eventConfig={eventConfig} />;
};

export default CodeBeeRegistration;
