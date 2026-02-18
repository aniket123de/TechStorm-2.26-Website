<<<<<<< HEAD
import React, { useState } from 'react';
import EventDetail from '../EventDetail';
import roNavigator from '../../../../assets/img/PIXELATED EVENT MASCOTS/RO-NAVIGATOR.png';
import roNavigatorBanner from '../../../../assets/img/event_specific_pictures/robotics/ro_navigator.png';
import { getCloudinaryUrl } from '../../../../config/cloudinary';
// 8-bit styled FAQ accordion component
const EightBitAccordion = ({ faqs }) => {
    const [openIndex, setOpenIndex] = React.useState(null);
    return (
        <div 
            className="nes-container with-title"
            style={{
                maxWidth: '700px',
                margin: '40px 24px 0 24px',
                backgroundColor: 'rgba(26, 14, 34, 0.95)',
                border: '4px solid #ffc010',
                boxShadow: '0 0 30px rgba(255, 192, 16, 0.15)',
                fontFamily: 'Press Start 2P, monospace, Courier New, Courier',
                color: '#ffc010',
                padding: '24px 32px 24px 32px',
                borderRadius: '0',
                marginBottom: 32
            }}
        >
            <p className="title" style={{
                color: '#ffc010',
                background: '#1a0e22',
                fontFamily: 'Press Start 2P, monospace',
                fontSize: 18,
                padding: '8px 18px',
                margin: 0,
                letterSpacing: 2,
                borderRadius: 0,
                display: 'inline-block',
                boxShadow: 'none',
                border: 'none',
            }}>FAQs</p>
            {faqs.map((faq, idx) => (
                <div key={idx} style={{ marginBottom: 18, marginTop: 18 }}>
                    <button
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        style={{
                            width: '100%',
                            textAlign: 'left',
                            background: 'none',
                            border: 'none',
                            color: '#fffacd',
                            fontFamily: 'Press Start 2P, monospace',
                            fontSize: 14,
                            fontWeight: 700,
                            letterSpacing: 1,
                            cursor: 'pointer',
                            outline: 'none',
                            padding: '8px 0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'color 0.2s',
                        }}
                        aria-expanded={openIndex === idx}
                        aria-controls={`faq-panel-${idx}`}
                    >
                        <span style={{color: '#ffc010', textShadow: '2px 2px 0 #000'}}>{faq.q}</span>
                        <span style={{ fontSize: 20, marginLeft: 8, color: '#00ffea', textShadow: '2px 2px 0 #000' }}>{openIndex === idx ? '\u25B2' : '\u25BC'}</span>
                    </button>
                    <div style={{
                        borderBottom: '2px dashed #ffc010',
                        margin: '6px 0 0 0',
                        width: '100%'
                    }} />
                    {openIndex === idx && (
                        <div
                            id={`faq-panel-${idx}`}
                            style={{
                                background: 'rgba(0,0,0,0.25)',
                                color: '#fffacd',
                                fontFamily: 'Press Start 2P, monospace',
                                fontSize: 12,
                                margin: '10px 0 0 0',
                                padding: '10px 8px',
                                lineHeight: 1.8,
                                whiteSpace: 'pre-line',
                                borderLeft: '4px solid #00ffea',
                                borderRadius: 0,
                                boxShadow: 'none',
                                textShadow: '1px 1px 0 #000',
                            }}
                        >
                            {faq.a}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const faqs = [
    { q: 'How many members are allowed in a team?', a: 'Each team must have 2 to 5 members.' },
    { q: 'Are ready-made or Lego robots allowed?', a: 'No. Readymade bots, LegoCity bots, or Kakarobots are strictly prohibited.' },
    { q: 'Is remote or Bluetooth control allowed?', a: 'No. The robot must be fully autonomous without any external control.' },
    { q: 'What are the size and power limits of the robot?', a: 'Maximum size: 20 × 20 × 20 cm (5% tolerance allowed)\nPower supply: 10–12V onboard only' },
    { q: 'What type of track will the robot run on?', a: 'A white surface with a 2.5 cm black line, including curves, junctions, gaps, and checkpoints. The final track may contain inversion (black surface with white line).' },
    { q: 'How is the competition structured?', a: 'There are two rounds:\nPreliminary Round: Based on fastest completion time.\nFinal Round: More complex track with additional tasks and challenges.' },
    { q: 'Where will the event take place?', a: 'This is an offline event at B Block, B. P. Poddar Institute of Management and Technology, VIP Road Campus.' },
    { q: 'Is calibration time provided?', a: 'Yes.\nPrelims: 4 minutes calibration time.\nFinals: 30 minutes calibration time (may change on event day).' },
];

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
            // ...existing code...
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
            // FAQ removed
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

    return (
        <EventDetail eventData={eventData} faqAccordion={<EightBitAccordion faqs={faqs} />} />
    );
=======
import React from "react";
import EventDetail from "../EventDetail";
import roNavigator from "../../../../assets/img/PIXELATED EVENT MASCOTS/RO-NAVIGATOR.png";
import roNavigatorBanner from "../../../../assets/img/event_specific_pictures/robotics/ro_navigator.png";
import { getCloudinaryUrl } from "../../../../config/cloudinary";

const RoNavigatorEvent = () => {
  const eventData = {
    previousYearImages: [
      getCloudinaryUrl(
        "pictures_of_gallery/Ro Navigator",
        "IMG_20240403_125518.jpg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Ro Navigator",
        "IMG_20240403_125521.jpg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Ro Navigator",
        "IMG_6571.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
    ],
    name: "Ro-Navigator",
    logo: roNavigator,
    category: "Robotics",
    breadcrumbBg: roNavigatorBanner,
    description:
      "Ro-Navigator is an autonomous robot navigation challenge where your bot must navigate through a complex maze filled with obstacles. Using sensors and intelligent programming, guide your robot from start to finish in the shortest time possible. This event tests your skills in robotics, sensor integration, and algorithm implementation.",
    teamSize: "2-5 Members",
    entryFeeInternal: "₹350 per team",
    entryFeeExternal: "₹400 per team",
    duration: "2.5 Hours",
    venue: "Robotics Arena",
    registerButton: {
      text: "Register Now",
    },
    rules: [
      "RO-NAVIGATOR EVENT RULES",
      "",
      "FACULTY CO-ORDINATOR NAME:",
      "• Mr. Ramesh Kumar",
      "• Mr. Debasis Sharma",
      "",
      "STUDENT CO-ORDINATOR NAME:",
      "• Arushmita Sikder (CSE3)",
      "• Amrita Ghosh (CSE3)",
      "",
      "VOLUNTEER NAME:",
      "• Archita Hazra (ECE2)",
      "• Indranil Maji (EE2)",
      "• Debjit dhar (ECE1)",
      "",
      "TEAM STRENGTH:",
      "• Minimum Members: 2",
      "• Maximum Members: 5",
      "",
      "BOT SPECIFICATIONS:",
      "• The robot must not exceed the dimensions of 20 × 20 × 20 cm (length × width × height).",
      "• Only one robot is allowed per team for both rounds.",
      "• A single robot cannot be used by multiple teams.",
      "• Readymade bots, LegoCity bots, or Kakarobots are strictly prohibited.",
      "• The robot must operate fully autonomously without any external control.",
      "• The power supply must be limited to the onboard system and should not exceed 10–12V.",
      "• The robot must be designed to move on a white flex sheet arena with a 2.5 cm wide black path and gaps.",
      "",
      "GENERAL RULES (COMMON FOR PRELIMS & FINALS):",
      "• The event will consist of two rounds: Preliminary and Final.",
      "• Each team is responsible for the operation and management of their robot.",
      "• Teams must carry valid ID cards during the event.",
      "• In case of disqualification, no refund will be provided.",
      "• In case of a tie, the event heads’ decision will be final.",
      "",
      "PRELIMS RULES:",
      "• All teams will run their robots individually on the designated track.",
      "• Teams must aim to complete the course in the shortest possible time.",
      "• Only one hand touch is allowed during the run.",
      "• For every additional touch, a 10-second penalty will be added.",
      "• For prelims before the run, teams will be given 4 mins of calibration and track test time.",
      "• Top-performing teams will qualify for the final round.",
      "",
      "FINALS RULES:",
      "• Only the top teams from the prelims will compete in the final round.",
      "• The track may include additional challenges or variations.",
      "• The track may contain angles, curves, junctions, checkpoints, circles, and gaps.",
      "• Teams are allowed only one restart if the robot moves out of the arena.",
      "• Any touch during the run will result in a 10-second penalty.",
      "• The robot must indicate checkpoints by blinking an LED.",
      "• The robot must provide an indication (LED or buzzer) when crossing inverted lines (white line on black background).",
      "• The robot should successfully navigate gaps between lines.",
      "• Extra credit is given if the robot reaches the endpoint and stops for at least 5 seconds.",
      "• For finals, teams will have 30 mins calibration and track test time (can change on the day of event).",
    ],
    prizes: [
      { position: "1st Prize", amount: "₹20,000" },
      { position: "2nd Prize", amount: "₹12,000" },
      { position: "3rd Prize", amount: "₹8,000" },
    ],
    contact: [
      {
        name: "Robotics Head",
        phone: "+91 98765 43220",
        email: "ronavigator@techstorm.com",
      },
      {
        name: "Technical Support",
        phone: "+91 98765 43221",
        email: "robotics@techstorm.com",
      },
    ],
  };

  return <EventDetail eventData={eventData} />;
>>>>>>> 219c3e9241e2d32283dea2c28f1f5d2b59dafe06
};

export default RoNavigatorEvent;
