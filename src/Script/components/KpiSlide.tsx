import React from "react";
import { KpiSlideData } from "../data";
import { SlideShell } from "./SlideShell";
import { Reveal } from "./Reveal";
import { theme } from "../theme";

export const KpiSlide: React.FC<{
  data: KpiSlideData;
  durationInFrames: number;
}> = ({ data, durationInFrames }) => {
  return (
    <SlideShell
      heading={data.heading}
      narration={data.narration}
      durationInFrames={durationInFrames}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", gap: 24 }}>
          <Reveal index={0} stagger={12} style={{ flex: 1 }}>
            <div
              style={{
                background: theme.accentSoft,
                border: `1px solid ${theme.panelBorder}`,
                borderRadius: 20,
                padding: "28px 30px",
              }}
            >
              <div style={{ fontSize: 20, color: theme.accent, marginBottom: 14 }}>
                一次KPI
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                {data.primary.map((p) => (
                  <div
                    key={p}
                    style={{ fontSize: 32, fontWeight: 700 }}
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal index={1} stagger={12} style={{ flex: 1 }}>
            <div
              style={{
                background: theme.panel,
                border: `1px solid ${theme.panelBorder}`,
                borderRadius: 20,
                padding: "28px 30px",
              }}
            >
              <div style={{ fontSize: 20, color: theme.textMuted, marginBottom: 14 }}>
                二次KPI
              </div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {data.secondary.map((s) => (
                  <div key={s} style={{ fontSize: 24 }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal index={2} stagger={12}>
          <div
            style={{
              fontSize: 24,
              color: theme.textMuted,
              background: theme.panel,
              border: `1px solid ${theme.panelBorder}`,
              borderRadius: 16,
              padding: "18px 28px",
            }}
          >
            {data.note}
          </div>
        </Reveal>
      </div>
    </SlideShell>
  );
};
