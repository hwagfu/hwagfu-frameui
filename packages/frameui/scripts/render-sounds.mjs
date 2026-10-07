// Renders the logo sounds from scripts/sounds/engine.ts, once, ahead of time:
//
//   sounds/<cue>.mp3                     the files — to listen to, or put in a video
//   src/components/_logo-sound-<cue>.ts  the same MP3 as a data URI, which
//                                        `logo-sound` loads only when a page uses
//                                        that cue (one module per cue)
//
// Commit both. Run again after changing a sound:
//
//   pnpm --filter @hwagfu/frameui sounds
//
// Needs Chromium (Playwright's, or CHROMIUM_PATH) and ffmpeg built with libmp3lame.
import { execFileSync } from "node:child_process"
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { stripTypeScriptTypes } from "node:module"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { chromium } from "playwright-core"

const RATE = 48000
const BITRATE = "128k"
/** Cue → render length in seconds (the silent tail is trimmed afterwards) and a title. */
const CUES = {
  "frameon-intro": { secs: 8, title: "FrameON intro" },
  "framex-intro": { secs: 15, title: "FrameX intro" },
  "framex-reveal": { secs: 9, title: "FrameX reveal" },
  "framex-hover": { secs: 8, title: "FrameX hover" },
}

const engine = stripTypeScriptTypes(readFileSync("scripts/sounds/engine.ts", "utf8")).replace(/^export \{[^}]*\}\s*$/m, "")

const browser = await chromium.launch({
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
  args: ["--autoplay-policy=no-user-gesture-required"],
})
const page = await browser.newPage()
await page.setContent("<!doctype html><title>render</title>")
await page.addScriptTag({ content: engine })
// Offline rendering waits for the HRTF database, which a live context loads.
await page.evaluate(async () => {
  const live = new AudioContext()
  new PannerNode(live, { panningModel: "HRTF" }).connect(live.destination)
  await new Promise((done) => setTimeout(done, 500))
  await live.close()
})

const tmp = mkdtempSync(join(tmpdir(), "logo-sounds-"))
try {
  for (const [cue, { secs, title }] of Object.entries(CUES)) {
    // 1. Render to 32-bit float WAV. The reverb tail is cut where it falls under
    //    −60 dB, with a 250 ms fade so the file never ends on a click.
    const wav = Buffer.from(
      await page.evaluate(
        async ({ cue, secs, rate }) => {
          const ctx = new OfflineAudioContext(2, Math.round(rate * secs), rate)
          createLogoSound(ctx).play(cue, 0)
          const buffer = await ctx.startRendering()
          const [left, right] = [buffer.getChannelData(0), buffer.getChannelData(1)]
          let end = left.length
          while (end > 0 && Math.max(Math.abs(left[end - 1]), Math.abs(right[end - 1])) < 0.001) end--
          end = Math.min(left.length, end + Math.round(rate * 0.1))
          if (end === left.length) throw new Error(`${cue}: still audible at ${secs} s — render longer`)
          const fade = Math.round(rate * 0.25)
          for (let i = end - fade; i < end; i++) {
            const g = 0.5 + 0.5 * Math.cos((Math.PI * (i - (end - fade))) / fade)
            left[i] *= g
            right[i] *= g
          }
          const view = new DataView(new ArrayBuffer(44 + end * 8))
          const text = (at, s) => [...s].forEach((c, i) => view.setUint8(at + i, c.charCodeAt(0)))
          text(0, "RIFF")
          view.setUint32(4, 36 + end * 8, true)
          text(8, "WAVEfmt ")
          view.setUint32(16, 16, true)
          view.setUint16(20, 3, true) // IEEE float
          view.setUint16(22, 2, true)
          view.setUint32(24, rate, true)
          view.setUint32(28, rate * 8, true)
          view.setUint16(32, 8, true)
          view.setUint16(34, 32, true)
          text(36, "data")
          view.setUint32(40, end * 8, true)
          for (let i = 0; i < end; i++) {
            view.setFloat32(44 + i * 8, left[i], true)
            view.setFloat32(48 + i * 8, right[i], true)
          }
          let binary = ""
          const bytes = new Uint8Array(view.buffer)
          for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
          return btoa(binary)
        },
        { cue, secs, rate: RATE }
      ),
      "base64"
    )
    const wavPath = join(tmp, `${cue}.wav`)
    writeFileSync(wavPath, wav)

    // 2. MP3.
    const mp3Path = join("sounds", `${cue}.mp3`)
    execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-i", wavPath, "-codec:a", "libmp3lame", "-b:a", BITRATE, mp3Path])
    const mp3 = readFileSync(mp3Path)

    // 3. How far the decoded MP3 is shifted from the render: the encoder adds
    //    silence up front and decoders differ in removing it. Measured by
    //    cross-correlation around the loudest hit, skipped at play time, so the
    //    sound lands on the animation to the sample.
    const { offset, duration } = await page.evaluate(
      async ({ wavB64, mp3B64 }) => {
        const bytes = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)).buffer
        const ctx = new OfflineAudioContext(2, 1, 48000)
        const [wav, mp3] = await Promise.all([ctx.decodeAudioData(bytes(wavB64)), ctx.decodeAudioData(bytes(mp3B64))])
        const a = wav.getChannelData(0)
        const b = mp3.getChannelData(0)
        let peak = 0
        for (let i = 1; i < a.length; i++) if (Math.abs(a[i]) > Math.abs(a[peak])) peak = i
        // A long window (1 s) so noise bursts, which MP3 does not keep sample for
        // sample, cannot pull the match; the tones around the hit decide it.
        const window = wav.sampleRate
        const from = Math.max(0, Math.min(a.length - window, peak - window / 4))
        let best = -Infinity
        let lag = 0
        for (let l = -2400; l <= 2400; l++) {
          let sum = 0
          for (let i = from; i < from + window; i++) sum += a[i] * (b[i + l] ?? 0)
          if (sum > best) [best, lag] = [sum, l]
        }
        return { offset: lag / wav.sampleRate, duration: wav.duration }
      },
      { wavB64: wav.toString("base64"), mp3B64: mp3.toString("base64") }
    )

    // 4. The module the library loads.
    writeFileSync(
      join("src/components", `_logo-sound-${cue}.ts`),
      `// Generated by scripts/render-sounds.mjs from scripts/sounds/engine.ts — do not edit.\n` +
        `// ${title}: ${duration.toFixed(2)} s, MP3 ${BITRATE}bps stereo, ${(mp3.length / 1024).toFixed(0)} KB.\n\n` +
        `/** Seconds the decoded MP3 runs late (encoder silence up front); skipped at play time. */\n` +
        `export const offset = ${offset.toFixed(4)}\n\n` +
        `/** The MP3 itself. */\n` +
        `export const mp3 = "data:audio/mpeg;base64,${mp3.toString("base64")}"\n`
    )
    console.log(`${cue.padEnd(14)} ${duration.toFixed(2)} s  ${(mp3.length / 1024).toFixed(0).padStart(4)} KB  offset ${(offset * 1000).toFixed(1)} ms`)
  }
} finally {
  rmSync(tmp, { recursive: true, force: true })
  await browser.close()
}
