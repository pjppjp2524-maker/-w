# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Adding narration audio (TwoStageClose)

The `TwoStageClose` composition (`src/Script/`) shows a 10-slide narrated
deck. To add your own recorded narration:

1. Record one audio file per slide and drop it into `public/audio/`, named
   after the slide id: `title`, `conclusion`, `background`, `why-co`,
   `success-factors`, `flow`, `checklist`, `kpi`, `summary`, `closing`
   (see `src/Script/data.ts` for the exact narration text of each slide).
   `.mp3`, `.wav`, `.m4a`, `.aac` and `.ogg` are all supported.
2. Run `npm run sync-audio`. This reads each file's real length with
   ffmpeg and writes it to `src/Script/audioManifest.json`, so that
   slide's on-screen duration matches your recording (plus a short pause)
   instead of the estimated seconds in `data.ts`.
3. Re-render: `npx remotion render TwoStageClose out/two-stage-close.mp4`.

Slides with no recording yet keep using the estimated duration from
`data.ts`, so you can add narration one slide at a time.

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
