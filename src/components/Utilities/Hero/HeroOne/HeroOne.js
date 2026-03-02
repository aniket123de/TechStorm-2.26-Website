import React, { useEffect, useRef, useState, useCallback } from "react";
import ReactDOM from "react-dom";
const arcadeVideo = "https://github.com/aniket123de/TechStorm-2.26-Website/releases/download/Video/arcade.mp4";

/* ─── Pixel Coin SVG ─── */
function CoinIcon({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      style={{ imageRendering: "pixelated", display: "block", flexShrink: 0 }}
    >
      <rect x="6" y="0" width="8" height="2" fill="#FFD700" />
      <rect x="2" y="2" width="4" height="2" fill="#FFD700" />
      <rect x="14" y="2" width="4" height="2" fill="#FFD700" />
      <rect x="0" y="4" width="2" height="12" fill="#FFD700" />
      <rect x="18" y="4" width="2" height="12" fill="#FFD700" />
      <rect x="2" y="16" width="4" height="2" fill="#FFD700" />
      <rect x="14" y="16" width="4" height="2" fill="#FFD700" />
      <rect x="6" y="18" width="8" height="2" fill="#FFD700" />
      <rect x="8" y="5" width="5" height="2" fill="#FF8C00" />
      <rect x="6" y="7" width="2" height="6" fill="#FF8C00" />
      <rect x="8" y="13" width="5" height="2" fill="#FF8C00" />
    </svg>
  );
}

/* ─── Canvas Glitch Overlay ─── */
function GlitchOverlay({ active }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (!active) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animRef.current);
      return;
    }

    const ctx = canvas.getContext("2d");
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const numBars = 15 + Math.floor(Math.random() * 25);
      for (let i = 0; i < numBars; i++) {
        const y = Math.random() * canvas.height;
        const h = Math.random() * 40 + 2;
        const w = Math.random() * canvas.width * 0.9 + canvas.width * 0.1;
        const x = Math.random() * (canvas.width - w);
        const colors = [
          "#FF6B00",
          "#FFD700",
          "#00B4FF",
          "#A855F7",
          "#D946EF",
          "#ffffff",
          "#FF2200",
        ];
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.globalAlpha = Math.random() * 0.75 + 0.1;
        ctx.fillRect(x, y, w, h);
      }
      for (let i = 0; i < 8; i++) {
        const x = Math.random() * canvas.width;
        const w2 = Math.random() * 6 + 1;
        ctx.fillStyle = `rgba(255,0,0,${Math.random() * 0.5})`;
        ctx.globalAlpha = 1;
        ctx.fillRect(x, 0, w2, canvas.height);
        ctx.fillStyle = `rgba(0,255,255,${Math.random() * 0.5})`;
        ctx.fillRect(x + 4, 0, w2, canvas.height);
      }
      for (let i = 0; i < 1000; i++) {
        const px = Math.round(Math.random() * canvas.width);
        const py = Math.round(Math.random() * canvas.height);
        const sz = Math.random() < 0.7 ? 2 : 4;
        ctx.fillStyle = Math.random() > 0.4 ? "#ffffff" : "#000000";
        ctx.globalAlpha = Math.random() * 0.9;
        ctx.fillRect(px, py, sz, sz);
      }
      ctx.globalAlpha = 1;
      if (frame % 3 < 2) {
        const fs = Math.max(24, Math.floor(canvas.width * 0.08));
        ctx.font = `${fs}px 'Press Start 2P', monospace`;
        ctx.globalAlpha = Math.random() * 0.8 + 0.1;
        ctx.fillStyle = "#FF6B00";
        ctx.fillText(
          "TECHSTORM 2.26",
          canvas.width * 0.06 + (Math.random() - 0.5) * 24,
          canvas.height * 0.5 + (Math.random() - 0.5) * 24,
        );
        ctx.fillStyle = "#00B4FF";
        ctx.globalAlpha = 0.45;
        ctx.fillText(
          "TECHSTORM 2.26",
          canvas.width * 0.06 + 8,
          canvas.height * 0.5 - 6,
        );
        ctx.fillStyle = "#D946EF";
        ctx.globalAlpha = 0.35;
        ctx.fillText(
          "TECHSTORM 2.26",
          canvas.width * 0.06 - 6,
          canvas.height * 0.5 + 8,
        );
        ctx.globalAlpha = 1;
      }
      frame++;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 8000,
        pointerEvents: "none",
        opacity: active ? 1 : 0,
        transition: "opacity 0.08s",
      }}
    />
  );
}

