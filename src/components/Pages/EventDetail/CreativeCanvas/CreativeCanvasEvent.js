import React from "react";
import EventDetail from "../EventDetail";
import { getCloudinaryUrl } from "../../../../config/cloudinary";

const creativeCanvas = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/PIXELATED%20EVENT%20MASCOTS/CREATIVE%20CANVAS";
const creativeCanvasBanner = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox/event_specific_pictures/creative/creative_canvas";

const CreativeCanvasEvent = () => {
  const eventData = {
    eventDate: "11th April, 2026",
    previousYearImages: [
      getCloudinaryUrl(
        "pictures_of_gallery/Creative Canva_",
        "DSC_0095 (1).JPG",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Creative Canva_",
        "DSC_0097.JPG",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Creative Canva_",
        "DSC_0098.JPG",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Creative Canva_",
        "DSC_0099.JPG",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Creative Canva_",
        "DSC_0103.JPG",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Creative Canva_",
        "DSC_0105.JPG",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Creative Canvas",
        "IMG_8186.JPG",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
    ],
    name: "Creative Canvas",
    logo: creativeCanvas,
    category: "Creative",
    breadcrumbBg: creativeCanvasBanner,
    description:
      "Creative Canvas is a digital art and design competition where imagination knows no bounds. Create stunning visual content using graphic design tools, photo manipulation, or digital illustration. From poster design to logo creation, UI/UX mockups to digital art, showcase your creative genius and design thinking. Theme will be revealed on the event day!",
    teamSize: "Max 2 Members (Solo or Duo)",
    entryFeeInternal: "₹100 per team",
    entryFeeExternal: "₹150 per team",
    duration: "3 Hours",
    venue: "Design Studio",
    registerButton: {
      text: "Register Now",
    },
    rules: [
      "Creative Canvas is a dynamic poster-making competition for students to showcase their artistic talent, visual storytelling, and innovative thinking. Step forward, create fearlessly, and elevate your design journey!",
      "",
      "",
      "Team Size: Max 2 members (Solo or Duo)",
      "Registration fees- ₹100/- (BPPIMT) | ₹150/- (Outside)",
      "Eligibility- Open to all students from all Years",
      "Rounds- 2 rounds – Prelims & Final Round.",
      "The registration fee is non-refundable under any circumstances.",
      "",
      "PRELIMS",
      "Prelims will be held before ..............",
      "",
      "SUBMISSION (PRELIMS)",
      "1. A 15-minute screen-recorded video (without any cuts) showcasing your complete designing process and skills on the given topic.",
      "2. Your design as .jpeg/.jpg/.png.",
      "3. The above media should be uploaded to your google drive in a folder and its link should be submitted through the google form provided.",
      "4. Upload the raw photoshop file (.psd file) / In case of Canva or Figma users they have to share the editable link with Coordinators.",
      "",
      "ELIMINATION CRITERIA (PRELIMS)",
      "1. Usage of any pre-made template of photoshop file is strictly forbidden.",
      "2. If the access of the link is not available to us the participant/group will be eliminated",
      "3. Show your working skills in the video. If you have used any unfair means/the video isn’t convincing enough, then the participant/group will be eliminated.",
      "4. If Plagiarism is found, then the participant/group will be eliminated.",
      "",
      "FINAL ROUND",
      "Duration: 2 hrs",
      "Venue- BPPIMT Campus.",
      "Photoshop/Online Designing Platforms will be provided by the Campus Computers (Participants can bring their own computer peripherals in case of any difficulty faced on our systems).",
      "For any Other Software/Designing Platforms participants should bring their own device (Participants CANNOT use their own device for using Photoshop/Online Designing Platforms).",
      "In Finals, Opening of youtube or seeing any tutorial is strictly forbidden.",
      "Teams are responsible for their own data backup/data loss.",
      "",
      "SUBMISSION (FINALS)",
      "1. Make a folder with your group name at your allotted computer. There upload and save the following: -",
      "2. The design .jpeg/.jpg/.png.",
      "3. Screen Recording of your screen.",
      "",
      "# Bring your own Data Transfer Cable",
      "",
      "ELIMINATION CRITERIA (FINALS)",
      "1. If folder name is anything except Group/team name, then the participant/group will be eliminated.",
      "2. If Plagiarism is found, then the participant/group will be eliminated.",
      "3. If anyone uses their Personal Device for Photoshop/Online Designing Platforms, then the participant/group will be eliminated.",
    ],
    faqs: [
      {
        q: "What is Creative Canvas?",
        a: `Creative Canvas is a poster-making competition where participants express ideas visually through artistic and design skills on a given theme.`
      },
      {
        q: "Who can participate?",
        a: `The competition is open to all registered students/participants of the event (as per organizer eligibility rules).`
      },
      {
        q: "What is the theme of the competition?",
        a: `The theme will be announced prior to the start of the competition (or on the spot, depending on event format).`
      },
      {
        q: "What is the time limit?",
        a: `Participants will have a fixed duration (e.g., 1–2 hours) to complete their poster.`
      },
      {
        q: "What are the judging criteria?",
        a: `Posters will be judged based on:\n- Creativity & originality\n- Relevance to theme\n- Visual impact\n- Presentation & neatness\n- Message clarity`
      },
      {
        q: "Can participants work in teams?",
        a: `Yes.`
      },
      {
        q: "What happens if someone is late?",
        a: `Late arrivals may receive reduced time or may not be allowed to participate (as per rules).`
      },
      {
        q: "Will there be prizes?",
        a: `Yes. Winners will receive prizes as decided by organizers.`
      },
      {
        q: "Who should participants contact for queries?",
        a: `Participants may contact the event coordinator/organizing committee for clarification.`
      }
    ],
    prizes: [
      { position: "1st Prize", amount: "₹12,000" },
      { position: "2nd Prize", amount: "₹8,000" },
      { position: "3rd Prize", amount: "₹5,000" },
    ],
    contact: [
      {
        name: "Design Head",
        phone: "+91 98765 43228",
        email: "creative@techstorm.com",
      },
      {
        name: "Art Director",
        phone: "+91 98765 43229",
        email: "canvas@techstorm.com",
      },
    ],
  };

  return <EventDetail eventData={eventData} />;
};

export default CreativeCanvasEvent;
