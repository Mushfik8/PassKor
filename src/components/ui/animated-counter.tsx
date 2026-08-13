"use client";

// ================================================================
// StudentOS — Animated Counter Component
// Counts from 0 to target number with spring animation
// ================================================================

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

export function AnimatedCounter({
  target,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      onUpdate(value) {
        if (decimals > 0) {
          setDisplayValue(value.toFixed(decimals));
        } else {
          setDisplayValue(Math.floor(value).toLocaleString());
        }
      },
    });

    return () => controls.stop();
  }, [isInView, target, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
