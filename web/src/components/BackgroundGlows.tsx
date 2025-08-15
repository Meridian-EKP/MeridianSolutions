"use client";

import { useEffect, useMemo, useState } from "react";

type GlowDot = {
  leftPercent: number;
  topVh: number;
  sizePx: number;
  colorVar: string; // CSS variable name, e.g., --accent, --accent-2, --accent-3
  blurPx: number;
  opacity: number;
  durationS: number;
  delayS: number;
  translateY: number;
};

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function sampleLeftOutsideCenter(min = -5, max = 105, centerMin = 38, centerMax = 62): number {
  let attempt = 0;
  while (attempt < 50) {
    const v = randomInRange(min, max);
    if (v < centerMin || v > centerMax) return v;
    attempt++;
  }
  return vClamp(min, centerMin - 0.1); // fallback
}

function vClamp(min: number, max: number): number {
  return Math.min(max, Math.max(min, randomInRange(min, max)));
}

function sampleTopOutsideViewportCenter(minVh = -10, maxVh = 1200, centerMinPct = 38, centerMaxPct = 62): number {
  let attempt = 0;
  while (attempt < 80) {
    const v = randomInRange(minVh, maxVh);
    // Normalize to [0,100) to represent position within any viewport window
    const within = ((v % 100) + 100) % 100;
    if (within < centerMinPct || within > centerMaxPct) return v;
    attempt++;
  }
  return minVh; // safe fallback
}

export default function BackgroundGlows() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dots = useMemo<GlowDot[]>(() => {
    const count = 76; // balanced density
    const palette = [
      "--accent-pink",
      "--accent-pink-2",
      "--accent-blue",
      "--accent-blue-2",
    ] as const;
    return Array.from({ length: count }).map(() => {
      const colorVar = palette[Math.floor(Math.random() * palette.length)];
      const isPink = colorVar === "--accent-pink" || colorVar === "--accent-pink-2";
      return {
        leftPercent: sampleLeftOutsideCenter(-5, 105, 38, 62),
        topVh: sampleTopOutsideViewportCenter(-10, 1200, 38, 62), // avoids center of each viewport frame
        sizePx: randomInRange(260, 640),
        colorVar,
        blurPx: randomInRange(50, 95),
        opacity: isPink ? randomInRange(0.10, 0.20) : randomInRange(0.16, 0.30),
        durationS: randomInRange(12, 24),
        delayS: randomInRange(0, 8),
        translateY: randomInRange(-24, 24),
      };
    });
  }, []);

  if (!mounted) return null;

  return (
    <div className="glow-field" aria-hidden>
      {dots.map((d, i) => (
        <span
          key={i}
          className="glow-dot"
          style={{
            left: `${d.leftPercent}%`,
            top: `${d.topVh}vh`,
            width: `${d.sizePx}px`,
            height: `${d.sizePx}px`,
            filter: `blur(${d.blurPx}px)`,
            opacity: d.opacity,
            // Use CSS variable to pick color in CSS gradient
            // and per-dot animation timing via CSS variables
            // @ts-ignore - custom props for CSS
            "--dot-color": `var(${d.colorVar})`,
            // @ts-ignore
            "--dur": `${d.durationS}s`,
            // @ts-ignore
            "--delay": `${d.delayS}s`,
            // @ts-ignore
            "--float-y": `${d.translateY}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}


