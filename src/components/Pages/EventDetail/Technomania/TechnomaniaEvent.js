import React from "react";
import EventDetail from "../EventDetail";
import { getCloudinaryUrl } from "../../../../config/cloudinary";

const technomania = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/PIXELATED%20EVENT%20MASCOTS/TECHNOMANIA";
const technomaniaBanner = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/event_specific_pictures/technomania/technomania";

const TechnomaniaEvent = () => {
  const eventData = {
    eventDate: "9th April, 2026",
    previousYearImages: [
      getCloudinaryUrl(
        "pictures_of_gallery/Technomania",
        "DSC02745.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Technomania",
        "DSC02752.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Technomania",
        "DSC02753.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Technomania",
        "DSC02762.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Technomania",
        "DSC02764.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Technomania",
        "DSC02765.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Technomania",
        "DSC02768.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Technomania",
        "DSC02770.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Technomania",
        "DSC02778.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Technomania",
        "DSC02779.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Technomania",
        "DSC03075.jpeg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
    ],
    name: "TechnoMania",
    logo: technomania,
    category: "Coding",
    breadcrumbBg: technomaniaBanner,
    description:
      "TechnoMania 2026 is a hands-on innovation challenge. Build and present a working model that uses AI for sustainable development. Compete, create, and showcase your solution in this single-round, offline event! Bring your best ideas and teamwork. Exciting prizes and recognition await the top innovators.",
    teamSize: "1-4 Members",
    entryFeeInternal: "₹200 per team",
    entryFeeExternal: "₹250 per team",
    duration: "Single Round",
    venue: "VIP Campus, B. P. Poddar Institute of Management and Technology",
    registerButton: {
      text: "Register Now",
    },
    rules: [
      "THEME: ROLE OF ARTIFICIAL INTELLIGENCE IN SUSTAINABLE DEVELOPMENT",
      "",
      "VENUE: VIP CAMPUS, B. P. PODDAR INSTITUTE OF MANAGEMENT AND TECHNOLOGY",
      "",
      "Welcome to TECHNO MANIA 2026, the flagship technical innovation event of the VIP Campus, B. P. Poddar Institute of Management and Technology.",
      "This year, we invite aspiring innovators, developers, and problem-solvers to explore how Artificial Intelligence can drive Sustainable Development and shape a smarter, greener future. It is an offline, single-round technical competition that challenges participants to design and present innovative solutions integrating both hardware and software components.",
      "Participants are expected to develop a working model that demonstrates a real-world application aligned with the theme.",
      "",
      "BASIC RULES",
      "The competition will be conducted offline at the VIP Campus, Kolkata.",
      "It is a single-round competition.",
      "Participation is open to: Teams (Maximum 4 members per team) or Individual",
      "Registration is mandatory for all participants.",
      "Registration fees are non-refundable under any circumstances.",
      "Only registered participants are allowed to present the project.",
      "Teams must adhere strictly to the theme: “Role of Artificial Intelligence in Sustainable Development.”",
      "",
      "PROJECT AND MODEL GUIDELINES",
      "The project must strictly align with the theme: Role of Artificial Intelligence in Sustainable Development.",
      "Broad topic domains will be shared by the organizing committee.",
      "The model must integrate both Hardware and Software components.",
      "The demonstrated project should be working properly in order to successfully qualify, unable to demonstrate the project by any means will lead to disqualification.",
      "Purely software-based or purely hardware-based projects will not be accepted.",
      "The solution must demonstrate a real-world, practical, and scalable application.",
      "Any pre-built/open-source tools used must be clearly mentioned in the presentation.",
      "Participants are responsible for bringing all required materials, components, and extensions. Any sort of requests for parts or assistance won’t be entertained.",
      "",
      "PRESENTATION RULES",
      "Each team must prepare a PowerPoint Presentation.",
      "The presentation must include:",
      "Problem Statement",
      "Objectives",
      "System Architecture (Hardware + Software)",
      "Working Methodology",
      "Innovation Highlights",
      "Sustainability Impact",
      "Future Scope",
      "Only registered team members are allowed to present. Make sure all team members must be present at the time of demonstration.",
      "Time limits (presentation + Q&A) must be strictly followed.(-to be notified later)",
      "Projects will be judged based on Innovation & Creativity, Technical Implementation & Functionality, Sustainability Impact, Practical Feasibility, and Presentation & Communication Skills.",
      "Judges’ decisions will be final and binding.",
      "",
      "CODE OF CONDUCT",
      "Participants must maintain discipline and professional behaviour.",
      "Any misconduct, damage to property, or unfair means will result in disqualification.",
      "The organizing committee reserves the right to modify rules if necessary.",
      "The decision of the organizing committee and judges will be final.",
      "Any further information regarding guidelines to be notified through events website.",
      "STAY TUNED!",
    ],
    faqs: [
      {
        q: "Who can participate in TECHNO MANIA 2026?",
        a: `The competition is open to students from BPPIMT as well as other institutions.`
      },
      {
        q: "Can I participate individually?",
        a: `Yes. Participation is open for both individuals and teams.`
      },
      {
        q: "What is the maximum team size?",
        a: `A team can have a maximum of 4 members.`
      },
      {
        q: "Is the event online or offline?",
        a: `The event will be conducted offline (on-campus) at VIP Campus, Kolkata.`
      },
      {
        q: "What is the registration fee?",
        a: `₹100 – For BPPIMT Students\n₹120 – For Students from Other Institutions\nRegistration fees are non-refundable.`
      },
      {
        q: "What type of project is required?",
        a: `Participants must develop a functional working model that integrates hardware components, software components, and Artificial Intelligence concepts aligned with the theme.`
      },
      {
        q: "Is only software-based or only hardware-based project allowed?",
        a: `No. The model must combine both hardware and software integration.`
      },
      {
        q: "What should be included in the PowerPoint presentation?",
        a: `• Problem Statement\n• Objectives\n• System Architecture (Hardware + Software Integration)\n• Working Methodology\n• Innovation Highlights\n• Sustainability Impact\n• Future Scope`
      },
      {
        q: "Can someone else present the project on behalf of the team?",
        a: `No. The project must be presented only by the registered participant(s).`
      },
      {
        q: "How will the projects be judged?",
        a: `Projects will be evaluated based on:\n• Innovation & Creativity\n• Technical Functionality\n• Sustainability Impact\n• Presentation & Communication Skills`
      },
      {
        q: "What kind of topics can we choose?",
        a: `Broad topic domains will be shared by the organizing committee. Projects must demonstrate real-world application, measurable sustainability impact, and scalability.`
      },
      {
        q: "Do we need to bring our own hardware components?",
        a: `Yes. Participants are responsible for arranging and bringing their own project components and setup materials.`
      },
      {
        q: "Will certificates be provided?",
        a: `Yes. Participation certificates will be provided. Details about winners’ awards will be shared by the organizing committee.`
      },
      {
        q: "Why should I participate?",
        a: `• Showcase your technical skills\n• Apply AI to solve real sustainability challenges\n• Compete with innovative minds\n• Gain recognition and exposure`
      },
      {
        q: "Can 2 or 3 members participate as a group?",
        a: `Yes. This event allows participation as an individual, a 2-member team, a 3-member team, or a maximum 4-member group.`
      }
    ],
    prizes: [
      { position: "1st Prize", amount: "To be announced" },
      { position: "2nd Prize", amount: "To be announced" },
      { position: "3rd Prize", amount: "To be announced" },
    ],
    contact: [
      {
        name: "Event Manager",
        phone: "+91 98765 43214",
        email: "technomania@techstorm.com",
      },
      {
        name: "Assistant Manager",
        phone: "+91 98765 43215",
        email: "events@techstorm.com",
      },
    ],
  };

  return <EventDetail eventData={eventData} />;
};

export default TechnomaniaEvent;
