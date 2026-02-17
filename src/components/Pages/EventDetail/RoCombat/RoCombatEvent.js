import React from 'react';
import EventDetail from '../EventDetail';
import roCombat from '../../../../assets/img/PIXELATED EVENT MASCOTS/RO-COMBAT.png';
import roCombatBanner from '../../../../assets/img/event_specific_pictures/robotics/ro_combat.png';
import { getCloudinaryUrl } from '../../../../config/cloudinary';

const RoCombatEvent = () => {
    const eventData = {
        previousYearImages: [
            getCloudinaryUrl('pictures_of_gallery/Combat', 'DSC02738.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Combat', 'DSC02848.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Combat', 'DSC02849.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Combat', 'DSC02850.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Combat', 'DSC02877.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Combat', 'DSC02884.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Combat', 'DSC03101.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Combat', 'DSC03102.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Combat', 'DSC03107.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Combat', 'DSC03108.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Combat', 'DSC03114.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Combat', 'DSC03116.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Combat', 'DSC03117.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Combat', 'IMG_8129.JPG', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
        ],
        name: 'Ro-Combat',
        logo: roCombat,
        category: 'Robotics',
        breadcrumbBg: roCombatBanner,
        description: 'Ro-Combat is the ultimate robot battle arena! Build a robust combat robot and face off against opponents in intense one-on-one battles. Use strategy, engineering excellence, and clever design to disable your opponent\'s robot while protecting yours. Weapons, flippers, and innovative mechanisms are encouraged. May the best bot win!',
        teamSize: '2-5 Members',
        duration: '4 Hours (Tournament Format)',
        venue: 'Combat Arena',
        registerButton: {
            text: 'Register Now',
            link: 'https://forms.gle/your-registration-form-link'
        },
        rules: [
            '🤖 RO-COMBAT (LIGHT) EVENT RULES',
            '',
            'FACULTY CO-ORDINATOR NAME:',
            'Mr. Subhasish Das',
            'Mr. Ranjit Kumar Pal',
            '',
            'STUDENT CO-ORDINATOR NAME:',
            'Soumyadeep Ghosh (ECE3)',
            'Sumit Ghosh (ECE3)',
            'Sampurna Biswas (CSE3)',
            '',
            'VOLUNTEER NAME:',
            'Urba Das (ECE2)',
            '',
            'TEAM STRENGTH:',
            'Minimum Members: 2',
            'Maximum Members: 5',
            '',
            'BOT SPECIFICATIONS:',
            'No dimension limit for the bot.',
            'Weight of the bot shall be 8 kg (wireless) with no weight tolerance.',
            '200 grams weight bonus for an unconventional drive system.',
            'The potential difference between any two electrical points on the robot must not exceed 25.2 volts throughout the run.',
            'Active and non-active weapons are allowed.',
            'Touching the robot during the competition is strictly prohibited.',
            'External weights or loose weights on robots are not allowed.',
            'Weapon lock mechanism is mandatory for all bots.',
            'Weapon must remain locked while handling, transporting, inspecting, or when outside the arena.',
            'Wedge-type bots must have their wedge edges properly covered with tape or protective material while outside the arena.',
            'Exposed sharp wedge edges in the pit area are not allowed.',
            'External kill switch is mandatory for all bots.',
            'Kill switch must be clearly visible and easily accessible.',
            'Kill switch must immediately cut off power to the entire robot, including drive and weapon systems.',
            'Kill switch will be tested before the match. Failure will lead to disqualification until resolved.',
            '',
            'GENERAL RULES (COMMON FOR PRELIMS & FINALS):',
            'This is a team event.',
            'This is an offline event and all participants must be physically present at the venue to compete.',
            'Registration fees once paid are strictly non-refundable and non-transferable under any circumstances.',
            'A team may comprise members from different colleges. No person shall be a member of multiple teams.',
            'Teams have to show and declare all of their bots before their first match.',
            'No bots can be shared by two teams during the event.',
            'Robots constructed using LEGO kits, their spare parts, or any other ready-made mechanism are not allowed.',
            'Use of pneumatics, hydraulics, lethal weapons like projectiles, acids, sharp cutters, strong electromagnets, tesla coil, fire, and EMP are strictly prohibited.',
            'The bot should be wireless.',
            'The right spirit of participation is expected from every participant.',
            'The decision of the judge(s) will be deemed final. A team can be disqualified on disciplinary grounds.',
            'Upon calling, any team member should report immediately to the coordinators regarding the condition of their bot to avoid disqualification.',
            '',
            'PRELIMS RULES:',
            'Each match will be conducted for a fixed time duration.',
            'The winning bot will advance to the next round.',
            'Immobility of any bot during the match will be considered defeated.',
            'Teams must follow arena safety instructions at all times.',
            '',
            'FINALS RULES:',
            'Final matches will follow the same safety and bot specifications rules.',
            'Match duration will remain the same unless specified by coordinators.',
            'Immobility of any bot during the match will be considered defeated.',
            'Referee’s decision will be final.'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹30,000' },
            { position: '2nd Prize', amount: '₹18,000' },
            { position: '3rd Prize', amount: '₹10,000' }
        ],
        contact: [
            {
                name: 'Combat Organizer',
                phone: '+91 98765 43222',
                email: 'rocombat@techstorm.com'
            },
            {
                name: 'Safety Officer',
                phone: '+91 98765 43223',
                email: 'safety@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default RoCombatEvent;
