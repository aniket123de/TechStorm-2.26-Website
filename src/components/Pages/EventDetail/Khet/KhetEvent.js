import React from "react";
import EventDetail from "../EventDetail";

const khet = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/PIXELATED%20EVENT%20MASCOTS/KHET";
const khetBanner = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/event_specific_pictures/games/khet";
// import { getCloudinaryUrl } from '../../../../config/cloudinary';

const KhetEvent = () => {
  const eventData = {
    eventDate: "10th and 11th April, 2026",
    previousYearImages: [
      // Add Cloudinary URLs here if images exist for Khet event
    ],
    name: "KHET",
    logo: khet,
    category: "Gaming",
    breadcrumbBg: khetBanner,
    description:
      "The Laser Game KHET 2.0: Mind-blowing laser fun for players ages 9-99. Using simple rules that can be learned in minutes, players alternate turns moving Egyptian-themed mirrored pieces, then fire their REAL (eye-safe) laser with the goal of blasting their opponent's PHARAOH to win. BASIC GEOMETRICAL CONCEPT IS THE KEY FACTOR IN THIS GAME.",
    teamSize: "Solo Participation",
    entryFeeInternal: "₹50 per participant",
    entryFeeExternal: "Not applicable",
    duration: "2 Hours",
    venue: "Board Game Arena",
        faqs: [
          {
            q: "Who is eligible to participate?",
            a: `KHET 2.26 is an intra-college competition and is therefore open exclusively to currently enrolled students of the institution. Participants must comply with all event guidelines and eligibility criteria prescribed by the organizing committee.`
          },
          {
            q: "Why should students participate in KHET 2.26?",
            a: `The competition provides a platform to enhance strategic thinking, analytical reasoning, and decision-making under time constraints. By applying fundamental geometrical concepts in a competitive environment, participants develop problem-solving skills, precision, and composure—competencies that are valuable in both academic and professional domains.`
          },
          {
            q: "What is the format of participation?",
            a: `The event follows an individual participation format. Each participant competes independently through successive elimination rounds.`
          },
          {
            q: "How is the competition structured?",
            a: `The event comprises Prelims I, Prelims II, Quarter Final, Semi Final, and Final rounds, conducted in a progressive elimination format.`
          },
          {
            q: "What is the duration of each round?",
            a: `Prelims I, Prelims II, Quarter Final, and Semi Final rounds are allotted 15 minutes each. The Final round is allotted 20 minutes.`
          },
          {
            q: "How is the judging process conducted?",
            a: `Judging is carried out based on:\nAdherence to official game rules and regulations\nStrategic execution and valid elimination of opponent pieces\nScore allocation as per prescribed marking criteria\nTime management within stipulated limits\nIn case of a tie, marks obtained will be considered first. If equality persists, the total time taken will determine the winner.`
          },
          {
            q: "Are there penalties for rule violations?",
            a: `Yes. Violations of the prescribed rules will result in warnings and mark deductions. Accumulation of three warnings will lead to immediate disqualification.`
          },
          {
            q: "How are time violations handled?",
            a: `Participants must make their moves within the allocated time per turn. Exceeding the permitted duration will attract penalties, and failure to act within the stipulated time may result in elimination.`
          },
          {
            q: "What configurations will be used during the competition?",
            a: `The Prelims will follow the Classic setup, the Quarter and Semi Finals will use the Imhotep setup, and the Final will be conducted under the Dynasty setup.`
          },
          {
            q: "Is the event refundable?",
            a: `The event will be conducted in offline mode, and all registrations are strictly non-refundable.`
          },
          {
            q: "Is the decision of the judges final?",
            a: `Yes. The decision of the judges shall be final and binding. Participants are expected to maintain discipline and uphold the integrity of the competition at all times.`
          }
        ],
    registerButton: {
      text: "Register Now",
    },
    rules: [
      "GENERAL RULES",
      "Intra-college event",
      "Team Size = SOLO PARTICIPATION.",
      "Time taken for the PRELIMS I, PRELIMS II, Quarter final and semifinal = 15 mins.",
      "Time taken for the FINALS = 20 mins.",
      "",
      "RULES AND REGULATIONS",
      "PHARAOH: The Pharaoh is the most important piece for each side. If hit with a laser, it is destroyed and its owner loses the game. Similar to a king in chess, the Pharaoh pieces are comparatively weak, and so are often only moved if under duress.",
      "SCARABS: Scarabs consist primarily of large, dual-sided mirrors. They reflect a laser coming in from any direction, and thus cannot be eliminated from the board. Also, unlike other pieces, Scarabs may move into an adjacent square even if it is already occupied, by switching places with the piece found there (whichever colour it may be). Thus, they are the most powerful pieces on the board but must be used with care, as a move that puts one side of the mirror in a favourable position may expose the player to attack using the opposite side of the same mirror.",
      "SPHINXES: In KHET 2.0, the Sphinxes hold the lasers. They may not move (each player's is located at their closest right-hand corner) but may be rotated in place so as to fire down the rank instead of the file. A Sphinx is unaffected by laser fire, whether the opponent's or its own reflected back upon itself.",
      "ANUBES: Anubis has the advantage that, despite still being unmirrored, they are not affected by a laser strike on the front; they must be hit on the sides or rear in order to be eliminated.",
      "PYRAMIDS: Pyramids have a single diagonal mirror and form the primary mechanism for directing the path of the laser. They are vulnerable to a hit from two of the four sides and must be defended lest the player lose their ability to build paths of any size.",
      "",
      "PRELIMS-I",
      "In each turn, player will get max 2 minutes for the next 30 seconds (-1) will be added, and for the next 30 seconds another (-1) will be added.",
      "If he/she does not make any move in the stipulated time, then and there he/she will be eliminated and the opponent shall be declared as the winner.",
      "For each warning (-3) will be added for breaking any rule (i.e. 3 warnings) participants will be then and there eliminated.",
      "Marks division: Pyramid (5), Anubis (10), Rule breaking (-3).",
      "If participant hits his/her own element, then the corresponding marks will be deducted.",
      "If the total game time exceeds 15 minutes, then another 5 minutes will be given to end the game. In this case, no marks will be deducted from any participant but they will be warned.",
      "If the match is tied, then marks will be considered, and if marks will also happen to be the same then the total time taken will be considered.",
      "",
      "PRELIMS-II",
      "Time limit for each move will be 1.5 minutes, and after that he/she will be given another 1 min to move.",
      "",
      "QUARTER FINAL, SEMIFINAL & FINAL",
      "In each turn player will get max 2 minutes for next 30 seconds (-1) will be added and for next 30 seconds another (-1) will be added.",
      "",
      "POINTS TO BE NOTED",
      "In any circumstances, if it's found that there are odd number of participants, then the last participant based on the lottery may have to play with the volunteers in the PRELIMS I.",
      "If there are more than 2n participants, some participants may get eliminated based on their scores and time taken even though they have won the round or they might have to play another round for tie-breaking after PRELIMS I.",
      "",
      "SETUPS",
      "PRELIMS: Classic",
      "QUARTER & SEMI FINALS: Imhotep",
      "FINAL: Dynasty",
      "",
      "NOTE",
      "1. The event will be held offline and is non-refundable.",
      "2. The decision of the judge shall be final and binding. We sincerely request all participants to respect and abide by the verdict in the true spirit of the event, as any disagreement or misconduct may lead to disqualification.",
    ],
    prizes: [
      { position: "1st Prize", amount: "₹7,000" },
      { position: "2nd Prize", amount: "₹4,500" },
      { position: "3rd Prize", amount: "₹2,500" },
    ],
    contact: [
      {
        name: "Board Game Master",
        phone: "+91 98765 43236",
        email: "khet@techstorm.com",
      },
      {
        name: "Strategy Coordinator",
        phone: "+91 98765 43237",
        email: "boardgames@techstorm.com",
      },
    ],
  };

  return <EventDetail eventData={eventData} />;
};

export default KhetEvent;
