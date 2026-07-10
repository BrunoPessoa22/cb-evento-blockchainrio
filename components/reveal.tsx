"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Adds the `.in` class when the element enters the viewport, triggering the
// one-shot slide-up animation from globals.css. Content is never hidden
// waiting for JS.
export function Reveal({
  children,
  stagger = false,
  className,
}: {
  children: React.ReactNode;
  stagger?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn(stagger ? "reveal-stagger" : "reveal", className)}>
      {children}
    </div>
  );
}
