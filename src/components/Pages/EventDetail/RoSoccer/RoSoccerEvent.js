import React from 'react';
import EventDetail from '../EventDetail';
import roSoccer from '../../../../assets/img/PIXELATED EVENT MASCOTS/RO-SOCCER.png';
import roSoccerBanner from '../../../../assets/img/event_specific_pictures/robotics/ro_soccer.png';
import { getCloudinaryUrl } from '../../../../config/cloudinary';

const RoSoccerEvent = () => {
    const eventData = {
        previousYearImages: [
            getCloudinaryUrl('pictures_of_gallery/Ro Soccer_', 'DSC02699.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Ro Soccer_', 'DSC02701.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Ro Soccer_', 'DSC02703.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Ro Soccer_', 'DSC02711.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Ro Soccer_', 'DSC02714.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Ro Soccer_', 'DSC02715.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Ro Soccer_', 'DSC02717.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Ro Soccer_', 'DSC02718.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
        ],
        name: 'Ro-Soccer',
        logo: roSoccer,
        category: 'Robotics',
        breadcrumbBg: roSoccerBanner,
        description: 'Ro-Soccer brings the beautiful game to the robotics world! Control your custom-built robot to score goals against opponent teams. This event requires precise mechanical design, responsive controls, and strategic gameplay. Form your robotic team and compete in this thrilling tournament where engineering meets sports.',
        teamSize: '3-5 Members',
        duration: '4 Hours (League Format)',
        venue: 'Robo Sports Arena',
        registerButton: {
            text: 'Register Now',
            link: 'https://forms.gle/your-registration-form-link'
        },
        rules: [
            '⚽ RO-SOCCER EVENT RULES',
            '',
            'FACULTY CO-ORDINATOR NAME:',
            'Dr. Arghya Kamal Pal',
            'Mr. Ranjit Kr. Pal',
            '',
            'STUDENT CO-ORDINATOR NAME:',
            'Soumadeep Layek (Core)',
            'Samima Nasrin (CSE3)',
            '',
            'VOLUNTEER NAME:',
            'Sakchham Kapoor (ECE2)',
            'Aadipto Ghosh (ECE2)',
            'Yash Ghosh (ECE1)',
            '',
            'TEAM STRENGTH:',
            'Minimum Members: 2',
            'Maximum Members: 4',
            '',
            'BOT SPECIFICATIONS:',
            'Maximum Dimensions: 30 cm x 30 cm (including wheels). No tolerance allowed.',
            'Maximum Weight: 3.0 kg (+10% tolerance allowed, i.e., up to 3.3 kg).',
            'Maximum Supply Voltage: 18V (Fixed). Adjustable/variable voltage supply during matches is strictly prohibited in all rounds (Prelims, Knockout & Finale).',
            'The robot must be remotely controlled (wired or wireless).',
            'If wired control is used, the wire must remain slack at all times and must not interfere with gameplay.',
            'Readymade toy cars, LEGO kits, IC engines, and hydraulic systems are not allowed.',
            'The ball must not be trapped or completely enclosed inside the robot body.',
            '',
            'GENERAL RULES (COMMON FOR PRELIMS & FINALS):',
            'Participants are not allowed to enter the arena.',
            'For any team without a bot, a wired bot will be provided along with the controller and rectifier.',
            'Each team can have a minimum of 2 members and maximum of 4 members.',
            'No same member can take part in two different teams. One bot cannot be shared by 2 different teams and one driver cannot drive 2 different bots, except the one provided by the event coordinators.',
            'The members of the team can be from different colleges or universities. Students from different institutions can form a team provided that each member of the team contains the identity card of his/her respective institute.',
            'All the team members are required to bring their ID card (college id) with them.',
            'The coordinators can change some of the rules in case of special cases, if required.',
            'Participants must not misbehave or abuse any other participants or coordinators. This can be taken seriously and lead to suspension/disqualification from all the events.',
            'No trial run will be allowed.',
            'The repair timeout will be for 2 minutes only.',
            'Any destruction in the arena may lead to disqualification.',
            'The coordinator\'s decision will be final and unquestionable.',
            'Human interference (touching the robot) during the game is not allowed.',
            'Variable voltage is not allowed in knockout Round & Final Round. (Max 18v).',
            'Only the time measured by organizers will be final and considered for scoring. Time measured by the participants by any means will not be accepted in any case.',
            'Coordinators have all the right to take final decisions on any matter during the event.',
            'The entire process will be recorded to get the deadlock situation and to clear other ambiguities.',
            'In case of disqualification, no refund will be provided.',
            '',
            'PRELIMS RULES:',
            'Prelims & The knockout will be 4 minutes long.',
            'Scoring Formula:',
            '    Total Score = (Number of Goals × 15) – Penalty Points',
            'Brick Penalty Rule:',
            '    If a robot touches a brick marked -5 or -10, corresponding penalty seconds will be added to the total score.',
            'Ranking Criteria:',
            '    Teams will be ranked based on highest Total Score.',
            '',
            'KNOCKOUT & FINALS RULES:',
            'The duration of the Knock out matches will be 4 minutes & final match will be 6 minutes.',
            'This will be 1 Vs 1, with the ball in the middle.',
            'The total goals of the match will be checked.',
            'The team having the highest goals will be declared as the winner of that match.',
            'For tie breaking, the golden goal wins.',
            'Unnecessary attack on the opponent bot is not allowed and may lead to disqualification. (2 warnings to be given)',
            'Turning/pulling the wire will be considered a foul. Maximum of 2 warnings before disqualification.',
            'In case of deadlock between bots for 10 seconds, the position will be reset and back to original and ball will be placed on the center.',
            'The ball can\'t be trapped in the main body, if trapped positions will be reset.'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹25,000' },
            { position: '2nd Prize', amount: '₹15,000' },
            { position: '3rd Prize', amount: '₹10,000' }
        ],
        contact: [
            {
                name: 'Soccer Referee',
                phone: '+91 98765 43224',
                email: 'rosoccer@techstorm.com'
            },
            {
                name: 'Arena Manager',
                phone: '+91 98765 43225',
                email: 'arena@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default RoSoccerEvent;
