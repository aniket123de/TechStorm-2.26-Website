import React from 'react';
import EventDetail from '../EventDetail';
import codeBee from '../../../../assets/img/PIXELATED EVENT MASCOTS/CODE BEE.png';
import codeBeeGif from '../../../../assets/img/event_specific_pictures/codebee/codebeefibg.gif';

const CodeBeeEvent = () => {
    const eventData = {
        name: 'Code-Bee',
        logo: codeBee,
        category: 'Coding',
        breadcrumbBg: codeBeeGif,
        description: 'Code-Bee is an engaging offline coding event that tests your logical thinking, mathematical skills, and programming fundamentals. Dive into challenging problems, crack smart algorithms, and showcase your problem-solving abilities. Unravel coding secrets and emerge with the best algorithm!',
        teamSize: '1-2 Members',
        duration: '3 Hours',
        venue: 'Computer Lab A',
        entryFee: '₹100 per team',
        qrCode: '', // Add QR code image path here
        paymentLink: '', // Add online payment link here
        rules: [
            'Teams can have maximum 2 participants',
            'Programming languages allowed: C, C++, Java, Python',
            'Use of internet for documentation is allowed',
            'Plagiarism will lead to immediate disqualification',
            'All solutions must compile and run within time limits',
            'Participants must bring their own laptops',
            'Decision of judges will be final'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹15,000' },
            { position: '2nd Prize', amount: '₹10,000' },
            { position: '3rd Prize', amount: '₹5,000' }
        ],
        previousYearImages: [
            // Add your previous year event images here
            // Example: '/path/to/image1.jpg', '/path/to/image2.jpg', etc.
        ],
        coordinators: [
            {
                name: 'Rahul Sharma',
                role: 'Event Head',
                phone: '+91 98765 43210',
                email: 'rahul@techstorm.com',
                image: '' // Add coordinator image path here
            },
            {
                name: 'Priya Patel',
                role: 'Technical Coordinator',
                phone: '+91 98765 43211',
                email: 'priya@techstorm.com',
                image: ''
            },
            {
                name: 'Amit Kumar',
                role: 'Volunteer',
                phone: '+91 98765 43212',
                email: 'amit@techstorm.com',
                image: ''
            }
        ],
        contact: [
            {
                name: 'Coordinator 1',
                phone: '+91 98765 43210',
                email: 'codebee@techstorm.com'
            },
            {
                name: 'Coordinator 2',
                phone: '+91 98765 43211',
                email: 'tech@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default CodeBeeEvent;
