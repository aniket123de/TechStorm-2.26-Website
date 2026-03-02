import React from "react";
import EventDetail from "../EventDetail";
import { getCloudinaryUrl } from "../../../../config/cloudinary";

const roSumo = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/PIXELATED%20EVENT%20MASCOTS/rosumo";
const roSumoBanner = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/event_specific_pictures/robotics/ro_sumo";

const RoSumoEvent = () => {
  const eventData = {
    eventDate: "10th and 11th April, 2026",
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
      "Ro-Sumo is a thrilling robotics event where participants design and build autonomous or remote-controlled robots to compete in a sumo-style battle. The objective is to push the opponentâ€™s robot out of the ring while staying within the boundaries. This event tests your engineering, strategy, and control skills in a fast-paced, competitive environment.",
    teamSize: "2-5 Members",
    entryFeeInternal: "₹350 per team",
    entryFeeExternal: "₹400 per team",
    duration: "2 Hours",
    venue: "Robotics Arena",
    registerButton: {
      text: "Register Now",
    },
    rules: [
      
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
      
    ],
    prizes: [
      { position: "1st Prize", amount: "â‚¹10,000" },
      { position: "2nd Prize", amount: "â‚¹6,000" },
      { position: "3rd Prize", amount: "â‚¹4,000" },
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
    faqs : [
  {
    q: "What is the maximum allowed weight of the robot?",
    a: `The total weight of the bot must not exceed 3 kg, including onboard batteries, pneumatic tanks, hydraulic systems, and weapons.\nA maximum margin of 100 grams is allowed.\nRemote controller weight is not included.`
  },
  {
    q: "Are there any size restrictions for the robot?",
    a: `There are no dimension restrictions. However:\n- In case of cluster bots, total combined weight must be within 3 kg.\n- Each individual bot must comply with all competition rules.\n- No part of the bot may exceed 6 ft height during motion.`
  },
  {
    q: "What type of weapons or mechanisms are allowed?",
    a: `Allowed mechanisms include:\n- Pneumatic systems\n- Hydraulic systems\n- Electric lifters\n- Wedges\n- Manual jumping/hopping mechanisms\n\u274C Flying mechanisms (airfoils, helium balloons, ornithopters) are strictly prohibited.\n\u274C Sticky/suction mechanisms (glue, suction cups, sticky treads) are not allowed.`
  },
  {
    q: "What type of mobility system is required?",
    a: `Robots must have clearly visible and controllable mobility using:\n- Wheels\n- Tracks\n- Rolling bodies\n- Approved non-wheeled continuous drive systems.`
  },
  {
    q: "Is autonomous mode allowed?",
    a: `Yes, autonomous features are allowed only if they can be overridden remotely at any time.`
  },
  {
    q: "What type of control system is required?",
    a: `The robot must be controlled through a wireless remote only.\nAll power supply must be onboard.\nA manual Kill Switch and a radio-controlled Emergency Stop (E-Stop) are mandatory.`
  },
  {
    q: "What are the remote frequency requirements?",
    a: `- Minimum four-frequency remote OR\n- Dual interchangeable control circuits\n- Proper signal binding must work through polycarbonate and metal barriers.\n\u26A0 No rematch will be given due to signal interference.`
  },
  {
    q: "What is the maximum operating voltage allowed?",
    a: `The robot must be electrically powered only.\n\u274C IC engines are not allowed.\nMaximum operating voltage must not exceed 36V DC at any point.`
  },
  {
    q: "What batteries are allowed?",
    a: `Only sealed, leak-proof batteries such as:\n- Li-ion\n- NiMH\n- NiCad\n- Gel batteries\n- Dry cells\nBattery terminals must be properly insulated.\nBattery change during match is not allowed.\nImproper battery protection may lead to disqualification.`
  },
  {
    q: "How long is each match?",
    a: `Each match consists of 3 minutes of active fight time (excluding time-outs).\nBots must be designed to sustain combat for at least 3 minutes.`
  },
  {
    q: "What are the match formats?",
    a: `Matches may be conducted as:\n- 1 vs 1 (Match)\n- Multi-robot combat (Rumble)\nFormat depends on the round.`
  },
  {
    q: "How is a winner decided?",
    a: `A robot wins by:\n- Immobilizing the opponent (no 1 inch linear movement within 10 seconds)\nIf no immobilization:\nJudges decide based on:\n- Aggression\n- Control\n- Damage.`
  },
  {
    q: "What are the pinning rules?",
    a: `Pinning/lifting allowed for maximum 20 seconds per attempt.\nMust release after referee instruction.\nFailure to comply may result in disqualification.`
  },
  {
    q: "What happens if a robot gets stuck in the arena?",
    a: `If stuck due to arena conditions:\n- The fight continues\n- Winner is decided based on points\n- The bot with higher points can still win even if immobilized due to arena condition.`
  },
  {
    q: "Can a team consist of members from different institutes?",
    a: `Yes. Teams must have:\n- Minimum 2 members\n- Maximum 5 members\nMembers can be from the same or different institutes.`
  },
  {
    q: "Can we change our team name after registration?",
    a: `Yes, but:\n- The name must be unique\n- Must be approved by organizers\n- Organizers must be informed officially.`
  },
  {
    q: "Is participation fee refundable?",
    a: `No. Participation fees are non-refundable under any circumstances after registration.`
  },
  {
    q: "What leads to immediate disqualification?",
    a: `- Unsafe robot design\n- Throwing opponent out of arena (if unsafe)\n- Voltage exceeding 36V`
  }
]
  };

  return <EventDetail eventData={eventData} />;
};

export default RoSumoEvent;
