import React, { Fragment, useEffect, useRef, useState } from "react";
import coordinatorCardBg from "../../../assets/img/coordinatorcardbg.png";
import { useHistory } from "react-router-dom";
import "./EventDetail.css";
import { Button } from "../../ui/8bit/button";
import { Dialog, DialogContent } from "../../ui/8bit/dialog";

const omegatrixHeadings = [
  "omegatrix 2.26 rules",
  "general rules",
  "prelims rules",
  "mains rules"
];
// Reusable FAQ Accordion component
function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = React.useState(null);
  return (
    <div
      style={{
        maxWidth: 900,
        margin: "32px 32px 0 32px", // 32px left/right margin
        padding: "24px 40px",
        
        background: "#1a0e22", // deep purple background (theme)
        boxShadow: "0 4px 32px 0 rgba(0,0,0,0.18)",
        fontFamily: "Press Start 2P, monospace",
        color: "#ffc010", // gold text (theme)
        border: "3px solid #ffc010",
      }}
    >
      {faqs.map((faq, idx) => (
        <div key={idx}>
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            aria-expanded={openIndex === idx}
            style={{
              width: "100%",
              textAlign: "left",
              background: "none",
              border: "none",
              color: "#ffc010",
              fontFamily: "Press Start 2P, monospace",
              fontSize: 15,
              padding: "18px 5px 8px 0",
              cursor: "pointer",
              outline: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              letterSpacing: "1px",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            <span>{faq.q}</span>
            <span style={{ fontSize: 18,fontWeight: "bold", marginLeft: 12 }}>
              {openIndex === idx ? "\u02C4" : "\u02C5"}
            </span>
          </button>
          {openIndex === idx && (
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
              }}
            >
              <div
                style={{
                  width: "4px",
                  minWidth: "px",
                  background: "#22c9e2",
                  marginRight: "12px",
                  boxShadow: "0 0 8px 0 #18122B55",
                }}
              />
              <div
                style={{
                  flex: 1,
                  padding: "8px 0 18px 0",
                  color: "#ffffff",

                  fontSize: 12,
                  lineHeight: 1.7,
                  fontFamily: "Silkscreen, monospace",
                  marginLeft: 0,
                  marginBottom: 0,
                  whiteSpace: "pre-line",
                  borderRadius: "0 6px 6px 0",

                  borderLeft: "none",
                }}
              >
                {faq.a}
              </div>
            </div>
          )}
          <div
            aria-hidden="true"
            style={{
              borderBottom: "2px dotted #ffc010",
              margin: "0 0 0 0",
              width: "100%",
            }}
          />
        </div>
      ))}
    </div>
  );
}

