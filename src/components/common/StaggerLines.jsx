"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MOTION } from "@/lib/motionPresets";

export default function StaggerLines({ lines, className = "" }) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <h1 className={className} aria-label={lines.join(" ")}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden pb-1">
          <motion.span
            className="block"
            initial={false}
            animate={
              ready && !reduce
                ? { y: ["110%", "0%"], opacity: [0, 1] }
                : { y: "0%", opacity: 1 }
            }
            transition={
              ready && !reduce
                ? { ...MOTION.text, delay: 0.1 + index * 0.1 }
                : { duration: 0 }
            }
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
