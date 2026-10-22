/**
 * Six clips played once each (no video looping), VO + per-clip music bed mixed to clip length.
 * Clips 1–5: first 8s (no mid-reel logo). Clip 6: full reel + logo CTA.
 * Run: npm run video:home
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import { ttsSave } from "edge-tts/out/index.js";

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const videosDir = path.join(root, "public", "videos");
const voDir = path.join(videosDir, "vo");
const workDir = path.join(root, "scripts", ".video-work");

const FFMPEG = ffmpegPath.path;

const BG_MUSIC_VOLUME = 0.3;
const CONTENT_TRIM_END = 9;
const CTA_CLIP_INDEX = 5;
const VO_TAIL_PAD = 0.12;

const TTS_VOICE = "en-US-GuyNeural";
/** Normal speaking pace — sync is handled by shorter scripts per clip, not ffmpeg speed-up. */
const TTS_RATE = "+0%";
const TTS_VOLUME = "+15%";

const clips = [
  {
    file: "gemini_generated_video_052ca996.mp4",
    voName: "01-who-we-are.mp3",
    label: "Who Mira Konnect is",
    text:
      "Mira Konnect is a recruitment partner across India—connecting the right talent with the right opportunity.",
  },
  {
    file: "gemini_generated_video_cbdf9ea3.mp4",
    voName: "02-services.mp3",
    label: "Recruitment services",
    text:
      "We handle hiring end to end—sourcing, screening, interviews, and onboarding for employers and candidates.",
  },
  {
    file: "gemini_generated_video_c50a35e8.mp4",
    voName: "03-industries.mp3",
    label: "Ten industries",
    text: "Ten industries—pharma, IT, hospitality, manufacturing, banking, FMCG, and more.",
  },
  {
    file: "gemini_generated_video_cc97d36a.mp4",
    voName: "04-process.mp3",
    label: "Process & solutions",
    text: "From brief to onboarding—sourcing, screening, and offers stay on track.",
  },
  {
    file: "gemini_generated_video_ddaa48a6.mp4",
    voName: "05-people-first.mp3",
    label: "People-first approach",
    text:
      "We recruit with a human, confidential approach—honest feedback and partnerships built on trust.",
  },
  {
    file: "gemini_generated_video_8300e526.mp4",
    voName: "06-cta.mp3",
    label: "Tagline & call to action",
    text:
      "Mira Konnect—connecting the right talent with the right opportunity. Visit mirakonnect.com to hire or apply.",
  },
];

async function runFfmpeg(args) {
  await execFileAsync(FFMPEG, args, { maxBuffer: 30 * 1024 * 1024 });
}

async function getDurationSeconds(file) {
  try {
    await execFileAsync(FFMPEG, ["-i", file], { maxBuffer: 10 * 1024 * 1024 });
  } catch (err) {
    const text = String(err.stderr ?? err.stdout ?? "");
    const match = text.match(/Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/);
    if (!match) return 10;
    const h = Number(match[1]);
    const m = Number(match[2]);
    const s = Number(match[3]);
    return h * 3600 + m * 60 + s;
  }
  return 10;
}

async function videoHasAudio(file) {
  try {
    await execFileAsync(FFMPEG, ["-i", file], { maxBuffer: 10 * 1024 * 1024 });
  } catch (err) {
    const text = String(err.stderr ?? err.stdout ?? "");
    return /Audio:/i.test(text);
  }
  return false;
}

