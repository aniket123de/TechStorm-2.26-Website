import React from "react";
import EventDetail from "../EventDetail";
import { getCloudinaryUrl } from "../../../../config/cloudinary";

const hackStorm = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/PIXELATED%20EVENT%20MASCOTS/HACKSTORM";
const hackStormBanner = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/event_specific_pictures/hackstorm/hstorm";

const HackStormEvent = () => {
  const eventData = {
    eventDate: "9th April, 2026",
    previousYearImages: [
      getCloudinaryUrl(
        "pictures_of_gallery/Hackstrom",
        "DSC02934.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Hackstrom",
        "DSC02938.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Hackstrom",
        "DSC02946.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Hackstrom",
        "DSC02947.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Hackstrom",
        "IMG_8057.JPG",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
    ],
    name: "Hack Storm",
    logo: hackStorm,
    category: "Coding",
    breadcrumbBg: hackStormBanner,
    description:
      "HackStorm is a learning-driven, build-focused hackathon designed to help participants experiment, collaborate, and strengthen their technical and problem-solving skills through an intensive in-person development experience.",
    teamSize: "2-4 Members",
    isFree: true,
    duration:
      "10:00-(6:30 – 7:00) Coding | (6:30 – 7:00) – 8:00 Judging & Prize Declaration",
    venue: "Main Auditorium",
        faqs: [
          {
            q: "Who can participate?",
            a: `Participation is restricted to currently enrolled college or university students only.`
          },
          {
            q: "Why should I participate?",
            a: `HackStorm is a learning-driven, build-focused hackathon designed to help participants experiment, collaborate, and strengthen their technical and problem-solving skills through an intensive in-person development experience.`
          },
          {
            q: "Is there an entry fee?",
            a: `No. This is a completely free offline hackathon.`
          },
          {
            q: "What is the team size? Can I participate without a team?",
            a: `Teams must follow the size limits specified during registration. Solo participation is allowed only if permitted within those limits.`
          },
          {
            q: "What should I bring to the event?",
            a: `Participants must bring their own laptops, chargers, and any required hardware or accessories needed for development.`
          },
          {
            q: "What will we build during the hackathon?",
            a: `The hackathon is open-ended with a set of predefined tracks and problem areas shared in advance. Teams are free to build creative solutions within those tracks during the hacking period.`
          },
          {
            q: "How is the judging process conducted?",
            a: `Projects are evaluated based on technology, design, completion, and learning. A panel of judges will review each project through live demonstrations and technical evaluation to determine the winners.`
          },
          {
            q: "I cannot travel. Is there any way I could participate?",
            a: `No. This is an offline event and requires physical presence at the venue for participation.`
          }
        ],
    devfolioSlug: "hack-storm",
    rules: [
      "HACKSTORM HACKATHON RULES",
      "",
      "THIS IS AN OFFLINE EVENT WITH NO ENTRY FEE",
      "",
      "Spirit of the Competition",
      "Hackathons are learning-driven build marathons. Participants compete, experiment, collaborate, and expand their technical ability. Every participant is expected to uphold a constructive environment, support peers, share knowledge when appropriate, and maintain professional conduct throughout the event.",
      "",
      "Eligibility",
      "Participation is restricted to currently enrolled college or university students only.",
      "Professionals, full-time industry employees, and graduates beyond student status are not eligible to compete.",
      "Organizers, coordinators, judges, sponsors, mentors, or any individual in a privileged or administrative role at the event may not participate as hackers.",
      "",
      "Team Participation",
      "All team members must actively contribute to the project during the hackathon.",
      "Teams may seek advice and guidance from organizers, mentors, sponsors, and other participants.",
      "Collaboration across teams for learning and debugging support is allowed, but project ownership must remain with the original team.",
      "",
      "Project Development Rules",
      "All core work on the project must be completed during the official hackathon duration.",
      "Teams may enter with pre-existing ideas or concepts.",
      "Teams may build projects that already exist elsewhere. Originality of idea is not mandatory; execution and effort during the event are the focus.",
      "Any code, assets, models, or project materials developed before the hackathon are strictly prohibited from reuse.",
      "If any portion of the submitted project is found to have been developed before the event, the team will be disqualified.",
      "Use of libraries, frameworks, APIs, and open-source tools is permitted.",
      "Creating or open-sourcing a project prior to the event for the purpose of reusing it during the event is prohibited and will result in disqualification.",
      "Development must stop once the official hacking period ends.",
      "Minor debugging and small fixes are allowed after time ends only if required for demo stability. Adding features or making substantial changes after time ends is not permitted.",
      "All submitted code must be made publicly accessible in a repository.",
      "Submitted code must remain public after the event to remain eligible for awards or recognition.",
      "",
      "AI Tools and Code Generation",
      "Use of artificial intelligence tools for coding assistance, debugging, image generation, design, documentation, or ideation is permitted.",
      "Teams must transparently disclose any AI tools used in their project.",
      "AI assistance must support human-built work. Fully generated submissions with no meaningful human implementation risk penalty or disqualification at organizer discretion.",
      "",
      "Mentoring Reviews",
      "Two structured mentoring reviews will take place during the hacking period. Mentors will visit each team to review project direction, implementation progress, and technical challenges.",
      "ROUND 1: 11:30 AM – 12:30 PM",
      "Focus: architecture, feasibility, and scope alignment.",
      "ROUND 2: 4:30 PM – 5:30 PM",
      "Focus: implementation progress, core functionality, and stability toward final demo.",
      "Teams are expected to present their current architecture, development status, and core functionality during these reviews and incorporate feedback to ensure steady progress toward a functional final demonstration.",
      "",
      "Demo Requirements",
      "Every team is expected to present a working demonstration of what was built.",
      "Demonstrations may be live or pre-recorded depending on event format.",
      "The demo must showcase actual functionality developed during the hackathon period.",
      "If a project is incomplete or partially broken, teams are still expected to demonstrate progress and explain implementation and learnings.",
      "Presentation slides alone are not considered a valid submission without demonstration of built functionality.",
      "",
      "",
      "JUDGING CRITERIA ———————————",
      "",
      "Projects will be evaluated equally across the following criteria:",
      "Technology: Technical complexity, implementation depth, and effective use of tools, frameworks, or systems. Judges evaluate how challenging the build was and how effectively it was executed.",
      "Design: User experience, interface clarity, usability, and interaction design. Visual polish is secondary to functional usability and thoughtful interaction.",
      "Completion: Stability and functionality of the submitted project. Judges assess whether the intended core features were implemented and operational.",
      "Learning: Evidence of skill expansion and technical exploration. Teams that attempt unfamiliar technologies or push beyond prior experience receive positive evaluation.",
      "Judging does not consider: Code cleanliness or production readiness, business viability or commercial potential, marketing or pitch quality, idea originality alone.",
      "",
      "Disqualification Rules",
      "Teams may be disqualified for any of the following:",
      "Reusing code, assets, or project components created before the hackathon.",
      "Submitting a project substantially developed prior to the event.",
      "Violating eligibility rules or misrepresenting student status.",
      "Failing to make code publicly accessible when required.",
      "Continuing development after the official hacking period beyond minor debugging.",
      "Plagiarism or unauthorized use of another team’s work.",
      "Misconduct, harassment, or behavior that disrupts the event environment.",
      "Providing false information regarding AI tool usage or project development.",
      "Any unsportsmanlike conduct or rule violations at organizer discretion.",
      "Organizer decisions on disqualification are final.",
      "",
    ],
    prizes: [],
    contact: [
      {
        name: "Hack Coordinator",
        phone: "+91 98765 43212",
        email: "hackstorm@techstorm.com",
      },
      {
        name: "Tech Support",
        phone: "+91 98765 43213",
        email: "support@techstorm.com",
      },
    ],
  };

  return <EventDetail eventData={eventData} />;
};

export default HackStormEvent;