const EventDetail = ({ eventData }) => {
  const history = useHistory();
  const {
    name,
    description,
    rules,
    contact,
    qrCode,
    paymentLink,
    previousYearImages,
    coordinators,
    breadcrumbBg,
    registerButton,
  } = eventData;




  // Refs for auto-scroll functionality
  const scrollContainerRef = useRef(null);
  const autoScrollInterval = useRef(null);
  const pauseTimeout = useRef(null);

  // State for rules dialog
  const [isRulesDialogOpen, setIsRulesDialogOpen] = useState(false);

  // Event-specific coordinators data
  const eventCoordinators = {
    "Code-Bee": [
      {
        name: "Saikat Mondal (CSE3)",
        role: "Student Co-Ordinator",
        phone: "6291341212",
        type: "coordinator",
      },
      {
        name: "Adarsh Kumar (IT3)",
        role: "Student Co-Ordinator",
        phone: "8271238822",
        type: "coordinator",
      },
      {
        name: "Medhansh Arora (CSE3)",
        role: "Student Co-Ordinator",
        phone: "7003962640",
        type: "coordinator",
      },
      {
        name: "Sneha Patra (CSE2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Sagnik Maitra (CSE2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Ayush Misra (IT2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Narayan Kumar Jha (CSE1)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Sayan Karmakar (CSE1)",
        role: "Student Volunteer",
        type: "volunteer",
      },
    ],
    "Hack Storm": [
      {
        name: "Ootso Dhar Chowdhury (CSE3)",
        role: "Student Co-Ordinator",
        phone: "9593135858",
        type: "coordinator",
      },
      {
        name: "Sambit Das (CSE3)",
        role: "Student Co-Ordinator",
        phone: "8240653185",
        type: "coordinator",
      },
      {
        name: "Parthita Chattopadhay (CSE3)",
        role: "Student Co-Ordinator",
        phone: "7001088737",
        type: "coordinator",
      },
      {
        name: "Priyam Kumar (IT3)",
        role: "Student Co-Ordinator",
        phone: "8873932040",
        type: "coordinator",
      },
      {
        name: "Shilpa Banerjee (MCA)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Sneha Roy (CSE2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Dibyojyoti Biswas (CSE1)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Shaezah Iqbal (IT1)",
        role: "Student Volunteer",
        type: "volunteer",
      },
    ],
    TechnoMania: [
      {
        name: "Disha Saha (ECE3)",
        role: "Student Co-Ordinator",
        phone: "9339744395",
        type: "coordinator",
      },
      {
        name: "Arpita Gupta (ECE3)",
        role: "Student Co-Ordinator",
        phone: "9832199722",
        type: "coordinator",
      },
      {
        name: "Sagor Paul (CSE2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Ayush Saha (ECE2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Anjali Kumari Mahato (ECE1)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Jishanuddin Mondal (EE1)",
        role: "Student Volunteer",
        type: "volunteer",
      },
    ],
    "Ro-Navigator": [
      {
        name: "Arushmita Sikder (CSE3)",
        role: "Student Co-Ordinator",
        phone: "8100396199",
        type: "coordinator",
      },
      {
        name: "Amrita Ghosh (CSE3)",
        role: "Student Co-Ordinator",
        phone: "9800472736",
        type: "coordinator",
      },
      {
        name: "Archita Hazra (ECE2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Rankan Das (EE2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Debjit Dhar (EE1)",
        role: "Student Volunteer",
        type: "volunteer",
      },
    ],
    "Ro-Combat": [
      {
        name: "Soumyadeep Ghosh (ECE3)",
        role: "Student Co-Ordinator",
        phone: "7001022557",
        type: "coordinator",
      },
      {
        name: "Sumit Ghosh (ECE3)",
        role: "Student Co-Ordinator",
        phone: "9749645061",
        type: "coordinator",
      },
      {
        name: "Sampurna Biswas (CSE3)",
        role: "Student Co-Ordinator",
        phone: "8777726522",
        type: "coordinator",
      },
    ],
    "Ro-Soccer": [
      {
        name: "Soumadeep Layek (Core)",
        role: "Student Co-Ordinator",
        phone: "7439443801",
        type: "coordinator",
      },
      {
        name: "Samima Nasrin (CSE3)",
        role: "Student Co-Ordinator",
        phone: "7044290112",
        type: "coordinator",
      },
      {
        name: "Sakchham Kapoor (ECE2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Aadipto Ghosh (ECE2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Yash Ghosh (ECE1)",
        role: "Student Volunteer",
        type: "volunteer",
      },
    ],
    "Ro-Terrance": [
      {
        name: "Abhijit Mahato (ECE3)",
        role: "Student Co-Ordinator",
        phone: "9064545534",
        type: "coordinator",
      },
      {
        name: "Aditya Saha (ECE3)",
        role: "Student Co-Ordinator",
        phone: "8240655792",
        type: "coordinator",
      },
      {
        name: "Insha Hossain (ECE2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Indranil Maji (EE2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
    ],
    "Ro-Sumo": [
      {
        name: "D Samir Dora (ECE3)",
        role: "Student Co-Ordinator",
        phone: "9477924228",
        type: "coordinator",
      },
      {
        name: "Sagnek Chowdhury (ECE3)",
        role: "Student Co-Ordinator",
        phone: "8584031268",
        type: "coordinator",
      },
      {
        name: "Abdul Razzak (ECE2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Sumit Ghara (EE2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
    ],
    "Tech Hunt": [
      {
        name: "Soumi Maji (CSE3)",
        role: "Student Co-Ordinator",
        phone: "8597607718",
        type: "coordinator",
      },
      {
        name: "Chitradeep Das (MCA)",
        role: "Student Co-Ordinator",
        phone: "9547182611",
        type: "coordinator",
      },
      {
        name: "Prerit Mishra (IT3)",
        role: "Student Co-Ordinator",
        phone: "7519103600",
        type: "coordinator",
      },
      {
        name: "Satarupa Sarkar (CSE2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Anuradha Kumari (IT3)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Soudeep Shaw (BBA2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Shrishti Banerjee (IT1)",
        role: "Student Volunteer",
        type: "volunteer",
      },
    ],
    Omegatrix: [
      {
        name: "Nandini Saboo (CSE3)",
        role: "Student Co-Ordinator",
        phone: "7439617848",
        type: "coordinator",
      },
      {
        name: "Aditya Jaiswal (ECE3)",
        role: "Student Co-Ordinator",
        phone: "8100207280",
        type: "coordinator",
      },
      {
        name: "Ayushi (IT3)",
        role: "Student Co-Ordinator",
        phone: "9113122297",
        type: "coordinator",
      },
      {
        name: "Saikat Maity (BBA3)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Biswajit Biswas (IT2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Kingshuk Adhikari (CSE2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Shreyan Dutta (IT1)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Sania Parvin (CSE1)",
        role: "Student Volunteer",
        type: "volunteer",
      },
    ],
    "Creative Canvas": [
      {
        name: "Rashmi Kumari (IT3)",
        role: "Student Co-Ordinator",
        phone: "9142151819",
        type: "coordinator",
      },
      {
        name: "Madhurima Roy (BCA3)",
        role: "Student Co-Ordinator",
        phone: "6294245592",
        type: "coordinator",
      },
      {
        name: "Riya Pathak (CSE2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Sucheta Maity (IT2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Larenza Roy (CSE1)",
        role: "Student Volunteer",
        type: "volunteer",
      },
    ],
    "Passion with Reels": [
      {
        name: "Soumili Mahindar (CSE3)",
        role: "Student Co-Ordinator",
        phone: "8240369593",
        type: "coordinator",
      },
      {
        name: "Rishav Kumar (IT3)",
        role: "Student Co-Ordinator",
        phone: "7488327181",
        type: "coordinator",
      },
      {
        name: "Shreyanka Satpathy (CSE2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Srijita Roy (MCA)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Sristi Bandyopadhyay (CSE1)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Parna Majhi (IT1)",
        role: "Student Volunteer",
        type: "volunteer",
      },
    ],
    KHET: [
      {
        name: "Himobanta Dutta",
        role: "Student Co-Ordinator",
        phone: "8167599621",
        type: "coordinator",
      },
      {
        name: "Susnata Sarkar (ECE2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Prantik Ghosh (Core)",
        role: "Student Volunteer",
        type: "volunteer",
      },
    ],
    "Forza Horizon": [
      {
        name: "Snehasish Banerjee (CSE3)",
        role: "Student Co-Ordinator",
        phone: "7980441675",
        type: "coordinator",
      },
      {
        name: "Sayan Das (IT3)",
        role: "Student Co-Ordinator",
        phone: "7439763472",
        type: "coordinator",
      },
      {
        name: "Krittish Barman (MCA)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Krish Agarwalla (BCA2)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Banibrata Mitra (CSE1)",
        role: "Student Volunteer",
        type: "volunteer",
      },
    ],
    "FIFA Mobile": [
      {
        name: "Adrish Basak (CSE3)",
        role: "Student Co-Ordinator",
        phone: "7003940421",
        type: "coordinator",
      },
      {
        name: "Shubham Mallik (CSE3)",
        role: "Student Co-Ordinator",
        phone: "9830339469",
        type: "coordinator",
      },
      {
        name: "Upashak Ghosal (CSE3)",
        role: "Student Volunteer",
        type: "volunteer",
      },
      {
        name: "Souvik Kumar Mallik (CSE1)",
        role: "Student Volunteer",
        type: "volunteer",
      },
    ],
  };

  // Get coordinators for current event
  const currentEventCoordinators =
    eventCoordinators[name] || coordinators || contact || [];


  // Map event names to registration routes
  const getRegistrationRoute = (eventName) => {
    const routeMap = {
      "Code-Bee": "/register/code-bee",
      "Hack Storm": "/register/hack-storm",
      TechnoMania: "/register/technomania",
      Omegatrix: "/register/omegatrix",
      "Tech Hunt": "/register/tech-hunt",
      "Ro-Navigator": "/register/ro-navigator",
      "Ro-Combat": "/register/ro-combat",
      "Ro-Soccer": "/register/ro-soccer",
      "Ro-Terrance": "/register/ro-terrance",
      "Creative Canvas": "/register/creative-canvas",
      "Passion with Reels": "/register/passion-with-reels",
      "Forza Horizon": "/register/forza-horizon",
      "FIFA Mobile": "/register/fifa-mobile",
      KHET: "/register/khet",
    };
    return routeMap[eventName] || "/events";
  };

  // Dummy placeholder images - replace with actual event photos later
  const dummyImages = [
    "https://via.placeholder.com/400x300/1a0e22/ffc010?text=Event+Photo+1",
    "https://via.placeholder.com/400x300/1a0e22/00ffea?text=Event+Photo+2",
    "https://via.placeholder.com/400x300/1a0e22/ffc010?text=Event+Photo+3",
    "https://via.placeholder.com/400x300/1a0e22/00ffea?text=Event+Photo+4",
    "https://via.placeholder.com/400x300/1a0e22/ffc010?text=Event+Photo+5",
    "https://via.placeholder.com/400x300/1a0e22/00ffea?text=Event+Photo+6",
  ];

  // Use provided images or fall back to dummy images
  const galleryImages =
    previousYearImages && previousYearImages.length > 0
      ? previousYearImages
      : dummyImages;

  // Start auto-scroll
  const startAutoScroll = () => {
    if (autoScrollInterval.current) return;

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    autoScrollInterval.current = setInterval(() => {
      const maxScroll =
        scrollContainer.scrollWidth - scrollContainer.clientWidth;

      if (scrollContainer.scrollLeft >= maxScroll) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    }, 30);
  };

  // Stop auto-scroll
  const stopAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      stopAutoScroll();
      if (pauseTimeout.current) {
        clearTimeout(pauseTimeout.current);
      }
    };
  }, []);

  // Navigation handlers for gallery
  const handlePrevious = () => {
    if (scrollContainerRef.current) {
      // Pause auto-scroll
      stopAutoScroll();

      // Scroll left
      scrollContainerRef.current.scrollLeft -= 420;

      // Clear any existing timeout
      if (pauseTimeout.current) {
        clearTimeout(pauseTimeout.current);
      }

      // Resume auto-scroll after 3 seconds
      pauseTimeout.current = setTimeout(() => {
        startAutoScroll();
      }, 3000);
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      // Pause auto-scroll
      stopAutoScroll();

      // Scroll right
      scrollContainerRef.current.scrollLeft += 420;

      // Clear any existing timeout
      if (pauseTimeout.current) {
        clearTimeout(pauseTimeout.current);
      }

      // Resume auto-scroll after 3 seconds
      pauseTimeout.current = setTimeout(() => {
        startAutoScroll();
      }, 3000);
    }
  };

  return (
    <Fragment>
      {/* Event Name Section */}
      <section
        className="event-name-section"
        style={
          breadcrumbBg
            ? {
                backgroundImage: `linear-gradient(rgba(26, 14, 34, 0.7), rgba(26, 14, 34, 0.7)), url(${breadcrumbBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="event-name-heading">
                <h1 className="event-title-white">{name.split(" ")[0]}</h1>
                {name.split(" ").slice(1).join(" ") && (
                  <h1 className="event-title-gold">
                    {name.split(" ").slice(1).join(" ")}
                  </h1>
                )}
                <div className="heading-brush"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Event Section */}
      <section className="about-event-section pt-60 pb-60">
        <div className="container">
          <div className="row">
            {/* Left: Scrollable Pictures */}
            <div className="col-lg-6 mb-40">
              <div style={{ position: "relative" }}>
                {/* Previous Button */}
                <button
                  onClick={handlePrevious}
                  className="gallery-nav-btn gallery-nav-prev"
                  style={{
                    position: "absolute",
                    left: "-20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "40px",
                    height: "40px",
                    background: "#ffc010",
                    border: "3px solid #000",
                    borderRadius: "0",
                    cursor: "pointer",
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "4px 4px 0 rgba(0, 0, 0, 0.5)",
                    zIndex: 10,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#00ffea";
                    e.target.style.transform = "translateY(-50%) scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#ffc010";
                    e.target.style.transform = "translateY(-50%) scale(1)";
                  }}
                >
                  ‹
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="gallery-nav-btn gallery-nav-next"
                  style={{
                    position: "absolute",
                    right: "-20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "40px",
                    height: "40px",
                    background: "#ffc010",
                    border: "3px solid #000",
                    borderRadius: "0",
                    cursor: "pointer",
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "4px 4px 0 rgba(0, 0, 0, 0.5)",
                    zIndex: 10,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#00ffea";
                    e.target.style.transform = "translateY(-50%) scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#ffc010";
                    e.target.style.transform = "translateY(-50%) scale(1)";
                  }}
                >
                  ›
                </button>

                <div
                  className="pictures-scroll-container"
                  ref={scrollContainerRef}
                >
                  {galleryImages.concat(galleryImages).map((image, index) => (
                    <div key={index} className="scroll-image-wrapper">
                      <img
                        src={image}
                        alt={`${name} Gallery ${index + 1}`}
                        className="scroll-image"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: About Event */}
            <div className="col-lg-6 mb-40">
              <div className="about-heading">
                <h2 className="heading-white">ABOUT</h2>
                <h2 className="heading-gold">EVENT</h2>
                <div className="heading-brush"></div>
              </div>
              <div className="about-content">
                <p
                  style={{
                    color: "#fffacd",
                    fontSize: "clamp(12px, 2vw, 16px)",
                    lineHeight: "1.8",
                    fontFamily: "Silkscreen, sans-serif",
                    margin: 0,
                    textAlign: "justify",
                    fontWeight: "400",
                  }}
                >
                  {description}
                </p>

                {/* Action Buttons */}
                <div
                  style={{
                    marginTop: "30px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "15px",
                    flexWrap: "wrap",
                  }}
                >
                  {registerButton && (
                    <Button
                      variant="default"
                      onClick={
                        registerButton.onClick ||
                        (() => {
                          // Navigate to specific event registration page
                          history.push(getRegistrationRoute(name));
                        })
                      }
                      style={{
                        fontSize: "12px",
                        padding: "0 24px",
                        height: "42px",
                      }}
                    >
                      {registerButton.text || "Register Now"}
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    onClick={() => setIsRulesDialogOpen(true)}
                    style={{
                      fontSize: "12px",
                      padding: "0 24px",
                      height: "42px",
                      "--button-color": "#00ffea",
                      color: "#00ffea",
                      boxShadow:
                        "0 0 0 2px transparent, 0 0 0 4px #00ffea, 0 0 0 6px transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#000000";
                      e.currentTarget.style.background = "#00ffea";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 2px transparent, 0 0 0 4px #00ffea, 0 0 0 6px transparent, 0 0 15px rgba(0, 255, 234, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#00ffea";
                      e.currentTarget.style.background = "#1a0e22";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 2px transparent, 0 0 0 4px #00ffea, 0 0 0 6px transparent";
                    }}
                  >
                    Event Rules
                  </Button>
                </div>

                {/* Rules Dialog */}
                <Dialog
                  open={isRulesDialogOpen}
                  onOpenChange={setIsRulesDialogOpen}
                >
                  <DialogContent>
                    <div
                      style={{
                        backgroundColor: "#1a0e22",
                        padding: "30px",
                        maxWidth: "700px",
                        maxHeight: "80vh",
                        overflowY: "auto",
                        border: "4px solid #ffc010",
                        boxShadow: "0 0 30px rgba(255, 192, 16, 0.3)",
                        margin: "20px",
                      }}
                    >
                      <div
                        style={{ marginBottom: "25px", textAlign: "center" }}
                      >
                        <h2
                          style={{
                            color: "#ffc010",
                            fontFamily: "Press Start 2P",
                            fontSize: "clamp(14px, 4vw, 20px)",
                            marginBottom: "10px",
                            lineHeight: "1.5",
                          }}
                        >
                          EVENT RULES
                        </h2>
                        <div
                          style={{
                            height: "3px",
                            width: "60px",
                            background: "#ffc010",
                            margin: "0 auto",
                          }}
                        ></div>
                      </div>
                      <div
                        style={{
                          padding: 0,
                          margin: 0,
                        }}
                      >
                        {rules &&
                          rules.map((rule, index) => {
                            // Check if it's a section header (starts with emoji)
                            const isHeader =
                              /^[\u{1F300}-\u{1F9FF}]|^[\u{2600}-\u{26FF}]|^[\u{2700}-\u{27BF}]/u.test(
                                rule,
                              );
                            // Check if it's an empty line
                            const isEmpty = rule.trim() === "";
                            // Highlight Judging Criteria header

                            const isJudgingCriteria =
                              rule.includes("JUDGING CRITERIA");
                            // Highlight Round 1 and Round 2
                            const isRound1 = rule
                              .trim()
                              .toLowerCase()
                              .startsWith("🎯 round 1:");
                            const isRound2 = rule
                              .trim()
                              .toLowerCase()
                              .startsWith("🎯 round 2:");
                            // FAQ question detection

                            // Reduce space after description (first empty line)
                            if (isEmpty) {
                              // If this is the first empty line after the description, use minimum height
                              if (
                                index === 1 &&
                                rules[0] &&
                                rules[0]
                                  .toLowerCase()
                                  .includes("creative canvas")
                              ) {
                                return (
                                  <div
                                    key={index}
                                    style={{ height: "1px" }}
                                  ></div>
                                );
                              }
                              return (
                                <div
                                  key={index}
                                  style={{ height: "15px" }}
                                ></div>
                              );
                            }
                            if (isJudgingCriteria) {
                              return (
                                <h3
                                  key={index}
                                  style={{
                                    color: "#ff2d2d",
                                    fontSize: "clamp(14px, 3vw, 18px)",
                                    fontFamily: "Press Start 2P",
                                    marginTop: "35px",
                                    marginBottom: "20px",
                                    lineHeight: "1.5",
                                    textTransform: "uppercase",
                                    letterSpacing: "2px",
                                    background: "rgba(255,45,45,0.12)",
                                    padding: "8px 0",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "22px",
                                      marginRight: "10px",
                                      lineHeight: 1,
                                    }}
                                  >
                                    👨‍🏫
                                  </span>
                                  <span>{rule}</span>
                                </h3>
                              );
                            }
                            if (isRound1) {
                              return (
                                <div
                                  key={index}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginTop: "25px",
                                    marginBottom: "10px",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "22px",
                                      marginRight: "10px",
                                    }}
                                  >
                                    🎯
                                  </span>
                                  <span
                                    style={{
                                      color: "#ffc010",
                                      fontFamily: "Press Start 2P",
                                      fontSize: "clamp(16px, 4vw, 24px)",
                                      fontWeight: "bold",
                                      textTransform: "uppercase",
                                      letterSpacing: "2px",
                                    }}
                                  >
                                    {rule.replace("🎯 ", "")}
                                  </span>
                                </div>
                              );
                            }
                            if (isRound2) {
                              return (
                                <div
                                  key={index}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginTop: "25px",
                                    marginBottom: "10px",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "22px",
                                      marginRight: "10px",
                                    }}
                                  >
                                    🏁
                                  </span>
                                  <span
                                    style={{
                                      color: "#ffc010",
                                      fontFamily: "Press Start 2P",
                                      fontSize: "clamp(16px, 4vw, 24px)",
                                      fontWeight: "bold",
                                      textTransform: "uppercase",
                                      letterSpacing: "2px",
                                    }}
                                  >
                                    {rule.replace("🎯 ", "")}
                                  </span>
                                </div>
                              );
                            }

                            // const isJudgingCriteria = false; // Remove or properly initialize if needed
                            // ...existing rule rendering logic...
                            // (Move misplaced EventDetail definition out of map)
                            // ...existing code...
                            // All rule rendering logic should be inside this callback
                            // Remove unreachable code after map

                            // const isJudgingCriteria = false;
                            // Check if it's a registration fee header


                            if (isHeader) {
                              // Reduce space below Forza Horizon gold header
                              const isForzaHorizonHeader =
                                name === "Forza Horizon" &&
                                rule
                                  .trim()
                                  .toUpperCase()
                                  .includes("FORZA HORIZON GAME RULES");
                              return (
                                <h3
                                  key={index}
                                  style={{
                                    color: "#ffc010",
                                    fontSize: "clamp(12px, 3vw, 16px)",
                                    fontFamily: "Press Start 2P",
                                    marginTop: index === 0 ? "0" : "25px",
                                    marginBottom: isForzaHorizonHeader
                                      ? "2px"
                                      : "15px",
                                    lineHeight: "1.5",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {rule}
                                </h3>
                              );
                            }
                            // Restore yellow background shade for 'BASIC PARTICIPATION RULES:'
                            if (
                              name === "Forza Horizon" &&
                              rule.trim().toUpperCase() ===
                                "BASIC PARTICIPATION RULES:"
                            ) {
                              return (
                                <div
                                  key={index}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    background: "rgba(255, 192, 16, 0.07)",
                                    color: "#ffc010",
                                    fontWeight: 400,
                                    fontFamily: "Press Start 2P",
                                    fontSize: "clamp(12px, 3vw, 16px)",
                                    padding: "6px 12px",
                                    borderRadius: "4px",
                                    margin: "10px 0",
                                    letterSpacing: "2px",
                                    textTransform: "uppercase",
                                    boxShadow: "none",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "22px",
                                      marginRight: "10px",
                                      lineHeight: 1,
                                    }}
                                  >
                                    👨‍🏫
                                  </span>
                                  {rule}
                                </div>
                              );
                            }
                            // Highlight Forza Horizon rule section headers
                            const forzaSectionHeaders = [
                              "GAME SETUP RULES",
                              "CAR & RACE RULES",
                              "FAIR PLAY RULES",
                              "TECHNICAL RULES",
                              "AUDIENCE & CONDUCT RULES",
                              "⏱ RACE FORMAT RULES"
                            ];
                            if (
                              name === "Forza Horizon" &&
                              forzaSectionHeaders.includes(rule.trim().toUpperCase())
                            ) {
                              // Icon selection
                              let icon = "";
                              switch (rule.trim().toUpperCase()) {
                                case "GAME SETUP RULES":
                                  icon = "🎮";
                                  break;
                                case "CAR & RACE RULES":
                                  icon = "🚗";
                                  break;
                                case "FAIR PLAY RULES":
                                  icon = "🤝";
                                  break;
                                case "TECHNICAL RULES":
                                  icon = "🛠️";
                                  break;
                                case "AUDIENCE & CONDUCT RULES":
                                  icon = "👥";
                                  break;
                                case "⏱ RACE FORMAT RULES":
                                  icon = "⏱";
                                  break;
                                default:
                                  icon = "";
                              }
                              return (
                                <h3
                                  key={index}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#ffc010",
                                    fontSize: "clamp(14px, 4vw, 20px)",
                                    fontFamily: "Press Start 2P",
                                    marginTop: "25px",
                                    marginBottom: "10px",
                                    lineHeight: "1.5",
                                    textTransform: "uppercase",
                                    letterSpacing: "2px",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "22px",
                                      marginRight: "10px",
                                      lineHeight: 1,
                                    }}
                                  >
                                    {icon}
                                  </span>
                                  {rule}
                                </h3>
                              );
                            }

                            // Highlight Creative Canvas rule section headers
                            const creativeCanvasSectionHeaders = [
                              "PRELIMS",
                              "SUBMISSION (PRELIMS)",
                              "ELIMINATION CRITERIA (PRELIMS)",
                              "FINAL ROUND",
                              "SUBMISSION (FINALS)",
                              "ELIMINATION CRITERIA (FINALS)",
                              "# BRING YOUR OWN DATA TRANSFER CABLE"
                            ];
                            if (
                              name === "Creative Canvas" &&
                              creativeCanvasSectionHeaders.includes(rule.trim().toUpperCase())
                            ) {
                              let icon = "";
                              switch (rule.trim().toUpperCase()) {
                                case "PRELIMS":
                                  icon = "🎯";
                                  break;
                                case "SUBMISSION (PRELIMS)":
                                  icon = "📤";
                                  break;
                                case "ELIMINATION CRITERIA (PRELIMS)":
                                  icon = "❌";
                                  break;
                                case "FINAL ROUND":
                                  icon = "🏁";
                                  break;
                                case "SUBMISSION (FINALS)":
                                  icon = "📤";
                                  break;
                                case "ELIMINATION CRITERIA (FINALS)":
                                  icon = "❌";
                                  break;
                                case "# BRING YOUR OWN DATA TRANSFER CABLE":
                                  icon = "🔌";
                                  break;
                                default:
                                  icon = "";
                              }
                              return (
                                <h3
                                  key={index}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#ffc010",
                                    fontSize: "clamp(14px, 4vw, 20px)",
                                    fontFamily: "Press Start 2P",
                                    marginTop: "25px",
                                    marginBottom: "10px",
                                    lineHeight: "1.5",
                                    textTransform: "uppercase",
                                    letterSpacing: "2px",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "22px",
                                      marginRight: "10px",
                                      lineHeight: 1,
                                    }}
                                  >
                                    {icon}
                                  </span>
                                  {rule}
                                </h3>
                              );
                            }

                            // Highlight WINNER CRITERIA for Forza Horizon
                            if (
                              name === "Forza Horizon" &&
                              rule.trim().toUpperCase() === "WINNER CRITERIA"
                            ) {
                              return (
                                <h3
                                  key={index}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#ff2d2d",
                                    fontSize: "clamp(14px, 4vw, 20px)",
                                    fontFamily: "Press Start 2P",
                                    marginTop: "25px",
                                    marginBottom: "10px",
                                    lineHeight: "1.5",
                                    textTransform: "uppercase",
                                    letterSpacing: "2px",
                                    background: "rgba(255,45,45,0.12)",
                                    padding: "8px 0",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "22px",
                                      marginRight: "10px",
                                      lineHeight: 1,
                                    }}
                                  >
                                    ❗
                                  </span>
                                  {rule}
                                </h3>
                              );
                            }
                             // FAQ question detection
                            const isFaqQuestion = /\?$/.test(rule.trim());
                            // Registration fee header detection for Passion with Reels
                            const isRegistrationFeeHeader =
                              name === "Passion with Reels" &&
                              rule.trim().toLowerCase() === "registration fees:";

                            // Tech Hunt: highlight special headings
                            const isTechHuntSpecialHeading =
                              name === "Tech Hunt" &&
                              ["preliminary round", "the footage may represent:", "discipline :"].includes(rule.trim().toLowerCase());

                            if (isRegistrationFeeHeader || isTechHuntSpecialHeading) {
                              return (
                                <div
                                  key={index}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    background: "rgba(255, 192, 16, 0.07)",
                                    color: "#e6b800",
                                    fontWeight: 500,
                                    fontFamily: "Silkscreen, sans-serif",
                                    fontSize: "clamp(15px, 3vw, 18px)",
                                    padding: "3px 10px",
                                    borderRadius: "4px",
                                    margin: "6px 0",
                                    boxShadow: "none",
                                    letterSpacing: "2px",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {rule}
                                </div>
                              );
                            }
                            // Highlight Ro-Navigator section headers with yellow background, remove bullet
                            // Highlight PRELIMS RULES: and FINALS RULES: with gold heading and diff icon
                            
                            if (
                              name === "Ro-Navigator" &&
                              ["PRELIMS RULES:", "FINALS RULES:"].includes(
                                rule.trim().toUpperCase(),
                              )
                            ) {
                              if (
                                rule.trim().toUpperCase() === "PRELIMS RULES:"
                              ) {
                                return (
                                  <h3
                                    key={index}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      color: "#ffc010",
                                      fontSize: "clamp(14px, 4vw, 20px)",
                                      fontFamily: "Press Start 2P",
                                      marginTop: "25px",
                                      marginBottom: "10px",
                                      lineHeight: "1.5",
                                      textTransform: "uppercase",
                                      letterSpacing: "2px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "22px",
                                        marginRight: "10px",
                                        lineHeight: 1,
                                      }}
                                    >
                                      🎯
                                    </span>
                                    {rule}
                                  </h3>
                                );
                              } else if (
                                rule.trim().toUpperCase() === "FINALS RULES:"
                              ) {
                                return (
                                  <h3
                                    key={index}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      color: "#ffc010",
                                      fontSize: "clamp(14px, 4vw, 20px)",
                                      fontFamily: "Press Start 2P",
                                      marginTop: "25px",
                                      marginBottom: "10px",
                                      lineHeight: "1.5",
                                      textTransform: "uppercase",
                                      letterSpacing: "2px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "22px",
                                        marginRight: "10px",
                                        lineHeight: 1,
                                      }}
                                    >
                                      ⚡
                                    </span>
                                    {rule}
                                  </h3>
                                );
                              }
                            }
                            // Highlight BOT SPECIFICATIONS and GENERAL RULES (Ro-Navigator), Tech Hunt, and CodeBee section headings
                            const codebeeHeadings = [
                              "general information",
                              "registration fees & refund policy",
                              "event schedule & rounds",
                              "round 1: mindmaze (prelims)",
                              "round 2: code sprint",
                              "round 3: elite code clash (finals)",
                              "device & network policy",
                              "strict anti-cheating policy",
                              "scoring & tie-breakers"
                            ];
                            const hackstormHeadings = [
                              "hackstorm hackathon rules",
                              "spirit of the competition",
                              "eligibility",
                              "team participation",
                              "project development rules",
                              "ai tools and code generation",
                              "mentoring reviews",
                              "demo requirements",
                              "judging criteria ———————————",
                              "disqualification rules"
                            ];
                            const technomaniaHeadings = [
                              "theme: role of artificial intelligence in sustainable development",
                              "venue: vip campus, b. p. poddar institute of management and technology",
                              "basic rules",
                              "project and model guidelines",
                              "presentation rules",
                              "code of conduct"
                            ];
                            if (
                              (name === "Ro-Navigator" &&
                                (rule.trim().toUpperCase() === "BOT SPECIFICATIONS:" ||
                                  rule.trim().toUpperCase() === "GENERAL RULES (COMMON FOR PRELIMS & FINALS):")) ||
                              (name === "Tech Hunt" &&
                                [
                                  "round 1 (time warp trials)",
                                  "round 2 (visual vault)",
                                  "treasure round (retro run)"
                                ].includes(rule.trim().toLowerCase())) ||
                              (name === "Code-Bee" &&
                                codebeeHeadings.includes(rule.trim().toLowerCase())) ||
                              (name === "Hack Storm" &&
                                hackstormHeadings.includes(rule.trim().toLowerCase())) ||
                              (name === "TechnoMania" &&
                                technomaniaHeadings.includes(rule.trim().toLowerCase())) ||
                              (name === "Omegatrix" &&
                                omegatrixHeadings.includes(rule.trim().toLowerCase()))
                            ) {
                              // Icon selection
                              let icon = "";
                              if (name === "Ro-Navigator") {
                                icon = rule.trim().toUpperCase() === "BOT SPECIFICATIONS:" ? "🔧" : "🤖";
                              } else if (name === "Tech Hunt") {
                                if (rule.trim().toLowerCase() === "round 1 (time warp trials)") icon = "📝";
                                else if (rule.trim().toLowerCase() === "round 2 (visual vault)") icon = "🖼️";
                                else if (rule.trim().toLowerCase() === "treasure round (retro run)") icon = "🏆";
                              } else if (name === "Code-Bee") {
                                const heading = rule.trim().toLowerCase();
                                if (heading === "general information") icon = "ℹ️";
                                else if (heading === "registration fees & refund policy") icon = "💰";
                                else if (heading === "event schedule & rounds") icon = "📅";
                                else if (heading === "round 1: mindmaze (prelims)") icon = "🧠";
                                else if (heading === "round 2: code sprint") icon = "🏃‍♂️";
                                else if (heading === "round 3: elite code clash (finals)") icon = "⚔️";
                                else if (heading === "device & network policy") icon = "💻";
                                else if (heading === "strict anti-cheating policy") icon = "🚫";
                                else if (heading === "scoring & tie-breakers") icon = "🎯";
                              } else if (name === "Hack Storm") {
                                const heading = rule.trim().toLowerCase();
                                if (heading === "hackstorm hackathon rules") icon = "⚡";
                                else if (heading === "spirit of the competition") icon = "🤝";
                                else if (heading === "eligibility") icon = "🧑‍🎓";
                                else if (heading === "team participation") icon = "👥";
                                else if (heading === "project development rules") icon = "💡";
                                else if (heading === "ai tools and code generation") icon = "🤖";
                                else if (heading === "mentoring reviews") icon = "🧑‍🏫";
                                else if (heading === "demo requirements") icon = "🎬";
                                else if (heading.startsWith("judging criteria")) icon = "🏅";
                                else if (heading === "disqualification rules") icon = "🚫";
                              } else if (name === "TechnoMania") {
                                const heading = rule.trim().toLowerCase();
                                if (heading.startsWith("theme:")) icon = "🌱";
                                else if (heading.startsWith("venue:")) icon = "📍";
                                else if (heading === "basic rules") icon = "📜";
                                else if (heading === "project and model guidelines") icon = "🛠️";
                                else if (heading === "presentation rules") icon = "📊";
                                else if (heading === "code of conduct") icon = "⚖️";
                              } else if (name === "Omegatrix") {
                                const heading = rule.trim().toLowerCase();
                                if (heading === "omegatrix 2.26 rules") icon = "🧩";
                                else if (heading === "general rules") icon = "📋";
                                else if (heading === "prelims rules") icon = "✏️";
                                else if (heading === "mains rules") icon = "🎯";
                              }
                              return (
                                <h3
                                  key={index}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#ffc010",
                                    fontSize: "clamp(14px, 4vw, 20px)",
                                    fontFamily: "Press Start 2P",
                                    marginTop: "25px",
                                    marginBottom: "10px",
                                    lineHeight: "1.5",
                                    textTransform: "uppercase",
                                    letterSpacing: "2px",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "22px",
                                      marginRight: "10px",
                                      lineHeight: 1,
                                    }}
                                  >
                                    {icon}
                                  </span>
                                  {rule}
                                </h3>
                              );
                            }
                            if (
                              name === "Ro-Navigator" &&
                              [
                                "FACULTY CO-ORDINATOR NAME:",
                                "STUDENT CO-ORDINATOR NAME:",
                                "VOLUNTEER NAME:",
                                "TEAM STRENGTH:",
                              ].includes(rule.trim().toUpperCase())
                            ) {
                              return (
                                <div
                                  key={index}
                                  style={{
                                    background: "rgba(255, 192, 16, 0.07)",
                                    color: "#ffc010",
                                    fontWeight: 400,
                                    fontFamily: "Press Start 2P",
                                    fontSize: "clamp(12px, 3vw, 16px)",
                                    padding: "6px 12px",
                                    borderRadius: "4px",
                                    margin: "10px 0",
                                    letterSpacing: "2px",
                                    textTransform: "uppercase",
                                    boxShadow: "none",
                                  }}
                                >
                                  {rule}
                                </div>
                              );
                            }
                            // FAQ question: bullet
                            if (isFaqQuestion) {
                              return (
                                <div
                                  key={index}
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    marginBottom: "12px",
                                    gap: "12px",
                                  }}
                                >
                                  <span
                                    style={{
                                      color: "#00ffea",
                                      fontSize: "14px",
                                      flexShrink: 0,
                                      marginTop: "2px",
                                    }}
                                  >
                                    ▸
                                  </span>
                                  <span
                                    style={{
                                      color: "#e0e0e0",
                                      fontSize: "13px",
                                      lineHeight: "1.6",
                                      fontFamily: "Silkscreen, sans-serif",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {rule}
                                  </span>
                                </div>
                              );
                            }
                            // FAQ answer: no bullet, indented
                            if (
                              index > 0 &&
                              rules[index - 1] &&
                              /\?$/.test(rules[index - 1].trim())
                            ) {
                              return (
                                <div
                                  key={index}
                                  style={{
                                    marginLeft: "32px",
                                    marginBottom: "12px",
                                  }}
                                >
                                  <span
                                    style={{
                                      color: "#e0e0e0",
                                      fontSize: "13px",
                                      lineHeight: "1.6",
                                      fontFamily: "Silkscreen, sans-serif",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {rule}
                                  </span>
                                </div>
                              );
                            }
                            // Regular rule with bullet, with semi-bold and gold color for judging criteria line
                            const judgingCriteriaText =
                              "PROJECTS WILL BE JUDGED BASED ON INNOVATION & CREATIVITY, TECHNICAL IMPLEMENTATION & FUNCTIONALITY, SUSTAINABILITY IMPACT, PRACTICAL FEASIBILITY, AND PRESENTATION & COMMUNICATION SKILLS.";
                            if (
                              rule.trim().toUpperCase() === judgingCriteriaText
                            ) {
                              return (
                                <div
                                  key={index}
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    marginBottom: "12px",
                                    gap: "12px",
                                  }}
                                >
                                  <span
                                    style={{
                                      color: "#00ffea",
                                      fontSize: "14px",
                                      flexShrink: 0,
                                      marginTop: "2px",
                                    }}
                                  >
                                    ▸
                                  </span>
                                  <span
                                    style={{
                                      color: "#fffacd",
                                      fontSize: "13px",
                                      lineHeight: "1.6",
                                      fontFamily: "Silkscreen, sans-serif",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {rule}
                                  </span>
                                </div>
                              );
                            }
                            // Remove leading bullet dots for Ro-Navigator regular rules (keep font style unchanged)
                            if (name === "Ro-Navigator") {
                              // Section headers and special lines are handled above
                              // Remove leading '• ' from all rules except section headers
                              let displayRule = rule;
                              if (rule.startsWith("• ")) {
                                displayRule = rule.slice(2);
                              }
                              // Render regular rule with original font style
                              return (
                                <div
                                  key={index}
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    marginBottom: "12px",
                                    gap: "12px",
                                  }}
                                >
                                  <span
                                    style={{
                                      color: "#00ffea",
                                      fontSize: "14px",
                                      flexShrink: 0,
                                      marginTop: "2px",
                                    }}
                                  >
                                    ▸
                                  </span>
                                  <span
                                    style={{
                                      color: "#e0e0e0", // off-white
                                      fontSize: "13px",
                                      lineHeight: "1.6",
                                      fontFamily: "Silkscreen, sans-serif",
                                    }}
                                  >
                                    {displayRule}
                                  </span>
                                </div>
                              );
                            }
                            // Remove only white bullets for Passion with Reels regular rules
                            if (name === "Passion with Reels") {
                              // Section headers and special lines (blue/cyan/gold bullets) are handled above
                              // Only remove bullets for regular rules (those starting with '• ')
                              if (rule.startsWith("• ")) {
                                // Highlight the 'ONLY short films allowed...' rule for Passion with Reels
                                if (
                                  name === "Passion with Reels" &&
                                  rule
                                    .toUpperCase()
                                    .includes(
                                      "ONLY SHORT FILMS ALLOWED. NO DOCUMENTARIES, ANIMATIONS, OR EXPERIMENTAL ART FORMS.",
                                    )
                                ) {
                                  return (
                                    <div
                                      key={index}
                                      style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        marginBottom: "12px",
                                        gap: "6px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          color: "#00ffea",
                                          fontSize: "7px",
                                          flexShrink: 0,
                                          marginTop: "2px",
                                          fontFamily: "monospace",
                                        }}
                                      >
                                        ▶
                                      </span>
                                      <span
                                        style={{
                                          color: "#00ffea",
                                          fontSize: "13px",
                                          lineHeight: "1.6",
                                          fontFamily: "Silkscreen, sans-serif",
                                          fontWeight: "bold",
                                          textTransform: "uppercase",
                                        }}
                                      >
                                        {rule.slice(2)}
                                      </span>
                                    </div>
                                  );
                                }
                                // Highlight the 'TEAM SIZE: 2-6 MEMBERS (INCLUDING CAST).' rule for Passion with Reels
                                if (
                                  name === "Passion with Reels" &&
                                  rule
                                    .toUpperCase()
                                    .includes(
                                      "TEAM SIZE: 2-6 MEMBERS (INCLUDING CAST).",
                                    )
                                ) {
                                  return (
                                    <div
                                      key={index}
                                      style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        marginBottom: "12px",
                                        gap: "6px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          color: "#00ffea",
                                          fontSize: "7px",
                                          flexShrink: 0,
                                          marginTop: "2px",
                                          fontFamily: "monospace",
                                        }}
                                      >
                                        ▶
                                      </span>
                                      <span
                                        style={{
                                          color: "#fffacd",
                                          fontSize: "13px",
                                          lineHeight: "1.6",
                                          fontFamily: "Silkscreen, sans-serif",
                                          fontWeight: "bold",
                                          textTransform: "uppercase",
                                        }}
                                      >
                                        {rule.slice(2)}
                                      </span>
                                    </div>
                                  );
                                }
                                return (
                                  <div
                                    key={index}
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      marginBottom: "12px",
                                      gap: "6px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: "#00ffea",
                                        fontSize: "7px",
                                        flexShrink: 0,
                                        marginTop: "2px",
                                        fontFamily: "monospace",
                                      }}
                                    >
                                      ▶
                                    </span>
                                    <span
                                      style={{
                                        color: "#e0e0e0",
                                        fontSize: "13px",
                                        lineHeight: "1.6",
                                        fontFamily: "Silkscreen, sans-serif",
                                      }}
                                    >
                                      {rule.slice(2)}
                                    </span>
                                  </div>
                                );
                              }
                              // Render yellow heading for Passion with Reels description section
                              if (
                                name === "Passion with Reels" &&
                                rule.trim() === "A movie making competition:"
                              ) {
                                return (
                                  <div
                                    key={index}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "22px",
                                        marginRight: "10px",
                                        color: "#ffc010",
                                        lineHeight: 1,
                                      }}
                                    >
                                      🎥
                                    </span>
                                    <h3
                                      style={{
                                        color: "#ffc010",
                                        fontFamily: "Press Start 2P",
                                        fontSize: "clamp(14px, 4vw, 20px)",
                                        marginTop: "0",
                                        marginBottom: "0",
                                        lineHeight: "1.5",
                                        textTransform: "uppercase",
                                        letterSpacing: "2px",
                                      }}
                                    >
                                      {rule.replace(":", "")}
                                    </h3>
                                  </div>
                                );
                              }
                              // For other lines, render as usual (section headers, registration, etc.)
                            }
                            // Regular rule with bullet for other events (including Forza Horizon)
                            // Regular rule with bullet for other events
                            return (
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  marginBottom: "12px",
                                  gap: "12px",
                                }}
                              >
                                <span
                                  style={{
                                    color: "#00ffea",
                                    fontSize: "14px",
                                    flexShrink: 0,
                                    marginTop: "2px",
                                  }}
                                >
                                  ▸
                                </span>
                                <span
                                  style={{
                                    color: "#e0e0e0",
                                    fontSize: "13px",
                                    lineHeight: "1.6",
                                    fontFamily: "Silkscreen, sans-serif",
                                  }}
                                >
                                  {rule}
                                </span>
                              </div>
                            );
                          })}
                      </div>
                      <div style={{ textAlign: "center", marginTop: "25px" }}>
                        <Button
                          variant="outline"
                          onClick={() => setIsRulesDialogOpen(false)}
                          style={{ fontSize: "11px" }}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <section
                  className="message -right"
                  style={{
                    marginTop: "25px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <div
                    className="nes-balloon from-right"
                    style={{ borderStyle: "dashed", flex: 1 }}
                  >
                    <p style={{ fontSize: "16px" }}>
                      📅 <span style={{ color: "#00ffea" }}>Event Dates: </span>{" "}
                      9-10th April
                    </p>
                  </div>
                  <i
                    className="nes-bcrikko"
                    style={{
                      display: "block",
                    }}
                  ></i>
                </section>

                <style>{`
                                    @media (max-width: 768px) {
                                        .message.-right {
                                            flex-direction: column-reverse !important;
                                            align-items: center !important;
                                        }
                                        .message.-right .nes-bcrikko {
                                            margin-bottom: 10px;
                                        }
                                        
                                        .about-heading {
                                            text-align: center;
                                            display: flex;
                                            flex-direction: column;
                                            align-items: center;
                                            position: relative;
                                            width: 100%;
                                        }
                                        
                                        .about-heading .heading-white,
                                        .about-heading .heading-gold {
                                            display: block;
                                            text-align: center;
                                            margin: 0;
                                            font-size: 20px !important;
                                        }
                                        
                                        .about-heading .heading-brush {
                                            position: relative;
                                            bottom: auto;
                                            left: auto;
                                            margin: 10px auto 20px;
                                            width: 80px;
                                        }
                                        
                                        .about-content p {
                                            text-align: center !important;
                                        }
                                        
                                        .entry-heading {
                                            text-align: center;
                                            display: flex;
                                            flex-direction: column;
                                            align-items: center;
                                            position: relative;
                                            width: 100%;
                                        }
                                        
                                        .entry-heading .heading-white,
                                        .entry-heading .heading-gold {
                                            display: block;
                                            text-align: center;
                                            margin: 0;
                                            font-size: 20px !important;
                                        }
                                        
                                        .entry-heading .heading-brush {
                                            position: relative;
                                            bottom: auto;
                                            left: auto;
                                            margin: 10px auto 20px;
                                            width: 80px;
                                        }
                                        
                                        .coordinator-heading {
                                            text-align: center;
                                            display: flex;
                                            flex-direction: column;
                                            align-items: center;
                                            position: relative;
                                            width: 100%;
                                        }
                                        
                                        .coordinator-heading .heading-white,
                                        .coordinator-heading .heading-gold {
                                            display: block;
                                            text-align: center;
                                            margin: 0;
                                            font-size: 20px !important;
                                        }
                                        
                                        .coordinator-heading .heading-brush {
                                            position: relative !important;
                                            margin: 10px auto 15px !important;
                                            width: 80px !important;
                                            left: 0 !important;
                                            right: 0 !important;
                                            bottom: auto !important;
                                            display: block !important;
                                        }
                                        
                                        .entry-content {
                                            padding: 0 15px;
                                        }
                                        
                                        .fee-category {
                                            width: 100% !important;
                                            min-width: unset !important;
                                            margin-bottom: 20px;
                                        }
                                    }
                                `}</style>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entry Fee Section */}
      <section className="entry-fee-section pt-30 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="entry-heading" style={{ textAlign: "center" }}>
                <h2 className="heading-white">ENTRY</h2>
                <h2 className="heading-white">FEE</h2>
                <div
                  className="heading-brush"
                  style={{ margin: "10px auto 30px" }}
                ></div>
              </div>
              <div className="entry-content">
                {/* Horizontal Fee Layout */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "30px",
                    flexWrap: "wrap",
                    marginBottom: "40px",
                  }}
                >
                  <div
                    className="fee-category"
                    style={{
                      flex: "1",
                      minWidth: "280px",
                      maxWidth: "400px",
                      padding: "25px",
                      backgroundColor: "rgba(255, 192, 16, 0.05)",
                      border: "3px solid #ffc010",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      style={{
                        color: "#ffc010",

                        fontSize: "14px",

                        fontSize: "16px",
                      }}
                    >
                      Team Size
                    </h4>
                    <p
                      style={{
                        fontSize: "18px",
                        margin: "0 0 10px 0",

                        fontFamily: "Press Start 2P",
                        marginBottom: "15px",
                        lineHeight: "1.5",
                      }}
                    >
                      For BPPIMT students
                    </p>
                    <div
                      className="fee-amount"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <span className="fee-icon" style={{ fontSize: "28px" }}>
                        💰
                      </span>
                      <span
                        className="fee-text"
                        style={{
                          color: "#fff",
                          fontSize: "18px",
                          fontFamily: "Press Start 2P",
                        }}
                      >
                        ₹80 per team
                      </span>
                    </div>
                  </div>

                  <div
                    className="fee-category"
                    style={{
                      flex: "1",
                      minWidth: "280px",
                      maxWidth: "400px",
                      padding: "25px",
                      backgroundColor: "rgba(0, 255, 234, 0.05)",
                      border: "3px solid #00ffea",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      style={{
                        color: "#00ffea",
                        fontSize: "14px",
                        fontFamily: "Press Start 2P",
                        marginBottom: "15px",
                        lineHeight: "1.5",
                      }}
                    >
                      For outside students
                    </h4>
                    <div
                      className="fee-amount"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <span className="fee-icon" style={{ fontSize: "28px" }}>
                        💰
                      </span>
                      <span
                        className="fee-text"
                        style={{
                          color: "#fff",
                          fontSize: "18px",
                          fontFamily: "Press Start 2P",
                        }}
                      >
                        ₹100 per team
                      </span>
                    </div>
                  </div>
                </div>

                {/* Team Size Options */}
                <div
                  className="nes-container with-title"
                  style={{
                    maxWidth: "500px",
                    margin: "0 auto",
                    backgroundColor: "rgba(255, 192, 16, 0.08)",
                    borderColor: "#ffc010",
                  }}
                >
                  <p
                    className="title"
                    style={{
                      margin: 0,
                      padding: "3px 3px 3px 3px",
                      color: "#ffc010",
                    }}
                  >
                    Team Options
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      margin: "0 0 10px 0",
                      fontFamily: "Press Start 2P",
                      lineHeight: "1.6",
                      color: "#d0d0d0",
                      textAlign: "center",
                    }}
                  >
                    Solo / Duo / Thrice
                  </p>
                </div>

                {/* Payment Options */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "30px",
                    marginTop: "30px",
                    flexWrap: "wrap",
                  }}
                >
                  {qrCode && (
                    <div className="qr-section" style={{ textAlign: "center" }}>
                      <h4
                        className="qr-title"
                        style={{
                          fontFamily: "Press Start 2P",
                          color: "#ffc010",
                          fontSize: "14px",
                          marginBottom: "15px",
                        }}
                      >
                        Scan to Pay
                      </h4>
                      <div className="qr-code-wrapper">
                        <img
                          src={qrCode}
                          alt="Payment QR Code"
                          className="qr-code"
                          style={{
                            maxWidth: "200px",
                            border: "3px solid #ffc010",
                          }}
                        />
                      </div>
                    </div>
                  )}
                  {paymentLink && (
                    <div
                      className="payment-link-section"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="default"
                        onClick={() => window.open(paymentLink, "_blank")}
                        style={{ fontSize: "12px" }}
                      >
                        PAY ONLINE
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section (before Coordinators) */}
      {eventData.faqs && eventData.faqs.length > 0 && (
        <section className="faq-accordion-section pt-30 pb-60">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="about-heading" style={{ textAlign: "center" }}>
                  <h2 className="heading-white">{name.toUpperCase()}</h2>
                  <h2 className="heading-gold">FAQ</h2>
                  <div className="heading-brush"></div>
                </div>
                <FAQAccordion faqs={eventData.faqs} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Coordinators Section */}
      <section className="coordinators-section pt-30 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="coordinator-heading">
                <h2 className="heading-white">COORDINATORS &</h2>
                <h2 className="heading-gold">VOLUNTEERS</h2>
                <div className="heading-brush"></div>
              </div>
            </div>
          </div>

          {/* ── Student Co-Ordinators row ── */}
          {currentEventCoordinators.some((p) => p.type === "coordinator") && (
            <>
              <div className="row mt-40 justify-content-center text-center">
                <div className="col-12">
                  <p className="coord-group-label coord-group-label--coordinator">
                    ★ Student Co-Ordinators
                  </p>
                </div>
              </div>
              <div className="row justify-content-center">
                {currentEventCoordinators
                  .filter((p) => p.type === "coordinator")
                  .map((person, index) => (
                    <div
                      key={`coord-${index}`}
                      className="col-lg-3 col-md-4 col-sm-6 mb-30"
                      style={{ paddingTop: "10px", display: "flex" }}
                    >
                      <div
                        className="coord-card nes-container is-rounded"
                        style={{
                          borderColor: "#ffc010",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform =
                            "translateY(-8px) scale(1.02)";
                          e.currentTarget.style.boxShadow =
                            "0 5px 15px rgba(255, 192, 16, 0.3), 0 10px 30px rgba(255, 192, 16, 0.2), 0 0 40px rgba(255, 192, 16, 0.35)";
                          e.currentTarget.style.borderColor = "#ffd54f";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform =
                            "translateY(0) scale(1)";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.borderColor = "#ffc010";
                        }}
                      >
                        {/* dim bg image */}
                        <div
                          className="coord-card-bg"
                          style={{
                            backgroundImage: `url(${coordinatorCardBg})`,
                          }}
                        />
                        {/* content sits above bg */}
                        <div className="coord-card-content">
                          <h4 className="coordinator-name">{person.name}</h4>
                          <p className="coordinator-role">
                            {person.role || "Student Co-Ordinator"}
                          </p>
                          <div className="coordinator-contacts">
                            {person.phone && (
                              <div className="coord-phone-wrapper">
                                <svg className="phone-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                </svg>
                                <p className="coord-phone">{person.phone}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}

          {/* ── Student Volunteers row ── */}
          {currentEventCoordinators.some((p) => p.type === "volunteer") && (
            <>
              <div className="row mt-30 justify-content-center text-center">
                <div className="col-12">
                  <p className="coord-group-label coord-group-label--volunteer">
                    ✦ Student Volunteers
                  </p>
                </div>
              </div>
              <div className="row justify-content-center">
                {currentEventCoordinators
                  .filter((p) => p.type === "volunteer")
                  .map((person, index) => (
                    <div
                      key={`vol-${index}`}
                      className="col-lg-3 col-md-4 col-sm-6 mb-30"
                      style={{ paddingTop: "10px", display: "flex" }}
                    >
                      <div
                        className="coord-card nes-container is-rounded"
                        style={{
                          borderColor: "#00ffea",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform =
                            "translateY(-8px) scale(1.02)";
                          e.currentTarget.style.boxShadow =
                            "0 5px 15px rgba(0, 255, 234, 0.25), 0 10px 30px rgba(0, 255, 234, 0.15), 0 0 40px rgba(0, 255, 234, 0.3)";
                          e.currentTarget.style.borderColor = "#66fff5";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform =
                            "translateY(0) scale(1)";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.borderColor = "#00ffea";
                        }}
                      >
                        {/* dim bg image */}
                        <div
                          className="coord-card-bg"
                          style={{
                            backgroundImage: `url(${coordinatorCardBg})`,
                          }}
                        />
                        {/* content sits above bg */}
                        <div className="coord-card-content">
                          <h4 className="coordinator-name coordinator-name--volunteer">
                            {person.name}
                          </h4>
                          <p className="coordinator-role coordinator-role--volunteer">
                            Student Volunteer
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default EventDetail;
