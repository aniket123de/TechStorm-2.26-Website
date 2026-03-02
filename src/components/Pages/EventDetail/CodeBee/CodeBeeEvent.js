import React from "react";
import EventDetail from "../EventDetail";
import { getCloudinaryUrl } from "../../../../config/cloudinary";

const codeBee = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/PIXELATED%20EVENT%20MASCOTS/CODE%20BEE";
const codeBeeGif = "https://res.cloudinary.com/ds3vepmkd/image/upload/v1772132869/codebeefibg_bdvugl.gif";

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
    eventDate: "10th April, 2026",
    description:
      "Code-Bee is an engaging offline coding event that tests your logical thinking, mathematical skills, and programming fundamentals. Dive into challenging problems, crack smart algorithms, and showcase your problem-solving abilities. Unravel coding secrets and emerge with the best algorithm!",
    teamSize: "Max 2 Members (Solo or Duo)",
    duration: "3 Hours",
    venue: "Computer Lab A",
    entryFeeInternal: "₹80 per team",
    entryFeeExternal: "₹80 per team",
    qrCode: "", // Add QR code image path here
    paymentLink: "", // Add online payment link here
    registerButton: {
      text: "Register Now",
      link: "https://unstop.com/o/4YMPlkW?utm_medium=Share&utm_source=codebtec36887&utm_campaign=Online_coding_challenge",
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
      "External Students: ₹80",
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
    faqs: [
      {
        q: "Can I participate alone?",
        a: `Yes! You can participate as a Solo participant or form a team of 2 members (Duo).`
      },
      {
        q: "Who is eligible to participate?",
        a: `CodeBee 2.26 is open to students from all streams and years (B.Tech, BCA, MCA, etc.). Whether you are a fresher or a final-year student, you are welcome to compete. Cross College is accepted.`
      },
      {
        q: "Is this an online or offline event?",
        a: `It is a offline event.\nRound 1 (Prelims): Conducted on the Unstop platform, but you must be physically present on the BPPIMT campus for verification.\nRounds 2 & 3: Completely offline in our computer labs.`
      },
      {
        q: "What is the registration fee?",
        a: `BPPIMT Students: ₹80, External Students: ₹80\nMixed Teams (1 BPPIMT + 1 External): ₹80 (Discounted rate!)`
      },
      {
        q: "I am from BPPIMT, but my teammate is from another college. Which category do we fall under?",
        a: `Your team will be categorized as an Internal Team, but you will enjoy the discounted registration fee of ₹80.`
      },
      {
        q: "Is the registration fee refundable?",
        a: `No, the registration fee is strictly non-refundable.`
      },
      {
        q: "What do I need to carry?",
        a: `You must carry a valid College ID Card or Library Card for verification and a pen.`
      },
      {
        q: "Do I need to bring my own laptop?",
        a: `It is not mandatory. We will provide college lab computers with LAN/Wi-Fi access. However, you are permitted to bring your own laptop only for prelims and you must arrange your own stable mobile hotspot. No extra time will be given for connectivity issues on personal devices.`
      },
      {
        q: "What programming languages are allowed?",
        a: `You can submit solutions in C, C++, Java, or Python.`
      },
      {
        q: "What is the round duration?",
        a: `For 1st round the duration will be 45 mins, 2nd will be 1hr mins and final round will be of 2 hrs.`
      },
      {
        q: "Is this event beneficial in enhancing my DSA skills?",
        a: `A good question. Definitely, DSA is an important part of your interviews and having a practice of it within a time limit will definitely enhance your skills.`
      },
      {
        q: "Can I use ChatGPT or GitHub Copilot?",
        a: `Absolutely NOT. The use of Generative AI tools (ChatGPT, Gemini, Blackbox AI, etc.) is strictly prohibited. If caught, your team will be immediately disqualified.`
      },
      {
        q: "What if I am an Internal student in a Mixed Team? When is my Prelims?",
        a: `You have a special option!\nYou can choose to attempt Round 1 solo during the Internal Slot (April 7, 1:00 PM).\nNote: The score you get in this solo attempt will be final for your team. You cannot re-attempt it with your partner on the External day.`
      },
      {
        q: "What happens if I switch tabs during the test?",
        a: `Our platform tracks window activity.\nWarning 1 & 2: You will receive a system warning.\n3rd Strike: The test will auto-submit, and you will be disqualified.\nAdvice: Do not switch tabs, minimize the browser, or open other applications.`
      },
      {
        q: "What will happen in case of a tie breaker?",
        a: `In case of a tie breaker between teams based on marks obtained, the team with the minimum submission time will rank higher.`
      },
      {
        q: "Will I get a participation certificate even if I don’t qualify 1st round?",
        a: `Yes, you will definitely get an e-certificate for participation and the winners will get a special hard copy certificate.`
      },
      {
        q: "Who should I contact if I face issues during registration?",
        a: `Please reach out to our Event Coordinators:\nSaikat Mondal (CSE3): 6291341212\nAdarsh Kumar (IT3): 8271238822\nMedhansh Arora (CSE3): 7003962640`
      }
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
