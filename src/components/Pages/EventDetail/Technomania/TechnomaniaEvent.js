import React from 'react';
import EventDetail from '../EventDetail';
import technomania from '../../../../assets/img/PIXELATED EVENT MASCOTS/TECHNOMANIA.png';
import technomaniaBanner from '../../../../assets/img/event_specific_pictures/technomania/technomania.png';
import { getCloudinaryUrl } from '../../../../config/cloudinary';

const TechnomaniaEvent = () => {
    const eventData = {
        previousYearImages: [
            getCloudinaryUrl('pictures_of_gallery/Technomania', 'DSC02745.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Technomania', 'DSC02752.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Technomania', 'DSC02753.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Technomania', 'DSC02762.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Technomania', 'DSC02764.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Technomania', 'DSC02765.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Technomania', 'DSC02768.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Technomania', 'DSC02770.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Technomania', 'DSC02778.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Technomania', 'DSC02779.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Technomania', 'DSC03075.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
        ],
        name: 'TechnoMania',
        logo: technomania,
        category: 'Coding',
        breadcrumbBg: technomaniaBanner,
        description: 'TechnoMania 2026 is a hands-on innovation challenge. Build and present a working model that uses AI for sustainable development. Compete, create, and showcase your solution in this single-round, offline event! Bring your best ideas and teamwork. Exciting prizes and recognition await the top innovators.',
        teamSize: 'Individual or up to 4 Members',
        duration: 'Single Round',
        venue: 'VIP Campus, B. P. Poddar Institute of Management and Technology',
        registerButton: {
            text: 'Register Now',
            link: 'https://forms.gle/your-registration-form-link'
        },
        rules: [
            '🌱 THEME: ROLE OF ARTIFICIAL INTELLIGENCE IN SUSTAINABLE DEVELOPMENT',
            '',
            '🏛️ VENUE: VIP CAMPUS, B. P. PODDAR INSTITUTE OF MANAGEMENT AND TECHNOLOGY',
            '',
            'Welcome to TECHNO MANIA 2026, the flagship technical innovation event of the VIP Campus, B. P. Poddar Institute of Management and Technology.',
            'This year, we invite aspiring innovators, developers, and problem-solvers to explore how Artificial Intelligence can drive Sustainable Development and shape a smarter, greener future. It is an offline, single-round technical competition that challenges participants to design and present innovative solutions integrating both hardware and software components.',
            'Participants are expected to develop a working model that demonstrates a real-world application aligned with the theme.',
            '',
            '📝 BASIC RULES',
            'The competition will be conducted offline at the VIP Campus, Kolkata.',
            'It is a single-round competition.',
            'Participation is open to: Teams (Maximum 4 members per team) or Individual',
            'Registration is mandatory for all participants.',
            'Registration Fees:',
            '₹100 – BPPIMT Students',
            '₹120 – Students from other institutions',
            'Registration fees are non-refundable under any circumstances.',
            'Only registered participants are allowed to present the project.',
            'Teams must adhere strictly to the theme: “Role of Artificial Intelligence in Sustainable Development.”',
            '',
            '🔧 PROJECT AND MODEL GUIDELINES',
            'The project must strictly align with the theme: Role of Artificial Intelligence in Sustainable Development.',
            'Broad topic domains will be shared by the organizing committee.',
            'The model must integrate both Hardware and Software components.',
            'The demonstrated project should be working properly in order to successfully qualify, unable to demonstrate the project by any means will lead to disqualification.',
            'Purely software-based or purely hardware-based projects will not be accepted.',
            'The solution must demonstrate a real-world, practical, and scalable application.',
            'Any pre-built/open-source tools used must be clearly mentioned in the presentation.',
            'Participants are responsible for bringing all required materials, components, and extensions. Any sort of requests for parts or assistance won’t be entertained.',
            '',
            '📊 PRESENTATION RULES',
            'Each team must prepare a PowerPoint Presentation.',
            'The presentation must include:',
            'Problem Statement',
            'Objectives',
            'System Architecture (Hardware + Software)',
            'Working Methodology',
            'Innovation Highlights',
            'Sustainability Impact',
            'Future Scope',
            'Only registered team members are allowed to present. Make sure all team members must be present at the time of demonstration.',
            'Time limits (presentation + Q&A) must be strictly followed.(-to be notified later)',
            'Projects will be judged based on Innovation & Creativity, Technical Implementation & Functionality, Sustainability Impact, Practical Feasibility, and Presentation & Communication Skills.',
            'Judges’ decisions will be final and binding.',
            '',
            '🧑‍⚖️ CODE OF CONDUCT',
            'Participants must maintain discipline and professional behaviour.',
            'Any misconduct, damage to property, or unfair means will result in disqualification.',
            'The organizing committee reserves the right to modify rules if necessary.',
            'The decision of the organizing committee and judges will be final.',
            'Any further information regarding guidelines to be notified through events website.',
            'STAY TUNED!'
        ],
        prizes: [
            { position: '1st Prize', amount: 'To be announced' },
            { position: '2nd Prize', amount: 'To be announced' },
            { position: '3rd Prize', amount: 'To be announced' }
        ],
        contact: [
            {
                name: 'Event Manager',
                phone: '+91 98765 43214',
                email: 'technomania@techstorm.com'
            },
            {
                name: 'Assistant Manager',
                phone: '+91 98765 43215',
                email: 'events@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default TechnomaniaEvent;
