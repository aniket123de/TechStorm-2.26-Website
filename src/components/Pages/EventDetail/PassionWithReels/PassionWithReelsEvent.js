import React from "react";
import EventDetail from "../EventDetail";
import passionWithReels from "../../../../assets/img/PIXELATED EVENT MASCOTS/PASSION WITH REELS.png";
import passionWithReelsBanner from "../../../../assets/img/event_specific_pictures/creative/passion_with_reels.png";
import { getCloudinaryUrl } from "../../../../config/cloudinary";

const PassionWithReelsEvent = () => {
  // Convert themed rules array to plain strings for EventDetail.js rendering
  const themedRules = [
    "A movie making competition:",
    "Are you a passionate storyteller who wants to showcase your creative storytelling skills? Join us for an exhilarating short movie making competition, ‘Passion with Reels.’ Imagine a canvas where imagination knows no bounds, and the art of storytelling comes alive through the magic of reels. “Passion with Reels” is where creativity meets innovation, and the passion for filmmaking ignites. This event promises a platform for participants to bring their cinematic vision to life. Let your passion for filmmaking shine through every frame, and get ready to mesmerize the world with your cinematic masterpiece!",
    "",
    "REGISTRATION FEES:",
    "• For BPPIMT Students: ₹ 150/ team",
    "• For other Colleges: ₹ 200/ team",
    "RULES:",
    "• Must be a short film with a story and title. Runtime should not exceed 10 minutes (including credits). No theme restriction.",
    "• The short film must be original. No copied content, watermarks, templates, or video clippings allowed.",
    "• Storytelling is not limited to sad or depressive emotions; use a balanced mix of emotions.",
    "• Political, religious, or pornographic content will lead to disqualification. Avoid excessive violence.",
    "• Each film should begin with a disclaimer, including the movie title and team name.",
    "• Movies should be in 720p (HD) minimum. Format: MPED-V AVC (MP4) or MKV. Recommended ratios: 16:9.",
    "• Films may be in any language, but must carry English subtitles. Subtitles, captions, and credits must be legible and within safe areas.",
    "• Silent films must use captions to express meaning.",
    "• Due credits must be given to cast and crew. One certificate per participant.",
    "• Films once entered cannot be withdrawn. Multiple entries by the same team are not allowed.",
    "• ONLY short films allowed. No documentaries, animations, or experimental art forms.",
    "• All participants must be college students (UG or PG). Submission of college ID card is compulsory.",
    "• Team size: 2-8 members (including cast).",
    "• Judges’ decisions are final and binding.",
    "• TECHSTORM 2.26 organisers reserve the right to change/modify/alter any rule or event at any time.",
    "• TECHSTORM 2.26 will have non-exclusive perpetual rights to screen all film entries on any platform or future event.",
    "• TECHSTORM 2.26 is not responsible for copyright or intellectual property violations. Entrants are liable for any litigation or penal action.",
    "• Awarded films will be uploaded on TECHSTORM 2.26’s social media pages.",
    "• Registration fees are non-refundable.",
  ];
  const eventData = {
    previousYearImages: [
      getCloudinaryUrl(
        "pictures_of_gallery/Passion with reels-20260216T161844Z-1-001/Passion with reels",
        "Screenshot_2026-02-12-23-47-55-25_99c04817c0de5652397fc8b56c3b3817.jpg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Passion with reels-20260216T161844Z-1-001/Passion with reels",
        "Screenshot_2026-02-12-23-48-34-03_99c04817c0de5652397fc8b56c3b3817.jpg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Passion with reels-20260216T161844Z-1-001/Passion with reels",
        "Screenshot_2026-02-12-23-48-48-76_99c04817c0de5652397fc8b56c3b3817.jpg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Passion with reels-20260216T161844Z-1-001/Passion with reels",
        "Screenshot_2026-02-12-23-49-00-93_99c04817c0de5652397fc8b56c3b3817.jpg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Passion with reels-20260216T161844Z-1-001/Passion with reels",
        "Screenshot_2026-02-12-23-49-21-45_99c04817c0de5652397fc8b56c3b3817.jpg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
      getCloudinaryUrl(
        "pictures_of_gallery/Passion with reels-20260216T161844Z-1-001/Passion with reels",
        "Screenshot_2026-02-12-23-49-34-16_99c04817c0de5652397fc8b56c3b3817.jpg",
        "w_800,h_600,c_fill,q_auto:good,f_auto",
      ),
    ],
    name: "Passion with Reels",
    logo: passionWithReels,
    category: "Creative",
    breadcrumbBg: passionWithReelsBanner,
    description: `Join 'Passion with Reels'—an exciting short film competition where your creativity and storytelling come alive. Bring your cinematic ideas to life, connect with fellow filmmakers, and let your passion for film shine on screen! Whether you're a director, writer, or actor, this is your chance to experiment, innovate, and share your vision. Impress the judges and audience with your unique perspective and storytelling flair!`,
    teamSize: "2-8 Members (including cast)",
    entryFeeInternal: "₹150 per team",
    entryFeeExternal: "₹200 per team",
    duration: "10 Minutes (max)",
    venue: "Media Lab & Campus",
    registerButton: {
      text: "Register Now",
    },
    rules: themedRules,
    prizes: [
      { position: "1st Prize", amount: "₹15,000" },
      { position: "2nd Prize", amount: "₹10,000" },
      { position: "3rd Prize", amount: "₹6,000" },
    ],
    contact: [
      {
        name: "Content Head",
        phone: "+91 98765 43230",
        email: "reels@techstorm.com",
      },
      {
        name: "Video Coordinator",
        phone: "+91 98765 43231",
        email: "passion@techstorm.com",
      },
    ],
  };

  return <EventDetail eventData={eventData} />;
};

export default PassionWithReelsEvent;
