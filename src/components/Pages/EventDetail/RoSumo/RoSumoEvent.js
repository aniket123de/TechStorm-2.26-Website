import React from "react";
import EventDetail from "../EventDetail";
import roSumo from "../../../../assets/img/PIXELATED EVENT MASCOTS/rosumo.png";
import roSumoBanner from "../../../../assets/img/event_specific_pictures/robotics/ro_sumo.png";
import { getCloudinaryUrl } from "../../../../config/cloudinary";

const RoSumoEvent = () => {
<<<<<<< HEAD
    const eventData = {
        previousYearImages: [
            getCloudinaryUrl('pictures_of_gallery/Ro Sumo', 'sumo1.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Ro Sumo', 'sumo2.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Ro Sumo', 'sumo3.jpeg', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
        ],
        name: 'Ro-Sumo',
        logo: roSumo,
        category: 'Robotics',
        breadcrumbBg: roSumoBanner,
        description: 'Ro-Sumo is a thrilling robotics event where participants design and build autonomous or remote-controlled robots to compete in a sumo-style battle. The objective is to push the opponent’s robot out of the ring while staying within the boundaries. This event tests your engineering, strategy, and control skills in a fast-paced, competitive environment.',
        teamSize: '2-4 Members',
        duration: '2 Hours',
        venue: 'Robotics Arena',
        registerButton: {
            text: 'Register Now',
            link: 'https://forms.gle/your-registration-form-link'
        },
        rules: [
            // ...existing code...
            // Bot Specifications
            'BOT SPECIFICATIONS:',
            'The total weight of the bot including all onboard batteries, pneumatic tanks, hydraulic systems, and weapons must not exceed 3 kg (only 100 g margin allowed), and remote controller weight is excluded.',
            'No restriction on dimensions, but in case of cluster bots the total combined weight must remain within 3 kg and each individual bot must satisfy all competition rules.',
            'Robots may use pneumatic, hydraulic, electric lifter mechanisms and wedges, and manual jumping/hopping is allowed but no part of the bot may exceed 6 ft height during motion.',
            'Robots must have clearly visible and controllable mobility using wheels, tracks, rolling bodies, or approved non-wheeled continuous drive systems.',
            'Flying mechanisms (airfoils, helium balloons, ornithopters, etc.) and any sticking/suction devices (glue, sticky treads, suction cups) are strictly prohibited.',
            'The robot must be controlled only through a wireless remote, with all power supply onboard, and autonomous features are allowed only if they can be overridden remotely at any time.',
            'A manual disconnect switch (Kill Switch) and a radio-controlled emergency stop (E-Stop) are mandatory and must be safely accessible.',
            'Teams must use a minimum four-frequency remote or dual interchangeable control circuits, ensure proper binding through polycarbonate and metal barriers, and no rematch will be given for signal interference.',
            'The machine must be electrically powered only (no IC engines) with maximum operating voltage not exceeding 36V DC at any point.',
            'Only sealed, leak-proof batteries (Li-ion, NiMH, NiCad, Gel, Dry cells) are allowed, terminals must be protected from short circuit, battery change during match is not allowed, and improper battery protection leads to disqualification.',
            '',
            // General Rules
            'GENERAL RULES (COMMON FOR PRELIMS & FINALS):',
            'Team Composition: Each team must have minimum 2 and maximum 5 members, from same or different institutes; teams without a bot may be provided one by the college authorities.',
            'Team Identity: Every team must register with a unique and appropriate team name (subject to organizer approval), and must inform organizers if the name is changed.',
            'Team Representative: Each team must appoint a team leader at registration, who will be the official point of contact and must provide valid phone number and email ID.',
            'Match Duration: Each match will have 3 minutes of active fight time (excluding time-outs), so bots should be designed to sustain at least 3 minutes of combat.',
            'Match Types: Matches may be conducted as 1v1 (Match) or multi-robot combat (Rumble) depending on the round.',
            'Victory by Immobilization: A robot wins if the opponent cannot show at least 1 inch of linear movement within 10 seconds; partial drivetrain damage is acceptable if controlled movement is shown.',
            'Disqualification & Safety: Any robot deemed unsafe by judges or thrown out of the arena will be immediately disqualified, and the opponent will be declared the winner.',
            'Pinning & Lifting Rules: Pinning or lifting is allowed for maximum 20 seconds per attempt; failure to release after instruction may lead to disqualification; entangled bots will be separated safely by officials.',
            'Arena Stuck Condition: If a bot gets stuck due to arena conditions, the fight continues and the winner will be decided based on points; the bot with higher points can still win even if immobilized due to such conditions.',
            'Judging Criteria: If no clear immobilization occurs, the winner will be decided based on Aggression (attack frequency & boldness), Control (effective strategy & weapon use), and Damage (deliberate functional harm to opponent only).',
            'Participation Policy: No refund of participation fees will be provided once registration is completed under any circumstances.',
            'You have to mandatorily bring your COLLEGE ID.',
            '',
            // FAQ (Shortened for display)
            'FAQ:',
            '1. Max allowed weight: 3 kg (100g margin allowed, remote not included).',
            '2. No size restriction, but cluster bots must total ≤ 3 kg and ≤ 6 ft height during motion.',
            '3. Allowed: pneumatic, hydraulic, electric lifters, wedges, manual jumping/hopping. Prohibited: flying, sticky/suction mechanisms.',
            '4. Mobility: wheels, tracks, rolling bodies, or approved non-wheeled continuous drive.',
            '5. Autonomous allowed if can be overridden remotely.',
            '6. Wireless remote only, all power onboard, Kill Switch & E-Stop mandatory.',
            '7. Min 4-frequency remote or dual circuits, no rematch for signal interference.',
            '8. Max voltage: 36V DC, only electric power, no IC engines.',
            '9. Only sealed, leak-proof batteries, no battery change during match.',
            '10. Match: 3 min active fight time.',
            '11. Formats: 1v1 or multi-robot (Rumble).',
            '12. Win by immobilization or by judges (aggression, control, damage).',
            '13. Pinning/lifting: max 20s, must release on instruction.',
            '14. Arena stuck: winner by points.',
            '15. Teams: 2-5 members, any institute.',
            '16. Team name can be changed with approval.',
            '17. No refund after registration.',
            '18. Immediate disqualification: unsafe design, throwing out, >36V, prohibited mechanisms, ignoring referee.'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹10,000' },
            { position: '2nd Prize', amount: '₹6,000' },
            { position: '3rd Prize', amount: '₹4,000' }
        ],
        contact: [
            {
                name: 'Sumo Coordinator',
                phone: '+91 98765 43240',
                email: 'rosumo@techstorm.com'
            },
            {
                name: 'Arena Manager',
                phone: '+91 98765 43241',
                email: 'arena@techstorm.com'
            }
        ]
    };
=======
  const eventData = {
    previousYearImages: [
      getCloudinaryUrl(
        "pictures_of_gallery/Ro Sumo",
        "sumo1.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Ro Sumo",
        "sumo2.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Ro Sumo",
        "sumo3.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
    ],
    name: "Ro-Sumo",
    logo: roSumo,
    category: "Robotics",
    breadcrumbBg: roSumoBanner,
    description:
      "Ro-Sumo is a thrilling robotics event where participants design and build autonomous or remote-controlled robots to compete in a sumo-style battle. The objective is to push the opponent’s robot out of the ring while staying within the boundaries. This event tests your engineering, strategy, and control skills in a fast-paced, competitive environment.",
    teamSize: "2-5 Members",
    entryFeeInternal: "₹350 per team",
    entryFeeExternal: "₹400 per team",
    duration: "2 Hours",
    venue: "Robotics Arena",
    registerButton: {
      text: "Register Now",
    },
    rules: [
      // Faculty Coordinators
      "FACULTY CO-ORDINATOR NAME:",
      "Dr. Binoy Krishna Biswas",
      "Mr. Subhasish Das",
      "",
      // Student Coordinators
      "STUDENT CO-ORDINATOR NAME:",
      "D Samir Dora (ECE3)",
      "Sagnek Chowdhury (ECE3)",
      "",
      // Volunteers
      "VOLUNTEER NAME:",
      "Abdul Razzak (ECE2)",
      "Sumit Ghara (EE2)",
      "",
      // Team Strength
      "TEAM STRENGTH:",
      "Minimum Members: 2",
      "Maximum Members: 5",
      "",
      // Bot Specifications
      "BOT SPECIFICATIONS:",
      "The total weight of the bot including all onboard batteries, pneumatic tanks, hydraulic systems, and weapons must not exceed 3 kg (only 100 g margin allowed), and remote controller weight is excluded.",
      "No restriction on dimensions, but in case of cluster bots the total combined weight must remain within 3 kg and each individual bot must satisfy all competition rules.",
      "Robots may use pneumatic, hydraulic, electric lifter mechanisms and wedges, and manual jumping/hopping is allowed but no part of the bot may exceed 6 ft height during motion.",
      "Robots must have clearly visible and controllable mobility using wheels, tracks, rolling bodies, or approved non-wheeled continuous drive systems.",
      "Flying mechanisms (airfoils, helium balloons, ornithopters, etc.) and any sticking/suction devices (glue, sticky treads, suction cups) are strictly prohibited.",
      "The robot must be controlled only through a wireless remote, with all power supply onboard, and autonomous features are allowed only if they can be overridden remotely at any time.",
      "A manual disconnect switch (Kill Switch) and a radio-controlled emergency stop (E-Stop) are mandatory and must be safely accessible.",
      "Teams must use a minimum four-frequency remote or dual interchangeable control circuits, ensure proper binding through polycarbonate and metal barriers, and no rematch will be given for signal interference.",
      "The machine must be electrically powered only (no IC engines) with maximum operating voltage not exceeding 36V DC at any point.",
      "Only sealed, leak-proof batteries (Li-ion, NiMH, NiCad, Gel, Dry cells) are allowed, terminals must be protected from short circuit, battery change during match is not allowed, and improper battery protection leads to disqualification.",
      "",
      // General Rules
      "GENERAL RULES (COMMON FOR PRELIMS & FINALS):",
      "Team Composition: Each team must have minimum 2 and maximum 5 members, from same or different institutes; teams without a bot may be provided one by the college authorities.",
      "Team Identity: Every team must register with a unique and appropriate team name (subject to organizer approval), and must inform organizers if the name is changed.",
      "Team Representative: Each team must appoint a team leader at registration, who will be the official point of contact and must provide valid phone number and email ID.",
      "Match Duration: Each match will have 3 minutes of active fight time (excluding time-outs), so bots should be designed to sustain at least 3 minutes of combat.",
      "Match Types: Matches may be conducted as 1v1 (Match) or multi-robot combat (Rumble) depending on the round.",
      "Victory by Immobilization: A robot wins if the opponent cannot show at least 1 inch of linear movement within 10 seconds; partial drivetrain damage is acceptable if controlled movement is shown.",
      "Disqualification & Safety: Any robot deemed unsafe by judges or thrown out of the arena will be immediately disqualified, and the opponent will be declared the winner.",
      "Pinning & Lifting Rules: Pinning or lifting is allowed for maximum 20 seconds per attempt; failure to release after instruction may lead to disqualification; entangled bots will be separated safely by officials.",
      "Arena Stuck Condition: If a bot gets stuck due to arena conditions, the fight continues and the winner will be decided based on points; the bot with higher points can still win even if immobilized due to such conditions.",
      "Judging Criteria: If no clear immobilization occurs, the winner will be decided based on Aggression (attack frequency & boldness), Control (effective strategy & weapon use), and Damage (deliberate functional harm to opponent only).",
      "Participation Policy: No refund of participation fees will be provided once registration is completed under any circumstances.",
      "You have to mandatorily bring your COLLEGE ID.",
      "",
      // FAQ (Shortened for display)
      "FAQ:",
      "1. Max allowed weight: 3 kg (100g margin allowed, remote not included).",
      "2. No size restriction, but cluster bots must total ≤ 3 kg and ≤ 6 ft height during motion.",
      "3. Allowed: pneumatic, hydraulic, electric lifters, wedges, manual jumping/hopping. Prohibited: flying, sticky/suction mechanisms.",
      "4. Mobility: wheels, tracks, rolling bodies, or approved non-wheeled continuous drive.",
      "5. Autonomous allowed if can be overridden remotely.",
      "6. Wireless remote only, all power onboard, Kill Switch & E-Stop mandatory.",
      "7. Min 4-frequency remote or dual circuits, no rematch for signal interference.",
      "8. Max voltage: 36V DC, only electric power, no IC engines.",
      "9. Only sealed, leak-proof batteries, no battery change during match.",
      "10. Match: 3 min active fight time.",
      "11. Formats: 1v1 or multi-robot (Rumble).",
      "12. Win by immobilization or by judges (aggression, control, damage).",
      "13. Pinning/lifting: max 20s, must release on instruction.",
      "14. Arena stuck: winner by points.",
      "15. Teams: 2-5 members, any institute.",
      "16. Team name can be changed with approval.",
      "17. No refund after registration.",
      "18. Immediate disqualification: unsafe design, throwing out, >36V, prohibited mechanisms, ignoring referee.",
    ],
    prizes: [
      { position: "1st Prize", amount: "₹10,000" },
      { position: "2nd Prize", amount: "₹6,000" },
      { position: "3rd Prize", amount: "₹4,000" },
    ],
    contact: [
      {
        name: "Sumo Coordinator",
        phone: "+91 98765 43240",
        email: "rosumo@techstorm.com",
      },
      {
        name: "Arena Manager",
        phone: "+91 98765 43241",
        email: "arena@techstorm.com",
      },
    ],
  };
>>>>>>> 219c3e9241e2d32283dea2c28f1f5d2b59dafe06

  return <EventDetail eventData={eventData} />;
};

export default RoSumoEvent;
