import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

const captionFontSize = (text: string) => {
  if (text.length > 220) return 22;
  if (text.length > 140) return 25;
  return 28;
};

export const SlideShell: React.FC<{
  heading?: string;
  narration: string;
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ heading, narration, durationInFrames, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeFrames = Math.round(fps * 0.35);

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
        padding: "72px 96px 0 96px",
        boxSizing: "border-box",
      }}
    >
      {heading ? (
        <div
          style={{
            fontSize: 46,
            fontWeight: 700,
            lineHeight: 1.3,
            whiteSpace: "pre-line",
            marginBottom: 40,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 10,
              height: 42,
              background: theme.accent,
              marginRight: 20,
              verticalAlign: "-6px",
              borderRadius: 4,
            }}
          />
          {heading}
        </div>
      ) : null}

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {children}
      </div>

      <div
        style={{
          flexShrink: 0,
          background: theme.panel,
          border: `1px solid ${theme.panelBorder}`,
          borderRadius: 16,
          padding: "22px 32px",
          margin: "32px 0 56px 0",
          fontSize: captionFontSize(narration),
          lineHeight: 1.6,
          color: theme.textMuted,
        }}
      >
        {narration}
      </div>
    </div>
  );
};
