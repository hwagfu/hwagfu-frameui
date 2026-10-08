/*
 * Source of the logo sounds. Not shipped: scripts/render-sounds.mjs runs it
 * once in Chromium (OfflineAudioContext) and encodes each cue to an MP3,
 * which is what the library plays. Change a sound here, then re-render.
 *
 * FrameON, in D: a plain sonic logo. A warm chord opens, a soft low hit as
 * the play button lands, air across as the name slides in, two bell notes
 * as "ON" lights up.
 *
 * FrameX, in E (one step up), is built like a theatre intro:
 *   1. Build    seat rumble with a growing tremor (4DX), pitches converging
 *               into one chord, a riser circling in from behind the listener
 *   2. Suck-in  ~90 ms of near silence right before the hit
 *   3. Impact   transient + low boom + sub drop + warm brass in a big hall;
 *               the sub is also saturated so phone speakers keep its weight
 *   4. Luxe     harp glissando, crystal shimmer, a band of light that passes
 *               in front of the listener (HRTF — best on headphones), two
 *               struck-metal bells for the flares, a resolving chord
 *
 * Every random choice comes from a seeded generator, so a cue sounds the same
 * every time. Voices are scheduled at absolute AudioContext times, which keeps
 * them on the logo's CSS timeline to the millisecond.
 */

/** What to play. Each FrameX cue matches the logo props named in its doc. */
type LogoSoundCue =
  /** With `<Wordmark entrance="intro" />` (FrameON): about 2.5 s. */
  | "frameon-intro"
  /** With `<Wordmark variant="framex" entrance="intro" shine flare glow />`: about 12 s. */
  | "framex-intro"
  /** With `entrance="reveal"` (FrameX): a short rise, a lighter hit, the harp. */
  | "framex-reveal"
  /** With `shine="hover" flare="hover"` (FrameX): one quiet pass of light and the two bells. */
  | "framex-hover"

type LogoSoundOptions = {
  /** Master volume, 0–1. Default 0.9. */
  volume?: number | undefined
}

type LogoSoundEngine = {
  /** Schedules a cue at `at` (AudioContext time; default: right away). */
  play: (cue: LogoSoundCue, at?: number) => void
  /** Builds the reverbs and noise now (otherwise on first use), so a later `play` schedules at once. */
  warm: () => void
  /** The master gain, for fades or a mute switch. */
  output: GainNode
}

type Point = readonly [time: number, value: number]

/** Seeded PRNG (mulberry32): the same "random" every run. */
function seeded(seed: number) {
  let s = seed | 0
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Frequency of a MIDI note. */
const hz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12)

const clampPan = (pan: number) => Math.max(-1, Math.min(1, pan))

/**
 * Builds the logo sound graph on a context — a live `AudioContext`, or an
 * `OfflineAudioContext` to render a cue to a file.
 */
