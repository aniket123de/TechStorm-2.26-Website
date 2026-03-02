import React from "react";
import EventDetail from "../EventDetail";

const forzaHorizon = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/PIXELATED%20EVENT%20MASCOTS/FORZA%20HORIZON";
const forzaHorizonBanner = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/event_specific_pictures/games/forza_horizon";

const ForzaHorizonEvent = () => {
  const eventData = {
    eventDate: "9th and 10th April, 2026",
    name: "Forza Horizon",
    logo: forzaHorizon,
    category: "Gaming",
    breadcrumbBg: forzaHorizonBanner,
    description:
      "Forza Horizon brings high-octane racing action to TechStorm! Compete in the ultimate racing simulation where speed, skill, and strategy collide. Master different tracks, perfect your racing lines, and leave your opponents in the dust. Whether you're a casual racer or a sim-racing pro, this tournament will test your driving abilities to the limit.",
    teamSize: "Solo",
    entryFeeInternal: "₹80 per participant",
    entryFeeExternal: "₹100 per participant",
    duration: "4 Hours",
        faqs: [
      {
        q: "Who can participate in the event?",
        a: `Anyone can participate, but registration is mandatory before the event starts.\nNo entry will be allowed without registration.`
      },
      {
        q: "Is there any entry fee?",
        a: `The rules mention registration is required. Please check with organizers if any fee applies. Entry without registration is not allowed.`
      },
      {
        q: "Is the registration fee refundable?",
        a: `No. All events are non-refundable.`
      },
      {
        q: "Is this an online or offline event?",
        a: `This is an offline fest event.`
      },
      {
        q: "Can two players use the same controller or account?",
        a: `No. One player per controller/account is strictly allowed.`
      },
      {
        q: "What behavior is expected from participants?",
        a: `Players must avoid:\n• Abusive language\n• Unsportsmanlike behavior\n• Distracting others\nGood sportsmanship is mandatory.`
      },
      {
        q: "Will all players use the same difficulty settings?",
        a: `Yes. Difficulty settings will be the same for all players to ensure fairness.`
      },
      {
        q: "Can players change assists (braking, steering, traction)?",
        a: `No. Assists will be fixed beforehand by organizers.`
      },
      {
        q: "Can players choose different camera views?",
        a: `Same camera view is recommended, but it is optional.`
      },
      {
        q: "Can players use any car they want?",
        a: `No. Only pre-selected allowed cars can be used. Overpowered cars are not allowed.`
      },
      {
        q: "What car class will be used?",
        a: `All players must use the same car class (for example: A800 or S1).`
      },
      {
        q: "Is custom tuning allowed?",
        a: `No custom tuning is allowed unless approved by organizers.`
      },
      {
        q: "What is the race format?",
        a: `The race format will be decided before the event:\n• Time Trial\n• Knockout Rounds\n• Points-Based Tournament`
      },
      {
        q: "Will everyone race the same tracks?",
        a: `Yes. The number of laps and tracks will be fixed and same for all players.`
      },
      {
        q: "What counts as unfair play?",
        a: `The following are not allowed:\n• Intentional crashing\n• Blocking opponents\n• Using game glitches or exploits\n• Controller tampering`
      },
      {
        q: "How will the winner be decided?",
        a: `Winner can be decided by:\n• Fastest total race time\n• Fastest lap\n• Highest points`
      },
      {
        q: "What happens in case of a tie?",
        a: `There will be one final tiebreaker race.`
      },
      {
        q: "What if technical issues occur?",
        a: `• Organizers’ decision will be final.\n• Restart allowed only for major glitches or system crash.\n• Players must report issues immediately.`
      },
      {
        q: "Can spectators interact with players during race?",
        a: `No. Spectators must not distract players and must maintain discipline.`
      }
        ],
    venue: "Gaming Zone A",
    rules: [
      "BASIC PARTICIPATION RULES:",
      // ...existing code...
      "Each participant must register before the event starts. Without fee submission, no entry.",
      "One player per controller/account.",
      "No abusive language or unsportsmanlike behavior.",
      "All events are non-refundable. This must be clearly mentioned in the rules. And it’s an offline fest.",
      "",
      "GAME SETUP RULES",
      "Use the same difficulty settings for all players.",
      "Assists (braking, steering, traction) should be fixed beforehand.",
      "Same camera view recommended (optional).",
      "",
      "CAR & RACE RULES",
      "Pre-select allowed cars (avoid overpowered cars).",
      "Same car class for all (example: A800 or S1 class).",
      "No custom tuning unless allowed by organizers.",
      "",
      "⏱ RACE FORMAT RULES",
      "Decide race type beforehand:",
      "   a. Time trial OR",
      "   b. Knockout rounds OR",
      "   c. Points-based tournament.",
      "Fixed number of laps/tracks for everyone.",
      "",
      "FAIR PLAY RULES",
      "No intentional crashing or blocking.",
      "No game exploits or glitches.",
      "Controller tampering not allowed.",
      "",
      "WINNER CRITERIA",
      "Fastest lap / total race time OR",
      "Highest points across races.",
      "In case of tie → one final tiebreaker race.",
      "",
      "TECHNICAL RULES",
      "Organizers’ decision final if technical issues occur.",
      "Restart race only for major glitches or system crash.",
      "Players must report issues immediately.",
      "",
      "AUDIENCE & CONDUCT RULES",
      "Spectators shouldn’t distract players.",
      "Maintain discipline around the gaming setup.",
    ],
    prizes: [
      { position: "1st Prize", amount: "₹10,000" },
      { position: "2nd Prize", amount: "₹6,000" },
      { position: "3rd Prize", amount: "₹4,000" },
    ],
    contact: [
      {
        name: "Gaming Head",
        phone: "+91 98765 43232",
        email: "forza@techstorm.com",
      },
      {
        name: "Tournament Admin",
        phone: "+91 98765 43233",
        email: "racing@techstorm.com",
      },
    ],
    registerButton: {
      text: "Register Now",
    },
  };

  return <EventDetail eventData={eventData} />;
};

export default ForzaHorizonEvent;