/* ─── Fullscreen Video Player ─── */
function VideoPlayer({ onEnded }) {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [warning, setWarning] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");
  const warnTimer = useRef(null);

  const VIDEO_URL = arcadeVideo;

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.play().catch(() => {});
    const onTime = () => {
      setCurrentTime(vid.currentTime);
      setProgress(vid.duration ? (vid.currentTime / vid.duration) * 100 : 0);
    };
    const onMeta = () => setDuration(vid.duration);
    vid.addEventListener("timeupdate", onTime);
    vid.addEventListener("loadedmetadata", onMeta);
    vid.addEventListener("ended", onEnded);
    return () => {
      vid.removeEventListener("timeupdate", onTime);
      vid.removeEventListener("loadedmetadata", onMeta);
      vid.removeEventListener("ended", onEnded);
    };
  }, [onEnded]);

  const triggerWarning = useCallback((msg) => {
    setWarningMsg(msg);
    setWarning(true);
    clearTimeout(warnTimer.current);
    warnTimer.current = setTimeout(() => setWarning(false), 2800);
  }, []);

  useEffect(() => {
    const block = (e) => {
      if (["Escape", "F11"].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        triggerWarning("NO EXIT DURING THE STORM!");
      }
      if ((e.key === "f" || e.key === "F") && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        triggerWarning("FULLSCREEN LOCKED!");
      }
    };
    window.addEventListener("keydown", block, true);
    return () => window.removeEventListener("keydown", block, true);
  }, [triggerWarning]);

  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  const videoPlayerContent = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 99999999,
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.85) 100%)",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
      <video
        ref={videoRef}
        src={VIDEO_URL}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          inset: 0,
        }}
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
      />

      {/* TOP HUD */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "18px 28px",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.92) 0%, transparent 100%)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "11px",
            color: "var(--orange)",
            textShadow: "0 0 12px var(--orange)",
            letterSpacing: "2px",
            animation: "flicker 3s infinite",
          }}
        >
          ⚡ TECHSTORM 2.26
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255,0,0,0.15)",
              border: "1px solid #FF4444",
              padding: "6px 12px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                background: "#FF4444",
                borderRadius: "50%",
                animation: "blink 0.8s infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "8px",
                color: "#FF4444",
                letterSpacing: "2px",
              }}
            >
              LIVE PROMO
            </span>
          </div>
          <div
            onClick={() => triggerWarning("YOU CANNOT ESCAPE THE STORM! ⚡")}
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "8px",
              color: "#3a3a3a",
              cursor: "pointer",
              letterSpacing: "1px",
              padding: "6px 10px",
              border: "1px solid #2a2a2a",
              transition: "all 0.2s",
              userSelect: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#666";
              e.currentTarget.style.borderColor = "#444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#3a3a3a";
              e.currentTarget.style.borderColor = "#2a2a2a";
            }}
          >
            [ ESC ]
          </div>
        </div>
      </div>

      {/* WARNING POPUP */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 20,
          pointerEvents: "none",
          opacity: warning ? 1 : 0,
          transition: "opacity 0.15s",
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.97)",
            border: "4px solid var(--orange)",
            padding: "36px 48px",
            textAlign: "center",
            boxShadow: "0 0 80px rgba(255,107,0,0.7)",
            clipPath:
              "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "16px" }}>⛔</div>
          <div
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "clamp(10px, 2vw, 16px)",
              color: "var(--orange)",
              textShadow: "0 0 15px var(--orange)",
              marginBottom: "16px",
              lineHeight: 1.8,
              letterSpacing: "2px",
            }}
          >
            CANNOT SKIP!
          </div>
          <div
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: "clamp(18px, 3vw, 26px)",
              color: "var(--yellow)",
              letterSpacing: "2px",
              lineHeight: 1.7,
            }}
          >
            {warningMsg}
            <br />
            <span style={{ color: "#aaa", fontSize: "80%" }}>
              WATCH UNTIL THE END TO CONTINUE.
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "12px 28px 28px",
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.96) 0%, transparent 100%)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "9px",
              color: "var(--orange)",
            }}
          >
            {fmt(currentTime)}
          </span>
          <span
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: "16px",
              color: "#555",
              letterSpacing: "3px",
            }}
          >
            NO SKIP • WATCH FULL VIDEO TO CONTINUE
          </span>
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "9px",
              color: "#444",
            }}
          >
            {duration ? fmt(duration) : "--:--"}
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: "16px",
            background: "rgba(255,255,255,0.04)",
            border: "2px solid rgba(255,107,0,0.35)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, #FF4400, var(--orange), var(--yellow))",
              boxShadow: "0 0 12px var(--orange)",
              transition: "width 0.5s linear",
            }}
          />
          {Array.from({ length: 9 }, (_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${(i + 1) * 10}%`,
                width: "2px",
                background: "rgba(0,0,0,0.5)",
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              top: "-4px",
              bottom: "-4px",
              left: `calc(${progress}% - 4px)`,
              width: "8px",
              background: "var(--yellow)",
              boxShadow: "0 0 8px var(--yellow)",
            }}
          />
        </div>
      </div>
    </div>
  );

  // Render to document.body using portal to ensure it's above everything
  return ReactDOM.createPortal(videoPlayerContent, document.body);
}

/* ════════════════════════════════════════
   MAIN HERO COMPONENT
════════════════════════════════════════ */
function HeroOne() {
  const canvasRef = useRef(null);
  const [glitching, setGlitching] = useState(false);
  const [coinGlitching, setCoinGlitching] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [coinPressed, setCoinPressed] = useState(false);
  const [coinBounce, setCoinBounce] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Idle glitch every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 380);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Starfield canvas with shooting stars
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 240 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() < 0.25 ? 3 : Math.random() < 0.5 ? 2 : 1,
      opacity: Math.random(),
      speed: Math.random() * 0.035 + 0.005,
      color: ["#FFD700", "#FF8C00", "#00B4FF", "#A855F7", "#ffffff", "#FF6B00"][
        Math.floor(Math.random() * 6)
      ],
    }));

    const shoots = [];
    const spawnShoot = () =>
      shoots.push({
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.4,
        vx: 10 + Math.random() * 8,
        vy: 4 + Math.random() * 4,
        len: 80 + Math.random() * 80,
        life: 1,
      });
    const si = setInterval(spawnShoot, 2800);

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.opacity += (Math.random() - 0.5) * s.speed;
        s.opacity = Math.max(0.05, Math.min(1, s.opacity));
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.opacity;
        ctx.fillRect(Math.round(s.x), Math.round(s.y), s.size, s.size);
      });
      for (let i = shoots.length - 1; i >= 0; i--) {
        const s = shoots[i];
        const grad = ctx.createLinearGradient(
          s.x,
          s.y,
          s.x - s.vx * 6,
          s.y - s.vy * 6,
        );
        grad.addColorStop(0, `rgba(255,255,255,${s.life})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = grad;
        ctx.globalAlpha = s.life;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 6, s.y - s.vy * 6);
        ctx.stroke();
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.022;
        if (s.life <= 0 || s.x > canvas.width) shoots.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      clearInterval(si);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // INSERT COIN press
  const handleInsertCoin = useCallback(() => {
    if (coinPressed) return;
    setCoinPressed(true);
    setCoinBounce(true);
    setTimeout(() => setCoinBounce(false), 300);
    setCoinGlitching(true);
    setTimeout(() => {
      setCoinGlitching(false);
      setShowVideo(true);
    }, 950);
  }, [coinPressed]);

  // Video ended
  const handleVideoEnded = useCallback(() => {
    setShowVideo(false);
    setCoinGlitching(true);
    setTimeout(() => {
      setCoinGlitching(false);
      setCoinPressed(false);
    }, 750);
  }, []);

  return (
    <>
      <GlitchOverlay active={coinGlitching} />
      {showVideo && <VideoPlayer onEnded={handleVideoEnded} />}

      <section
        id="home"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background:
            "linear-gradient(180deg, #030308 0%, #080C24 35%, #0E0520 65%, #080808 100%)",
        }}
      >
        {/* Starfield */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />

        {/* Retrowave grid floor — wrapper clips AFTER the transform so left/right % actually work */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <div
            className="hero-grid-floor"
            style={{
              position: "absolute",
              bottom: 0,
              left: "-30%",
              right: "-30%",
              height: "52%",
              background: `
              linear-gradient(to bottom, transparent 0%, rgba(61,90,254,0.12) 100%),
              repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(61,90,254,0.28) 59px, rgba(61,90,254,0.28) 61px),
              repeating-linear-gradient(0deg, transparent, transparent 38px, rgba(61,90,254,0.2) 38px, rgba(61,90,254,0.2) 40px)
            `,
              transform: "perspective(700px) rotateX(62deg)",
              transformOrigin: "center bottom",
            }}
          />
        </div>
        {/* ══ MAIN CONTENT ══ */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "0 20px",
          }}
        >
          {/* Title with glitch effect */}
          <div
            style={{
              position: "relative",
              display: "inline-block",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: isMobile
                  ? "clamp(30px, 9vw, 48px)"
                  : "clamp(18px, 5.2vw, 62px)",
                color: glitching ? "var(--blue-electric)" : "var(--orange)",
                textShadow: glitching
                  ? "6px 0 var(--purple-neon), -6px 0 var(--blue-electric), 0 0 70px var(--blue-electric)"
                  : isMobile
                    ? "3px 3px 0 var(--yellow), 0 0 24px var(--orange)"
                    : "5px 5px 0 var(--yellow), -2px -2px 0 rgba(255,107,0,0.45), 0 0 60px var(--orange), 0 0 120px rgba(255,107,0,0.2)",
                letterSpacing: isMobile ? "3px" : "6px",
                lineHeight: isMobile ? 1.35 : 1.1,
                transition: "all 0.04s",
                transform: glitching
                  ? "translate(4px, -2px) skewX(-3deg)"
                  : "none",
                animation: "flicker 5s infinite",
                userSelect: "none",
              }}
            >
              {isMobile ? (
                <>
                  <div>TECHSTORM</div>
                  <div
                    style={{
                      fontSize: "0.78em",
                      letterSpacing: isMobile ? "4px" : "6px",
                      marginTop: "4px",
                    }}
                  >
                    2.26
                  </div>
                </>
              ) : (
                "TECHSTORM 2.26"
              )}
            </div>
            {glitching && (
              <>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "6px",
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: isMobile
                      ? "clamp(30px, 9vw, 48px)"
                      : "clamp(18px, 5.2vw, 62px)",
                    color: "var(--purple-neon)",
                    opacity: 0.8,
                    letterSpacing: isMobile ? "3px" : "6px",
                    lineHeight: isMobile ? 1.35 : 1.1,
                    clipPath: "polygon(0 20%, 100% 20%, 100% 48%, 0 48%)",
                    pointerEvents: "none",
                  }}
                >
                  {isMobile ? (
                    <>
                      <div>TECHSTORM</div>
                      <div style={{ fontSize: "0.78em", marginTop: "4px" }}>
                        2.26
                      </div>
                    </>
                  ) : (
                    "TECHSTORM 2.26"
                  )}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-6px",
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: isMobile
                      ? "clamp(30px, 9vw, 48px)"
                      : "clamp(18px, 5.2vw, 62px)",
                    color: "var(--blue-electric)",
                    opacity: 0.8,
                    letterSpacing: isMobile ? "3px" : "6px",
                    lineHeight: isMobile ? 1.35 : 1.1,
                    clipPath: "polygon(0 54%, 100% 54%, 100% 82%, 0 82%)",
                    pointerEvents: "none",
                  }}
                >
                  {isMobile ? (
                    <>
                      <div>TECHSTORM</div>
                      <div style={{ fontSize: "0.78em", marginTop: "4px" }}>
                        2.26
                      </div>
                    </>
                  ) : (
                    "TECHSTORM 2.26"
                  )}
                </div>
              </>
            )}
          </div>

          {/* Sub-title */}
          <div
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: isMobile
                ? "clamp(18px, 5vw, 28px)"
                : "clamp(20px, 3.5vw, 36px)",
              color: "var(--yellow)",
              letterSpacing: isMobile ? "3px" : "8px",
              marginTop: isMobile ? "14px" : "20px",
              marginBottom: isMobile ? "32px" : "50px",
              textShadow: "0 0 20px var(--yellow)",
              paddingLeft: isMobile ? "10px" : "0",
              paddingRight: isMobile ? "10px" : "0",
            }}
          >
            &gt;&gt;Play The Past, Build The Future&lt;&lt;
          </div>

          {/* ── BUTTONS ── */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* INSERT COIN */}
            <button
              onClick={handleInsertCoin}
              disabled={coinPressed}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "14px",
                fontFamily: "'Press Start 2P', monospace",
                fontSize: isMobile
                  ? "clamp(10px, 2.8vw, 12px)"
                  : "clamp(9px, 1.5vw, 12px)",
                background: coinPressed
                  ? "rgba(255,107,0,0.15)"
                  : "linear-gradient(135deg, #FF8C00 0%, #FFD700 55%, #FF5500 100%)",
                color: coinPressed ? "rgba(255,107,0,0.6)" : "#000",
                padding: isMobile ? "13px 20px" : "17px 30px",
                border: `3px solid ${coinPressed ? "rgba(255,107,0,0.4)" : "var(--yellow)"}`,
                cursor: coinPressed ? "not-allowed" : "pointer",
                letterSpacing: "2px",
                fontWeight: "bold",
                boxShadow: coinPressed
                  ? "none"
                  : "0 0 35px var(--orange), 0 0 80px rgba(255,107,0,0.5), inset 0 1px 0 rgba(255,255,255,0.35)",
                transition: "all 0.15s",
                animation: coinPressed ? "none" : "pixelPulse 2s infinite",
                clipPath:
                  "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                transform: coinBounce
                  ? "scale(0.94) translateY(2px)"
                  : "scale(1)",
              }}
              onMouseEnter={(e) => {
                if (!coinPressed) {
                  e.currentTarget.style.transform =
                    "scale(1.07) translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 0 60px var(--orange), 0 0 120px rgba(255,107,0,0.7)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = coinPressed
                  ? "none"
                  : "0 0 35px var(--orange), 0 0 80px rgba(255,107,0,0.5)";
              }}
              onMouseDown={(e) => {
                if (!coinPressed)
                  e.currentTarget.style.transform =
                    "scale(0.95) translateY(2px)";
              }}
              onMouseUp={(e) => {
                if (!coinPressed)
                  e.currentTarget.style.transform =
                    "scale(1.07) translateY(-3px)";
              }}
            >
              <CoinIcon size={24} />
              {coinPressed ? "● LOADING..." : "INSERT COIN"}
            </button>

            {/* View Events */}
            <a
              href="/events"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontFamily: "'Press Start 2P', monospace",
                fontSize: isMobile
                  ? "clamp(10px, 2.8vw, 12px)"
                  : "clamp(9px, 1.5vw, 12px)",
                background: "transparent",
                color: "var(--blue-electric)",
                padding: isMobile ? "13px 20px" : "17px 30px",
                textDecoration: "none",
                letterSpacing: "2px",
                border: "3px solid var(--blue-electric)",
                clipPath:
                  "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                boxShadow:
                  "0 0 25px rgba(0,180,255,0.3), inset 0 0 25px rgba(0,180,255,0.05)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,180,255,0.12)";
                e.currentTarget.style.boxShadow =
                  "0 0 40px rgba(0,180,255,0.65)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow =
                  "0 0 25px rgba(0,180,255,0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              ▶ VIEW EVENTS
            </a>
          </div>

          {/* Hint text */}
          <div
            style={{
              marginTop: "22px",
              fontFamily: "'VT323', monospace",
              fontSize: "clamp(14px, 2vw, 18px)",
              color: "rgba(255,215,0,0.45)",
              letterSpacing: "3px",
              animation: "blink 1.4s infinite",
            }}
          >
            ↑ CLICK TO WATCH THE OFFICIAL PROMO ↑
          </div>
        </div>

        {/* Scroll cue */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "8px",
            color: "var(--yellow)",
            opacity: 0.55,
            textAlign: "center",
            animation: "floatCentered 2s infinite",
            letterSpacing: "2px",
            whiteSpace: "nowrap",
          }}
        >
          ▼ SCROLL DOWN ▼
        </div>
      </section>
    </>
  );
}

export default HeroOne;
