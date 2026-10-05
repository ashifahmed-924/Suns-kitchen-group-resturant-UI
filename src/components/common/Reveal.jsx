"use client";

import { motion, useReducedMotion } from "motion/react";
import { MOTION, REDUCED_OPACITY } from "@/lib/motionPresets";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 36,
  scale = 1,
  once = true,
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y, scale: scale === 1 ? 1 : scale }
      }
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, amount: 0.25 }}
      transition={
        reduce
          ? { ...REDUCED_OPACITY, delay }
          : { ...MOTION.section, delay }
      }
    >
      {children}
    </motion.div>
  );
}
