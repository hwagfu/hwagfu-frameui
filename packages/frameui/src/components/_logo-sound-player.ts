/*
 * Plays the logo sounds. They are MP3s rendered ahead of time
 * (scripts/render-sounds.mjs, from the synthesiser in scripts/sounds), so
 * playing one costs a decode the first time and nothing after — no synthesis
 * in the browser. Each cue lives in its own module, fetched only when a page
 * uses it.
 */

/** What to play. Each cue is made for the logo props named in its doc. */
type LogoSoundCue =
  /** `<Wordmark entrance="intro" />` (FrameON) — 4.8 s, 77 KB. */
  | "frameon-intro"
  /** `<Wordmark variant="framex" entrance="intro" shine flare glow />` — 10.5 s, 165 KB. */
  | "framex-intro"
  /** `entrance="reveal"` (FrameX) — 5.9 s, 93 KB. */
  | "framex-reveal"
  /** `shine="hover" flare="hover"` (FrameX) — 6.9 s, 109 KB. */
  | "framex-hover"

type LogoSoundOptions = {
  /** 0–1. Default 0.9. */
  volume?: number | undefined
}

type Cue = { mp3: string; offset: number }

const sources: Record<LogoSoundCue, () => Promise<Cue>> = {
  "frameon-intro": () => import("./_logo-sound-frameon-intro"),
  "framex-intro": () => import("./_logo-sound-framex-intro"),
  "framex-reveal": () => import("./_logo-sound-framex-reveal"),
  "framex-hover": () => import("./_logo-sound-framex-hover"),
}

/** The data URI as bytes — not `fetch()`, which a strict CSP may refuse for `data:`. */
function bytes(dataUri: string) {
  const binary = atob(dataUri.slice(dataUri.indexOf(",") + 1))
  const out = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i)
  return out.buffer
}

const loaded = new Map<LogoSoundCue, Promise<Cue>>()
const decoded = new Map<LogoSoundCue, Promise<AudioBuffer>>()

const load = (cue: LogoSoundCue) => {
  let cached = loaded.get(cue)
  if (!cached) loaded.set(cue, (cached = sources[cue]()))
  return cached
}

/**
 * Fetches a cue's MP3 ahead of time — no sound, no AudioContext, so it is
 * fine before any click. `LogoSound` does it when the browser is idle.
 */
function preloadLogoSound(cue: LogoSoundCue) {
  return load(cue).then(() => undefined)
}

let context: AudioContext | null = null

/** The page's AudioContext, made on first use; `null` on the server or without Web Audio. */
function audioContext() {
  if (context) return context
  if (typeof window === "undefined") return null
  const Ctor =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  return Ctor ? (context = new Ctor()) : null
}

/** A function, not an inline check: `resume()` changes the state behind TypeScript's back. */
const running = (ctx: BaseAudioContext) => ctx.state === "running"

/**
 * Plays a logo cue and returns when its sound reaches the speakers, as a
 * `performance.now()` time — start the logo's animation then to keep picture
 * and sound together (`LogoSound` does this for you). Returns `null` when
 * nothing plays: on the server, without Web Audio, or before the visitor
 * has clicked or pressed a key on the page — browsers block sound until
 * then, so call it from a click handler, or after one.
 */
async function playLogoSound(cue: LogoSoundCue, { volume = 0.9 }: LogoSoundOptions = {}): Promise<number | null> {
  const ctx = audioContext()
  if (!ctx) return null
  if (!running(ctx)) {
    if (typeof navigator !== "undefined" && navigator.userActivation && !navigator.userActivation.hasBeenActive) {
      return null
    }
    // Without a gesture `resume()` can wait forever; give it a moment, then give up.
    await Promise.race([ctx.resume(), new Promise((done) => setTimeout(done, 300))])
    if (!running(ctx)) return null
  }
  let buffer = decoded.get(cue)
  if (!buffer) {
    buffer = load(cue).then(({ mp3 }) => ctx.decodeAudioData(bytes(mp3)))
    decoded.set(cue, buffer)
  }
  const [audio, { offset }] = await Promise.all([buffer, load(cue)])

  const source = new AudioBufferSourceNode(ctx, { buffer: audio })
  source.connect(new GainNode(ctx, { gain: volume })).connect(ctx.destination)
  // Read both clocks together: the sound starts `lead` after this instant.
  const lead = 0.03
  const at = ctx.currentTime + lead
  const now = performance.now()
  // `offset` > 0: the decoded MP3 runs late, skip into it; < 0: it runs early, wait.
  source.start(at + Math.max(0, -offset), Math.max(0, offset))
  return now + (lead + (ctx.outputLatency || 0)) * 1000
}

export { playLogoSound, preloadLogoSound, type LogoSoundCue, type LogoSoundOptions }
