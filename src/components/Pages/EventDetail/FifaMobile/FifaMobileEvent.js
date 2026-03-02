import React from "react";
import EventDetail from "../EventDetail";
import { getCloudinaryUrl } from "../../../../config/cloudinary";

const fifaMobile = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/PIXELATED%20EVENT%20MASCOTS/FIFA%20Mobile";
const fifaMobileBanner = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/event_specific_pictures/games/fifa_mobile";

const FifaMobileEvent = () => {
  const eventData = {
    eventDate: "10th and 11th April, 2026",
    previousYearImages: [
      getCloudinaryUrl(
        "pictures_of_gallery/FIFA mobile_",
        "DSC02911.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/FIFA mobile_",
        "DSC02916.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/FIFA mobile_",
        "DSC02920.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/FIFA mobile_",
        "DSC_0189.JPG",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/FIFA mobile_",
        "DSC_0191.JPG",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/FIFA mobile_",
        "IMG_7990.JPG",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/FIFA mobile_",
        "IMG_8015.JPG",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/FIFA mobile_",
        "IMG_8022.JPG",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
    ],
    name: "FIFA Mobile",
    logo: fifaMobile,
    category: "Gaming",
    breadcrumbBg: fifaMobileBanner,
    description:
      "FIFA Mobile brings the world's most popular sport to your fingertips! Compete in intense mobile football matches, build your ultimate team, and showcase your gaming skills. From tactical gameplay to lightning-fast reflexes, prove that you're the best FIFA Mobile player in the tournament. Glory awaits the champion!",
    teamSize: "Solo",
    entryFeeInternal: "₹50 per participant",
    entryFeeExternal: "₹60 per participant",
    duration: "3 Hours",
        faqs: [
          {
            q: "Which game will be used?",
            a: `EA SPORTS FC Mobile (FIFA Mobile).`
          },
          {
            q: "Which game mode will be played?",
            a: `Head-to-Head (H2H) Friendly Match.`
          },
          {
            q: "What is the match duration?",
            a: `Each match will be 6 minutes.`
          },
          {
            q: "Which team type is allowed?",
            a: `Players must use their Ultimate Team.`
          },
          {
            q: "What happens if a match disconnects?",
            a: `A rematch will be conducted based on organizer decision.`
          },
          {
            q: "What proof is required after the match?",
            a: `Winner must submit a screenshot of the result screen.`
          },
          {
            q: "Do players need to bring their own device?",
            a: `Yes, players must use their own mobile device and internet.`
          },
          {
            q: "Can players change accounts during the tournament?",
            a: `No, players must use the same account throughout the tournament.`
          },
          {
            q: "What happens in case of a draw?",
            a: `A rematch will be played until a winner is decided.`
          },
          {
            q: "Who makes the final decision in disputes?",
            a: `The tournament organizer’s decision will be final.`
          }
        ],
    venue: "Gaming Zone B",
    registerButton: {
      text: "Register Now",
    },
    rules: [
      "GENERAL GUIDELINES:",
      "Platform: EA SPORTS FC™ Mobile (FIFA Mobile).",
      "Game Mode: Head-to-Head (H2H) Friendly Match.",
      "Tournament Format: Multi-stage tournament consisting of a Group Stage (League System) followed by Knockout Rounds.",
      "Matchmaking: OVR-based matchmaking/seeding may be used where applicable.",
      "Minimum OVR Requirement: All participants must have at least an OVR of 110.",
      "",
      "DEVICE POLICY:",
      "Players must use their own mobile device.",
      "Power banks are allowed.",
      "",
      "INTERNET POLICY:",
      "Players may use the provided Wi-Fi.",
      "Players may also use their own mobile network at their own risk.",
      "",
      "ACCOUNTS:",
      "Borrowed accounts are allowed only with prior declaration during registration and consent of the account owner.",
      "",
      "FAIR PLAY POLICY:",
      "Any exploitation of bugs or glitches will result in immediate disqualification.",
      "Toxic behavior, abuse, or misconduct may lead to removal from the tournament.",
      "",
      "⏰ REPORTING TIME:",
      "Players must report 10 minutes before their scheduled match.",
      "A 5-minute grace period is allowed; failure to report results in a walkover.",
      "",
      "EVENT AUTHORITY:",
      "Decisions made by tournament organizers/referees are final and binding.",
      "",
      "EVENT TYPE:",
      "This is an offline event conducted at the event venue.",
      "",
      "REGISTRATION POLICY:",
      "Registration fees are strictly non-refundable.",
      "",
      "MATCH GUIDELINES",
      "Match Format: 1 vs 1.",
      "Team Type: Ultimate Team only.",
      "Controls: Any in-game control mode is allowed (Buttons / Gestures).",
      "Camera: Any in-game camera angle is allowed.",
      "Substitutions & Tactics: Allowed before match start only.",
      "",
      "CROSS SPAMMING RULE:",
      "Cross spamming is strictly prohibited.",
      "Maximum 1 intentional cross-to-header attempt per half.",
      "Referee’s discretion will apply in unclear situations.",
      "",
      "DISCONNECTION RULE:",
      "Within first 2 in-game minutes → Full rematch.",
      "After 2 in-game minutes → Score stands; organizers decide whether to resume or rematch.",
      "",
      "DRAW RULE:",
      "League Stage: Draws allowed.",
      "Knockout Stage: Rematch will be conducted followed by higher Group Stage goal difference (GD) count in case of another draw in the rematch.",
      "",
      "MATCH RECORDING:",
      "Organizers/players reserve the right to record matches for verification.",
      "",
      "DEVICE MALFUNCTION:",
      "Device-related issues are the player’s responsibility.",
      "No automatic rematch unless approved by organizers/referees.",
      "",
      "TOURNAMENT STRUCTURE",
      "3.1 LEAGUE STAGE (GROUP-BASED STRUCTURE)",
      "All registered players will be divided into groups based on OVR balancing.",
      "Each group will follow a League format, where players play within their group.",
      "Draws are allowed during the League Stage.",
      "Group rankings and qualification will be determined based on overall match performance, as decided by the tournament organizers.",
      "Qualified players from each group will qualify for the Knockout Rounds.",
      "",
      "3.2 KNOCKOUT ROUNDS",
      "Players who qualify from the League Stage will advance to Knockout Rounds.",
      "From the Knockout Rounds onwards, matches will follow a Home & Away (Two-Leg) System.",
      "Each knockout pairing will consist of:",
      "One Home match",
      "One Away match",
      "Winner Determination:",
      "The player with the higher aggregate score across both matches will advance.",
      "If Aggregate Score is Tied:",
      "The player with more home goals will be declared the winner.",
      "If still tied, one deciding match will be played conducted by a toss of who gains home advantage.",
      "If the rematch also ends in a draw, the winner will be decided by the group stage higher goal difference (GD) count.",
      "Knockout rounds will continue until the Final.",
      "",
      "FINAL MATCH RULES",
      "The Final will be played in a Best of 3 format.",
      "The first player to win 2 matches will be declared the Champion.",
      "If a match in the Final is disconnected, only that particular match will be replayed.",
      "All general and match guidelines remain applicable during the Final.",
      "",
      "FINAL AUTHORITY CLAUSE",
      "The decision of the TechStorm Tournament Management Team will be final and binding in all matters, including but not limited to match outcomes, rule interpretations, disputes, and unforeseen situations.",
    ],
    prizes: [
      { position: "1st Prize", amount: "₹8,000" },
      { position: "2nd Prize", amount: "₹5,000" },
      { position: "3rd Prize", amount: "₹3,000" },
    ],
    contact: [
      {
        name: "Mobile Gaming Head",
        phone: "+91 98765 43234",
        email: "fifa@techstorm.com",
      },
      {
        name: "Match Coordinator",
        phone: "+91 98765 43235",
        email: "mobile@techstorm.com",
      },
    ],
  };

  return <EventDetail eventData={eventData} />;
};

export default FifaMobileEvent;
