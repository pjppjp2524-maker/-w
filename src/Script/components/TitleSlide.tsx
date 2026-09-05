import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TitleSlideData } from "../data";
import { CenterShell } from "./CenterShell";
import { theme } from "../theme";

export const TitleSlide: React.FC<{
  data: TitleSlideData;
  durationInFrames: number;
}> = ({ data, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 200 } });

  return (
    <CenterShell narration={data.narration} durationInFrames={durationInFrames}>
      <div
        style={{
          opacity: progress,
          transform: `translateY(${(1 - progress) * 20}px)`,
        }}
      >
        <div
          style={{
            fontSize: 30,
            color: theme.accent,
            letterSpacing: 4,
            marginBottom: 24,
          }}
        >
          社内共有
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.45,
            whiteSpace: "pre-line",
            marginBottom: 32,
          }}
        >
          {data.heading}
        </div>
        <div style={{ fontSize: 28, color: theme.textMuted }}>
          {data.subheading}
        </div>
      </div>
    </CenterShell>
  );
};
