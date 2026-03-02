import React from "react";
import EventDetail from "../EventDetail";
import { getCloudinaryUrl } from "../../../../config/cloudinary";

const roCombat = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/PIXELATED%20EVENT%20MASCOTS/RO-COMBAT";
const roCombatBanner = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/event_specific_pictures/robotics/ro_combat";

const RoCombatEvent = () => {
  const eventData = {
    eventDate: "10th and 11th April, 2026",
    previousYearImages: [
      getCloudinaryUrl(
        "pictures_of_gallery/Combat",
        "DSC02738.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Combat",
        "DSC02848.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Combat",
        "DSC02849.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Combat",
        "DSC02850.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Combat",
        "DSC02877.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Combat",
        "DSC02884.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Combat",
        "DSC03101.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Combat",
        "DSC03102.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Combat",
        "DSC03107.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Combat",
        "DSC03108.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Combat",
        "DSC03114.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Combat",
        "DSC03116.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Combat",
        "DSC03117.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Combat",
        "IMG_8129.JPG",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
    ],
    name: "Ro-Combat",
    logo: roCombat,
    category: "Robotics",
    breadcrumbBg: roCombatBanner,
    description:
      "Ro-Combat is the ultimate robot battle arena! Build a robust combat robot and face off against opponents in intense one-on-one battles. Use strategy, engineering excellence, and clever design to disable your opponent's robot while protecting yours. Weapons, flippers, and innovative mechanisms are encouraged. May the best bot win!",
    teamSize: "2-5 Members",
    entryFee: "₹800 per team",
    duration: "4 Hours (Tournament Format)",
    venue: "Combat Arena",
    registerButton: {
      text: "Register Now",
    },
    rules: [
      "BOT SPECIFICATIONS:",
      "No dimension limit for the bot.",
      "Weight of the bot shall be 8 kg (wireless) with no weight tolerance.",
      "200 grams weight bonus for an unconventional drive system.",
      "The potential difference between any two electrical points on the robot must not exceed 25.2 volts throughout the run.",
      "Active and non-active weapons are allowed.",
      "Touching the robot during the competition is strictly prohibited.",
      "External weights or loose weights on robots are not allowed.",
      "Weapon lock mechanism is mandatory for all bots.",
      "Weapon must remain locked while handling, transporting, inspecting, or when outside the arena.",
      "Wedge-type bots must have their wedge edges properly covered with tape or protective material while outside the arena.",
      "Exposed sharp wedge edges in the pit area are not allowed.",
      "External kill switch is mandatory for all bots.",
      "Kill switch must be clearly visible and easily accessible.",
      "Kill switch must immediately cut off power to the entire robot, including drive and weapon systems.",
      "Kill switch will be tested before the match. Failure will lead to disqualification until resolved.",
      "",
      "GENERAL RULES (COMMON FOR PRELIMS & FINALS):",
      "This is a team event.",
      "This is an offline event and all participants must be physically present at the venue to compete.",
      "Registration fees once paid are strictly non-refundable and non-transferable under any circumstances.",
      "A team may comprise members from different colleges. No person shall be a member of multiple teams.",
      "Teams have to show and declare all of their bots before their first match.",
      "No bots can be shared by two teams during the event.",
      "Robots constructed using LEGO kits, their spare parts, or any other ready-made mechanism are not allowed.",
      "Use of pneumatics, hydraulics, lethal weapons like projectiles, acids, sharp cutters, strong electromagnets, tesla coil, fire, and EMP are strictly prohibited.",
      "The bot should be wireless.",
      "The right spirit of participation is expected from every participant.",
      "The decision of the judge(s) will be deemed final. A team can be disqualified on disciplinary grounds.",
      "Upon calling, any team member should report immediately to the coordinators regarding the condition of their bot to avoid disqualification.",
      "",
      "PRELIMS RULES:",
      "Each match will be conducted for a fixed time duration.",
      "The winning bot will advance to the next round.",
      "Immobility of any bot during the match will be considered defeated.",
      "Teams must follow arena safety instructions at all times.",
      "",
      "FINALS RULES:",
      "Final matches will follow the same safety and bot specifications rules.",
      "Match duration will remain the same unless specified by coordinators.",
      "Immobility of any bot during the match will be considered defeated.",
      "Referee's decision will be final.",
    ],
    prizes: [
      { position: "1st Prize", amount: "â‚¹30,000" },
      { position: "2nd Prize", amount: "â‚¹18,000" },
      { position: "3rd Prize", amount: "â‚¹10,000" },
    ],
    contact: [
      {
        name: "Combat Organizer",
        phone: "+91 98765 43222",
        email: "rocombat@techstorm.com",
      },
      {
        name: "Safety Officer",
        phone: "+91 98765 43223",
        email: "safety@techstorm.com",
      },
    ],
    faqs: [
      {
        q: "Is this an online or offline event?",
        a: `This is a completely offline event. All teams must be physically present at the venue to participate.`
      },
      {
        q: "Is the registration fee refundable?",
        a: `No. Registration fees are strictly non-refundable and non-transferable under any circumstances.`
      },
      {
        q: "Can a participant be part of more than one team?",
        a: `No. A participant cannot be a member of multiple teams.`
      },
      {
        q: "Can teams from different colleges participate together?",
        a: `Yes. A team may comprise members from different colleges.`
      },
      {
        q: "What is the maximum allowed weight of the bot?",
        a: `The bot must not exceed 8 kg (wireless) with no weight tolerance.`
      },
      {
        q: "Is there any weight bonus?",
        a: `Yes. A 200 grams weight bonus is allowed.`
      },
      {
        q: "Are active weapons allowed?",
        a: `Yes. Both active and non-active weapons are allowed, provided they follow safety rules and restrictions.`
      },
      {
        q: "Are pneumatics, projectiles, or flame weapons allowed?",
        a: `No. Pneumatics, hydraulics, projectiles, flame-based weapons, explosives, high-power magnets, EMP devices, and similar systems are strictly prohibited.`
      },
      {
        q: "Is a kill switch mandatory?",
        a: `Yes. An external kill switch is mandatory and will be tested before the match.`
      },
      {
        q: "Is a weapon lock required?",
        a: `Yes. A proper weapon lock mechanism is mandatory and must remain engaged outside the arena.`
      },
      {
        q: "Can we modify our robot during the event?",
        a: `Teams cannot change more than 30% of their robot design during the event.`
      },
      {
        q: "What happens if a bot becomes immobile during a match?",
        a: `Immobility during a fight will be considered a defeat.`
      },
      {
        q: "Can we touch the robot during the match?",
        a: `No. Touching the robot during the competition is strictly prohibited.`
      },
      {
        q: "What happens if there is an arena fault during the match?",
        a: `In case of an arena fault, the match will be paused and bots will be reset to their last position before the issue occurred.`
      }
    ],
  };

  return <EventDetail eventData={eventData} />;
};

export default RoCombatEvent;
