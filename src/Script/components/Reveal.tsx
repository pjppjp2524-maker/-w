import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const useReveal = (index: number, stagger = 6) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = index * stagger;
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.5 },
  });
  return {
    opacity: progress,
    transform: `translateY(${(1 - progress) * 24}px)`,
  };
};

export const Reveal: React.FC<{
  index: number;
  stagger?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ index, stagger = 6, children, style }) => {
  const { opacity, transform } = useReveal(index, stagger);
  return (
    <div style={{ ...style, opacity, transform }}>
      {children}
    </div>
  );
};
