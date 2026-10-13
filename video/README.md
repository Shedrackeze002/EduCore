# Explainer videos

Gradileo's explainer videos are built from scripts, like the lessons. A script
(`src/content/<course>/videos/<id>.ts`) is a list of scenes: each puts triangles, maths, tables,
a calculator or a "Your turn" question on the stage, and the narrator's lines show and highlight
them as they are spoken. The build voices every line, times the video from the narration, draws
every frame in Chromium and encodes the MP4.

Each build writes to `video/out/<id>/` (not committed):

| File | What it is |
|---|---|
| `<id>.mp4` | 1920×1080, 30 fps, H.264 with AAC audio normalised to −16 LUFS |
| `captions.srt`, `captions.vtt` | Captions from the script, timed to the narration |
| `thumbnail.png` | 1280×720 |
| `youtube.txt` | Title, description with chapters, and tags to paste into YouTube |
| `pronunciation.txt` | Whisper's transcript of each line compared with the script |

It also records the video's length, chapters and question cues in `src/content/videos.json`,
which the lesson player will use to pause at each question.

## Setting up

```bash
npm ci                    # the app (Vite, Playwright)
npm --prefix video ci     # the narration and speech models (about 700 MB)
```

You also need `ffmpeg`. The build uses Playwright's Chromium; set `CHROMIUM_PATH` to use another.
The first build downloads the Kokoro voice model and Whisper into `video/.cache/`. Behind a proxy
(as in Claude's cloud containers), run Node with `NODE_USE_ENV_PROXY=1` so the downloads use it.

## Building

```bash
npx tsx video/build.ts m10c-2-1 m10c-2-1-b      # build these videos
npx tsx video/build.ts m10c-2-1 --stills         # a picture of the end of each scene, no MP4
npx tsx video/build.ts m10c-2-1 --stills --quick # the same, with the narration estimated
```

Options: `--voice af_heart` (a Kokoro voice), `--speed 1`, `--fps 30`, `--no-qa`. Narration is
cached by line, so changing one line re-voices only that line. A three-minute video takes a few
minutes to render on four cores; frames where nothing moves are drawn once and reused.

## Narration

The voice is Kokoro (82M parameters, Apache 2.0), which runs on the CPU, so narration costs
nothing however many videos we make. The default voice is `af_heart`. Kokoro reads numbers,
decimals and units as written ("9.4 cm", "0.75"); write maths in words ("tan theta equals x over
fifteen") and spell out letters with spaces ("triangle A B C"). After each build, listen to the
lines that `pronunciation.txt` marks CHECK.

## Writing a script

See `src/video/script.ts` for every element and option. In short:

- Figures: `triangle` for a right triangle named from θ, and `diagram` for anything drawn from
  points: lines, angles, right-angle marks, labels, shaded regions and scenery (ground, water, a
  cliff, tower, lighthouse, building, flagpole, tree, person or boat). Name each part, then show
  and emphasise parts as the narrator mentions them (`show: ['d.sight', 'd.elev']`); hiding a part
  shown on its own swaps one label for another. Run `--stills --quick` to check the layout.

- Keep each video to about three minutes. Split a long lesson into parts: `m10c-2-1` is part 1,
  `m10c-2-1-b` part 2, and so on.
- Start with a title scene, give each later scene a `chapter` (these become YouTube chapters),
  end with a "Your turn" question and a summary.
- Colours have fixed meanings: `[[theta:…]]`, `[[opp:…]]`, `[[adj:…]]` and `[[hyp:…]]` in text,
  `\thc{}`, `\opp{}`, `\adj{}` and `\hyp{}` in maths (θ yellow, opposite orange, adjacent blue,
  hypotenuse pink). Colour is never the only cue: sides are always named too.
- Check every number in the script; the video shows exactly what the script says.

## Uploading to YouTube

1. Upload `<id>.mp4` to the Gradileo channel.
2. Copy the title, description and tags from `youtube.txt`.
3. Set `thumbnail.png` as the thumbnail.
4. Upload the captions: in YouTube Studio, **Subtitles → Add language → English → Upload file →
   With timing**, and choose `captions.srt`. YouTube's automatic captions come from speech
   recognition and get maths words wrong ("sign" for sine, "data" for theta) or arrive late; ours
   follow the script word for word, timed to the narration. The lesson player shows captions from
   the start.
5. In Gradileo, open **Admin console → Videos** and paste the video's YouTube link. Its lesson
   then shows the video and pauses at each "Your turn" to ask the question.
