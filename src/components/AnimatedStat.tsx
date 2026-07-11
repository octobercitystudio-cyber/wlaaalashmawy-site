"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedStatProps {
  target: number;
  suffix?: string;
  prefix?: string;
  displayAsK?: boolean;
  labelLines: React.ReactNode;
}

export default function AnimatedStat({ target, suffix = "", prefix = "", displayAsK = false, labelLines }: AnimatedStatProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number | null = null;
    const duration = 2000;
    const end = target;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(end * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [hasAnimated, target]);

  const displayCount = displayAsK && count >= 1000 ? (count / 1000) + "k" : count;

  return (
    <div ref={elementRef} className="flex flex-col items-center justify-center gap-sm text-center" style={{ background: "var(--color-bg-body)", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--color-border)", minHeight: "150px" }}>
      <h2 style={{ fontSize: "2.8rem", margin: 0, lineHeight: 1, color: "var(--color-accent)", fontWeight: "bold" }}>
        {prefix}{displayCount}{suffix}
      </h2>
      <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold", letterSpacing: "0.5px", color: "var(--color-text-main)" }}>
        {labelLines}
      </p>
    </div>
  );
}
