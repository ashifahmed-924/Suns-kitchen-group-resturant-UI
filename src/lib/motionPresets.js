/** Motion tokens for Verdant Kinetic homepage */

export const EASE = {
  out: [0.16, 1, 0.3, 1],
  soft: [0.22, 1, 0.36, 1],
  spring: { type: "spring", stiffness: 320, damping: 28 },
  springSoft: { type: "spring", stiffness: 180, damping: 22 },
};

export const MOTION = {
  control: { duration: 0.2, ease: EASE.soft },
  state: { duration: 0.38, ease: EASE.out },
  heroReveal: { duration: 0.9, ease: EASE.out },
  dialog: { duration: 0.32, ease: EASE.out },
  gallery: { duration: 0.55, ease: EASE.out },
  section: { duration: 0.7, ease: EASE.out },
  stagger: 0.08,
  text: { duration: 0.55, ease: EASE.out },
};

export const REDUCED_OPACITY = {
  duration: 0.18,
  ease: "easeOut",
};

export const fadeUp = (reduce) =>
  reduce
    ? {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: REDUCED_OPACITY,
      }
    : {
        initial: { opacity: 0, y: 36 },
        whileInView: { opacity: 1, y: 0 },
        transition: MOTION.section,
      };

export const fadeScale = (reduce) =>
  reduce
    ? {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: REDUCED_OPACITY,
      }
    : {
        initial: { opacity: 0, scale: 0.94, y: 24 },
        whileInView: { opacity: 1, scale: 1, y: 0 },
        transition: MOTION.section,
      };

export const clipReveal = (reduce) =>
  reduce
    ? {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: REDUCED_OPACITY,
      }
    : {
        initial: { clipPath: "inset(12% 12% 12% 12% round 28px)", opacity: 0.7 },
        whileInView: { clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1 },
        transition: MOTION.gallery,
      };
