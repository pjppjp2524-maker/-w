import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

export const CenterShell: React.FC<{
  narration: string;
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ narration, durationInFrames, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeFrames = Math.round(fps * 0.4);

  const fade = interpolate(
    frame,
    [0, fadeFrames, durationInFrames - fadeFrames, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: theme.bg,
        fontFamily: theme.fontFamily,
        color: theme.text,
        opacity: fade,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 140px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {children}
      <div
        style={{
          position: "absolute",
          bottom: 56,
          left: 140,
          right: 140,
          background: theme.panel,
          border: `1px solid ${theme.panelBorder}`,
          borderRadius: 16,
          padding: "20px 32px",
          fontSize: 26,
          lineHeight: 1.6,
          color: theme.textMuted,
        }}
      >
        {narration}
      </div>
    </div>
  );
};
