"use client";

// ================================================================
// StudentOS — Framer Motion Configuration
// Shared animation presets for consistent micro-interactions
// ================================================================

export const motionConfig = {
  // Page transitions
  page: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },

  // Stagger children (dashboard cards, grids)
  stagger: {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.1 },
      },
    },
    item: {
      hidden: { opacity: 0, y: 16 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
      },
    },
  },

  // Card hover (subtle lift)
  cardHover: {
    whileHover: {
      y: -3,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
  },

  // Scale tap
  tap: {
    whileTap: { scale: 0.97 },
  },

  // Modal / dialog
  modal: {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
    },
    content: {
      initial: { opacity: 0, scale: 0.95, y: 10 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: 10 },
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  },

  // Sidebar slide
  sidebar: {
    initial: { x: -280, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -280, opacity: 0 },
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },

  // Fade in on scroll (InView)
  fadeInView: {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },

  // Scale in (achievements, badges)
  scaleIn: {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: { type: "spring", stiffness: 200, damping: 15 },
  },

  // Counter (number animation)
  counter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
} as const;
