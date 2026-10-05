"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { MOTION } from "@/lib/motionPresets";

export default function MediaFrame({
  src,
  alt,
  width,
  height,
  className = "",
  imgClassName = "",
  priority = false,
  sizes,
  radius = "media",
  reveal = false,
  hoverCrop = false,
  caption,
  illustrative = false,
  children,
}) {
  const reduceMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const radiusClass =
    radius === "none"
      ? ""
      : radius === "control"
        ? "rounded-2xl"
        : "rounded-[28px]";

  return (
    <figure className={`relative overflow-hidden ${radiusClass} ${className}`}>
      <motion.div
        className="relative h-full w-full overflow-hidden"
        initial={
          reveal && !reduceMotion
            ? { clipPath: "inset(10% 10% 10% 10% round 28px)", opacity: 0.75 }
            : false
        }
        whileInView={
          reveal
            ? reduceMotion
              ? { opacity: 1 }
              : { clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1 }
            : undefined
        }
        viewport={{ once: true, amount: 0.3 }}
        transition={MOTION.gallery}
      >
        {failed ? (
          <div
            className="flex h-full min-h-40 w-full items-center justify-center bg-sage text-sm text-muted"
            role="img"
            aria-label={alt}
          >
            Image unavailable
          </div>
        ) : (
          <motion.div
            className="h-full w-full"
            whileHover={
              hoverCrop && !reduceMotion ? { scale: 1.05 } : undefined
            }
            transition={MOTION.state}
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              priority={priority}
              sizes={sizes}
              className={`h-full w-full object-cover ${imgClassName}`}
              onError={() => setFailed(true)}
            />
          </motion.div>
        )}
        {children}
      </motion.div>
      {(caption || illustrative) && (
        <figcaption className="mt-2 text-sm text-muted">
          {illustrative ? "Illustrative image" : null}
          {illustrative && caption ? " — " : null}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
