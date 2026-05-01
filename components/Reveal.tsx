"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "section" | "span" | "li";
  style?: React.CSSProperties;
  className?: string;
};

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  style,
  className = "",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setShown(true);
        return;
      }
    }
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const props = {
    ref: ref as React.Ref<HTMLDivElement>,
    className: `reveal ${shown ? "in" : ""} ${className}`.trim(),
    style: { transitionDelay: `${delay}ms`, ...style },
  };

  return <Tag {...(props as React.HTMLAttributes<HTMLElement>)}>{children}</Tag>;
}
