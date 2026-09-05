import React from "react";
import { GroupsSlideData } from "../data";
import { SlideShell } from "./SlideShell";
import { Reveal } from "./Reveal";
import { theme } from "../theme";

export const GroupsSlide: React.FC<{
  data: GroupsSlideData;
  durationInFrames: number;
}> = ({ data, durationInFrames }) => {
  return (
    <SlideShell
      heading={data.heading}
      narration={data.narration}
      durationInFrames={durationInFrames}
    >
      <div style={{ display: "flex", gap: 24 }}>
        {data.groups.map((group, gi) => (
          <div
            key={group.title}
            style={{
              flex: 1,
              background: theme.panel,
              border: `1px solid ${theme.panelBorder}`,
              borderRadius: 20,
              padding: "26px 26px",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <Reveal index={gi} stagger={16}>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: theme.accent,
                  borderBottom: `2px solid ${theme.panelBorder}`,
                  paddingBottom: 14,
                }}
              >
                {group.title}
              </div>
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {group.items.map((item, ii) => (
                <Reveal
                  key={item}
                  index={gi * 3 + ii + 2}
                  stagger={8}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      fontSize: 21,
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: theme.accent }}>・</span>
                    <span>{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
};
