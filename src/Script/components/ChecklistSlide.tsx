import React from "react";
import { ChecklistSlideData } from "../data";
import { SlideShell } from "./SlideShell";
import { Reveal } from "./Reveal";
import { theme } from "../theme";

export const ChecklistSlide: React.FC<{
  data: ChecklistSlideData;
  durationInFrames: number;
}> = ({ data, durationInFrames }) => {
  return (
    <SlideShell
      heading={data.heading}
      narration={data.narration}
      durationInFrames={durationInFrames}
    >
      <div style={{ display: "flex", gap: 28 }}>
        {data.columns.map((col, ci) => {
          const isYes = col.tone === "yes";
          const color = isYes ? theme.good : theme.accent;
          const soft = isYes ? theme.goodSoft : theme.accentSoft;
          return (
            <div
              key={col.title}
              style={{
                flex: 1,
                background: theme.panel,
                border: `1px solid ${theme.panelBorder}`,
                borderRadius: 20,
                padding: "28px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div
                style={{
                  alignSelf: "flex-start",
                  background: soft,
                  color,
                  borderRadius: 999,
                  padding: "8px 20px",
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {col.title}
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {col.items.map((item, ii) => (
                  <Reveal
                    key={item}
                    index={ci * col.items.length + ii}
                    stagger={7}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        fontSize: 25,
                      }}
                    >
                      <span style={{ color, fontSize: 24 }}>✓</span>
                      <span>{item}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SlideShell>
  );
};
