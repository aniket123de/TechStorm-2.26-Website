import React, { Fragment, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./EventDetail.css";
import { Button } from "../../ui/8bit/button";
import { Dialog, DialogContent } from "../../ui/8bit/dialog";

<<<<<<< HEAD
const EventDetail = ({ eventData, faqAccordion }) => {
        // Fix: Declare missing refs and state
        const autoScrollInterval = useRef(null);
        const scrollContainerRef = useRef(null);
        const pauseTimeout = useRef(null);
        const [isRulesDialogOpen, setIsRulesDialogOpen] = useState(false);
    const history = useHistory();
    const {
        name,
        logo,
        category,
        breadcrumbBg,
        description,
        previousYearImages: galleryImages = [],
        rules = [],
        prizes = [],
        teamSize,
        duration,
        venue,
        registerButton,
        contact,
        coordinators,
        qrCode,
        paymentLink,
        faq
    } = eventData;
    const getRegistrationRoute = (eventName) => {
        const routeMap = {
            'Code-Bee': '/register/code-bee',
            'Hack Storm': '/register/hack-storm',
            'TechnoMania': '/register/technomania',
            'Omegatrix': '/register/omegatrix',
            'Tech Hunt': '/register/tech-hunt',
            'Ro-Navigator': '/register/ro-navigator',
            'Ro-Combat': '/register/ro-combat',
            'Ro-Soccer': '/register/ro-soccer',
            'Ro-Terrance': '/register/ro-terrance',
            'Creative Canvas': '/register/creative-canvas',
            'Passion with Reels': '/register/passion-with-reels',
            'Forza Horizon': '/register/forza-horizon',
            'FIFA Mobile': '/register/fifa-mobile',
            'KHET': '/register/khet'
        };
        return routeMap[eventName] || '/events';
=======
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
    entryFeeInternal,
    entryFeeExternal,
    entryFee,
    isFree,
    teamSize,
  } = eventData;

  const scrollContainerRef = useRef(null);
  const autoScrollInterval = useRef(null);
  const pauseTimeout = useRef(null);
  const [isRulesDialogOpen, setIsRulesDialogOpen] = useState(false);

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
      "Ro-Sumo": "/register/ro-sumo",
      "Creative Canvas": "/register/creative-canvas",
      "Passion with Reels": "/register/passion-with-reels",
      "Forza Horizon": "/register/forza-horizon",
      "FIFA Mobile": "/register/fifa-mobile",
      KHET: "/register/khet",
>>>>>>> 219c3e9241e2d32283dea2c28f1f5d2b59dafe06
    };
    return routeMap[eventName] || "/events";
  };

<<<<<<< HEAD
    // ...existing code...
