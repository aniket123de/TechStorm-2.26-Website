import { Link } from "react-router-dom";
import { cloudinaryImages } from "../../../config/cloudinary";
const logo = cloudinaryImages.logo.iplogo;

const footerbg = cloudinaryImages.root.footerbg;

const eventCategories = [
  { label: "Coding", query: "Coding" },
  { label: "Robotics", query: "Robotics" },
  { label: "Gaming", query: "Gaming" },
  { label: "Brain Teaser", query: "Brain Teaser" },
  { label: "Creative", query: "Creative" },
];

const Footer = () => {
  return (
    <footer
      className="footer-bg footer-p"
      style={{
        backgroundImage: `url(${footerbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* Top blend — strong fade from whatever section sits above into the footer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "160px",
          background:
            "linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Main dark overlay for the rest of the footer */}
      <div
        style={{
          position: "absolute",
          top: "60px",
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.72)",
          zIndex: 0,
        }}
      />

      <div
        className="footer-top pt-70 pl-40 pr-40"
        style={{ position: "relative", zIndex: 2, paddingBottom: "40px" }}
      >
        <div className="container">
          <div className="row">
            {/* ── Column 1: Logo + Contact ── */}
            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
              <div className="footer-widget mb-30">
                <div className="f-widget-title mb-20">
                  <img
                    src={logo}
                    alt="TechStorm Logo"
                    className="footer-logo"
                    style={{ maxWidth: "350px", width: "100%", height: "auto" }}
                  />
                </div>
                <div className="footer-link" style={{ fontSize: "clamp(11px, 2.5vw, 13px)", lineHeight: "1.9" }}>
                  {
                    "TechStorm 2026 - Play the Past, Build the Future. The flagship technical fest celebrating retro arcade culture and modern innovation."
                  }
                </div>
                <div className="f-contact mt-20">
                  <ul>
                    <li>
                      <i className="icon fal fa-map-marker-alt"></i>
                      <span>
                        {
                          "Address : 137, VIP Rd, Mali Bagan, Poodar Vihar, Rajarhat, Kolkata, West Bengal 700052"
                        }
                      </span>
                    </li>
                    <li>
                      <i className="icon far fa-clock"></i>
                      <span>
                        Phone :{" "}
                        <a href="tel:+919038903850">{"+91 9038903850"}</a>
                      </span>
                    </li>
                    <li>
                      <i className="icon dripicons-mail"></i>
                      <span>
                        {"Email :"}{" "}
                        <a href="mailto:techforum@bppimt.ac.in">
                          {"techforum@bppimt.ac.in"}
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ── Column 2: Our Links ── */}
            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-6 footer-links-col">
              <div className="footer-widget mb-30 footer-links-section">
                <div className="f-widget-title">
                  <h2>{"Our Links"}</h2>
                </div>
                <div className="footer-link" style={{ lineHeight: "1.9" }}>
                  <ul>
                    <li>
                      <Link to={"/"}>{"Home"}</Link>
                    </li>
                    <li>
                      <Link to={"/gallery"}>{"Gallery"}</Link>
                    </li>
                    <li>
                      <Link to={"/schedule"}>{"Schedule"}</Link>
                    </li>
                    <li>
                      <Link to={"/team"}>{"Teams"}</Link>
                    </li>
                    <li>
                      <Link to={"/verify-registration"}>{"Verify Registration"}</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ── Column 3: Event Categories → /events?category=… ── */}
            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-6 footer-links-col">
              <div className="footer-widget mb-30 footer-links-section">
                <div className="f-widget-title">
                  <h2>{"Events"}</h2>
                </div>
                <div className="footer-link" style={{ lineHeight: "1.9" }}>
                  <ul>
                    {eventCategories.map(({ label, query }) => (
                      <li key={query}>
                        <Link
                          to={`/events?category=${encodeURIComponent(query)}`}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ── Column 4: Follow Us + Map ── */}
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="footer-widget mb-30 footer-links-section">
                <div className="f-widget-title">
                  <h2>{"Follow Us"}</h2>
                </div>
                <div className="footer-social-nes mt-30">
                  <a
                    href="https://www.facebook.com/techstorm2.23"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nes-social-icon"
                  >
                    <i className="nes-icon facebook is-medium"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/techstorm_2.26/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nes-social-icon"
                  >
                    <i className="nes-icon instagram is-medium"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/techstorm-2-23/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nes-social-icon"
                  >
                    <i className="nes-icon linkedin is-medium"></i>
                  </a>
                  <a
                    href="mailto:techforum@bppimt.ac.in"
                    className="nes-social-icon"
                  >
                    <i className="nes-icon gmail is-medium"></i>
                  </a>
                </div>
              </div>
              <div
                className="footer-widget mb-30"
                style={{ marginBottom: "50px" }}
              >
                <div className="f-widget-title">
                  <h2>{"Map"}</h2>
                </div>
                <div
                  className="map-f-container"
                  style={{ marginBottom: "20px" }}
                >
                  <div
                    className="map-f"
                    style={{
                      border: "4px solid #ffc010",
                      padding: "0",
                      background: "rgba(26, 14, 34, 0.9)",
                      position: "relative",
                      marginBottom: "20px",
                    }}
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.9862!2d88.4319943!3d22.6296667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89fe3b109c623%3A0xdfbe090bb9572f78!2sB.%20P.%20Poddar%20Institute%20of%20Management%20and%20Technology!5e0!3m2!1sen!2sin!4v1738522844123!5m2!1sen!2sin"
                      width="100%"
                      height="200"
                      style={{ border: 0, display: "block" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="BPPIMT Location"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="copyright-wrap pl-40 pr-40"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 col-md-12">
              <div className="copyright-content">
                <div>
                  {"Copyright © 2026"} <span>{"TechStorm | BPPIMT"}</span>
                </div>
                <div>{"All Rights Reserved."}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
