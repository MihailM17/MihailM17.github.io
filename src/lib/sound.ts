import type { CueName, PackName, UISFXPlayer } from 'uisfx';

// ============================================================================
// Site Sound Engine — lazy-loaded uisfx tactile cues + custom analog cinematic drone
// Singleton persisted across Astro ClientRouter transitions.
// ============================================================================

type Listener = (droneActive: boolean) => void;

class SiteSoundEngine {
  private ui: UISFXPlayer | null = null;
  private uiLoading: Promise<UISFXPlayer | null> | null = null;
  private unlocked = false;

  // Warm cinematic ambient soundscape nodes
  private droneCtx: AudioContext | null = null;
  private droneMaster: GainNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private chimeInput: GainNode | null = null;
  private chimeTimer: ReturnType<typeof setTimeout> | null = null;
  private lastNoteIdx = -1;
  private droneActive = false;
  private tabDucking = false;
  private videoDucking = false;
  private listeners = new Set<Listener>();
  private visibilityBound = false;

  private async ensureUI(): Promise<UISFXPlayer | null> {
    if (typeof window === 'undefined') return null;
    if (this.ui) return this.ui;
    if (!this.uiLoading) {
      this.uiLoading = import('uisfx')
        .then(({ createUISFX }) => {
          this.ui = createUISFX({
            pack: 'studio',
            volume: 0.42,
            maxVoices: 6,
          });
          return this.ui;
        })
        .catch(() => null);
    }
    return this.uiLoading;
  }

  private async unlockUI() {
    const ui = await this.ensureUI();
    if (!ui) return null;
    if (!this.unlocked) {
      try {
        await ui.unlock();
        this.unlocked = true;
      } catch {
        // Ignore autoplay restrictions before user gesture
      }
    }
    return ui;
  }

  play(cue: CueName, opts?: { pack?: PackName; volume?: number; cooldownMs?: number }) {
    if (typeof window === 'undefined') return;
    this.unlockUI().then((ui) => {
      if (!ui) return;
      try {
        ui.setPack(opts?.pack ?? 'studio');
        ui.play(cue, {
          volume: opts?.volume ?? 0.36,
          cooldownMs: opts?.cooldownMs,
        });
      } catch {}
    });
  }

  // Semantic helpers tailored to the portfolio
  playCdLoad() {
    this.play('drag-start', { pack: 'mechanical', volume: 0.42, cooldownMs: 80 });
    this.pulseDrone();
  }

  playCdDock() {
    this.play('snap', { pack: 'mechanical', volume: 0.48, cooldownMs: 60 });
  }

  playCdReturn() {
    this.play('drop', { pack: 'mechanical', volume: 0.38, cooldownMs: 80 });
  }

  playFilter() {
    this.play('select', { pack: 'studio', volume: 0.3, cooldownMs: 60 });
  }

  playOpen() {
    this.play('open', { pack: 'studio', volume: 0.32, cooldownMs: 100 });
  }

  playClose() {
    this.play('close', { pack: 'studio', volume: 0.28, cooldownMs: 100 });
  }

  playStep(dir: -1 | 1) {
    this.play(dir > 0 ? 'forward' : 'back', { pack: 'studio', volume: 0.26, cooldownMs: 60 });
  }

  playCopy() {
    this.play('copy', { pack: 'studio', volume: 0.38, cooldownMs: 100 });
  }

  playSend() {
    this.play('send', { pack: 'cinematic', volume: 0.42, cooldownMs: 200 });
  }

  playSuccess() {
    this.play('success', { pack: 'studio', volume: 0.38, cooldownMs: 200 });
  }

  playError() {
    this.play('error', { pack: 'studio', volume: 0.34, cooldownMs: 200 });
  }

  // --------------------------------------------------------------------------
  // Warm Sunlit Cinema Ambient Soundscape (Web Audio API, zero external assets)
  // Open Cmaj9 / Lydian warm pad (no dark sub-bass or minor dissonance) paired
  // with soft, felt-piano-like generative harmonic swells and warm tape echo.
  // Automatically ducks when switching tabs OR playing an in-site video.
  // --------------------------------------------------------------------------
  private readonly AMBIENT_GAIN = 0.11;
  private readonly MELODY_NOTES = [
    329.63, // E4
    392.0,  // G4
    440.0,  // A4
    493.88, // B4
    587.33, // D5
    659.25, // E5
    783.99, // G5
  ];

