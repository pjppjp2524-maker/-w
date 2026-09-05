import audioManifest from "./audioManifest.json";
import { Slide, slides } from "./data";

// Extra breathing room after a recorded narration ends, before cutting to
// the next slide.
const TAIL_SECONDS = 0.6;

type AudioManifestEntry = { file: string; durationInSeconds: number };
const manifest = audioManifest as Record<string, AudioManifestEntry>;

export const getSlideDurationInFrames = (slide: Slide, fps: number) => {
  const audio = manifest[slide.id];
  const seconds = audio ? audio.durationInSeconds + TAIL_SECONDS : slide.seconds;
  return Math.round(seconds * fps);
};

export const getAudioFile = (slideId: string): string | null =>
  manifest[slideId]?.file ?? null;

export const totalDurationInFrames = (fps: number) =>
  slides.reduce((sum, slide) => sum + getSlideDurationInFrames(slide, fps), 0);
