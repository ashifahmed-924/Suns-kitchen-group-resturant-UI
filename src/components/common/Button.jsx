"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { MOTION } from "@/lib/motionPresets";

const variants = {
  primary:
    "bg-leaf text-white hover:bg-leaf-hover shadow-[0_12px_30px_rgb(47_143_78_/_0.28)]",
  secondary:
    "bg-foam text-forest border border-border hover:border-leaf hover:text-leaf",
  lime: "bg-lime text-lime-ink hover:brightness-105 shadow-[0_10px_28px_rgb(198_242_85_/_0.35)]",
  ghost: "bg-transparent text-forest border border-transparent hover:bg-sage/60",
  inverse:
    "bg-foam text-forest hover:bg-lime border border-transparent",
  dark: "bg-deep text-lime hover:bg-forest",
};

export default function Button({
  children,
  href,
  variant = "primary",
  external = false,
  icon = "arrow",
  className = "",
  type = "button",
  onClick,
  ariaLabel,
  ariaExpanded,
  ariaControls,
  disabled = false,
}) {
  const reduceMotion = useReducedMotion();
  const Icon = icon === "external" ? ArrowUpRight : ArrowRight;
  const showIcon = icon !== "none";

  const classes = [
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold tracking-tight transition-[background-color,color,border-color,transform,box-shadow] duration-200",
    variants[variant] || variants.primary,
    disabled ? "opacity-50 pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      {showIcon ? (
        <motion.span
          aria-hidden="true"
          className="inline-flex"
          transition={MOTION.control}
          whileHover={reduceMotion ? undefined : { x: 4, y: icon === "external" ? -2 : 0 }}
        >
          <Icon className="h-4 w-4" strokeWidth={2.4} />
        </motion.span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        onClick={onClick}
        aria-label={ariaLabel}
        whileHover={reduceMotion ? undefined : { y: -2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      disabled={disabled}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
