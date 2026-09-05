import React from "react";
import { ComparisonSlideData } from "../data";
import { SlideShell } from "./SlideShell";
import { Reveal } from "./Reveal";
import { theme } from "../theme";

export const ComparisonSlide: React.FC<{
  data: ComparisonSlideData;
  durationInFrames: number;
}> = ({ data, durationInFrames }) => {
  return (
    <SlideShell
      heading={data.heading}
      narration={data.narration}
      durationInFrames={durationInFrames}
    >
      <div style={{ display: "flex", gap: 28 }}>
        {data.routes.map((route, i) => {
          const good = route.tone === "good";
          return (
            <Reveal
              key={route.label}
              index={i}
              stagger={14}
              style={{ flex: 1 }}
            >
              <div
                style={{
                  background: theme.panel,
                  border: `1px solid ${theme.panelBorder}`,
                  borderRadius: 20,
                  padding: "34px 28px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 700 }}>
                  {route.label}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    color: theme.textMuted,
                    lineHeight: 1.5,
                    flex: 1,
                  }}
                >
                  {route.desc}
                </div>
                <div
                  style={{
                    alignSelf: "flex-start",
                    background: good ? theme.goodSoft : theme.badSoft,
                    color: good ? theme.good : theme.bad,
                    borderRadius: 999,
                    padding: "10px 22px",
                    fontSize: 22,
                    fontWeight: 700,
                  }}
                >
                  {route.result}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </SlideShell>
  );
};
