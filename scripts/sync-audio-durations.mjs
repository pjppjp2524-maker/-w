#!/usr/bin/env node
// Scans public/audio for narration recordings and writes their real
// durations to src/Script/audioManifest.json, so each slide in
// TwoStageClose can run exactly as long as its recorded narration
// instead of the estimated seconds in src/Script/data.ts.
//
// Usage: npm run sync-audio  (after dropping files into public/audio)

import { existsSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const audioDir = path.join(projectRoot, "public", "audio");
const manifestPath = path.join(
  projectRoot,
  "src",
  "Script",
  "audioManifest.json",
);

// Keep this list in sync with the slide ids in src/Script/data.ts
const SLIDE_IDS = [
  "title",
  "conclusion",
  "background",
  "why-co",
  "success-factors",
  "flow",
  "checklist",
  "kpi",
  "summary",
  "closing",
];

const EXTENSIONS = ["mp3", "wav", "m4a", "aac", "ogg"];

const findFfmpeg = () => {
  const platformDir = process.platform === "linux" ? "linux-x64-gnu" : null;
  const candidates = [
    `@remotion/compositor-${platformDir}`,
    "@remotion/compositor-linux-x64-musl",
    "@remotion/compositor-darwin-arm64",
    "@remotion/compositor-darwin-x64",
    "@remotion/compositor-win32-x64-msvc",
  ].filter(Boolean);

  for (const pkg of candidates) {
    try {
      const pkgDir = path.dirname(
        require.resolve(`${pkg}/package.json`, { paths: [projectRoot] }),
      );
      const bin = path.join(
        pkgDir,
        process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg",
      );
      if (existsSync(bin)) return bin;
    } catch {
      // try next candidate
    }
  }
  return null;
};

const getDurationInSeconds = (ffmpegPath, filePath) => {
  const result = spawnSync(ffmpegPath, ["-i", filePath], { encoding: "utf8" });
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  const match = output.match(/Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const [, hours, minutes, seconds] = match;
  return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
};

const ffmpegPath = findFfmpeg();
if (!ffmpegPath) {
  console.error(
    "Could not find a bundled Remotion ffmpeg binary under node_modules/@remotion/compositor-*. " +
      "Run `npm i` first.",
  );
  process.exit(1);
}

const manifest = {};
const missing = [];

for (const id of SLIDE_IDS) {
  const found = EXTENSIONS.map((ext) => `${id}.${ext}`)
    .map((name) => ({ name, full: path.join(audioDir, name) }))
    .find(({ full }) => existsSync(full));

  if (!found) {
    missing.push(id);
    continue;
  }

  const durationInSeconds = getDurationInSeconds(ffmpegPath, found.full);
  if (durationInSeconds === null) {
    console.warn(`! Could not read duration for public/audio/${found.name}`);
    continue;
  }

  manifest[id] = {
    file: `audio/${found.name}`,
    durationInSeconds: Math.round(durationInSeconds * 100) / 100,
  };
  console.log(
    `✓ ${id.padEnd(18)} ${found.name.padEnd(18)} ${durationInSeconds.toFixed(2)}s`,
  );
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`\nWrote ${Object.keys(manifest).length} entr${Object.keys(manifest).length === 1 ? "y" : "ies"} to src/Script/audioManifest.json`);
if (missing.length > 0) {
  console.log(
    `No recording yet for: ${missing.join(", ")} — these slides will keep using the estimated seconds from src/Script/data.ts.`,
  );
}