function createLogoSound(
  ctx: BaseAudioContext,
  destination: AudioNode = ctx.destination,
  { volume = 0.9 }: LogoSoundOptions = {}
): LogoSoundEngine {
  const rate = ctx.sampleRate

  // ------------------------------------------------------------ master
  const output = new GainNode(ctx, { gain: volume })
  const limiter = new DynamicsCompressorNode(ctx, { threshold: -2, knee: 0, ratio: 20, attack: 0.001, release: 0.12 })
  // Everything — dry voices and reverb returns — meets in `glue`, a gain the
  // intro can pull down for the silence before its hit, then the compressor.
  const glue = new GainNode(ctx, { gain: 1 })
  const compressor = new DynamicsCompressorNode(ctx, { threshold: -20, knee: 10, ratio: 2.5, attack: 0.012, release: 0.3 })
  glue.connect(compressor).connect(limiter).connect(output).connect(destination)

  /** True silence from `from` to `to`, reverb tails included: the breath held before a hit. */
  const hold = (from: number, to: number) => {
    glue.gain.setValueAtTime(1, from)
    glue.gain.linearRampToValueAtTime(0.02, from + 0.03)
    glue.gain.setValueAtTime(0.02, to - 0.004)
    glue.gain.linearRampToValueAtTime(1, to)
  }

  const gain = (value = 1) => new GainNode(ctx, { gain: value })

  /**
   * A reverb tail: decaying noise that loses its highs as it fades, after a
   * 25 ms pre-delay and a few early reflections. Built on first use.
   */
  const reverb = (secs: number, decay: number, seed: number, level: number) => {
    let node: ConvolverNode | null = null
    return () => {
      if (node) return node
      const r = seeded(seed)
      const len = Math.floor(rate * secs)
      const pre = Math.floor(rate * 0.025)
      const buffer = ctx.createBuffer(2, len, rate)
      for (let c = 0; c < 2; c++) {
        const d = buffer.getChannelData(c)
        let y = 0
        for (let i = pre; i < len; i++) {
          const p = i / len
          y += (0.92 - 0.8 * p) * ((r() * 2 - 1) * Math.pow(1 - p, decay) - y)
          d[i] = y
        }
        ;[0.011, 0.019, 0.027, 0.037].forEach((at, k) => {
          const i = Math.floor(rate * (at + c * 0.003))
          d[i] = (d[i] ?? 0) + 0.5 / (k + 1)
        })
      }
      node = new ConvolverNode(ctx, { buffer })
      node.connect(gain(level)).connect(glue)
      return node
    }
  }
  const hall = reverb(5.5, 3, 7, 0.55)
  const room = reverb(2.6, 2.8, 3, 0.4)

  // Ping-pong delay for the FrameX bells: left, then right, darker each time.
  let pingPong: GainNode | null = null
  const echo = () => {
    if (pingPong) return pingPong
    pingPong = gain()
    const left = new DelayNode(ctx, { delayTime: 0.27, maxDelayTime: 1 })
    const right = new DelayNode(ctx, { delayTime: 0.41, maxDelayTime: 1 })
    pingPong.connect(left)
    left.connect(new BiquadFilterNode(ctx, { type: "lowpass", frequency: 4200 })).connect(right)
    right.connect(gain(0.36)).connect(left)
    for (const [node, side] of [
      [left, -0.9],
      [right, 0.9],
    ] as const) {
      const p = node.connect(new StereoPannerNode(ctx, { pan: side }))
      p.connect(glue)
      p.connect(hall())
    }
    return pingPong
  }

  /** Route a voice dry, and scaled into a reverb and the delay. */
  const send = (node: AudioNode, dry = 1, wet = 0, delay = 0, space: () => ConvolverNode = hall) => {
    if (dry) node.connect(gain(dry)).connect(glue)
    if (wet) node.connect(gain(wet)).connect(space())
    if (delay) node.connect(gain(delay)).connect(echo())
  }

  /** Exponential envelope through [time from t, value] points, from silence. */
  const env = (param: AudioParam, t: number, points: readonly Point[]) => {
    param.setValueAtTime(0.0001, t)
    for (const [dt, v] of points) param.exponentialRampToValueAtTime(Math.max(v, 0.0001), t + dt)
  }

  const shaper = (drive: number) => {
    const n = 2048
    const curve = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1)) * 2 - 1
      curve[i] = Math.tanh(drive * x) / Math.tanh(drive)
    }
    return new WaveShaperNode(ctx, { curve, oversample: "4x" })
  }

  const noiseBuffers: Partial<Record<"white" | "brown", AudioBuffer>> = {}
  /** Three seconds of white or brown noise, decorrelated between the ears, seeded. */
  const noiseBuffer = (kind: "white" | "brown") => {
    const cached = noiseBuffers[kind]
    if (cached) return cached
    const r = seeded(kind === "white" ? 11 : 23)
    const len = rate * 3
    const buffer = ctx.createBuffer(2, len, rate)
    for (let c = 0; c < 2; c++) {
      const d = buffer.getChannelData(c)
      let b = 0
      for (let i = 0; i < len; i++) {
        const w = r() * 2 - 1
        if (kind === "brown") {
          b = (b + 0.02 * w) / 1.02
          d[i] = b * 3.5
        } else d[i] = w
      }
    }
    return (noiseBuffers[kind] = buffer)
  }
  const noise = (kind: "white" | "brown", t: number, dur: number) => {
    const s = new AudioBufferSourceNode(ctx, { buffer: noiseBuffer(kind), loop: true })
    s.start(t)
    s.stop(t + dur)
    return s
  }
  const osc = (type: OscillatorType, frequency: number, t: number, dur: number) => {
    const o = new OscillatorNode(ctx, { type, frequency })
    o.frequency.setValueAtTime(frequency, t)
    o.start(t)
    o.stop(t + dur)
    return o
  }
  const pan = (value: number) => new StereoPannerNode(ctx, { pan: clampPan(value) })
  const lowpass = (frequency: number, Q = 0.7) => new BiquadFilterNode(ctx, { type: "lowpass", frequency, Q })

  /**
   * A point source moving around the listener (HRTF). `path(p)` gives
   * [angle°, distance, elevation°] for p in 0..1 — 0° ahead, 90° right,
   * 180° behind; elevation 90° overhead, −90° below.
   */
  const around = (
    t: number,
    dur: number,
    path: (p: number) => readonly [number, number] | readonly [number, number, number]
  ) => {
    const p = new PannerNode(ctx, { panningModel: "HRTF", distanceModel: "inverse", refDistance: 1, rolloffFactor: 1 })
    const n = 128
    const xs = new Float32Array(n)
    const ys = new Float32Array(n)
    const zs = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      const [deg, dist, elev = 0] = path(i / (n - 1))
      const a = (deg * Math.PI) / 180
      const e = (elev * Math.PI) / 180
      xs[i] = Math.sin(a) * Math.cos(e) * dist
      ys[i] = Math.sin(e) * dist
      zs[i] = -Math.cos(a) * Math.cos(e) * dist
    }
    p.positionX.setValueCurveAtTime(xs, t, dur)
    p.positionY.setValueCurveAtTime(ys, t, dur)
    p.positionZ.setValueCurveAtTime(zs, t, dur)
    return p
  }

  /**
   * "8D": a source circling the listener — `turns` revolutions from angle
   * `from`, drifting up by `rise`° and swaying ±`sway`° in height.
   */
  const orbit = (
    t: number,
    dur: number,
    { turns = 1, from = 0, dist = 1.6, rise = 0, sway = 0 }: { turns?: number; from?: number; dist?: number; rise?: number; sway?: number }
  ) => around(t, dur, (p) => [from + 360 * turns * p, dist, rise * p + sway * Math.sin(3 * Math.PI * p)])

  /** A source fixed at [angle°, elevation°], for `dur` seconds. */
  const at = (t: number, dur: number, deg: number, elev: number, dist = 1.3) => around(t, dur, () => [deg, dist, elev])

  // ------------------------------------------------------------ FrameON voices (D)

  /** Dmaj9 opening up. */
  function chord(t: number, level = 0.16) {
    const lp = lowpass(500)
    lp.frequency.setValueAtTime(500, t)
    lp.frequency.exponentialRampToValueAtTime(3200, t + 1.4)
    lp.frequency.exponentialRampToValueAtTime(1200, t + 3.6)
    const g = gain()
    env(g.gain, t, [[0.7, level]])
    g.gain.setTargetAtTime(0.0001, t + 1.6, 0.6)
    lp.connect(g)
    send(g, 1, 0.8, 0, room)
    ;[50, 57, 64, 66, 73].forEach((note, i) => {
      for (const cents of [-3, 3]) {
        const o = osc(i < 2 ? "triangle" : "sine", hz(note), t, 5)
        o.detune.value = cents
        o.connect(gain(0.1)).connect(lp)
      }
    })
  }

  /** Soft low hit. */
  function thump(t: number, level = 0.5) {
    const o = osc("sine", 120, t, 0.7)
    o.frequency.exponentialRampToValueAtTime(46, t + 0.32)
    const g = gain()
    env(g.gain, t, [
      [0.012, level],
      [0.6, 0.0001],
    ])
    o.connect(g).connect(glue)
  }

  /** Filtered air, left to right. */
  function air(t: number, dur: number, level = 0.22) {
    const bp = new BiquadFilterNode(ctx, { type: "bandpass", Q: 1.4 })
    bp.frequency.setValueAtTime(600, t)
    bp.frequency.exponentialRampToValueAtTime(6500, t + dur)
    const g = gain()
    env(g.gain, t, [
      [dur * 0.45, level],
      [dur, 0.0001],
    ])
    const p = pan(-0.7)
    p.pan.setValueAtTime(-0.7, t)
    p.pan.linearRampToValueAtTime(0.7, t + dur)
    noise("white", t, dur + 0.05).connect(bp).connect(g).connect(p)
    send(p, 1, 0.5, 0, room)
  }

  // ------------------------------------------------------------ shared: struck metal

  /** A bell at stereo `place` (-1…1): inharmonic partials of a struck bar, a stereo pair, sparkles. */
  function bell(
    t: number,
    notes: readonly number[],
    level: number,
    place: number,
    { big = false, hallSend = true, spot }: { big?: boolean; hallSend?: boolean; spot?: readonly [number, number] } = {}
  ) {
    const r = seeded((notes[0] ?? 0) + (big ? 100 : 0))
    const stretch = big ? 1.35 : 1
    const space = hallSend ? hall : room
    // A point in 3D (angle°, elevation°) instead of a stereo place. Every
    // partial meets in it, so it is sent on once — not once per partial.
    const point = spot ? at(t, 6, spot[0], spot[1]) : null
    if (point) send(point, 0.6, 0.6, big ? 0.3 : 0.12, space)
    notes.forEach((note, n) => {
      const s = t + n * 0.03
      const partials: readonly (readonly [number, number, number])[] = hallSend
        ? [
            [1, 1, 2.6],
            [2, 0.35, 1.6],
            [2.76, 0.5, 1.4],
            [4.07, 0.2, 0.9],
            [5.4, 0.22, 0.7],
            [8.93, 0.1, 0.35],
          ]
        : [
            [1, 1, 1.8],
            [2.76, 0.45, 1.1],
            [5.4, 0.22, 0.6],
            [8.93, 0.1, 0.3],
          ]
      for (const [ratio, amp, decay] of partials) {
        for (const side of [-1, 1]) {
          const o = osc("sine", hz(note) * ratio, s, decay * stretch + 0.05)
          o.detune.value = side * 2
          const g = gain()
          env(g.gain, s, [
            [0.003, (level * amp) / 2],
            [decay * stretch, 0.0001],
          ])
          if (point) o.connect(g).connect(point)
          else send(o.connect(g).connect(pan(place + side * 0.25)), 0.6, 0.6, hallSend ? (big ? 0.3 : 0.12) : 0, space)
        }
      }
    })
    // Glitter: E/D major pentatonic two octaves above the bell.
    const glitter = hallSend ? [100, 102, 104, 107, 109] : [98, 100, 102, 105, 107]
    for (let i = 0; i < (big ? 10 : 6); i++) {
      const s = t + 0.02 + i * 0.04 + r() * 0.02
      const g = gain()
      env(g.gain, s, [
        [0.003, level * 0.1 * (1 - i / 12)],
        [0.18, 0.0001],
      ])
      const note = glitter[Math.floor(r() * glitter.length)] ?? 100
      const voice = osc("sine", hz(note), s, 0.2).connect(g)
      if (point) voice.connect(point)
      else send(voice.connect(pan(place + (r() - 0.5) * 1.2)), 0.5, 0.6, 0, space)
    }
  }

  // ------------------------------------------------------------ FrameX voices (E)

  // E major: E · F♯ · G♯ · B · C♯ · D♯ (MIDI).
  const E2 = 40, B2 = 47, E3 = 52, B3 = 59, E4 = 64, Gs4 = 68, B4 = 71, Ds5 = 75, E5 = 76, Fs5 = 78, B5 = 83, E6 = 88, B6 = 95, E7 = 100
  const CHORD = [E2, B2, E3, B3, E4, Gs4, B4, Ds5, E5, Fs5, B5, E6, B3, E4]

  /** 4DX: rumble felt in the seat, with a tremor that grows. Cut 90 ms before `hit`. */
  function rumble(t: number, hit: number, level = 0.9) {
    const end = hit - 0.09
    const trem = gain(0.6)
    const lfo = osc("sine", 6.5, t, end - t + 0.2)
    lfo.frequency.linearRampToValueAtTime(9, end)
    const depth = gain(0)
    depth.gain.setValueAtTime(0.05, t)
    depth.gain.linearRampToValueAtTime(0.4, end)
    lfo.connect(depth).connect(trem.gain)
    const g = gain()
    env(g.gain, t, [[end - t, level]])
    g.gain.setTargetAtTime(0.0001, end, 0.012)
    noise("brown", t, end - t + 0.2).connect(lowpass(110)).connect(trem).connect(g)
    send(g, 1, 0.12)
    // The sub under it, rising a little; saturated, its harmonics carry on small speakers.
    const sub = osc("sine", 34, t, end - t + 0.2)
    sub.frequency.exponentialRampToValueAtTime(43, end)
    const sg = gain()
    env(sg.gain, t, [[end - t, level * 0.45]])
    sg.gain.setTargetAtTime(0.0001, end, 0.012)
    sub.connect(sg)
    send(sg)
    sg.connect(shaper(4)).connect(lowpass(700)).connect(gain(0.18)).connect(glue)
  }

  /** Riser circling in from behind-left to straight ahead; cut 90 ms before `hit`. */
  function riser(t: number, hit: number, level = 0.32) {
    const end = hit - 0.09
    const dur = end - t
    const src = noise("white", t, dur + 0.2)
    const hp = new BiquadFilterNode(ctx, { type: "highpass", Q: 0.7 })
    hp.frequency.setValueAtTime(350, t)
    hp.frequency.exponentialRampToValueAtTime(7000, end)
    const bp = new BiquadFilterNode(ctx, { type: "bandpass", Q: 5 })
    bp.frequency.setValueAtTime(700, t)
    bp.frequency.exponentialRampToValueAtTime(8000, end)
    const g = gain()
    env(g.gain, t, [
      [dur * 0.6, level * 0.25],
      [dur, level],
    ])
    g.gain.setTargetAtTime(0.0001, end, 0.01)
    src.connect(hp).connect(g)
    src.connect(bp).connect(gain(0.6)).connect(g)
    const pos = g.connect(around(t, dur, (p) => [180 + 180 * p, 2.4 - 1.4 * p, -35 + 45 * p]))
    send(pos, 1, 0.25)
  }

  /** Pitches drifting from everywhere into one wide chord that lands on `hit`. */
  function converge(t: number, hit: number, level = 0.2) {
    const r = seeded(42)
    const lp = lowpass(300, 0.9)
    lp.frequency.setValueAtTime(300, t)
    lp.frequency.exponentialRampToValueAtTime(3800, hit - 0.1)
    lp.frequency.setValueAtTime(6500, hit)
    lp.frequency.exponentialRampToValueAtTime(900, hit + 3.2)
    const g = gain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(level * 0.55, hit - 0.1)
    g.gain.setTargetAtTime(0.0001, hit - 0.09, 0.012) // suck-in
    g.gain.setValueAtTime(0.0001, hit)
    g.gain.linearRampToValueAtTime(level, hit + 0.02)
    g.gain.exponentialRampToValueAtTime(level * 0.3, hit + 2)
    g.gain.exponentialRampToValueAtTime(0.0001, hit + 4.6)
    lp.connect(g)
    send(g, 0.8, 0.6)
    for (const note of CHORD) {
      const o = osc("sawtooth", 160 + r() * 260, t, hit - t + 5)
      o.frequency.exponentialRampToValueAtTime(hz(note), hit - 0.12)
      o.detune.value = (r() - 0.5) * 14
      o.connect(gain(1 / CHORD.length))
        .connect(pan((r() * 2 - 1) * 0.9))
        .connect(lp)
    }
  }

  /** The hit: transient, boom, sub drop, warm brass, aftershock. */
  function impact(t: number, level = 1, { brass = 1, after = 1 } = {}) {
    const tg = gain()
    env(tg.gain, t, [
      [0.002, 0.7 * level],
      [0.04, 0.0001],
    ])
    noise("white", t, 0.06).connect(new BiquadFilterNode(ctx, { type: "highpass", frequency: 1500 })).connect(tg)
    send(tg, 1, 0.35)

    const bg = gain()
    env(bg.gain, t, [
      [0.005, level],
      [1.1, 0.0001],
    ])
    noise("brown", t, 1.2).connect(lowpass(150, 1)).connect(bg)
    send(bg, 1, 0.15)

    // Sub drop: felt more than heard; the saturated copy is what phones play.
    const sub = osc("sine", 92, t, 3.4)
    sub.frequency.exponentialRampToValueAtTime(29, t + 1.6)
    const sg = gain()
    env(sg.gain, t, [
      [0.01, 0.95 * level],
      [3.2, 0.0001],
    ])
    sub.connect(sg)
    send(sg)
    sg.connect(shaper(3)).connect(lowpass(900)).connect(gain(0.22)).connect(glue)

    if (brass) {
      const lp = lowpass(220, 1.2)
      lp.frequency.setValueAtTime(220, t)
      lp.frequency.exponentialRampToValueAtTime(2600, t + 0.08)
      lp.frequency.exponentialRampToValueAtTime(650, t + 1.8)
      const g = gain()
      env(g.gain, t, [
        [0.03, 0.28 * brass * level],
        [3.4, 0.0001],
      ])
      for (const [note, cents] of [
        [E2, 0],
        [E2, 8],
        [B2, -8],
        [B2, 5],
        [E3, 6],
        [E3, -4],
      ] as const) {
        const o = osc("sawtooth", hz(note), t, 3.6)
        o.detune.value = cents
        o.connect(gain(1 / 6)).connect(lp)
      }
      lp.connect(shaper(1.6)).connect(g)
      send(g, 0.9, 0.55)
    }

    if (after) {
      // Aftershock: the seat keeps shaking for a moment.
      const trem = gain(0.5)
      osc("sine", 9, t, 1.6).connect(gain(0.5)).connect(trem.gain)
      const ag = gain()
      env(ag.gain, t, [
        [0.05, 0.55 * after * level],
        [1.4, 0.0001],
      ])
      noise("brown", t, 1.6).connect(lowpass(70)).connect(trem).connect(ag)
      send(ag)
    }
  }

  /**
   * Harp glissando up the E major pentatonic, left to right like the letters;
   * `arc`: in 3D, rising from front-left over the head to front-right.
   */
  function harp(t: number, dur = 0.55, level = 0.16, arc = false) {
    const notes = [E5, Fs5, 80, B5, 85, E6, 90, 92, B6, 97, E7]
    notes.forEach((note, i) => {
      const s = t + (dur * i) / (notes.length - 1)
      const decay = 1.8 - i * 0.09
      const g = gain()
      env(g.gain, s, [
        [0.003, level * (0.7 + i * 0.03)],
        [decay, 0.0001],
      ])
      const lp = lowpass(5200)
      osc("triangle", hz(note), s, decay + 0.1).connect(lp)
      osc("sine", hz(note) * 2, s, decay + 0.1)
        .connect(gain(0.25))
        .connect(lp)
      const k = i / (notes.length - 1)
      const p = lp
        .connect(g)
        .connect(arc ? at(s, decay + 0.2, -70 + 140 * k, -10 + 60 * Math.sin(Math.PI * k)) : pan(-0.7 + 1.4 * k))
      send(p, 1, 0.7)
    })
  }

  /** Crystal air: a high cluster that breathes, mostly reverb; `swirl`: each voice circles the head (8D). */
  function shimmer(t: number, dur: number, level = 0.035, swirl = false) {
    const r = seeded(5)
    for (const [k, note] of [E6, 92, B6, 99, 102].entries()) {
      const trem = gain(0.7)
      osc("sine", 3.1 + r() * 2.2, t, dur + 0.2)
        .connect(gain(0.3))
        .connect(trem.gain)
      const g = gain()
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(level, t + 1.2)
      g.gain.setValueAtTime(level, t + dur - 2.4)
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
      const p = osc("sine", hz(note), t, dur + 0.2)
        .connect(trem)
        .connect(g)
        .connect(
          swirl
            ? orbit(t, dur, { turns: (k % 2 ? -1 : 1) * (1.2 + k * 0.25), from: k * 72, dist: 1.5, sway: 25 })
            : pan((r() * 2 - 1) * 0.8)
        )
      send(p, 0.3, 1)
    }
  }

  /** The band of light: air and a metallic sheen passing in front, left to right. */
  function sweep(t: number, dur: number, level = 0.42) {
    const airBand = new BiquadFilterNode(ctx, { type: "bandpass", Q: 1.6 })
    airBand.frequency.setValueAtTime(500, t)
    airBand.frequency.exponentialRampToValueAtTime(6000, t + dur * 0.6)
    airBand.frequency.exponentialRampToValueAtTime(2600, t + dur)
    const sheen = new BiquadFilterNode(ctx, { type: "bandpass", Q: 9 })
    sheen.frequency.setValueAtTime(1800, t)
    sheen.frequency.exponentialRampToValueAtTime(5200, t + dur * 0.5)
    sheen.frequency.exponentialRampToValueAtTime(3600, t + dur) // the drop as it passes: a hint of Doppler
    const g = gain()
    env(g.gain, t, [
      [dur * 0.45, level],
      [dur, 0.0001],
    ])
    const src = noise("white", t, dur + 0.1)
    src.connect(airBand).connect(g)
    src.connect(sheen).connect(gain(0.5)).connect(g)
    const pos = g.connect(around(t, dur, (p) => [-75 + 150 * p, 1.9 - 1.1 * Math.sin(Math.PI * p)]))
    send(pos, 1, 0.25)
  }

  /** A warm Emaj9 that settles everything. */
  function resolve(t: number, dur = 4.2, level = 0.075) {
    const lp = lowpass(1700, 0.5)
    const g = gain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(level, t + 0.6)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    ;[E3, B3, 63, 66, Gs4, B4].forEach((note, i) => {
      for (const cents of [-4, 4]) {
        const o = osc(i < 2 ? "triangle" : "sine", hz(note), t, dur + 0.1)
        o.detune.value = cents
        o.connect(gain(1 / 12)).connect(lp)
      }
    })
    lp.connect(g)
    send(g, 0.7, 0.8)
  }

  // ------------------------------------------------------------ FrameX theatre intro: the long build and the long ring

  /** Pressure: a low fifth (31 + 46.5 Hz) swelling out of silence under the build. Cut at `end`. */
  function pressure(t: number, end: number, level = 0.5) {
    for (const [f, a] of [
      [31, 1],
      [46.5, 0.55],
    ] as const) {
      const g = gain()
      env(g.gain, t, [[end - t, level * a]])
      g.gain.setTargetAtTime(0.0001, end, 0.01)
      osc("sine", f, t, end - t + 0.1).connect(g)
      send(g)
      // What small speakers can play of it — soft, so it reads as weight, not hum.
      g.connect(shaper(2.5)).connect(lowpass(280)).connect(gain(0.12)).connect(glue)
    }
  }

  /** A heartbeat: lub-dub, low, dry and centred. */
  function heartbeat(t: number, level: number) {
    for (const [dt, l, f] of [
      [0, 1, 78],
      [0.17, 0.6, 66],
    ] as const) {
      const o = osc("sine", f, t + dt, 0.45)
      o.frequency.exponentialRampToValueAtTime(38, t + dt + 0.18)
      const g = gain()
      env(g.gain, t + dt, [
        [0.008, level * l],
        [0.35, 0.0001],
      ])
      o.connect(g)
      send(g, 1, 0.08)
      g.connect(shaper(3)).connect(lowpass(600)).connect(gain(0.25)).connect(glue)
    }
  }

  /**
   * Shepard–Risset glissando: octaves climbing without end, each faded in
   * and out along the spectrum so none is heard arriving — tension that only
   * the hit releases. It circles the listener once on the way. Cut at `end`.
   */
  function shepard(t: number, end: number, level = 0.12) {
    const dur = end - t
    const voices = 7
    const n = 256
    const bus = gain()
    env(bus.gain, t, [[dur - 0.02, level]])
    bus.gain.setTargetAtTime(0.0001, end, 0.01)
    send(bus.connect(orbit(t, dur, { turns: 1, from: 180, dist: 1.8, rise: 30 })), 1, 0.35)
    for (let k = 0; k < voices; k++) {
      const freqs = new Float32Array(n)
      const amps = new Float32Array(n)
      for (let i = 0; i < n; i++) {
        // 1.5 octaves up over the build; the Gaussian hides each voice's wrap at the edges.
        const octave = (k + (1.5 * i) / (n - 1)) % voices
        freqs[i] = 40 * 2 ** octave
        amps[i] = Math.exp(-((octave - voices / 2) ** 2) / 2.2) / 3
      }
      const o = new OscillatorNode(ctx, { type: "triangle" })
      o.frequency.setValueCurveAtTime(freqs, t, dur)
      const g = new GainNode(ctx, { gain: 0 })
      g.gain.setValueCurveAtTime(amps, t, dur)
      o.connect(g).connect(bus)
      o.start(t)
      o.stop(end + 0.1)
    }
  }

  /** The hall's own tail, backwards: the room breathing in before the hit. Ends at `end`. */
  function reverseSwell(end: number, dur = 2, level = 0.45) {
    const ir = hall().buffer
    if (!ir) return
    const skip = Math.floor(rate * 0.04) // past the pre-delay and early reflections
    const len = Math.min(ir.length - skip, Math.floor(rate * dur))
    const buffer = ctx.createBuffer(2, len, rate)
    for (let c = 0; c < 2; c++) {
      const from = ir.getChannelData(c)
      const to = buffer.getChannelData(c)
      let peak = 0
      for (let i = 0; i < len; i++) peak = Math.max(peak, Math.abs((to[i] = from[skip + len - 1 - i] ?? 0)))
      for (let i = 0; i < len; i++) to[i] = (to[i] ?? 0) / (peak || 1)
    }
    const t = end - len / rate
    const lp = lowpass(700)
    lp.frequency.setValueAtTime(700, t)
    lp.frequency.exponentialRampToValueAtTime(9000, end)
    const g = gain()
    env(g.gain, t, [[len / rate, level]])
    g.gain.setTargetAtTime(0.0001, end, 0.008)
    const source = new AudioBufferSourceNode(ctx, { buffer })
    source.connect(new BiquadFilterNode(ctx, { type: "highpass", frequency: 180 })).connect(lp).connect(g)
    send(g)
    source.start(t)
  }

  /** What rings on after the hit: a sub you feel for seconds, and a gong that swells and circles the room. */
  function bloom(t: number, level = 1) {
    const sub = gain()
    env(sub.gain, t, [
      [0.05, 0.3 * level],
      [4.8, 0.0001],
    ])
    osc("sine", hz(28), t, 5).connect(sub) // E1
    send(sub)
    sub.connect(shaper(3)).connect(lowpass(700)).connect(gain(0.12)).connect(glue)

    const r = seeded(77)
    const bus = gain()
    env(bus.gain, t, [
      [0.45, 0.08 * level],
      [6.5, 0.0001],
    ])
    send(bus.connect(orbit(t, 6.5, { turns: 0.75, from: -40, dist: 1.4, rise: 15, sway: 10 })), 0.7, 0.8)
    // Tam-tam: inharmonic partials over E2, each beating slowly.
    ;[1, 1.47, 2.09, 2.56, 3.18, 3.98, 4.82, 5.71].forEach((ratio, i) => {
      const o = osc("sine", hz(E2) * ratio, t, 7)
      o.detune.value = (r() - 0.5) * 8
      const trem = gain(0.8)
      osc("sine", 0.7 + r() * 1.5, t, 7)
        .connect(gain(0.2))
        .connect(trem.gain)
      o.connect(trem)
        .connect(gain(1 / (1 + i * 0.6)))
        .connect(bus)
    })
  }

  /** A wordless choir ("aah"): sawtooth voices through vowel formants, two halves circling the head. */
  function choir(t: number, dur: number, level = 0.07) {
    const notes = [E3, B3, 63, 66, Gs4, B4] // Emaj9
    for (const side of [-1, 1]) {
      const bus = gain()
      bus.gain.setValueAtTime(0.0001, t)
      bus.gain.exponentialRampToValueAtTime(level, t + 1.6)
      bus.gain.setValueAtTime(level, t + dur - 2.6)
      bus.gain.exponentialRampToValueAtTime(0.0001, t + dur)
      send(bus.connect(orbit(t, dur, { turns: side * 0.5, from: side * 70, dist: 1.5, sway: 15 })), 0.6, 1)
      const voices = gain()
      const vibrato = osc("sine", 4.6 + side * 0.4, t, dur + 0.1).connect(gain(6))
      for (const note of notes) {
        for (const cents of [-7, 0, 7]) {
          const o = osc("sawtooth", hz(note), t, dur + 0.1)
          o.detune.value = cents + side * 3
          vibrato.connect(o.detune)
          o.connect(gain(1 / (notes.length * 3))).connect(voices)
        }
      }
      // Formants of an open "a".
      for (const [f, a, Q] of [
        [800, 1, 6],
        [1150, 0.6, 8],
        [2900, 0.25, 10],
      ] as const) {
        voices.connect(new BiquadFilterNode(ctx, { type: "bandpass", frequency: f, Q })).connect(gain(a * 2)).connect(bus)
      }
    }
  }

  // ------------------------------------------------------------ cues

  const D6 = 86
  const A6 = 93
  const cues: Record<LogoSoundCue, (t: number) => void> = {
    // Timed on the FrameON entrance: the play button lands at 0.68 s, the name slides in, "ON" lights up at 1.35 s.
    "frameon-intro": (t) => {
      chord(t)
      thump(t + 0.68)
      air(t + 0.5, 1.2, 0.14)
      bell(t + 1.35, [D6], 0.16, -0.2, { hallSend: false })
      bell(t + 1.55, [A6], 0.2, 0.35, { hallSend: false })
    },
    // Timed on `entrance="intro" shine flare glow`: a 2.4 s build, the hit at 3.13 s
    // as the play button lands, light loops from 3.9 s, glints at 4.67 s and 5.57 s.
    "framex-intro": (t) => {
      const hit = t + 3.13
      // Build: pressure, a quickening heartbeat, a rise that never arrives.
      pressure(t, hit - 0.12, 0.35)
      ;[0.35, 1.25, 1.95, 2.45, 2.8].forEach((at, i) => heartbeat(t + at, 0.16 + i * 0.08))
      shepard(t + 0.5, hit - 0.12, 0.2)
      converge(t + 0.9, hit, 0.2)
      riser(t + 1.3, hit, 0.26)
      rumble(t + 1.5, hit, 0.7)
      reverseSwell(hit - 0.12, 2, 0.3)
      hold(hit - 0.15, hit)
      // The hit, and what rings on.
      impact(hit)
      bloom(hit)
      // Luxe, all around the listener.
      harp(hit + 0.09, 0.55, 0.12, true)
      shimmer(hit + 0.07, 7, 0.035, true)
      choir(hit + 0.35, 7.5, 0.35)
      sweep(t + 3.9, 1.9, 0.32)
      bell(t + 4.67, [E6], 0.2, -0.35, { spot: [-40, -20] })
      bell(t + 5.57, [B6, E7], 0.24, 0.4, { big: true, spot: [40, 30] })
      resolve(t + 5.5, 5, 0.1)
    },
    "framex-reveal": (t) => {
      const hit = t + 0.73
      riser(t, hit, 0.2)
      impact(hit, 0.65, { brass: 0.6, after: 0 })
      harp(t + 0.82, 0.5, 0.12)
      shimmer(t + 0.8, 3.2, 0.025)
    },
    // Timed on the hover pass: glints at 0.775 s and 1.425 s.
    "framex-hover": (t) => {
      sweep(t, 1.6, 0.2)
      bell(t + 0.775, [E6], 0.09, -0.35)
      bell(t + 1.425, [B6, E7], 0.11, 0.4, { big: true })
    },
  }

  return {
    output,
    play: (cue, at = ctx.currentTime + 0.05) => cues[cue](at),
    warm: () => {
      hall()
      room()
      noiseBuffer("white")
      noiseBuffer("brown")
    },
  }
}

export { createLogoSound, type LogoSoundCue, type LogoSoundEngine, type LogoSoundOptions }
