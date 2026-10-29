"use client";
// Adapted from React Bits BlurText, David Haz (2026).
// MIT + Commons Clause; see ../../REACT-BITS-LICENSE.txt.
// Focused application adapter: SSR-visible text, semantic spans, no looping,
// native reduced-motion support and cleanup. Only the used blur variant ships.
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
export default function BlurText({
  text = "",
  delay = 110,
  stepDuration = 0.45,
  blur = 6,
  distance = 20,
  trigger = "view",
  className = "",
}) {
  const ref = useRef(null);
  const [phase, setPhase] = useState("rest");
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let observer, timer;
    const begin = () => {
      if (media.matches) {
        setPhase("rest");
        return;
      }
      setPhase("from");
      timer = window.setTimeout(() => setPhase("in"), 50);
    };
    if (trigger === "load") begin();
    else {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            begin();
            observer.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      observer.observe(ref.current);
    }
    const change = () => {
      clearTimeout(timer);
      setPhase("rest");
    };
    media.addEventListener("change", change);
    return () => {
      clearTimeout(timer);
      observer?.disconnect();
      media.removeEventListener("change", change);
    };
  }, [trigger]);
  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, i, words) => (
        <motion.span
          aria-hidden="true"
          className="blur-piece"
          key={`${word}-${i}`}
          style={{ display: "inline-block" }}
          initial={false}
          animate={
            phase === "from"
              ? { filter: `blur(${blur}px)`, opacity: 0, y: -distance }
              : { filter: "blur(0px)", opacity: 1, y: 0 }
          }
          transition={
            phase === "in"
              ? {
                  duration: stepDuration * 2,
                  delay: (i * delay) / 1000,
                  ease: [0.22, 1, 0.36, 1],
                }
              : { duration: 0 }
          }
        >
          {word + (i < words.length - 1 ? "\u00A0" : "")}
        </motion.span>
      ))}
    </span>
  );
}
