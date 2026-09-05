import React from "react";
import { FlowSlideData } from "../data";
import { SlideShell } from "./SlideShell";
import { Reveal } from "./Reveal";
import { theme } from "../theme";

const Arrow: React.FC<{ index: number }> = ({ index }) => (
  <Reveal
    index={index}
    stagger={16}
    style={{ display: "flex", alignItems: "center" }}
  >
    <svg width="36" height="24" viewBox="0 0 36 24">
      <path
        d="M2 12 H30 M22 4 L30 12 L22 20"
        stroke={theme.accent}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Reveal>
);

export const FlowSlide: React.FC<{
  data: FlowSlideData;
  durationInFrames: number;
}> = ({ data, durationInFrames }) => {
  return (
    <SlideShell
      heading={data.heading}
      narration={data.narration}
      durationInFrames={durationInFrames}
    >
      <div style={{ display: "flex", alignItems: "stretch", gap: 8 }}>
        {data.steps.map((step, i) => (
          <React.Fragment key={step.title}>
            <Reveal index={i * 2} stagger={16} style={{ flex: 1 }}>
              <div
                style={{
                  background: theme.panel,
                  border: `1px solid ${theme.panelBorder}`,
                  borderRadius: 20,
                  padding: "26px 22px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: theme.accent,
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {step.items.map((item) => (
                    <div key={item} style={{ fontSize: 20, lineHeight: 1.5 }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            {i < data.steps.length - 1 ? <Arrow index={i * 2 + 1} /> : null}
          </React.Fragment>
        ))}
      </div>
    </SlideShell>
  );
};
