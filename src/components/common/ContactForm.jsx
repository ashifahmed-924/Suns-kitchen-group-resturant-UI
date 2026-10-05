"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Button from "@/components/common/Button";
import { LINKS } from "@/data/businessData";
import { MOTION, REDUCED_OPACITY } from "@/lib/motionPresets";

const INITIAL = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim()) {
    errors.message = "Please enter a short message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Please add a little more detail (at least 10 characters).";
  }
  return errors;
}

export default function ContactForm({
  facebookUrl = LINKS.facebook.url,
  className = "",
  tone = "default",
}) {
  const formId = useId();
  const reduce = useReducedMotion();
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const onGreen = tone === "onGreen";

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("invalid");
      return;
    }

    const draft = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      values.phone.trim() ? `Phone: ${values.phone.trim()}` : null,
      "",
      values.message.trim(),
    ]
      .filter((line) => line !== null)
      .join("\n");

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(draft).catch(() => {});
      }
    } catch {
      // Clipboard optional
    }

    setStatus("ready");
    window.open(facebookUrl, "_blank", "noopener,noreferrer");
  };

  const fieldClass = onGreen
    ? "mt-2 w-full rounded-[14px] border border-white/15 bg-white/10 px-4 py-3 text-base text-white outline-none transition-[border-color,background-color,transform] duration-200 placeholder:text-white/45 focus:border-lime focus:bg-white/15"
    : "mt-2 w-full rounded-[14px] border border-border bg-foam px-4 py-3 text-base text-forest outline-none transition-colors placeholder:text-muted/70 focus:border-leaf";

  const labelClass = onGreen
    ? "text-sm font-semibold text-white"
    : "text-sm font-semibold text-forest";

  const shellClass = onGreen
    ? "rounded-[28px] border border-white/15 bg-deep/35 p-5 shadow-[0_24px_60px_rgb(0_0_0_/_0.25)] backdrop-blur-md md:p-7"
    : "rounded-[28px] border border-border bg-foam p-5 shadow-[0_18px_40px_rgb(15_61_36_/_0.06)] md:p-7";

  return (
    <motion.form
      className={`${shellClass} ${className}`}
      onSubmit={onSubmit}
      noValidate
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={reduce ? REDUCED_OPACITY : MOTION.section}
      aria-describedby={`${formId}-note`}
    >
      <motion.div
        className="grid gap-4 sm:grid-cols-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: reduce ? 0 : 0.07 },
          },
        }}
      >
        {[
          {
            id: "name",
            label: "Name",
            type: "text",
            autoComplete: "name",
            span: "sm:col-span-1",
          },
          {
            id: "email",
            label: "Email",
            type: "email",
            autoComplete: "email",
            span: "sm:col-span-1",
          },
          {
            id: "phone",
            label: "Phone",
            optional: true,
            type: "tel",
            autoComplete: "tel",
            span: "sm:col-span-2",
          },
        ].map((field) => (
          <motion.div
            key={field.id}
            className={field.span}
            variants={{
              hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: MOTION.state },
            }}
          >
            <label htmlFor={`${formId}-${field.id}`} className={labelClass}>
              {field.label}
              {field.optional ? (
                <span
                  className={`font-medium ${onGreen ? "text-white/55" : "text-muted"}`}
                >
                  {" "}
                  (optional)
                </span>
              ) : null}
            </label>
            <input
              id={`${formId}-${field.id}`}
              name={field.id}
              type={field.type}
              autoComplete={field.autoComplete}
              value={values[field.id]}
              onChange={onChange}
              className={fieldClass}
              aria-invalid={Boolean(errors[field.id])}
              aria-describedby={
                errors[field.id] ? `${formId}-${field.id}-error` : undefined
              }
            />
            {errors[field.id] ? (
              <p
                id={`${formId}-${field.id}-error`}
                className={`mt-1.5 text-sm ${onGreen ? "text-lime" : "text-leaf"}`}
              >
                {errors[field.id]}
              </p>
            ) : null}
          </motion.div>
        ))}

        <motion.div
          className="sm:col-span-2"
          variants={{
            hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: MOTION.state },
          }}
        >
          <label htmlFor={`${formId}-message`} className={labelClass}>
            Message
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={5}
            value={values.message}
            onChange={onChange}
            className={`${fieldClass} min-h-[8rem] resize-y`}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? `${formId}-message-error` : undefined
            }
          />
          {errors.message ? (
            <p
              id={`${formId}-message-error`}
              className={`mt-1.5 text-sm ${onGreen ? "text-lime" : "text-leaf"}`}
            >
              {errors.message}
            </p>
          ) : null}
        </motion.div>
      </motion.div>

      <p
        id={`${formId}-note`}
        className={`mt-4 text-sm ${onGreen ? "text-white/65" : "text-muted"}`}
      >
        No website email inbox is configured yet. Submitting opens Facebook so
        you can send your enquiry there. Your draft may also be copied to the
        clipboard when the browser allows it.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" variant={onGreen ? "lime" : "primary"} icon="external">
          Continue on Facebook
        </Button>
        {status === "ready" ? (
          <p
            className={`text-sm font-medium ${onGreen ? "text-lime" : "text-leaf"}`}
            role="status"
          >
            Facebook opened for your enquiry — this form did not send a message
            by itself.
          </p>
        ) : null}
        {status === "invalid" ? (
          <p
            className={`text-sm ${onGreen ? "text-white/70" : "text-muted"}`}
            role="status"
          >
            Please check the highlighted fields.
          </p>
        ) : null}
      </div>
    </motion.form>
  );
}
