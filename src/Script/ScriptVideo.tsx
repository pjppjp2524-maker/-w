import React from "react";
import { Series, useVideoConfig } from "remotion";
import { slides } from "./data";
import { TitleSlide } from "./components/TitleSlide";
import { BulletSlide } from "./components/BulletSlide";
import { ComparisonSlide } from "./components/ComparisonSlide";
import { ReasonsSlide } from "./components/ReasonsSlide";
import { GroupsSlide } from "./components/GroupsSlide";
import { FlowSlide } from "./components/FlowSlide";
import { ChecklistSlide } from "./components/ChecklistSlide";
import { KpiSlide } from "./components/KpiSlide";
import { SummarySlide } from "./components/SummarySlide";
import { ClosingSlide } from "./components/ClosingSlide";
import { theme } from "./theme";

export const ScriptVideo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <div style={{ background: theme.bg, width: "100%", height: "100%" }}>
      <Series>
        {slides.map((slide) => {
          const durationInFrames = Math.round(slide.seconds * fps);
          return (
            <Series.Sequence
              key={slide.id}
              durationInFrames={durationInFrames}
            >
              {slide.kind === "title" ? (
                <TitleSlide data={slide} durationInFrames={durationInFrames} />
              ) : null}
              {slide.kind === "bullets" ? (
                <BulletSlide
                  data={slide}
                  durationInFrames={durationInFrames}
                />
              ) : null}
              {slide.kind === "comparison" ? (
                <ComparisonSlide
                  data={slide}
                  durationInFrames={durationInFrames}
                />
              ) : null}
              {slide.kind === "reasons" ? (
                <ReasonsSlide
                  data={slide}
                  durationInFrames={durationInFrames}
                />
              ) : null}
              {slide.kind === "groups" ? (
                <GroupsSlide data={slide} durationInFrames={durationInFrames} />
              ) : null}
              {slide.kind === "flow" ? (
                <FlowSlide data={slide} durationInFrames={durationInFrames} />
              ) : null}
              {slide.kind === "checklist" ? (
                <ChecklistSlide
                  data={slide}
                  durationInFrames={durationInFrames}
                />
              ) : null}
              {slide.kind === "kpi" ? (
                <KpiSlide data={slide} durationInFrames={durationInFrames} />
              ) : null}
              {slide.kind === "summary" ? (
                <SummarySlide
                  data={slide}
                  durationInFrames={durationInFrames}
                />
              ) : null}
              {slide.kind === "closing" ? (
                <ClosingSlide
                  data={slide}
                  durationInFrames={durationInFrames}
                />
              ) : null}
            </Series.Sequence>
          );
        })}
      </Series>
    </div>
  );
};

export const scriptVideoDurationInFrames = (fps: number) =>
  slides.reduce((sum, s) => sum + Math.round(s.seconds * fps), 0);
