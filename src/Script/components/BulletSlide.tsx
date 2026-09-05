import React from "react";
import { BulletsSlideData } from "../data";
import { SlideShell } from "./SlideShell";
import { Reveal } from "./Reveal";
import { theme } from "../theme";

export const BulletSlide: React.FC<{
  data: BulletsSlideData;
  durationInFrames: number;
}> = ({ data, durationInFrames }) => {
  return (
    <SlideShell
      heading={data.heading}
      narration={data.narration}
      durationInFrames={durationInFrames}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {data.bullets.map((bullet, i) => (
          <Reveal key={bullet} index={i} stagger={12}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 20,
                background: theme.panel,
                border: `1px solid ${theme.panelBorder}`,
                borderRadius: 16,
                padding: "26px 32px",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  background: theme.accentSoft,
                  color: theme.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </div>
              <div style={{ fontSize: 32, lineHeight: 1.5 }}>{bullet}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </SlideShell>
  );
};
