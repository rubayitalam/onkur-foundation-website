"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface StatCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export default function StatCounter({ value, duration = 1.5, prefix = "", suffix = "" }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) {
        setCount(end);
        return;
      }

      const totalMiliseconds = duration * 1000;
      const stepTime = 25; // 25ms steps (40 fps)
      const totalSteps = totalMiliseconds / stepTime;
      const increment = end / totalSteps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <span ref={ref} className="font-bold tabular-nums">
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}
