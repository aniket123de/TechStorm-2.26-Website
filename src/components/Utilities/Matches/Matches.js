import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cloudinaryImages } from "../../../config/cloudinary";

import SectionTitle from "../SectionTitle/SectionTitle";
import RetroCard from "../RetroCard/RetroCard";
import "./Matches.css";

// Cloudinary base URL
const CLOUDINARY_BASE = "https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox";

// Inject Cloudinary resize transform into a URL (inserts after /upload/)
const withTransform = (url, transform) =>
  url ? url.replace('/upload/', `/upload/${transform}/`) : url;

// Smaller card-background images (16:9, 600px wide)
const cardThumb = (url) => withTransform(url, 'w_600,h_338,c_fill');
// Smaller mascot logos (200px wide, keep aspect ratio)
const logoThumb = (url) => withTransform(url, 'w_200,c_fit');
// Smaller gallery strip thumbnails
const galleryThumb = (url) => withTransform(url, 'w_300,h_200,c_fill');

// Pixelated event mascots from Cloudinary
const codeBee = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/CODE%20BEE`;
const hackStorm = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/HACKSTORM`;
const technomania = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/TECHNOMANIA`;
const roNavigator = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/RO-NAVIGATOR`;
const roCombat = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/RO-COMBAT`;
const roSoccer = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/RO-SOCCER`;
const roTerrance = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/RO-TERRANCE`;
const techHunt = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/TECH%20HUNT`;
const omegatrix = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/OMEGATRIX`;
const creativeCanvas = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/CREATIVE%20CANVAS`;
const passionWithReels = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/PASSION%20WITH%20REELS`;
const khet = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/KHET`;
const forzaHorizon = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/FORZA%20HORIZON`;
const fifaMobile = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/FIFA%20Mobile`;
const rosumo = `${CLOUDINARY_BASE}/PIXELATED%20EVENT%20MASCOTS/rosumo`;

// Event card backgrounds from Cloudinary
const codeBeeBg = `https://res.cloudinary.com/ds3vepmkd/image/upload/v1772133027/codebee_8bit_vjmv1v.gif`;
const hackStormBg = `${CLOUDINARY_BASE}/event_specific_pictures/hackstorm/hstorm`;
const technomaniaBg = `${CLOUDINARY_BASE}/event_specific_pictures/technomania/technomania`;
const roNavigatorBg = `${CLOUDINARY_BASE}/event_specific_pictures/robotics/ro_navigator`;
const roCombatBg = `${CLOUDINARY_BASE}/event_specific_pictures/robotics/ro_combat`;
const roSoccerBg = `${CLOUDINARY_BASE}/event_specific_pictures/robotics/ro_soccer`;
const roTerranceBg = `${CLOUDINARY_BASE}/event_specific_pictures/robotics/ro_terrance`;
const techHuntBg = `${CLOUDINARY_BASE}/event_specific_pictures/techHunt/techhunt_banner`;
const omegatrixBg = `${CLOUDINARY_BASE}/event_specific_pictures/omegatrix/OMEGATRIX_banner`;
const creativeCanvasBg = `${CLOUDINARY_BASE}/event_specific_pictures/creative/creative_canvas`;
const passionWithReelsBg = `${CLOUDINARY_BASE}/event_specific_pictures/creative/passion_with_reels`;
const khetBg = `${CLOUDINARY_BASE}/event_specific_pictures/games/khet`;
const forzaHorizonBg = `${CLOUDINARY_BASE}/event_specific_pictures/games/forza_horizon`;
const fifaMobileBg = `${CLOUDINARY_BASE}/event_specific_pictures/games/fifa_mobile`;
const rosumoBg = `${CLOUDINARY_BASE}/event_specific_pictures/robotics/ro_sumo`;