async function synthesizeVoiceFallback(text, outMp3Path) {
  const wavPath = outMp3Path.replace(/\.mp3$/i, ".wav");
  const psText = text.replace(/'/g, "''");
  const psScript = `
Add-Type -AssemblyName System.Speech
$s = New-Object System.Speech.Synthesis.SpeechSynthesizer
$preferred = @('Microsoft Guy Online','Microsoft David Online','Microsoft George Online','Microsoft Mark Online')
$installed = $s.GetInstalledVoices() | ForEach-Object { $_.VoiceInfo.Name }
$pick = $preferred | Where-Object { $installed -contains $_ } | Select-Object -First 1
if (-not $pick) {
  $pick = ($s.GetInstalledVoices() | Where-Object { $_.VoiceInfo.Gender -eq 'Male' -and $_.VoiceInfo.Culture.Name -like 'en*' } | Select-Object -First 1).VoiceInfo.Name
}
if ($pick) { $s.SelectVoice($pick) }
$s.Rate = 0
$s.Volume = 100
$s.SetOutputToWaveFile('${wavPath.replace(/\\/g, "\\\\")}')
$s.Speak('${psText}')
$s.Dispose()
`;
  await execFileAsync("powershell", ["-NoProfile", "-Command", psScript], {
    maxBuffer: 10 * 1024 * 1024,
  });
  await runFfmpeg(["-y", "-i", wavPath, "-c:a", "libmp3lame", "-q:a", "2", outMp3Path]);
  try {
    fs.unlinkSync(wavPath);
  } catch {
    /* ignore */
  }
}

async function synthesizeVoice(text, outMp3Path) {
  try {
    await ttsSave(text, outMp3Path, {
      voice: TTS_VOICE,
      rate: TTS_RATE,
      volume: TTS_VOLUME,
    });
  } catch (err) {
    console.warn("Edge TTS failed, using local male voice:", err?.message ?? err);
    await synthesizeVoiceFallback(text, outMp3Path);
  }
}

async function prepareClipAssets(clip, index, videoOut, bedOut) {
  const input = path.join(videosDir, clip.file);
  const isCta = index === CTA_CLIP_INDEX;
  const trimArgs = isCta ? [] : ["-t", String(CONTENT_TRIM_END)];

  await runFfmpeg([
    "-y",
    "-i",
    input,
    ...trimArgs,
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "fast",
    "-crf",
    "22",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    videoOut,
  ]);

  const hasBed = await videoHasAudio(input);
  if (!hasBed) {
    fs.writeFileSync(bedOut, "");
    return;
  }

  await runFfmpeg([
    "-y",
    "-i",
    input,
    ...trimArgs,
    "-vn",
    "-af",
    `pan=stereo|c0=0.5*c0+-0.5*c1|c1=0.5*c1+-0.5*c0,highpass=f=200,lowpass=f=12000,volume=${BG_MUSIC_VOLUME}`,
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    bedOut,
  ]);
}

async function buildSegment(videoPath, voPath, bedPath, outPath) {
  const videoDur = await getDurationSeconds(videoPath);
  const segmentDur = videoDur.toFixed(3);
  const voDur = await getDurationSeconds(voPath);
  const voSlot = Math.max(0.5, videoDur - VO_TAIL_PAD);
  const voPlayDur = Math.min(voDur, voSlot);
  const fadeStart = Math.max(0, voPlayDur - 0.12);

  const hasBed = fs.existsSync(bedPath) && fs.statSync(bedPath).size > 0;

  const voiceCore = `atrim=0:${voPlayDur.toFixed(3)},asetpts=PTS-STARTPTS,afade=t=out:st=${fadeStart.toFixed(3)}:d=0.12,highpass=f=90,volume=1.2,alimiter=limit=0.98:level=false`;

  const filter = hasBed
    ? `[1:a]aformat=sample_rates=48000:channel_layouts=stereo,${voiceCore}[voice];[2:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:${segmentDur},asetpts=PTS-STARTPTS[bed];[bed][voice]amix=inputs=2:duration=longest:dropout_transition=2,atrim=0:${segmentDur},asetpts=PTS-STARTPTS[aout]`
    : `[1:a]aformat=sample_rates=48000:channel_layouts=stereo,${voiceCore},atrim=0:${segmentDur},asetpts=PTS-STARTPTS[aout]`;

  await runFfmpeg([
    "-y",
    "-i",
    videoPath,
    "-i",
    voPath,
    ...(hasBed ? ["-i", bedPath] : []),
    "-filter_complex",
    filter,
    "-map",
    "0:v:0",
    "-map",
    "[aout]",
    "-t",
    segmentDur,
    "-c:v",
    "copy",
    "-c:a",
    "aac",
    "-b:a",
    "192k",
    "-movflags",
    "+faststart",
    outPath,
  ]);

  return videoDur;
}

async function writePoster() {
  const first = path.join(videosDir, clips[0].file);
  const poster = path.join(videosDir, "home-process-poster.jpg");
  await runFfmpeg([
    "-y",
    "-ss",
    "1.5",
    "-i",
    first,
    "-vframes",
    "1",
    "-q:v",
    "2",
    poster,
  ]);
}

async function main() {
  fs.mkdirSync(voDir, { recursive: true });
  fs.mkdirSync(workDir, { recursive: true });

  const segmentPaths = [];
  const manifest = { poster: "/videos/home-process-poster.jpg", segments: [] };
  let timeline = 0;

  for (let i = 0; i < clips.length; i++) {
    const clip = clips[i];
    const voPath = path.join(voDir, clip.voName);
    const videoPath = path.join(workDir, `clip-${String(i + 1).padStart(2, "0")}-video.mp4`);
    const bedPath = path.join(workDir, `clip-${String(i + 1).padStart(2, "0")}-bed.m4a`);
    const segPath = path.join(workDir, `seg-${String(i + 1).padStart(2, "0")}.mp4`);

    console.log(`Voice ${i + 1}/6 → ${clip.voName}`);
    await synthesizeVoice(clip.text, voPath);

    const maxVo =
      (i === CTA_CLIP_INDEX ? await getDurationSeconds(path.join(videosDir, clip.file)) : CONTENT_TRIM_END) -
      VO_TAIL_PAD;
    const voDur = await getDurationSeconds(voPath);
    if (voDur > maxVo + 0.05) {
      console.warn(
        `  Note: narration ${voDur.toFixed(2)}s for ${maxVo.toFixed(2)}s slot — ends on clip (no speed-up).`,
      );
    }

    console.log(
      `Clip ${i + 1}/6 (once) → ${clip.file}${i === CTA_CLIP_INDEX ? " (full)" : ` (0–${CONTENT_TRIM_END}s)`}`,
    );
    await prepareClipAssets(clip, i, videoPath, bedPath);

    console.log(`Mix ${i + 1}/6`);
    const dur = await buildSegment(videoPath, voPath, bedPath, segPath);
    segmentPaths.push(segPath);

    manifest.segments.push({
      order: i + 1,
      label: clip.label,
      start: timeline,
      end: timeline + dur,
    });
    timeline += dur;
  }

  const listPath = path.join(workDir, "concat.txt");
  fs.writeFileSync(
    listPath,
    segmentPaths.map((p) => `file '${p.replace(/\\/g, "/")}'`).join("\n"),
    "utf8",
  );

  const output = path.join(videosDir, "mira-konnect-home-process.mp4");
  console.log("Concatenating → mira-konnect-home-process.mp4");
  const concatOut = path.join(workDir, "concat-raw.mp4");
  await runFfmpeg([
    "-y",
    "-f",
    "concat",
    "-safe",
    "0",
    "-i",
    listPath,
    "-c",
    "copy",
    concatOut,
  ]);

  console.log("Re-encoding for browser playback (H.264 Main + faststart)…");
  await runFfmpeg([
    "-y",
    "-i",
    concatOut,
    "-c:v",
    "libx264",
    "-profile:v",
    "main",
    "-level",
    "4.0",
    "-pix_fmt",
    "yuv420p",
    "-preset",
    "fast",
    "-crf",
    "22",
    "-c:a",
    "aac",
    "-b:a",
    "192k",
    "-movflags",
    "+faststart",
    output,
  ]);

  manifest.duration = timeline;
  fs.writeFileSync(
    path.join(videosDir, "home-process-manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf8",
  );

  console.log("Poster frame…");
  await writePoster();

  console.log("Done:", output, `(${timeline.toFixed(1)}s, 6 clips × once)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
