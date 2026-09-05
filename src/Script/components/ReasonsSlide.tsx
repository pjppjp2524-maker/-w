import React from "react";
import { ReasonsSlideData } from "../data";
import { SlideShell } from "./SlideShell";
import { Reveal } from "./Reveal";
import { theme } from "../theme";

export const ReasonsSlide: React.FC<{
  data: ReasonsSlideData;
  durationInFrames: number;
}> = ({ data, durationInFrames }) => {
  return (
    <SlideShell
      heading={data.heading}
      narration={data.narration}
      durationInFrames={durationInFrames}
    >
      <div style={{ display: "flex", gap: 24 }}>
        {data.reasons.map((reason, i) => (
          <Reveal key={reason} index={i} stagger={14} style={{ flex: 1 }}>
            <div
              style={{
                background: theme.panel,
                border: `1px solid ${theme.panelBorder}`,
                borderRadius: 20,
                padding: "32px 24px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  background: theme.badSoft,
                  color: theme.bad,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </div>
              <div style={{ fontSize: 26, lineHeight: 1.5 }}>{reason}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </SlideShell>
  );
};
