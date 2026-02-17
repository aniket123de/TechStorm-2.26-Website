import React from 'react';
import EventDetail from '../EventDetail';
import omegatrix from '../../../../assets/img/PIXELATED EVENT MASCOTS/OMEGATRIX.png';
import omegatrixBanner from '../../../../assets/img/event_specific_pictures/omegatrix/OMEGATRIX_banner.png';
import { getCloudinaryUrl } from '../../../../config/cloudinary';

const OmegatrixEvent = () => {
    const eventData = {
        previousYearImages: [
            getCloudinaryUrl('pictures_of_gallery/Omega trix_', 'DSC02782.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Omega trix_', 'DSC02785.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Omega trix_', 'DSC02786.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Omega trix_', 'DSC02787.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Omega trix_', 'DSC02788.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Omega trix_', 'DSC02798.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
        ],
        name: 'Omegatrix',
        logo: omegatrix,
        category: 'Brain Teaser',
        breadcrumbBg: omegatrixBanner,
        description: 'Omegatrix 2.26 is the ultimate battle of wits! Test your logic, pattern recognition, and problem-solving skills in a two-stage showdown. Only the sharpest minds will survive the Prelims and make it to the Mains. Bring your ID, your pen, and your A-game!',
        teamSize: '1-2 Members',
        duration: '2 Hours',
        venue: 'Quiz Hall',
        registerButton: {
            text: 'Register Now',
            link: 'https://forms.gle/your-registration-form-link'
        },
        rules: [
            '🧩 OMEGATRIX 2.26 RULES',
            '',
            '⚡ GENERAL RULES',
            'The event is split into two offline stages: The Prelims (The Filter) and The Mains (The Showdown).',
            'Your Armor & Weapons: You must bring two things to enter: Your college ID or Library Card (Your entry pass) and a Pen (Your weapon of choice).',
            'Survival of the Fittest: Only the top scorers from the Prelims will unlock the gates to the Mains round.',
            'Beat the Clock: Arrive 15 minutes early. We start on time, and time waits for no genius.',
            'Brains > Bots: Put the phone away. Smart devices are strictly prohibited. Using Google, AI, or unfair means = Instant Disqualification. Trust your own neural network!',
            'Registration fees are non-refundable (Think of it as a commitment to your own brilliance).',
            'Proof of Registration: If you paid online, keep that screenshot safe! If you paid offline, bring your slip. No slip/screenshot = No entry.',
            '',
            '🎯 PRELIMS RULES',
            'The Vibe: A classic pen-and-paper battle against the clock.',
            'The Arsenal: Expect Logic & Reasoning, Pattern Recognition, Brain Teasers, and Brainstorming Puzzles.',
            'The Format: MCQ Pattern.',
            'The Best Part: No Negative Marking! If you don’t know it, make an educated guess. Fortune Favors the bold.',
            'Expected duration 30 minutes.',
            '',
            '🏁 MAINS RULES',
            'The Vibe: This is where the legends are made.',
            // The next line is split to allow bolding via inline HTML in the rules rendering logic
            'The Format: A two-part challenge consisting of a VISUAL ROUND and GENERAL APTITUDE.',
            'The Stage: Questions will be flashed on the Big Screen for everyone simultaneously.',
            'The Challenge: Progressive Difficulty. The questions get harder as you go in - testing your speed, your precision, and—most importantly—your cool under pressure.',
            'The expected duration is 1 hour.'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹12,000' },
            { position: '2nd Prize', amount: '₹8,000' },
            { position: '3rd Prize', amount: '₹5,000' }
        ],
        contact: [
            {
                name: 'Quiz Master',
                phone: '+91 98765 43216',
                email: 'omegatrix@techstorm.com'
            },
            {
                name: 'Coordinator',
                phone: '+91 98765 43217',
                email: 'quiz@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default OmegatrixEvent;