const Matches = () => {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [activeFilter, setActiveFilter] = React.useState("All");
  const scrollContainerRef = useRef(null);
  const autoScrollInterval = useRef(null);
  const pauseTimeout = useRef(null);
  const location = useLocation();

  // Start auto-scroll
  const startAutoScroll = () => {
    if (autoScrollInterval.current) return;

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    autoScrollInterval.current = setInterval(() => {
      if (
        scrollContainer.scrollLeft >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
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

  // Auto-scroll functionality for pictures album
  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  // Read ?category= query param and auto-apply filter on mount / URL change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    if (cat) {
      // Map URL query values to the filter button labels used by filterEvents()
      const queryToFilter = {
        Technicals: "Technicals",
        Robotics: "Robotics",
        Gaming: "Gaming",
        "Brain Teaser": "Brain Teaser",
        Creative: "Creative",
      };
      const mapped = queryToFilter[cat];
      if (mapped) {
        filterEvents(mapped);
        // Scroll down to the events grid after a short delay so the page has rendered
        setTimeout(() => {
          const el = document.getElementById("events-grid");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // Navigation handlers
  const handlePrevious = () => {
    if (scrollContainerRef.current) {
      // Pause auto-scroll
      stopAutoScroll();

      // Scroll left
      scrollContainerRef.current.scrollLeft -= 320;

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
      scrollContainerRef.current.scrollLeft += 320;

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

  // Use the same Cloudinary gallery images as the Gallery page
  const galleryImages = [
    cloudinaryImages.gallery.c1,
    cloudinaryImages.gallery.c2,
    cloudinaryImages.gallery.c3,
    cloudinaryImages.gallery.c4,
    cloudinaryImages.gallery.c5,
    cloudinaryImages.gallery.c6,
    cloudinaryImages.gallery.c7,
    cloudinaryImages.gallery.c8,
    cloudinaryImages.gallery.c9,
    cloudinaryImages.gallery.c10,
    cloudinaryImages.gallery.c11,
    cloudinaryImages.gallery.c12,
    cloudinaryImages.gallery.c13,
    cloudinaryImages.gallery.c14,
  ];

  const allEvents = [
    {
      logo: codeBee,
      cardBg: codeBeeBg,
      name: "Code-Bee",
      category: "Technical",
      url: "/events/code-bee",
      entryFee: "₹80",
      teamSize: "Max 2 Members",
    },
    {
      logo: hackStorm,
      cardBg: hackStormBg,
      name: "Hack Storm",
      category: "Technical",
      url: "/events/hack-storm",
      entryFee: "FREE",
      teamSize: "3-4 Members",
    },
    {
      logo: technomania,
      cardBg: technomaniaBg,
      name: "TechnoMania",
      category: "Technical",
      url: "/events/technomania",
      entryFeeInternal: "₹200",
      entryFeeExternal: "₹250",
      teamSize: "1-4 Members",
    },
    {
      logo: omegatrix,
      cardBg: omegatrixBg,
      name: "Omegatrix",
      category: "Brain Teaser",
      url: "/events/omegatrix",
      entryFeeInternal: "₹50",
      entryFeeExternal: "₹60",
      teamSize: "Solo",
    },
    {
      logo: techHunt,
      cardBg: techHuntBg,
      name: "Tech Hunt",
      category: "Brain Teaser",
      url: "/events/tech-hunt",
      entryFee: "₹200",
      teamSize: "3-5 Members",
    },
    {
      logo: roNavigator,
      cardBg: roNavigatorBg,
      name: "Ro-Navigator",
      category: "Rover",
      url: "/events/ro-navigator",
      entryFeeInternal: "₹350",
      entryFeeExternal: "₹400",
      teamSize: "2-5 Members",
    },
    {
      logo: rosumo,
      cardBg: rosumoBg,
      name: "Ro-sumo",
      category: "Rover",
      url: "/events/ro-sumo",
      entryFeeInternal: "₹350",
      entryFeeExternal: "₹400",
      teamSize: "2-5 Members",
    },
    {
      logo: roCombat,
      cardBg: roCombatBg,
      name: "Ro-Combat",
      category: "Rover",
      url: "/events/ro-combat",
      entryFee: "₹800",
      teamSize: "2-5 Members",
    },
    {
      logo: roSoccer,
      cardBg: roSoccerBg,
      name: "Ro-Soccer",
      category: "Rover",
      url: "/events/ro-soccer",
      entryFeeInternal: "₹350",
      entryFeeExternal: "₹400",
      teamSize: "2-5 Members",
    },
    {
      logo: roTerrance,
      cardBg: roTerranceBg,
      name: "Ro-Terrance",
      category: "Rover",
      url: "/events/ro-terrance",
      entryFeeInternal: "₹350",
      entryFeeExternal: "₹400",
      teamSize: "2-5 Members",
    },
    {
      logo: creativeCanvas,
      cardBg: creativeCanvasBg,
      name: "Creative Canvas",
      category: "Creative",
      url: "/events/creative-canvas",
      entryFeeInternal: "₹100",
      entryFeeExternal: "₹150",
      teamSize: "Max 2 Members",
    },
    {
      logo: passionWithReels,
      cardBg: passionWithReelsBg,
      name: "Passion with Reels",
      category: "Creative",
      url: "/events/passion-with-reels",
      entryFeeInternal: "₹150",
      entryFeeExternal: "₹200",
      teamSize: "2-8 Members",
    },
    {
      logo: forzaHorizon,
      cardBg: forzaHorizonBg,
      name: "Forza Horizon",
      category: "Games",
      url: "/events/forza-horizon",
      entryFeeInternal: "₹80",
      entryFeeExternal: "₹100",
      teamSize: "Solo",
    },
    {
      logo: fifaMobile,
      cardBg: fifaMobileBg,
      name: "FIFA Mobile",
      category: "Games",
      url: "/events/fifa-mobile",
      entryFeeInternal: "₹50",
      entryFeeExternal: "₹60",
      teamSize: "Solo",
    },
    {
      logo: khet,
      cardBg: khetBg,
      name: "KHET",
      category: "Games",
      url: "/events/khet",
      entryFeeInternal: "₹50",
      entryFeeExternal: "NA",
      teamSize: "Solo",
    },
  ];

  const [filteredEvents, setFilteredEvents] = React.useState(allEvents);

  const filterEvents = (category) => {
    setActiveFilter(category);
    if (category === "All") {
      setFilteredEvents(allEvents);
    } else {
      const filtered = allEvents.filter((event) => {
        if (category === "Technicals") return event.category === "Technical";
        if (category === "Robotics") return event.category === "Rover";
        if (category === "Gaming") return event.category === "Games";
        if (category === "Brain Teaser")
          return event.category === "Brain Teaser";
        if (category === "Creative") return event.category === "Creative";
        return false;
      });
      setFilteredEvents(filtered);
    }
  };

  const events = filteredEvents.length > 0 ? filteredEvents : allEvents;

  return (
    <section
      id="match"
      className="match-area matches-events-page"
      style={{
        background: "transparent",
        overflow: "visible",
        paddingTop: "0",
        paddingBottom: "90px",
      }}
    >
      <div className="container" style={{ overflow: "visible" }}>
        {/* Breadcrumb Section */}
        <section
          className="breadcrumb-area d-flex align-items-center schedule-breadcrumb"
          style={{
            background: "transparent",
            padding: "40px 0",
            minHeight: "150px",
            margin: "0",
            marginBottom: "40px",
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-12 col-lg-12">
                <div className="breadcrumb-wrap text-left">
                  <div className="breadcrumb-title">
                    <h2 style={{ marginBottom: "8px", marginTop: "0" }}>
                      Events
                    </h2>
                    <div className="breadcrumb-wrap">
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item">
                            <Link to={"/"}>{"Home"}</Link>
                          </li>
                          <li
                            className="breadcrumb-item active"
                            aria-current="page"
                          >
                            EVENTS
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Auto-scrolling Pictures Album */}
        <div className="row mb-50">
          <div className="col-lg-12">
            <div className="matches-gallery-head" style={{ marginBottom: "30px" }}>
              <h2
                style={{
                  fontSize: "48px",
                  textAlign: "center",
                  marginBottom: "20px",
                  color: "#ffffff",
                }}
              >
                Previous Year{" "}
                <span
                  style={{
                    color: "#ffd700",
                    fontFamily: "'Silkscreen', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Gallery
                </span>
              </h2>
              <div
                className="matches-gallery-underline"
                style={{
                  height: "4px",
                  width: "60px",
                  background: "#ffd700",
                  margin: "0 auto 30px",
                  transition: "0.3s",
                }}
              ></div>
            </div>
            <div style={{ position: "relative" }}>
              {/* Previous Button */}
              <button
                onClick={handlePrevious}
                style={{
                  position: "absolute",
                  left: "-50px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "40px",
                  height: "40px",
                  background: "#ffd700",
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
                  e.target.style.background = "#ffd700";
                  e.target.style.transform = "translateY(-50%) scale(1)";
                }}
              >
                ‹
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                style={{
                  position: "absolute",
                  right: "-50px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "40px",
                  height: "40px",
                  background: "#ffd700",
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
                  e.target.style.background = "#ffd700";
                    e.target.style.transform = "translateY(-50%) scale(1)";
                  }}
                  >
                  ›
                  </button>

                  <div
                  ref={scrollContainerRef}
                  className="matches-gallery-scroll-wrap"
                  style={{
                    display: "flex",
                    gap: "20px",
                    overflowX: "hidden",
                    overflowY: "hidden",
                    padding: "20px 0",
                    scrollBehavior: "smooth",
                    background: "rgba(26, 14, 34, 0.5)",
                    border: "3px solid #ffd700",
                    borderRadius: "10px",
                    boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
                  }}
                  >
                  {galleryImages.concat(galleryImages).map((image, index) => (
                    <div
                    key={index}
                    style={{
                      minWidth: "300px",
                      height: "200px",
                      flexShrink: 0,
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "2px solid #00ffea",
                      boxShadow: "0 0 15px rgba(0, 255, 234, 0.4)",
                      background: "#1a0e22",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    >
                    <img
                      src={galleryThumb(image)}
                      alt={`Gallery ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      imageRendering: "pixelated",
                      filter: "drop-shadow(0 0 10px rgba(0, 255, 234, 0.5))",
                      }}
                    />
                    </div>
                  ))}
                  </div>
                </div>
                </div>
              </div>

              <div id="events-grid" className="row align-items-center mb-30">
                <div className="col-lg-12" style={{ textAlign: "center" }}>
                <SectionTitle titlefirst="Featured Events" className="gallery-heading-title" />
                </div>
                <div className="col-lg-12">
                <div
                  className="my-masonry wow fadeInDown animated"
                  data-animation="fadeInRight"
                  data-delay=".4s"
                  style={{ textAlign: "center" }}
                >
                  <div
                  className="button-group filter-button-group"
                  style={{ textAlign: "center", marginBottom: "20px" }}
                  aria-label="Filter events"
                  >
                  <button
                    className={activeFilter === "All" ? "active" : ""}
                    onClick={() => filterEvents("All")}
                  >
                    All
                  </button>
                  <button
                    className={activeFilter === "Technicals" ? "active" : ""}
                    onClick={() => filterEvents("Technicals")}
                  >
                    Technicals
                  </button>
                  <button
                    className={activeFilter === "Robotics" ? "active" : ""}
                    onClick={() => filterEvents("Robotics")}
                  >
                    Robotics
                  </button>
                  <button
                    className={activeFilter === "Gaming" ? "active" : ""}
                    onClick={() => filterEvents("Gaming")}
                  >
                    Gaming
                  </button>
                  <button
                    className={activeFilter === "Brain Teaser" ? "active" : ""}
                    onClick={() => filterEvents("Brain Teaser")}
                  >
                    Brain Teaser
                  </button>
                  <button
                    className={activeFilter === "Creative" ? "active" : ""}
                    onClick={() => filterEvents("Creative")}
                  >
                    Creative
                  </button>
                  </div>
                </div>
                </div>
              </div>
              <div
                className="row"
                style={{ paddingTop: "20px", overflow: "visible" }}
              >
                {events.map((event, index) => {
            const {
              logo,
              cardBg,
              name,
              url,
              entryFee,
              entryFeeInternal,
              entryFeeExternal,
              teamSize,
            } = event;
            return (
              <div
                key={index}
                className="col-lg-4 col-md-6 col-sm-6 mb-40 wow fadeInUp animated"
                data-animation="fadeInUp"
                data-delay={`${0.1 * index}s`}
                style={{ paddingTop: "10px" }}
              >
                <Link to={url} style={{ textDecoration: "none" }}>
                  <RetroCard
                    bg={hoveredIndex === index ? "#1a3d3d" : "#1a0e22"}
                    textColor={hoveredIndex === index ? "#00ffea" : "#ffffff"}
                    borderColor={hoveredIndex === index ? "#00ffea" : "#ffd700"}
                    shadowColor={hoveredIndex === index ? "#00ffea" : "#ffd700"}
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "20px",
                      cursor: "pointer",
                      transform:
                        hoveredIndex === index
                          ? "translateY(-8px)"
                          : "translateY(0)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Background image with reduced brightness */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${cardThumb(cardBg)})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: hoveredIndex === index ? 0.4 : 0.3,
                        filter: "brightness(0.6)",
                        transition: "all 0.3s ease",
                        zIndex: 0,
                      }}
                    />

                    {/* Content overlay */}
                    <div
                      style={{
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      {/* Mascot image */}
                      <img
                        src={logoThumb(logo)}
                        alt={name}
                        loading="lazy"
                        decoding="async"
                        style={{
                          maxWidth: "70%",
                          maxHeight: "65%",
                          objectFit: "contain",
                          filter:
                            hoveredIndex === index
                              ? "drop-shadow(0 0 20px rgba(0, 255, 234, 0.8))"
                              : "drop-shadow(0 0 15px rgba(255, 215, 0, 0.8))",
                          marginBottom: "15px",
                          imageRendering: "pixelated",
                        }}
                      />

                      {/* Event name */}
                      <h4
                        style={{
                          fontSize: "14px",
                          margin: "0 0 10px 0",
                          textAlign: "center",
                          fontFamily: '"Press Start 2P", system-ui',
                          lineHeight: "1.4",
                        }}
                      >
                        {name}
                      </h4>

                      {/* Entry Fee & Team Size badges */}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          gap: "6px",
                          marginTop: "4px",
                        }}
                      >
                        {/* Fee badge */}
                        {entryFeeInternal && entryFeeExternal ? (
                          <span
                            style={{
                              background:
                                entryFeeInternal === "FREE"
                                  ? "rgba(0,255,100,0.15)"
                                  : "rgba(255,192,16,0.15)",
                              border: `1px solid ${entryFeeInternal === "FREE" ? "#00ff64" : "#ffc010"}`,
                              color:
                                entryFeeInternal === "FREE"
                                  ? "#00ff64"
                                  : "#ffc010",
                              fontSize: "8px",
                              fontFamily: '"Press Start 2P", system-ui',
                              padding: "3px 7px",
                              borderRadius: "2px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {entryFeeInternal}/{entryFeeExternal}
                          </span>
                        ) : entryFee ? (
                          <span
                            style={{
                              background:
                                entryFee === "FREE"
                                  ? "rgba(0,255,100,0.15)"
                                  : "rgba(255,192,16,0.15)",
                              border: `1px solid ${entryFee === "FREE" ? "#00ff64" : "#ffc010"}`,
                              color:
                                entryFee === "FREE" ? "#00ff64" : "#ffc010",
                              fontSize: "8px",
                              fontFamily: '"Press Start 2P", system-ui',
                              padding: "3px 7px",
                              borderRadius: "2px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {entryFee === "FREE" ? "FREE" : `${entryFee}`}
                          </span>
                        ) : null}

                        {/* Team size badge */}
                        {teamSize && (
                          <span
                            style={{
                              background: "rgba(0,255,234,0.12)",
                              border: "1px solid #00ffea",
                              color: "#00ffea",
                              fontSize: "8px",
                              fontFamily: '"Press Start 2P", system-ui',
                              padding: "3px 7px",
                              borderRadius: "2px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {teamSize}
                          </span>
                        )}
                      </div>
                    </div>
                  </RetroCard>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Matches;
