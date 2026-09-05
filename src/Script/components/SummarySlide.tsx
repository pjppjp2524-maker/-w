import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SummarySlideData } from "../data";
import { SlideShell } from "./SlideShell";
import { theme } from "../theme";

export const SummarySlide: React.FC<{
  data: SummarySlideData;
  durationInFrames: number;
}> = ({ data, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 200 } });

  return (
    <SlideShell
      heading={data.heading}
      narration={data.narration}
      durationInFrames={durationInFrames}
    >
      <div
        style={{
          opacity: progress,
          transform: `translateY(${(1 - progress) * 16}px)`,
          background: theme.panel,
          border: `1px solid ${theme.panelBorder}`,
          borderRadius: 24,
          padding: "48px 56px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 28,
            fontSize: 90,
            color: theme.accent,
            opacity: 0.5,
            fontFamily: "serif",
          }}
        >
          “
        </div>
        <div
          style={{
            fontSize: 38,
            fontWeight: 700,
            lineHeight: 1.7,
            whiteSpace: "pre-line",
            textAlign: "center",
          }}
        >
          {data.quote}
        </div>
      </div>
    </SlideShell>
  );
};
