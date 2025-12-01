import React, { useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * VintageBackground.jsx
 *
 * Adds a layered, animated, vintage-inspired background for "LEGACY XI STORE".
 * - Framer Motion for fluid orchestrated animations
 * - Tailwind classes + inline styles for texture overlays
 * - Respects prefers-reduced-motion
 *
 * Notes:
 * - Place <VintageBackground /> near the top of your layout (Home.jsx) so it's underneath content.
 * - z-index is set so normal content appears above the background.
 */

const isReducedMotion = typeof window !== "undefined" && window.matchMedia
  ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
  : false;

export default function VintageBackground() {
  // Scroll-driven parallax values
  const { scrollY } = useScroll();
  // create gentle parallax transforms (slow movement)
  const parallaxSlow = useTransform(scrollY, [0, 1200], [0, -60]);
  const parallaxMid = useTransform(scrollY, [0, 1200], [0, -140]);
  const parallaxFast = useTransform(scrollY, [0, 1200], [0, -240]);
  // make movement smoother with spring
  const springConfig = { damping: 20, stiffness: 80 };
  const slowSpring = useSpring(parallaxSlow, springConfig);
  const midSpring = useSpring(parallaxMid, springConfig);
  const fastSpring = useSpring(parallaxFast, springConfig);

  // Variants for staggered decorative elements
  const decoVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    show: (i = 1) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 0.15 * i, duration: 0.7, ease: "easeInOut" },
    }),
  };

  // A small helper to produce multiple decorative items with slightly different props
  const decoItems = useMemo(
    () => [
      { id: "hex-1", left: "8%", top: "12%", rotate: -10, size: 160, speed: slowSpring },
      { id: "stripe-1", left: "75%", top: "6%", rotate: 22, size: 220, speed: midSpring },
      { id: "laurel-1", left: "12%", top: "68%", rotate: -8, size: 160, speed: fastSpring },
      { id: "orn-1", left: "60%", top: "30%", rotate: 32, size: 110, speed: slowSpring },
      { id: "geo-1", left: "84%", top: "74%", rotate: -32, size: 140, speed: midSpring },
    ],
    [slowSpring, midSpring, fastSpring]
  );

  // Colors
  const colors = {
    navy: "rgba(6, 30, 64, 0.8)", // deep navy
    gold: "rgba(194, 150, 64, 0.95)", // gold/bronze
    cream: "rgba(250, 244, 236, 1)", // cream base
  };

  return (
    <div aria-hidden className="pointer-events-none">
      {/* Base textured canvas */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            // cream textured base + subtle linear gradient for depth
            `linear-gradient(180deg, ${colors.cream} 0%, rgba(245,240,230,1) 50%, rgba(235,230,220,1) 100%)`,
        }}
      >
        {/* Paper grain + subtle distress using CSS pseudo-gradients */}
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{
            backgroundImage:
              // layered radial + subtle noise-like repeated linear gradients
              "radial-gradient(circle at 30% 20%, rgba(0,0,0,0.02) 0%, transparent 20%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.02) 0%, transparent 12%), repeating-linear-gradient(45deg, rgba(0,0,0,0.01) 0px, rgba(0,0,0,0.01) 1px, transparent 2px, transparent 6px)",
            opacity: 0.7,
            transform: "scale(1.02)",
            filter: "contrast(0.98) saturate(0.95)",
          }}
        />
      </div>

      {/* Layer: slowly drifting large hex patterns (faded) */}
      <motion.div
        style={{ translateY: slowSpring }}
        className="fixed inset-0 -z-9"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
        >
          <defs>
            <pattern id="hexPattern" x="0" y="0" width="200" height="174" patternUnits="userSpaceOnUse">
              <g fill="none" stroke="rgba(10,20,40,0.06)" strokeWidth="1">
                <polygon points="100,0 200,50 200,124 100,174 0,124 0,50" />
              </g>
            </pattern>
            <filter id="grain">
              <feTurbulence baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="n" />
              <feColorMatrix type="saturate" values="0" />
              <feBlend in="SourceGraphic" in2="n" mode="overlay" />
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexPattern)" opacity="0.35" />
          {/* A few bigger faint hex shapes for variety */}
          <g opacity="0.08" fill="none" stroke="rgba(6,30,64,0.08)" strokeWidth="2">
            <polygon points="150,120 250,170 250,244 150,294 50,244 50,170" transform="translate(300,80) rotate(-8)" />
            <polygon points="150,120 250,170 250,244 150,294 50,244 50,170" transform="translate(1200,40) scale(1.6) rotate(10)" />
          </g>
        </svg>
      </motion.div>

      {/* Layer: drifting laurel wreaths & retro stripes — staggered with variants */}
      <div className="fixed inset-0 -z-8">
        {decoItems.map((d, i) => (
          <motion.div
  key={d.id}
  custom={i + 1}
  initial="hidden"
  animate="show"
  variants={decoVariants}
  style={{
    translateY: d.speed,
    left: d.left,
    top: d.top,
    width: d.size,
    height: d.size,
    rotate: `${d.rotate}deg`,
    translateZ: 0,
  }}
  className="absolute transform-gpu"
>

            {/* simple SVG laurel / stripe / ornamental shapes chosen by id */}
            {d.id.includes("laurel") ? (
              <svg viewBox="0 0 200 200" className="w-full h-full opacity-75">
                <g fill="none" stroke={colors.navy} strokeWidth="2">
                  <path d="M10 160 C60 120, 60 40, 100 20" stroke={colors.navy} opacity="0.65" />
                  <path d="M190 160 C140 120, 140 40, 100 20" stroke={colors.navy} opacity="0.65" />
                </g>
                <g fill={colors.gold} opacity="0.06">
                  <circle cx="100" cy="40" r="36" />
                </g>
              </svg>
            ) : d.id.includes("stripe") ? (
              <div className="w-full h-full flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full opacity-80">
                  <rect x="0" y="20" width="200" height="32" rx="4" fill={colors.gold} opacity="0.12" />
                  <rect x="0" y="80" width="200" height="22" rx="3" fill={colors.navy} opacity="0.06" />
                  <rect x="0" y="130" width="200" height="18" rx="3" fill={colors.gold} opacity="0.07" />
                </svg>
              </div>
            ) : (
              <svg viewBox="0 0 200 200" className="w-full h-full opacity-70">
                <g fill="none" stroke={colors.navy} strokeWidth="1" opacity="0.08">
                  <circle cx="100" cy="100" r="72" />
                  <circle cx="100" cy="100" r="42" />
                </g>
                <g fill={colors.gold} opacity="0.06">
                  <rect x="20" y="20" width="160" height="12" rx="4"/>
                </g>
              </svg>
            )}
          </motion.div>
        ))}
      </div>

      {/* Layer: shimmering gold/bronze particles (CSS + few motion wrappers) */}
      <div className="fixed inset-0 -z-7 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          {/* Create many small animated dust elements using CSS generated elements */}
          <div className="absolute inset-0">
            {/* Particle container — use pure CSS animations for many small elements for perf */}
            <div
              className="gold-particles"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* Rotating geometric motifs that fade in/out */}
      <motion.div className="fixed inset-0 -z-6" style={{ translateY: midSpring }}>
        <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          <g opacity="0.05" transform="translate(300,200)">
            <motion.g
              initial={{ rotate: -8, opacity: 0 }}
              animate={{ rotate: 8, opacity: 1 }}
              transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            >
              <rect x="0" y="0" width="500" height="500" rx="12" fill={colors.navy} opacity="0.02" />
            </motion.g>
          </g>
          <g opacity="0.04">
            <motion.g
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 45, opacity: 1 }}
              transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 2 }}
            >
              <g transform="translate(1200,600)">
                <circle r="180" fill={colors.gold} opacity="0.02" />
              </g>
            </motion.g>
          </g>
        </svg>
      </motion.div>

      {/* Vignette pulse */}
      <motion.div
        initial={{ opacity: 0.35 }}
        animate={{ opacity: [0.28, 0.44, 0.28] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="fixed inset-0 -z-5 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,0) 40%, rgba(6,30,64,0.18) 100%)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Film grain overlay (subtle animated) */}
      <div
        aria-hidden
        className="fixed inset-0 -z-4"
        style={{
          backgroundImage:
            // simple procedural grain using repeating-linear-gradients to avoid large assets
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 1px, transparent 2px, transparent 6px)",
          opacity: 0.55,
          mixBlendMode: "overlay",
          animation: isReducedMotion ? undefined : "grainMove 12s linear infinite",
          pointerEvents: "none",
        }}
      />

      {/* small CSS in-JS for particles & animation helpers */}
      <style>{`
        /* accessibility: reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .gold-particles, .animate-rotate, .animate-slide, .animate-fade {
            animation: none !important;
          }
        }

        /* gold particle structure: create multiple pseudo particles with box-shadows */
        .gold-particles {
          opacity: 0.9;
          background-image:
            radial-gradient(circle at 2% 20%, rgba(194,150,64,0.12) 0 2px, transparent 3px),
            radial-gradient(circle at 12% 40%, rgba(194,150,64,0.08) 0 2px, transparent 3px),
            radial-gradient(circle at 22% 60%, rgba(194,150,64,0.07) 0 2px, transparent 3px),
            radial-gradient(circle at 33% 80%, rgba(194,150,64,0.06) 0 2px, transparent 3px),
            radial-gradient(circle at 44% 30%, rgba(194,150,64,0.06) 0 2px, transparent 3px),
            radial-gradient(circle at 60% 15%, rgba(194,150,64,0.08) 0 2px, transparent 3px),
            radial-gradient(circle at 75% 70%, rgba(194,150,64,0.05) 0 2px, transparent 3px);
          mix-blend-mode: screen;
          animation: floats 18s linear infinite;
          transform-origin: center;
        }

        @keyframes floats {
          0% { transform: translateY(20px) scale(0.98) rotate(0deg); opacity: 0.8; }
          50% { transform: translateY(-40px) scale(1.02) rotate(6deg); opacity: 1; }
          100% { transform: translateY(20px) scale(0.98) rotate(0deg); opacity: 0.8; }
        }

        /* film grain movement */
        @keyframes grainMove {
          0% { background-position: 0 0; }
          100% { background-position: 1000px 1000px; }
        }

        /* subtle fade in */
        .animate-fade { animation: fadeIn 0.8s ease both; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </div>
  );
}
