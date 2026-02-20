import React, { useEffect, useRef, useCallback, useMemo } from "react";
import "./ProfileCard.css";

const DEFAULT_INNER_GRADIENT =
  "linear-gradient(145deg,rgba(255, 201, 136, 0.55) 0%,rgba(245, 180, 2, 0.35) 100%)";
const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180,
};

const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v, fMin, fMax, tMin, tMax) =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

// Inject keyframes once
const KEYFRAMES_ID = "pc-keyframes";
if (typeof document !== "undefined" && !document.getElementById(KEYFRAMES_ID)) {
  const style = document.createElement("style");
  style.id = KEYFRAMES_ID;
  style.textContent = `
    @keyframes pc-holo-bg {
      0% { background-position: 0 var(--background-y), 0 0, center; }
      100% { background-position: 0 var(--background-y), 90% 90%, center; }
    }
  `;
  document.head.appendChild(style);
}

const ProfileCardComponent = ({
  avatarUrl = "",
  iconUrl = "",
  grainUrl = "",
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = "",
  enableTilt = true,
  enableMobileTilt = true,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = "Team Member",
  title = "Position",
  handle = "member",
  status = "Organizing Committee",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
}) => {
  const wrapRef = useRef(null);
  const shellRef = useRef(null);
  const enterTimerRef = useRef(null);
  const leaveRafRef = useRef(null);

  // Use a default transparent pixel for icon/grain if not provided
  const defaultTransparentPixel =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  const effectiveIconUrl = iconUrl || defaultTransparentPixel;
  const effectiveGrainUrl = grainUrl || defaultTransparentPixel;

  const tiltEngine = useMemo(() => {
    if (!enableTilt) return null;

    let rafId = null;
    let running = false;
    let lastTs = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x, y) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;
      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
      };

      for (const [k, v] of Object.entries(properties))
        wrap.style.setProperty(k, v);
    };

    const step = (ts) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);
      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar =
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05;
      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x, y) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x, y) {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs) {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      },
    };
  }, [enableTilt]);

  const getOffsets = (evt, el) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    (event) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine],
  );

  const handlePointerEnter = useCallback(
    (event) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      shell.classList.add("active");
      shell.classList.add("entering");

      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => {
        shell.classList.remove("entering");
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine],
  );

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;

    tiltEngine.toCenter();

    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        shell.classList.remove("active");
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };

    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  const handleDeviceOrientation = useCallback(
    (event) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      const { beta, gamma } = event;
      if (beta == null || gamma == null) return;

      const centerX = shell.clientWidth / 2;
      const centerY = shell.clientHeight / 2;
      const x = clamp(
        centerX + gamma * mobileTiltSensitivity,
        0,
        shell.clientWidth,
      );
      const y = clamp(
        centerY +
          (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        0,
        shell.clientHeight,
      );

      tiltEngine.setTarget(x, y);
    },
    [tiltEngine, mobileTiltSensitivity],
  );

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;

    const shell = shellRef.current;
    if (!shell) return;

    const pointerMoveHandler = handlePointerMove;
    const pointerEnterHandler = handlePointerEnter;
    const pointerLeaveHandler = handlePointerLeave;
    const deviceOrientationHandler = handleDeviceOrientation;

    shell.addEventListener("pointerenter", pointerEnterHandler);
    shell.addEventListener("pointermove", pointerMoveHandler);
    shell.addEventListener("pointerleave", pointerLeaveHandler);

    const handleClick = () => {
      if (!enableMobileTilt || window.location.protocol !== "https:") return;
      const anyMotion = window.DeviceMotionEvent;
      if (anyMotion && typeof anyMotion.requestPermission === "function") {
        anyMotion
          .requestPermission()
          .then((state) => {
            if (state === "granted") {
              window.addEventListener(
                "deviceorientation",
                deviceOrientationHandler,
              );
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener("deviceorientation", deviceOrientationHandler);
      }
    };

    shell.addEventListener("click", handleClick);

    const initialX =
      (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(initialX, initialY);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener("pointerenter", pointerEnterHandler);
      shell.removeEventListener("pointermove", pointerMoveHandler);
      shell.removeEventListener("pointerleave", pointerLeaveHandler);
      shell.removeEventListener("click", handleClick);
      window.removeEventListener("deviceorientation", deviceOrientationHandler);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove("entering");
    };
  }, [
    enableTilt,
    enableMobileTilt,
    tiltEngine,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation,
  ]);

  const cardRadius = "0px";

  const cardStyle = useMemo(
    () => ({
      "--icon": effectiveIconUrl ? `url(${effectiveIconUrl})` : "none",
      "--grain": effectiveGrainUrl ? `url(${effectiveGrainUrl})` : "none",
      "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
      "--behind-glow-color": behindGlowColor ?? "rgba(255, 165, 0, 0.75)",
      "--behind-glow-size": behindGlowSize ?? "50%",
      "--pointer-x": "50%",
      "--pointer-y": "50%",
      "--pointer-from-center": "0",
      "--pointer-from-top": "0.5",
      "--pointer-from-left": "0.5",
      "--card-opacity": "0",
      "--rotate-x": "0deg",
      "--rotate-y": "0deg",
      "--background-x": "50%",
      "--background-y": "50%",
      "--card-radius": cardRadius,
      "--sunpillar-1": "hsl(30, 100%, 60%)",
      "--sunpillar-2": "hsl(40, 100%, 55%)",
      "--sunpillar-3": "hsl(50, 100%, 60%)",
      "--sunpillar-4": "hsl(35, 100%, 65%)",
      "--sunpillar-5": "hsl(45, 100%, 58%)",
      "--sunpillar-6": "hsl(25, 100%, 62%)",
      "--sunpillar-clr-1": "var(--sunpillar-1)",
      "--sunpillar-clr-2": "var(--sunpillar-2)",
      "--sunpillar-clr-3": "var(--sunpillar-3)",
      "--sunpillar-clr-4": "var(--sunpillar-4)",
      "--sunpillar-clr-5": "var(--sunpillar-5)",
      "--sunpillar-clr-6": "var(--sunpillar-6)",
    }),
    [
      effectiveIconUrl,
      effectiveGrainUrl,
      innerGradient,
      behindGlowColor,
      behindGlowSize,
    ],
  );

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  const shineStyle = {
    maskImage: "var(--icon)",
    maskMode: "luminance",
    maskRepeat: "repeat",
    maskSize: "150%",
    maskPosition:
      "top calc(200% - (var(--background-y) * 5)) left calc(100% - var(--background-x))",
    filter: "brightness(0.66) contrast(1.33) saturate(0.33) opacity(0.5)",
    animation: "pc-holo-bg 18s linear infinite",
    animationPlayState: "running",
    mixBlendMode: "color-dodge",
    "--space": "5%",
    "--angle": "-45deg",
    transform: "translate3d(0, 0, 1px)",
    overflow: "hidden",
    zIndex: 3,
    background: "transparent",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage:
      `repeating-linear-gradient(0deg,var(--sunpillar-clr-1) calc(var(--space) * 1),var(--sunpillar-clr-2) calc(var(--space) * 2),var(--sunpillar-clr-3) calc(var(--space) * 3),var(--sunpillar-clr-4) calc(var(--space) * 4),var(--sunpillar-clr-5) calc(var(--space) * 5),var(--sunpillar-clr-6) calc(var(--space) * 6),var(--sunpillar-clr-1) calc(var(--space) * 7)),repeating-linear-gradient(var(--angle),#0e152e 0%,hsl(180, 10%, 60%) 3.8%,hsl(180, 29%, 66%) 4.5%,hsl(180, 10%, 60%) 5.2%,#0e152e 10%,#0e152e 12%),radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y),hsla(0, 0%, 0%, 0.1) 12%,hsla(0, 0%, 0%, 0.15) 20%,hsla(0, 0%, 0%, 0.25) 120%)`.replace(
        /\s+/g,
        " ",
      ),
    gridArea: "1 / -1",
    borderRadius: "0",
    imageRendering: "pixelated",
    pointerEvents: "none",
  };

  const glareStyle = {
    transform: "translate3d(0, 0, 1.1px)",
    overflow: "hidden",
    backgroundImage: `radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y),hsl(40, 80%, 70%) 12%,hsla(30, 60%, 30%, 0.8) 90%)`,
    mixBlendMode: "overlay",
    filter: "brightness(0.8) contrast(1.2)",
    zIndex: 4,
    gridArea: "1 / -1",
    borderRadius: "0",
    imageRendering: "pixelated",
    pointerEvents: "none",
  };

  return (
    <div
      ref={wrapRef}
      className={`profile-card-wrap ${className}`.trim()}
      style={{
        perspective: "500px",
        transform: "translate3d(0, 0, 0.1px)",
        ...cardStyle,
      }}
    >
      {behindGlowEnabled && (
        <div
          className="profile-card-glow"
          style={{
            background: `radial-gradient(circle at var(--pointer-x) var(--pointer-y), var(--behind-glow-color) 0%, transparent var(--behind-glow-size))`,
            filter: "blur(50px) saturate(1.1)",
            opacity: "calc(0.8 * var(--card-opacity))",
          }}
        />
      )}
      <div ref={shellRef} className="profile-card-shell">
        <section
          className="profile-card-section"
          style={{
            height: "65svh",
            maxHeight: "420px",
            aspectRatio: "0.78",
            borderRadius: "0",
            backgroundBlendMode: "color-dodge, normal, normal, normal",
            boxShadow:
              "rgba(255, 140, 0, 0.4) calc((var(--pointer-from-left) * 10px) - 3px) calc((var(--pointer-from-top) * 20px) - 6px) 20px -5px, rgba(0, 0, 0, 0.6) calc((var(--pointer-from-left) * 10px) - 3px) calc((var(--pointer-from-top) * 20px) - 6px) 25px -3px",
            transition: "transform 1s ease",
            transform: "translateZ(0) rotateX(0deg) rotateY(0deg)",
            background: "rgba(40, 30, 15, 0.95)",
            imageRendering: "pixelated",
            clipPath: `polygon(
              0 12px, 12px 12px, 12px 8px, 16px 8px, 16px 4px, 20px 4px, 20px 0,
              calc(100% - 20px) 0, calc(100% - 20px) 4px, calc(100% - 16px) 4px,
              calc(100% - 16px) 8px, calc(100% - 12px) 8px, calc(100% - 12px) 12px, 100% 12px,
              100% calc(100% - 12px), calc(100% - 12px) calc(100% - 12px),
              calc(100% - 12px) calc(100% - 8px), calc(100% - 16px) calc(100% - 8px),
              calc(100% - 16px) calc(100% - 4px), calc(100% - 20px) calc(100% - 4px),
              calc(100% - 20px) 100%, 20px 100%,
              20px calc(100% - 4px), 16px calc(100% - 4px), 16px calc(100% - 8px),
              12px calc(100% - 8px), 12px calc(100% - 12px), 0 calc(100% - 12px)
            )`,
            border: "4px solid #ffc010",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transition = "none";
            e.currentTarget.style.transform =
              "translateZ(0) rotateX(var(--rotate-y)) rotateY(var(--rotate-x))";
          }}
          onMouseLeave={(e) => {
            const shell = shellRef.current;
            if (shell?.classList.contains("entering")) {
              e.currentTarget.style.transition = "transform 180ms ease-out";
            } else {
              e.currentTarget.style.transition = "transform 1s ease";
            }
            e.currentTarget.style.transform =
              "translateZ(0) rotateX(0deg) rotateY(0deg)";
          }}
        >
          <div
            className="profile-card-inner"
            style={{
              backgroundImage: "var(--inner-gradient)",
              backgroundColor: "rgba(40, 30, 15, 0.95)",
              borderRadius: "0",
              imageRendering: "pixelated",
              clipPath: `polygon(
                0 10px, 10px 10px, 10px 6px, 14px 6px, 14px 3px, 17px 3px, 17px 0,
                calc(100% - 17px) 0, calc(100% - 17px) 3px, calc(100% - 14px) 3px,
                calc(100% - 14px) 6px, calc(100% - 10px) 6px, calc(100% - 10px) 10px, 100% 10px,
                100% calc(100% - 10px), calc(100% - 10px) calc(100% - 10px),
                calc(100% - 10px) calc(100% - 6px), calc(100% - 14px) calc(100% - 6px),
                calc(100% - 14px) calc(100% - 3px), calc(100% - 17px) calc(100% - 3px),
                calc(100% - 17px) 100%, 17px 100%,
                17px calc(100% - 3px), 14px calc(100% - 3px), 14px calc(100% - 6px),
                10px calc(100% - 6px), 10px calc(100% - 10px), 0 calc(100% - 10px)
              )`,
            }}
          >
            <div style={shineStyle} />
            <div style={glareStyle} />
            <div className="profile-card-avatar">
              <img
                src={avatarUrl}
                alt={`${name || "User"} avatar`}
                loading="lazy"
                style={{
                  transformOrigin: "50% 100%",
                  transform:
                    "translateX(calc(-50% + (var(--pointer-from-left) - 0.5) * 6px)) translateZ(0) scaleY(calc(1 + (var(--pointer-from-top) - 0.5) * 0.02)) scaleX(calc(1 + (var(--pointer-from-left) - 0.5) * 0.01))",
                  borderRadius: "0",
                  imageRendering: "pixelated",
                  filter: "sepia(0.3) saturate(1.3) brightness(1.05) contrast(1.05)",
                  clipPath: `polygon(
                    0 8px, 8px 8px, 8px 4px, 12px 4px, 12px 0,
                    calc(100% - 12px) 0, calc(100% - 12px) 4px, calc(100% - 8px) 4px,
                    calc(100% - 8px) 8px, 100% 8px,
                    100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px),
                    calc(100% - 8px) calc(100% - 4px), calc(100% - 12px) calc(100% - 4px),
                    calc(100% - 12px) 100%, 12px 100%,
                    12px calc(100% - 4px), 8px calc(100% - 4px), 8px calc(100% - 8px),
                    0 calc(100% - 8px)
                  )`,
                }}
                onError={(e) => {
                  console.error('Image failed to load:', avatarUrl);
                  // Don't hide the image, show a placeholder background instead
                  const t = e.target;
                  t.style.backgroundColor = '#ffc010';
                  t.style.minHeight = '300px';
                }}
              />
              {showUserInfo && (
                <div className="profile-card-user-info">
                  <div className="profile-card-user-details">
                    <div className="profile-card-mini-avatar">
                      <img
                        src={miniAvatarUrl || avatarUrl}
                        alt={`${name || "User"} mini avatar`}
                        loading="lazy"
                        onError={(e) => {
                          const t = e.target;
                          t.style.opacity = "0.5";
                          t.src = avatarUrl;
                        }}
                      />
                    </div>
                    <div className="profile-card-user-text">
                      <div className="profile-card-handle">@{handle}</div>
                      <div className="profile-card-status">{status}</div>
                    </div>
                  </div>
                  <button
                    className="profile-card-contact-btn"
                    onClick={handleContactClick}
                    type="button"
                    aria-label={`Contact ${name || "user"}`}
                  >
                    {contactText}
                  </button>
                </div>
              )}
            </div>
            <div className="profile-card-details">
              <div className="profile-card-text-content">
                <h3 className="profile-card-name">{name}</h3>
                <p className="profile-card-title">{title}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
