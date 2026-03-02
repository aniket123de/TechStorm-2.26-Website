import React from "react";
import EventDetail from "../EventDetail";
import { getCloudinaryUrl } from "../../../../config/cloudinary";

const roTerrance = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/PIXELATED%20EVENT%20MASCOTS/RO-TERRANCE";
const roTerranceBanner = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/event_specific_pictures/robotics/ro_terrance";

const RoTerranceEvent = () => {
  const eventData = {
    eventDate: "10th and 11th April, 2026",
    previousYearImages: [
      getCloudinaryUrl(
        "pictures_of_gallery/Ro Terrance_",
        "DSC02725.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Ro Terrance_",
        "DSC02726.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Ro Terrance_",
        "DSC02731.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Ro Terrance_",
        "DSC02735.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Ro Terrance_",
        "DSC02835.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Ro Terrance_",
        "DSC02836.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Ro Terrance_",
        "DSC02839.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
    ],
    name: "Ro-Terrance",
    logo: roTerrance,
    category: "Robotics",
    breadcrumbBg: roTerranceBanner,
    description:
      "Ro-Terrance is an all-terrain robot challenge that tests your bot's ability to traverse various obstacles and challenging terrains. From steep inclines to narrow bridges, sand pits to rocky paths, your robot must conquer it all. Design a versatile, robust robot with exceptional mobility to emerge victorious in this grueling test of mechanical engineering.",
    teamSize: "2-5 Members",
    entryFeeInternal: "₹350 per team",
    entryFeeExternal: "₹400 per team",
    duration: "3 Hours",
    venue: "Outdoor Arena",
    registerButton: {
      text: "Register Now",
    },
    rules: [
      "BOT SPECIFICATIONS:",
      "The dimension of the bot must not exceed  30 cm (no tolerance) throughout the event.",
      "The maximum weight of the bot must not exceed 3 Kg (no tolerance).",
      "The maximum allowable voltage for the bot is 18V.",
      "Use of LEGO kits is strictly prohibited.",
      "Autonomous bots based on microcontrollers are not allowed.",
      "",
      "GENERAL RULES (COMMON FOR PRELIMS & FINALS):",
      "This is a team event. The maximum number of participants allowed in a team is 5.",
      "All the team members must carry their individual college ID card.",
      "A participant cannot be a member of 2 different teams in this event.",
      "A controller/driver can't operate multiple bots.",
      "No trial runs will be provided.",
      "A single bot cannot be used by multiple teams (exception for bots provided by BPPIMT).",
      "Any action violating fair play will lead to immediate disqualification.",
      "The decision of the coordinators will be final.",
      "In case of disqualification, no refund will be provided.",
      "In case of a tie, the event heads’ decision will be final.",
      "Rules may be modified after the commencement of the event.",
      "LEGO kits or spare parts are not allowed, but participants can use ready-made gearboxes or bases.",
      "No restarts are allowed.",
      "The bot can be controlled by only one participant in both prelims and finals.",
      "The bots can be powered onboard as well as offboard. In case of off-board power supply, the wires must be slacked all the time.",
      "The main chassis should be the same throughout the event.",
      "A controller/driver can't operate multiple bots.",
      "The bot will start at a designated point and must navigate through obstacles to reach the finish line.",
      "",
      "PRELIMS RULES:",
      "The arena will contain obstacles like sand, bumpers, water, and a net-bridge. Water depth: 3â€“4 cm.",
      "Each team gets one technical timeout of 2 minutes in case of any issue in the bot.",
      "Each team will be provided 2 free hand touch. After the free hand touches are over some *negative points will be added from the next hand touch.",
      "Some certain obstacles are having negative points. If the bot touches that obstacles then the *negative points will be added.",
      "Certain mandatory tasks must be completed; assistance will be provided with penalties if the bot is stuck.",
      "Skipping only obstacle will result in *negative points or added time.",
      "Leaving the track results in a *penalty.",
      "Only the time measured by organizers is final; participant-measured times will not be accepted.",
      "Final score measuring criterium will be same for both prelims and finals i.e , total time to complete the track and each penalty & failure to complete task will add extra penalty time to â€˜time for completionâ€™. Less time is better .",
      "",
      "FINALS RULES:",
      "All the prelims rules will be continued in the finals as well.",
      "The top 8/16 teams of the preliminary round will move on to the finals, facing a modified arena.",
      "In the finals it will be a closed door event so the only team is participating can stay in the arena and other teams will stay back.",
      "The arena will be subject to modifications in the final round.",
      "Teams should be attend in the time slot given by the organizers, Otherwise it will lead the team to disqualify.",
    ],
    faqs: [
      {
        q: "What is the objective of the event?",
        a: `Participants must design and operate a robot that can successfully cross different obstacles and reach the finish line in minimum time.`
      },
      {
        q: "How many members can be in a team?",
        a: `Each team must have at least 2 and at most 5 members.`
      },
      {
        q: "Can one person control multiple robots?",
        a: `No. One controller can operate only one bot during the event.`
      },
      {
        q: "Is an autonomous robot allowed?",
        a: `No. The robot must be manually controlled. Autonomous bots are strictly prohibited.`
      },
      {
        q: "What are the size and weight limits?",
        a: `Maximum dimensions: 30 × 30 cm\nMaximum weight: 3 kg\nThese limits must not be exceeded at any time.`
      },
      {
        q: "What power supply is allowed?",
        a: `The maximum allowed voltage is 18V. Bots can use onboard or offboard power (wires must remain slack if offboard).`
      },
      {
        q: "Are LEGO kits allowed?",
        a: `No. LEGO kits and their spare parts are not permitted.`
      },
      {
        q: "Can we test our robot on the track before the run?",
        a: `No. Trial runs are not provided.`
      },
      {
        q: "What obstacles will the robot face?",
        a: `Possible obstacles include:\nSand patches\nBumpers\nWater section (3–4 cm deep)\nNet bridge`
      },
      {
        q: "Are hand touches allowed?",
        a: `Yes. Each team gets 2 free hand touches. Additional touches will result in penalties.`
      },
      {
        q: "Can we skip an obstacle?",
        a: `Skipping an obstacle results in penalty points or added time.`
      },
      {
        q: "What happens if the robot leaves the track?",
        a: `Leaving the track leads to a penalty.`
      },
      {
        q: "Is there a timeout if the robot stops working?",
        a: `Yes. Each team is allowed one technical timeout of 2 minutes.`
      },
      {
        q: "How is the winner decided?",
        a: `The final score is based on:\nTotal completion time + penalty time\nThe team with the lowest final time wins.`
      },
      {
        q: "What happens if teams tie?",
        a: `The final decision will be made by the event coordinators.`
      },
      {
        q: "Do prelims and finals have different rules?",
        a: `No. Finals follow the same rules but with a modified arena. Only top teams qualify.`
      },
      {
        q: "Can rules change during the event?",
        a: `Yes. Organizers reserve the right to modify rules if necessary.`
      }
    ],
    prizes: [
      { position: "1st Prize", amount: "â‚¹18,000" },
      { position: "2nd Prize", amount: "â‚¹12,000" },
      { position: "3rd Prize", amount: "â‚¹7,000" },
    ],
    contact: [
      {
        name: "Terrain Master",
        phone: "+91 98765 43226",
        email: "roterrance@techstorm.com",
      },
      {
        name: "Field Coordinator",
        phone: "+91 98765 43227",
        email: "terrain@techstorm.com",
      },
    ],
  };

  return <EventDetail eventData={eventData} />;
};

export default RoTerranceEvent;