  isDroneActive() {
    return this.droneActive;
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    fn(this.droneActive);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private emit() {
    this.listeners.forEach((fn) => fn(this.droneActive));
  }

  private isDucked() {
    return this.tabDucking || this.videoDucking;
  }

  private syncDuckGain(fadeOutSec = 0.65, fadeInSec = 1.4) {
    if (!this.droneActive || !this.droneCtx || !this.droneMaster) return;
    const now = this.droneCtx.currentTime;
    const gain = this.droneMaster.gain;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(Math.max(0.0001, gain.value), now);
    if (this.isDucked()) {
      gain.linearRampToValueAtTime(0.0001, now + fadeOutSec);
    } else {
      this.droneCtx.resume().catch(() => {});
      gain.linearRampToValueAtTime(this.AMBIENT_GAIN, now + fadeInSec);
    }
  }

  setVideoDucking(duck: boolean) {
    if (this.videoDucking === duck) return;
    this.videoDucking = duck;
    this.syncDuckGain(0.45, 1.3);
  }

  private bindVisibility() {
    if (this.visibilityBound || typeof document === 'undefined') return;
    this.visibilityBound = true;
    document.addEventListener('visibilitychange', () => {
      this.tabDucking = document.hidden;
      this.syncDuckGain(0.75, 1.5);
    });
  }

  private triggerSoftNote(freq?: number, level = 0.14) {
    if (!this.droneActive || this.isDucked() || !this.droneCtx || !this.chimeInput) return;
    const ctx = this.droneCtx;
    const now = ctx.currentTime;

    let chosenFreq = freq;
    if (!chosenFreq) {
      let idx = Math.floor(Math.random() * this.MELODY_NOTES.length);
      if (idx === this.lastNoteIdx) idx = (idx + 2) % this.MELODY_NOTES.length;
      this.lastNoteIdx = idx;
      chosenFreq = this.MELODY_NOTES[idx];
    }

    // Warm felt-piano / electric-piano harmonic pair (fundamental + gentle 2nd harmonic)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const env = ctx.createGain();
    const overtoneGain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(chosenFreq, now);
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(chosenFreq * 2, now);
    overtoneGain.gain.value = 0.08;

    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(level, now + 0.55);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 4.4);

    osc1.connect(env);
    osc2.connect(overtoneGain);
    overtoneGain.connect(env);
    env.connect(this.chimeInput);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 4.6);
    osc2.stop(now + 4.6);
  }

  private scheduleChime() {
    if (this.chimeTimer) clearTimeout(this.chimeTimer);
    if (!this.droneActive) return;
    const delayMs = 4200 + Math.random() * 2800;
    this.chimeTimer = setTimeout(() => {
      if (!this.droneActive) return;
      this.triggerSoftNote();
      this.scheduleChime();
    }, delayMs);
  }

  private buildDroneGraph(ctx: AudioContext) {
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, ctx.currentTime);

    // Gentle warm lowpass + soft high-shelf rolloff for luminous, airy editorial warmth
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(920, ctx.currentTime);
    padFilter.Q.value = 0.6;

    const warmthFilter = ctx.createBiquadFilter();
    warmthFilter.type = 'highpass';
    warmthFilter.frequency.setValueAtTime(95, ctx.currentTime); // keep out muddy sub-bass rumble

    warmthFilter.connect(padFilter);
    padFilter.connect(master);
    master.connect(ctx.destination);

    // Slow 18s sunlit breathing LFO modulating pad brightness
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 0.055;
    lfoGain.gain.value = 220;
    lfo.connect(lfoGain);
    lfoGain.connect(padFilter.frequency);
    lfo.start();

    // Luminous, uplifting Cmaj9 open voicing (no dark sub-bass, no minor third, no harsh sawtooth)
    const voices: { freq: number; type: OscillatorType; gain: number; detune: number }[] = [
      { freq: 130.81, type: 'sine', gain: 0.24, detune: -2 },     // C3 warm gentle root
      { freq: 196.0, type: 'sine', gain: 0.2, detune: 3 },        // G3 open fifth
      { freq: 246.94, type: 'sine', gain: 0.11, detune: -4 },     // B3 sunlit major 7th
      { freq: 293.66, type: 'triangle', gain: 0.075, detune: 4 }, // D4 warm major 9th
      { freq: 329.63, type: 'sine', gain: 0.095, detune: -3 },    // E4 uplifting major 3rd
      { freq: 392.0, type: 'sine', gain: 0.055, detune: 5 },      // G4 airy top shimmer
    ];

    for (const v of voices) {
      const osc = ctx.createOscillator();
      const vGain = ctx.createGain();
      osc.type = v.type;
      osc.frequency.value = v.freq;
      osc.detune.value = v.detune;
      vGain.gain.value = v.gain;
      osc.connect(vGain);
      vGain.connect(warmthFilter);
      osc.start();
    }

    // Soft analog tape-delay bus for gentle felt-piano ambient swells
    const chimeIn = ctx.createGain();
    chimeIn.gain.value = 0.85;

    const chimeTone = ctx.createBiquadFilter();
    chimeTone.type = 'lowpass';
    chimeTone.frequency.value = 1850;

    const delay = ctx.createDelay(1.2);
    delay.delayTime.value = 0.48;

    const delayFeedback = ctx.createGain();
    delayFeedback.gain.value = 0.34;

    const delayDamp = ctx.createBiquadFilter();
    delayDamp.type = 'lowpass';
    delayDamp.frequency.value = 1350;

    chimeIn.connect(chimeTone);
    chimeTone.connect(master);
    chimeTone.connect(delay);
    delay.connect(delayDamp);
    delayDamp.connect(master);
    delayDamp.connect(delayFeedback);
    delayFeedback.connect(delay);

    this.droneMaster = master;
    this.droneFilter = padFilter;
    this.chimeInput = chimeIn;
  }

  async startDrone() {
    if (typeof window === 'undefined' || this.droneActive) return;
    this.bindVisibility();

    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;

    if (!this.droneCtx) {
      try {
        this.droneCtx = new AudioCtx();
      } catch {
        return;
      }
    }
    if (this.droneCtx.state === 'suspended') {
      await this.droneCtx.resume().catch(() => {});
    }

    if (!this.droneMaster) {
      this.buildDroneGraph(this.droneCtx);
    }

    this.droneActive = true;
    this.tabDucking = document.hidden;

    const now = this.droneCtx.currentTime;
    const gain = this.droneMaster!.gain;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(Math.max(0.0001, gain.value), now);
    if (!this.isDucked()) {
      gain.exponentialRampToValueAtTime(this.AMBIENT_GAIN, now + 1.9);
    }

    this.play('toggle-on', { pack: 'studio', volume: 0.24, cooldownMs: 120 });
    // Greet gently with a single warm opening chime note
    setTimeout(() => this.triggerSoftNote(587.33, 0.12), 700);
    this.scheduleChime();
    this.emit();
  }

  stopDrone() {
    if (!this.droneActive || !this.droneCtx || !this.droneMaster) return;
    this.droneActive = false;
    if (this.chimeTimer) {
      clearTimeout(this.chimeTimer);
      this.chimeTimer = null;
    }

    const now = this.droneCtx.currentTime;
    const gain = this.droneMaster.gain;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(Math.max(0.0001, gain.value), now);
    gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

    this.play('toggle-off', { pack: 'studio', volume: 0.24, cooldownMs: 120 });
    this.emit();
  }

  async toggleDrone() {
    if (this.droneActive) {
      this.stopDrone();
    } else {
      await this.startDrone();
    }
  }

  // Gentle sunlit brightness bloom when switching discs while ambient music is active
  pulseDrone() {
    if (!this.droneActive || !this.droneCtx || !this.droneFilter || this.isDucked()) return;
    const now = this.droneCtx.currentTime;
    const f = this.droneFilter.frequency;
    f.cancelScheduledValues(now);
    f.setValueAtTime(Math.max(680, f.value), now);
    f.linearRampToValueAtTime(1420, now + 0.45);
    f.exponentialRampToValueAtTime(920, now + 2.2);
  }
}

declare global {
  interface Window {
    __SITE_SOUND__?: SiteSoundEngine;
  }
}

export function getSound(): SiteSoundEngine {
  if (typeof window !== 'undefined') {
    if (!window.__SITE_SOUND__) {
      window.__SITE_SOUND__ = new SiteSoundEngine();
    }
    return window.__SITE_SOUND__;
  }
  return new SiteSoundEngine();
}
