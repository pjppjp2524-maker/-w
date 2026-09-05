import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ClosingSlideData } from "../data";
import { CenterShell } from "./CenterShell";
import { theme } from "../theme";

export const ClosingSlide: React.FC<{
  data: ClosingSlideData;
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
            fontSize: 52,
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          {data.heading}
        </div>
        <div style={{ fontSize: 26, color: theme.textMuted }}>{data.line}</div>
      </div>
    </CenterShell>
  );
};
