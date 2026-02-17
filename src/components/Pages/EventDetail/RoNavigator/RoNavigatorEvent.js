import React from 'react';
import EventDetail from '../EventDetail';
import roNavigator from '../../../../assets/img/PIXELATED EVENT MASCOTS/RO-NAVIGATOR.png';
import roNavigatorBanner from '../../../../assets/img/event_specific_pictures/robotics/ro_navigator.png';
import { getCloudinaryUrl } from '../../../../config/cloudinary';

const RoNavigatorEvent = () => {
    const eventData = {
        previousYearImages: [
            getCloudinaryUrl('pictures_of_gallery/Ro Navigator', 'IMG_20240403_125518.jpg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Ro Navigator', 'IMG_20240403_125521.jpg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Ro Navigator', 'IMG_6571.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
        ],
        name: 'Ro-Navigator',
        logo: roNavigator,
        category: 'Robotics',
        breadcrumbBg: roNavigatorBanner,
        description: 'Ro-Navigator is an autonomous robot navigation challenge where your bot must navigate through a complex maze filled with obstacles. Using sensors and intelligent programming, guide your robot from start to finish in the shortest time possible. This event tests your skills in robotics, sensor integration, and algorithm implementation.',
        teamSize: '2-4 Members',
        duration: '2.5 Hours',
        venue: 'Robotics Arena',
        registerButton: {
            text: 'Register Now',
            link: 'https://forms.gle/your-registration-form-link'
        },
        rules: [
            '🤖 RO-NAVIGATOR EVENT RULES',
            '',
            'FACULTY CO-ORDINATOR NAME:',
            '• Mr. Ramesh Kumar',
            '• Mr. Debasis Sharma',
            '',
            'STUDENT CO-ORDINATOR NAME:',
            '• Arushmita Sikder (CSE3)',
            '• Amrita Ghosh (CSE3)',
            '',
            'VOLUNTEER NAME:',
            '• Archita Hazra (ECE2)',
            '• Indranil Maji (EE2)',
            '• Debjit dhar (ECE1)',
            '',
            'TEAM STRENGTH:',
            '• Minimum Members: 2',
            '• Maximum Members: 5',
            '',
            'BOT SPECIFICATIONS:',
            '• The robot must not exceed the dimensions of 20 × 20 × 20 cm (length × width × height).',
            '• Only one robot is allowed per team for both rounds.',
            '• A single robot cannot be used by multiple teams.',
            '• Readymade bots, LegoCity bots, or Kakarobots are strictly prohibited.',
            '• The robot must operate fully autonomously without any external control.',
            '• The power supply must be limited to the onboard system and should not exceed 10–12V.',
            '• The robot must be designed to move on a white flex sheet arena with a 2.5 cm wide black path and gaps.',
            '',
            'GENERAL RULES (COMMON FOR PRELIMS & FINALS):',
            '• The event will consist of two rounds: Preliminary and Final.',
            '• Each team is responsible for the operation and management of their robot.',
            '• Teams must carry valid ID cards during the event.',
            '• In case of disqualification, no refund will be provided.',
            '• In case of a tie, the event heads’ decision will be final.',
            '',
            'PRELIMS RULES:',
            '• All teams will run their robots individually on the designated track.',
            '• Teams must aim to complete the course in the shortest possible time.',
            '• Only one hand touch is allowed during the run.',
            '• For every additional touch, a 10-second penalty will be added.',
            '• For prelims before the run, teams will be given 4 mins of calibration and track test time.',
            '• Top-performing teams will qualify for the final round.',
            '',
            'FINALS RULES:',
            '• Only the top teams from the prelims will compete in the final round.',
            '• The track may include additional challenges or variations.',
            '• The track may contain angles, curves, junctions, checkpoints, circles, and gaps.',
            '• Teams are allowed only one restart if the robot moves out of the arena.',
            '• Any touch during the run will result in a 10-second penalty.',
            '• The robot must indicate checkpoints by blinking an LED.',
            '• The robot must provide an indication (LED or buzzer) when crossing inverted lines (white line on black background).',
            '• The robot should successfully navigate gaps between lines.',
            '• Extra credit is given if the robot reaches the endpoint and stops for at least 5 seconds.',
            '• For finals, teams will have 30 mins calibration and track test time (can change on the day of event).',
        ],
        prizes: [
            { position: '1st Prize', amount: '₹20,000' },
            { position: '2nd Prize', amount: '₹12,000' },
            { position: '3rd Prize', amount: '₹8,000' }
        ],
        contact: [
            {
                name: 'Robotics Head',
                phone: '+91 98765 43220',
                email: 'ronavigator@techstorm.com'
            },
            {
                name: 'Technical Support',
                phone: '+91 98765 43221',
                email: 'robotics@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default RoNavigatorEvent;
