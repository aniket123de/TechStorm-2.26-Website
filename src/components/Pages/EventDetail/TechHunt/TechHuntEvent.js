import React from "react";
import EventDetail from "../EventDetail";
import { getCloudinaryUrl } from "../../../../config/cloudinary";

const techHunt = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/PIXELATED%20EVENT%20MASCOTS/TECH%20HUNT";
const techHuntBanner = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/event_specific_pictures/techHunt/techhunt_banner";

const TechHuntEvent = () => {
  const eventData = {
    eventDate: "10th and 11th April, 2026",
    previousYearImages: [
      getCloudinaryUrl(
        "pictures_of_gallery/Tech- Hunt",
        "DSC02954.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Tech- Hunt",
        "DSC02955.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Tech- Hunt",
        "DSC02969.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Tech- Hunt",
        "DSC02970.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Tech- Hunt",
        "DSC02971.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Tech- Hunt",
        "DSC02972.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Tech- Hunt",
        "DSC02974.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
    ],
    name: "Tech Hunt",
    logo: techHunt,
    category: "Brain Teaser",
    breadcrumbBg: techHuntBanner,
    description:
      "Tech Hunt is an exciting treasure hunt meets tech quiz event. Navigate through campus following cryptic clues, solve technical riddles, and crack codes to reach the final destination. This event combines physical activity with mental challenges, testing both your technical knowledge and problem-solving abilities in a fun, engaging format.",
    teamSize: "3-5 Members",
    entryFee: "₹200 per team",
    duration: "3 Hours",
    venue: "Campus-wide",
        faqs: [
          {
            q: "What is the team size?",
            a: `Each team must consist of 3 to 5 members.`
          },
          {
            q: "Will answer sheets be provided?",
            a: `Yes, all required question papers and answer sheets will be provided by the committee.`
          },
          {
            q: "How many rounds are there in the event?",
            a: `There are three rounds:\nRound 1: Time Warp Trials (Pen & Paper)\nRound 2: Visual Vault (Visual-based test)\nFinal Round: Retro Run (Treasure Hunt)`
          },
          {
            q: "What is Round 1 (Time Warp Trials)?",
            a: `It is a pen-and-paper round with 10–15 questions to be solved in 30 minutes.`
          },
          {
            q: "How will teams be evaluated in Round 1 and Round 2?",
            a: `Evaluation is based on:\nTotal marks\nIf tie → Submission time\nIf still tie → Number of star-marked questions solved.`
          },
          {
            q: "What is Round 2 (Visual Vault)?",
            a: `It is a visual-based exam where teams will be shown visual questions/footage on a screen and must interpret and write the answers on the provided answer sheet within 40 minutes.`
          },
          {
            q: "What kind of visuals will be shown in Round 2?",
            a: `The visuals may represent:\nA concept\nA situation\nA process\nA clue or hidden meaning\nA technical or logical idea.`
          },
          {
            q: "What is the Final Round (Retro Run)?",
            a: `It is a treasure hunt where teams solve riddles and play different games to reach different locations and clear multiple stages with challenges.`
          },
          {
            q: "How is the winner decided in the final round?",
            a: `The team that solves the final clue and reaches the treasure in the least time wins.`
          },
          {
            q: "Are mobile phones or electronic devices allowed?",
            a: `No, use of mobile phones or any electronic devices during the rounds is strictly prohibited.`
          },
          {
            q: "What happens if a team is caught using unfair means?",
            a: `The entire team will be immediately disqualified. No appeals will be entertained.`
          },
          {
            q: "Is it compulsory for all team members to be present?",
            a: `Yes, all team members must report before the round starts, otherwise the team may be disqualified.`
          },
          {
            q: "Whom should we contact for queries?",
            a: `You can contact the Student Coordinators mentioned in the rulebook.`
          }
        ],
    registerButton: {
      text: "Register Now",
    },
    rules: [
      "Inter-college event.",
      "Team Size = 3-5 members .",
      "The questions and riddles will be based on the theme (Retroverse) of Techstorm and technical related.",
      "",
      "Preliminary Round",
      "Round 1 (Time Warp Trials)",
      "In this round team needs to solve 10-15 questions, within 30 mins. This will be a pen paper round and paper will be provided by the committee.",
      " Certain questions will be star-marked, indicating higher preference during evaluation. Solving more star-marked questions can provide an advantage in case of a tie.",
      " The decision of the Faculty Coordinator and Student Coordinator shall be final and binding.",
      " All team members are required to report before the commencement of the round. Failure to do so will result in disqualification.",
      " Evaluation Criteria : Teams will be evaluated based on their marks first. In case of a tie on marks, the submission time will be considered. If two teams have the same marks and submission time, the team with more star-marked questions solved will be selected.",
      "",
      "Round 2 (Visual Vault)",
      "Those who qualify Round 1 will proceed to Round 2.",
      "This round will be a visual-based examination.",
      "Participants will be shown visual questions on a screen.",
      "Teams need to solve the questions within 40 minutes",
      "For each question, teams must identify, interpret, and write what the visuals represents on the blank answer sheet provided by the committee.",
      "Each team must write clear and precise answers in the provided answer sheet.",
      "",
      " The footage may represent:",
      "a) A concept",
      "b) A situation",
      "c) A process",
      "d) A clue or hidden meaning",
      "e) A technical or logical idea (depending on the event theme)",
      "Solving more star-marked questions will give an advantage in tie-breaking.",
      "Evaluation Criteria : Teams will be evaluated based on their marks first. In case of a tie on marks, the submission time will be considered. If two teams have the same marks and submission time, the team with more star-marked questions solved will be selected.",
      "",
      "Treasure round (Retro Run)",
      "In this round, qualified teams will be given riddles which each team must solve to obtain the clue for the next location in the hunt. This round will consist of multiple stages, and after every stage, teams may be eliminated based on their performance.",
      "Between these stages, teams will also face special games and challenges that test their patience and thinking abilities. Successfully completing these challenges will be necessary to receive the clue for the next stage of the hunt.",
      "Elimination of the teams will be based on the time limit. After solving the final clue, the team that completes the task in the least amount of time and reaches the treasure first will be declared the winner.",
      "",
      " Discipline :",
      "I. Use of mobile phones or any electronic devices for searching answers during the preliminary rounds is strictly prohibited. If any team is found using a mobile phone or any unfair means, the entire team will be immediately disqualified from the competition. No appeals will be entertained.",
      "II. Teams must maintain discipline and ensure safety while moving around the campus during the hunt. Reckless running, causing disturbance, or creating any form of chaos is strictly prohibited. If any team is found responsible for such behavior, the entire team will be immediately disqualified.",
      "III. If any complaint is raised by any faculty member or staff regarding the misconduct, indiscipline, or inappropriate behavior of a team, that team will be immediately disqualified from the competition."
    ],
    prizes: [
      { position: "1st Prize", amount: "₹15,000" },
      { position: "2nd Prize", amount: "₹10,000" },
      { position: "3rd Prize", amount: "₹6,000" },
    ],
    contact: [
      {
        name: "Hunt Master",
        phone: "+91 98765 43218",
        email: "techhunt@techstorm.com",
      },
      {
        name: "Support Team",
        phone: "+91 98765 43219",
        email: "hunt@techstorm.com",
      },
    ],
  };

  return <EventDetail eventData={eventData} />;
};

export default TechHuntEvent;