=======
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
>>>>>>> 219c3e9241e2d32283dea2c28f1f5d2b59dafe06

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
        scrollContainer.scrollLeft += 4; // Increased speed (was 1)
      }
    }, 16); // Faster interval (was 30)
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
                          // If external link is provided, open in new tab
                          if (registerButton.link) {
                            window.open(
                              registerButton.link,
                              "_blank",
                              "noopener,noreferrer",
                            );
                          } else {
                            // Navigate to specific event registration page
                            history.push(getRegistrationRoute(name));
                          }
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
                              .startsWith("round 1:");
                            const isRound2 = rule
                              .trim()
                              .toLowerCase()
                              .startsWith("round 2:");
                            // FAQ question detection
                            const isFaqQuestion =
                              /\?$/.test(rule.trim()) &&
                              rule.trim().length < 60;
                            // Registration fee header detection for Passion with Reels
                            const isRegistrationFeeHeader =
                              name === "Passion with Reels" &&
                              rule.trim().toLowerCase() ===
                                "registration fees:";

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
                                <div
                                  key={index}
                                  className="judging-criteria-header-wrapper"
                                >
                                  <h3
                                    className="judging-criteria-header"
                                    style={{
                                      color: "#ff2d2d",
                                      fontSize: "clamp(14px, 3vw, 18px)",
                                      fontFamily: "Press Start 2P",
                                      marginTop: "35px",
                                      marginBottom: "8px",
                                      lineHeight: "1.5",
                                      textTransform: "uppercase",
                                      letterSpacing: "2px",
                                      background: "rgba(255,45,45,0.12)",
                                      padding: "8px 0",
                                      textAlign: "left",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "22px",
                                        marginRight: "10px",
                                        lineHeight: 1,
                                      }}
                                    ></span>
                                    <span>{rule}</span>
                                  </h3>
                                </div>
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
                                      color: "#ffc010",
                                      fontFamily: "Press Start 2P",
                                      fontSize: "clamp(16px, 4vw, 24px)",
                                      fontWeight: "bold",
                                      textTransform: "uppercase",
                                      letterSpacing: "2px",
                                    }}
                                  >
                                    {rule}
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
                                      color: "#ffc010",
                                      fontFamily: "Press Start 2P",
                                      fontSize: "clamp(16px, 4vw, 24px)",
                                      fontWeight: "bold",
                                      textTransform: "uppercase",
                                      letterSpacing: "2px",
                                    }}
                                  >
                                    {rule}
                                  </span>
                                </div>
                              );
                            }
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
                                  ></span>
                                  {rule}
                                </div>
                              );
                            }
                            // Keep '⏱ RACE FORMAT RULES' as gold heading
                            if (
                              name === "Forza Horizon" &&
                              rule.trim().toUpperCase() ===
                                "⏱ RACE FORMAT RULES"
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
                                  ></span>
                                  {rule}
                                </h3>
                              );
                            }
                            // Registration fee header: larger font for Passion with Reels
                            if (isRegistrationFeeHeader) {
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
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "18px",
                                      marginRight: "8px",
                                      color: "#ffc010",
                                      lineHeight: 1,
                                    }}
                                  ></span>
                                  {rule}
                                </div>
                              );
                            }
                            // Highlight Ro-Navigator section headers with yellow background, remove bullet
                            // Highlight PRELIMS RULES: and FINALS RULES: with gold heading and diff icon
                            if (
                              (name === "Ro-Navigator" ||
                                name === "Ro-Soccer" ||
                                name === "Ro-Combat" ||
                                name === "Ro-Terrance" ||
                                name === "Ro-Sumo") &&
                              [
                                "PRELIMS RULES:",
                                "FINALS RULES:",
                                "KNOCKOUT & FINALS RULES:",
                              ].includes(rule.trim().toUpperCase())
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
                                    ></span>
                                    {rule}
                                  </h3>
                                );
                              } else if (
                                rule.trim().toUpperCase() ===
                                  "KNOCKOUT & FINALS RULES:" ||
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
                                    ></span>
                                    {rule}
                                  </h3>
                                );
                              }
                            }
                            // Highlight BOT SPECIFICATIONS and GENERAL RULES
                            if (
                              (name === "Ro-Navigator" ||
                                name === "Ro-Soccer" ||
                                name === "Ro-Combat" ||
                                name === "Ro-Terrance" ||
                                name === "Ro-Sumo") &&
                              (rule.trim().toUpperCase() ===
                                "BOT SPECIFICATIONS:" ||
                                rule.trim().toUpperCase() ===
                                  "GENERAL RULES (COMMON FOR PRELIMS & FINALS):" ||
                                rule.trim().toUpperCase() === "FAQ:")
                            ) {
                              // Restore previous icon for BOT SPECIFICATIONS, keep robot for GENERAL RULES, and add FAQ highlight
                              if (
                                rule.trim().toUpperCase() ===
                                "BOT SPECIFICATIONS:"
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
                                    ></span>
                                    {rule}
                                  </h3>
                                );
                              } else if (
                                rule.trim().toUpperCase() ===
                                "GENERAL RULES (COMMON FOR PRELIMS & FINALS):"
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
                                    ></span>
                                    {rule}
                                  </h3>
                                );
                              } else if (rule.trim().toUpperCase() === "FAQ:") {
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
                                    ></span>
                                    {rule}
                                  </h3>
                                );
                              }
                            }
                            // Highlight GENERAL GUIDELINES: for FIFA Mobile and Forza Horizon
                            if (
                              (name === "FIFA Mobile" ||
                                name === "Forza Horizon") &&
                              rule.trim().toUpperCase() ===
                                "GENERAL GUIDELINES:"
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
                                  ></span>
                                  {rule}
                                </h3>
                              );
                            }
                            if (
                              (name === "Ro-Navigator" ||
                                name === "Ro-Soccer" ||
                                name === "Ro-Combat" ||
                                name === "Ro-Terrance" ||
                                name === "Ro-Sumo") &&
                              [
                                "FACULTY CO-ORDINATOR NAME:",
                                "STUDENT CO-ORDINATOR NAME:",
                                "VOLUNTEER NAME:",
                                "TEAM STRENGTH:",
                                "REGISTRATION FEES:",
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
                            // Highlight REGISTRATION FEES value for Ro-Terrance
                            if (
                              name === "Ro-Terrance" &&
                              rule.trim() === "400/- Per Team/Bot"
                            ) {
                              return (
                                <div
                                  key={index}
                                  style={{
                                    color: "#fffacd", // yellowish white
                                    fontFamily: "Press Start 2P",
                                    fontSize: "clamp(13px, 3vw, 17px)",
                                    margin: "10px 0 10px 16px",
                                    letterSpacing: "2px",
                                    textTransform: "uppercase",
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
                                      marginTop: "-2px",
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
                                    ></span>
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
                      <span style={{ color: "#00ffea" }}>Event Dates: </span>{" "}
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
                {/* Fee Display — FREE */}
                {isFree && (
                  <div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <div
                      style={{
                        display: "inline-block",
                        padding: "20px 40px",
                        backgroundColor: "rgba(0, 255, 100, 0.08)",
                        border: "3px solid #00ff64",
                        borderRadius: "4px",
                      }}
                    >
                      <span style={{ fontSize: "32px" }}></span>
                      <p
                        style={{
                          color: "#00ff64",
                          fontSize: "22px",
                          fontFamily: "Press Start 2P",
                          margin: "10px 0 0 0",
                          lineHeight: "1.5",
                        }}
                      >
                        FREE ENTRY
                      </p>
                      <p
                        style={{
                          color: "#aaa",
                          fontSize: "11px",
                          fontFamily: "Press Start 2P",
                          marginTop: "10px",
                          lineHeight: "1.6",
                        }}
                      >
                        No registration fee required
                      </p>
                    </div>
                  </div>
                )}

                {/* Fee Display — INTERNAL + EXTERNAL */}
                {!isFree && entryFeeInternal && entryFeeExternal && (
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
                          fontFamily: "Press Start 2P",
                          marginBottom: "15px",
                          lineHeight: "1.5",
                        }}
                      >
                        For BPPIMT Students
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
                        <span
                          className="fee-icon"
                          style={{ fontSize: "28px" }}
                        ></span>
                        <span
                          className="fee-text"
                          style={{
                            color: "#fff",
                            fontSize: "18px",
                            fontFamily: "Press Start 2P",
                          }}
                        >
                          {entryFeeInternal}
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
                        For Outside Students
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
                        <span
                          className="fee-icon"
                          style={{ fontSize: "28px" }}
                        ></span>
                        <span
                          className="fee-text"
                          style={{
                            color: "#fff",
                            fontSize: "18px",
                            fontFamily: "Press Start 2P",
                          }}
                        >
                          {entryFeeExternal}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Fee Display — SINGLE FEE */}
                {!isFree && !entryFeeInternal && !entryFeeExternal && (
                  <div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <div
                      className="fee-category"
                      style={{
                        display: "inline-block",
                        minWidth: "280px",
                        maxWidth: "420px",
                        padding: "25px 40px",
                        backgroundColor: "rgba(255, 192, 16, 0.05)",
                        border: "3px solid #ffc010",
                        textAlign: "center",
                      }}
                    >
                      <h4
                        style={{
                          color: "#ffc010",
                          fontSize: "14px",
                          fontFamily: "Press Start 2P",
                          marginBottom: "15px",
                          lineHeight: "1.5",
                        }}
                      >
                        Registration Fee
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
                        <span
                          className="fee-icon"
                          style={{ fontSize: "28px" }}
                        ></span>
                        <span
                          className="fee-text"
                          style={{
                            color: "#fff",
                            fontSize: "18px",
                            fontFamily: "Press Start 2P",
                          }}
                        >
                          {entryFee || "To be announced"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Team Size */}
                {teamSize && (
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
                      Team Size
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        margin: "0 0 10px 0",
                        fontFamily: "Press Start 2P",
                        lineHeight: "1.6",
                        color: "#d0d0d0",
                        textAlign: "center",
                      }}
                    >
                      {teamSize}
                    </p>
                  </div>
                )}

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

<<<<<<< HEAD
            {/* Entry Fee Section */}
            <section className="entry-fee-section pt-30 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="entry-heading" style={{ textAlign: 'center' }}>
                                <h2 className="heading-white">ENTRY</h2>
                                <h2 className="heading-white">FEE</h2>
                                <div className="heading-brush" style={{ margin: '10px auto 30px' }}></div>
                            </div>
                            <div className="entry-content">
                                {/* Horizontal Fee Layout */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '30px',
                                    flexWrap: 'wrap',
                                    marginBottom: '40px'
                                }}>
                                    <div className="fee-category" style={{
                                        flex: '1',
                                        minWidth: '280px',
                                        maxWidth: '400px',
                                        padding: '25px',
                                        backgroundColor: 'rgba(255, 192, 16, 0.05)',
                                        border: '3px solid #ffc010',
                                        textAlign: 'center'
                                    }}>
                                        <h4 style={{ 
                                            color: '#ffc010', 
                                            fontSize: '14px', 
                                            fontFamily: 'Press Start 2P',
                                            marginBottom: '15px',
                                            lineHeight: '1.5'
                                        }}>
                                            For BPPIMT students
                                        </h4>
                                        <div className="fee-amount" style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '12px'
                                        }}>
                                            <span className="fee-icon" style={{ fontSize: '28px' }}>💰</span>
                                            <span className="fee-text" style={{
                                                color: '#fff',
                                                fontSize: '18px',
                                                fontFamily: 'Press Start 2P'
                                            }}>₹80 per team</span>
                                        </div>
                                    </div>

                                    <div className="fee-category" style={{
                                        flex: '1',
                                        minWidth: '280px',
                                        maxWidth: '400px',
                                        padding: '25px',
                                        backgroundColor: 'rgba(0, 255, 234, 0.05)',
                                        border: '3px solid #00ffea',
                                        textAlign: 'center'
                                    }}>
                                        <h4 style={{ 
                                            color: '#00ffea', 
                                            fontSize: '14px', 
                                            fontFamily: 'Press Start 2P',
                                            marginBottom: '15px',
                                            lineHeight: '1.5'
                                        }}>
                                            For outside students
                                        </h4>
                                        <div className="fee-amount" style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '12px'
                                        }}>
                                            <span className="fee-icon" style={{ fontSize: '28px' }}>💰</span>
                                            <span className="fee-text" style={{
                                                color: '#fff',
                                                fontSize: '18px',
                                                fontFamily: 'Press Start 2P'
                                            }}>₹100 per team</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Team Size Options */}
                                <div className="nes-container with-title" style={{ 
                                    maxWidth: '500px',
                                    margin: '0 auto',
                                    backgroundColor: 'rgba(255, 192, 16, 0.08)',
                                    borderColor: '#ffc010'
                                }}>
                                    <p className="title" style={{ 
                                        margin: 0, 
                                        padding: '3px 3px 3px 3px',
                                        color: '#ffc010'
                                    }}>Team Options</p>
                                    <p style={{ 
                                        fontSize: '16px',
                                        margin: '0 0 10px 0',
                                        fontFamily: 'Press Start 2P',
                                        lineHeight: '1.6',
                                        color: '#d0d0d0',
                                        textAlign: 'center'
                                    }}>
                                        Solo / Duo / Thrice
                                    </p>
                                </div>
                                
                                {/* Payment Options */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '30px',
                                    marginTop: '30px',
                                    flexWrap: 'wrap'
                                }}>
                                    {qrCode && (
                                        <div className="qr-section" style={{ textAlign: 'center' }}>
                                            <h4 className="qr-title" style={{
                                                fontFamily: 'Press Start 2P',
                                                color: '#ffc010',
                                                fontSize: '14px',
                                                marginBottom: '15px'
                                            }}>Scan to Pay</h4>
                                            <div className="qr-code-wrapper">
                                                <img src={qrCode} alt="Payment QR Code" className="qr-code" style={{
                                                    maxWidth: '200px',
                                                    border: '3px solid #ffc010'
                                                }} />
                                            </div>
                                        </div>
                                    )}
                                    {paymentLink && (
                                        <div className="payment-link-section" style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <Button
                                                variant="default"
                                                onClick={() => window.open(paymentLink, '_blank')}
                                                style={{ fontSize: '12px' }}
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

            {/* FAQ Accordion for Ro-Navigator (above coordinators) */}
            {faqAccordion}
            {/* Coordinators Section */}
            <section className="coordinators-section pt-30 pb-90" style={{marginTop: '48px'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="coordinator-heading">
                                <h2 className="heading-white">COORDINATORS &</h2>
                                <h2 className="heading-gold">VOLUNTEERS</h2>
                                <div className="heading-brush"></div>
                            </div>
=======
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
          <div className="row justify-content-center mt-40">
            {coordinators && coordinators.length > 0
              ? coordinators.map((coordinator, index) => (
                  <div
                    key={index}
                    className="col-lg-3 col-md-4 col-sm-6 mb-30"
                    style={{ paddingTop: "10px" }}
                  >
                    <div
                      className="nes-container is-rounded"
                      style={{
                        borderColor: "#555",
                        transition: "all 0.4s ease-out",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-8px) scale(1.02)";
                        e.currentTarget.style.boxShadow =
                          "0 5px 15px rgba(255, 215, 0, 0.2), 0 10px 30px rgba(255, 215, 0, 0.15), 0 20px 50px rgba(255, 215, 0, 0.1), 0 0 40px rgba(255, 215, 0, 0.3)";
                        e.currentTarget.style.borderColor = "#888";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(0) scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.borderColor = "#555";
                      }}
                    >
                      <div className="coordinator-avatar">
                        {coordinator.image ? (
                          <img src={coordinator.image} alt={coordinator.name} />
                        ) : (
                          <div className="avatar-placeholder">
                            {coordinator.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <h4 className="coordinator-name">{coordinator.name}</h4>
                      <p className="coordinator-role">
                        {coordinator.role || "Coordinator"}
                      </p>
                      <div className="coordinator-contacts">
                        <p className="coord-phone">{coordinator.phone}</p>
                        <p className="coord-email">{coordinator.email}</p>
                      </div>
                    </div>
                  </div>
                ))
              : contact && contact.length > 0
                ? contact.map((person, index) => (
                    <div
                      key={index}
                      className="col-lg-3 col-md-4 col-sm-6 mb-30"
                      style={{ paddingTop: "10px" }}
                    >
                      <div
                        className="nes-container is-rounded"
                        style={{
                          borderColor: "#555",
                          transition: "all 0.4s ease-out",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform =
                            "translateY(-8px) scale(1.02)";
                          e.currentTarget.style.boxShadow =
                            "0 5px 15px rgba(255, 215, 0, 0.2), 0 10px 30px rgba(255, 215, 0, 0.15), 0 20px 50px rgba(255, 215, 0, 0.1), 0 0 40px rgba(255, 215, 0, 0.3)";
                          e.currentTarget.style.borderColor = "#888";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform =
                            "translateY(0) scale(1)";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.borderColor = "#555";
                        }}
                      >
                        <div className="coordinator-avatar">
                          <div className="avatar-placeholder">
                            {person.name.charAt(0)}
                          </div>
                        </div>
                        <h4 className="coordinator-name">{person.name}</h4>
                        <p className="coordinator-role">Contact Person</p>
                        <div className="coordinator-contacts">
                          <p className="coord-phone">{person.phone}</p>
                          <p className="coord-email">{person.email}</p>
>>>>>>> 219c3e9241e2d32283dea2c28f1f5d2b59dafe06
                        </div>
                      </div>
                    </div>
                  ))
                : null}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default EventDetail;
