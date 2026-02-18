import React from "react";
import EventDetail from "../EventDetail";
import codeBee from "../../../../assets/img/PIXELATED EVENT MASCOTS/CODE BEE.png";
import codeBeeGif from "../../../../assets/img/event_specific_pictures/codebee/codebeefibg.gif";
import { getCloudinaryUrl } from "../../../../config/cloudinary";

const CodeBeeEvent = () => {
  const galleryImages = [
    getCloudinaryUrl(
      "pictures_of_gallery/Codebee",
      "DSC03087.jpeg",
      "w_800,h_600,c_fill,q_auto:good,f_auto",
    ),
    getCloudinaryUrl(
      "pictures_of_gallery/Codebee",
      "DSC03090.jpeg",
      "w_800,h_600,c_fill,q_auto:good,f_auto",
    ),
    getCloudinaryUrl(
      "pictures_of_gallery/Codebee",
      "DSC03091.jpeg",
      "w_800,h_600,c_fill,q_auto:good,f_auto",
    ),
    getCloudinaryUrl(
      "pictures_of_gallery/Codebee",
      "DSC03092.jpeg",
      "w_800,h_600,c_fill,q_auto:good,f_auto",
    ),
  ];
  const eventData = {
    name: "Code-Bee",
    logo: codeBee,
    category: "Coding",
    breadcrumbBg: codeBeeGif,
    description:
      "Code-Bee is an engaging offline coding event that tests your logical thinking, mathematical skills, and programming fundamentals. Dive into challenging problems, crack smart algorithms, and showcase your problem-solving abilities. Unravel coding secrets and emerge with the best algorithm!",
    teamSize: "Max 2 Members (Solo or Duo)",
    duration: "3 Hours",
    venue: "Computer Lab A",
    entryFeeInternal: "₹80 per team",
    entryFeeExternal: "₹100 per team",
    qrCode: "", // Add QR code image path here
    paymentLink: "", // Add online payment link here
    registerButton: {
      text: "Register Now",
      link: "https://unstop.com/your-codebee-link", // Replace with actual Unstop registration link
    },
    // galleryImages is not a prop for EventDetail, must use previousYearImages
    previousYearImages: galleryImages,
    rules: [
      "GENERAL INFORMATION",
      "Event Name: CodeBee 2.26",
      "Team Size: Max 2 Members (Solo or Duo)",
      "Eligibility: Open to students from all years and streams",
      "",
      "REGISTRATION FEES & REFUND POLICY",
      "BPPIMT Students (Internal): ₹80",
      "External Students: ₹100",
      "Mixed Teams: Teams comprising one BPPIMT student and one External student are categorized as External for the event but are eligible for the discounted fee of ₹80",
      "Note: Cross-college teams are allowed",
      "Refund Policy: Registration fees are strictly non-refundable",
      "Verification: A valid College ID Card or Library Card is mandatory. Participants must produce this for verification during the Preliminary Round",
      "",
      "EVENT SCHEDULE & ROUNDS",
      "Note: On-campus presence is mandatory for verification and participation in all rounds",
      "",
      "ROUND 1: MINDMAZE (Prelims)",
      "Mode: Offline (Computer Labs / BYOD)",
      "Platform: Unstop (Proctored)",
      "Format: 35 Questions in 45 Minutes",
      "Syllabus: MCQs on Logic, Aptitude, Pseudocode (C/C++), Output Guessing, Computer Basics, and History",
      "Schedule for Internal (BPPIMT) Students:",
      "Date: April 7, 2026 | Time: 1:00 PM – 2:00 PM",
      "Important Note for Mixed Teams: An Internal student belonging to a Mixed Team may choose to attempt this round solo during this slot (without their external partner). If they choose this option, the score obtained will be the final score for the team. No further attempts will be allowed during the External slot on April 10",
      "Schedule for External Students:",
      "Date: April 10, 2026 | Time: 09:00 AM – 10:00 AM",
      "",
      "ROUND 2: CODE SPRINT",
      "Date: April 10, 2026 | Time: 11:00 AM – 12:00 PM",
      "Mode: Offline (Computer Labs)",
      "Platform: Competitive Online Coding IDE (To be announced)",
      "Format: 10 Coding Questions in 60 Minutes",
      "Focus: Speed, accuracy, and basic implementation",
      "Difficulty: Easy to Medium",
      "",
      "ROUND 3: ELITE CODE CLASH (Finals)",
      "Date: April 10, 2026 | Time: 2:00 PM – 4:00 PM",
      "Mode: Offline (Computer Labs)",
      "Platform: Competitive Online Coding IDE (To be announced)",
      "Format: 5 Algorithm-Based Problems in 2 Hours",
      "Focus: Data Structures, Algorithms, and Optimization",
      "Difficulty: Medium to Hard",
      "",
      "DEVICE & NETWORK POLICY",
      "Lab Computers: College lab computers connected to LAN/Wi-Fi will be provided",
      "BYOD (Bring Your Own Device): Participants are permitted to bring their own laptops. Requirements: You must declare this preference during registration. Laptops must be fully charged",
      "Internet: BYOD participants must arrange their own stable internet connection (e.g., mobile hotspot)",
      "Disclaimer: No extra time will be given for internet connectivity issues or technical delays on personal devices",
      "Stationery: Participants must bring their own pens. Blank paper for rough work will be provided by the organizers",
      "",
      "STRICT ANTI-CHEATING POLICY",
      "Browser: Only Google Chrome is allowed",
      "Extensions: All browser extensions must be disabled. The usage of any extension is strictly prohibited",
      "AI Tools: The use of Generative AI tools (ChatGPT, GitHub Copilot, Gemini, Blackbox AI, etc.) is strictly prohibited",
      "Tab Switching: The contest platform tracks window activity. Penalty: Any attempt to switch tabs, open new windows, or minimize the browser will result in a warning",
      "Disqualification: After 2 warnings, the test will be auto-submitted, and the team will be disqualified",
      "Gadgets: Mobile phones, smartwatches, and tablets are banned during the coding phase. Exception: Phones used strictly for hotspots must be kept face down on the desk and cannot be touched during the round",
      "Monitoring: Volunteers reserve the full right to inspect your system at any point during the exam if suspicious activity is observed",
      "Plagiarism: All code submissions will pass through a plagiarism detector. Copying from other teams or online sources will lead to immediate disqualification",
      "",
      "SCORING & TIE-BREAKERS",
      "Scoring: Points are awarded based on the number of test cases passed",
      "Tie-Breaker: In case of a tie in total scores, the team with the lower total time taken (sum of submission times) will be ranked higher",
      "Progression: Only participants who clear the previous round will proceed to the next",
      "Disputes: The decision of the Event Coordinators and Faculty In-charge will be final and binding",
    ],
    prizes: [
      { position: "1st Prize", amount: "₹15,000" },
      { position: "2nd Prize", amount: "₹10,000" },
      { position: "3rd Prize", amount: "₹5,000" },
    ],
    // Removed empty previousYearImages array to avoid overwriting galleryImages
    coordinators: [
      {
        name: "Rahul Sharma",
        role: "Event Head",
        phone: "+91 98765 43210",
        email: "rahul@techstorm.com",
        image: "", // Add coordinator image path here
      },
      {
        name: "Priya Patel",
        role: "Technical Coordinator",
        phone: "+91 98765 43211",
        email: "priya@techstorm.com",
        image: "",
      },
      {
        name: "Amit Kumar",
        role: "Volunteer",
        phone: "+91 98765 43212",
        email: "amit@techstorm.com",
        image: "",
      },
    ],
    contact: [
      {
        name: "Coordinator 1",
        phone: "+91 98765 43210",
        email: "codebee@techstorm.com",
      },
      {
        name: "Coordinator 2",
        phone: "+91 98765 43211",
        email: "tech@techstorm.com",
      },
    ],
  };

  return <EventDetail eventData={eventData} />;
};

export default CodeBeeEvent;
