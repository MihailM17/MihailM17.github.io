import { createUISFX, type CueName, type PackName, type UISFXPlayer } from 'uisfx';

// ============================================================================
// Site Sound Engine — uisfx tactile cues + custom analog cinematic drone
// Singleton persisted across Astro ClientRouter transitions.
// ============================================================================

type Listener = (droneActive: boolean) => void;

class SiteSoundEngine {
  private ui: UISFXPlayer | null = null;
  private unlocked = false;

  // Cinematic ambient drone nodes
  private droneCtx: AudioContext | null = null;
  private droneMaster: GainNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private droneActive = false;
  private droneDucking = false;
  private listeners = new Set<Listener>();
  private visibilityBound = false;

  private ensureUI(): UISFXPlayer | null {
    if (typeof window === 'undefined') return null;
    if (!this.ui) {
      this.ui = createUISFX({
        pack: 'studio',
        volume: 0.42,
        maxVoices: 6,
      });
    }
    return this.ui;
  }

  private async unlockUI() {
    const ui = this.ensureUI();
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
  // Cinematic Darkroom Ambient Drone (Web Audio API, zero external assets)
  // Warm D1/D2/A2/F3 open cinematic voicing with slow 24s breathing filter LFO.
  // Automatically ducks when the visitor switches tabs (e.g. watching YouTube).
  // --------------------------------------------------------------------------
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

  private bindVisibility() {
    if (this.visibilityBound || typeof document === 'undefined') return;
    this.visibilityBound = true;
    document.addEventListener('visibilitychange', () => {
      if (!this.droneActive || !this.droneCtx || !this.droneMaster) return;
      const now = this.droneCtx.currentTime;
      const gain = this.droneMaster.gain;
      gain.cancelScheduledValues(now);
      gain.setValueAtTime(gain.value, now);
      if (document.hidden) {
        this.droneDucking = true;
        gain.linearRampToValueAtTime(0.0001, now + 0.8);
      } else if (this.droneDucking) {
        this.droneDucking = false;
        this.droneCtx.resume().catch(() => {});
        gain.linearRampToValueAtTime(0.14, now + 1.6);
      }
    });
  }

  private buildDroneGraph(ctx: AudioContext) {
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, ctx.currentTime);

    // Warm dual-stage lowpass for silky cinema darkroom tone
    const lp1 = ctx.createBiquadFilter();
    lp1.type = 'lowpass';
    lp1.frequency.setValueAtTime(240, ctx.currentTime);
    lp1.Q.value = 1.4;

    const lp2 = ctx.createBiquadFilter();
    lp2.type = 'lowpass';
    lp2.frequency.setValueAtTime(420, ctx.currentTime);
    lp2.Q.value = 0.7;

    lp1.connect(lp2);
    lp2.connect(master);
    master.connect(ctx.destination);

    // Subtle organic breathing LFO modulating filter cutoff (24s cycle)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 0.042;
    lfoGain.gain.value = 68;
    lfo.connect(lfoGain);
    lfoGain.connect(lp1.frequency);
    lfo.start();

    // Layered cinematic voices: deep D1 sub, warm D2 pair, open A2 fifth, whisper F3 color
    const voices: { freq: number; type: OscillatorType; gain: number; detune: number }[] = [
      { freq: 36.71, type: 'sine', gain: 0.42, detune: 0 },        // D1 sub foundation
      { freq: 73.42, type: 'triangle', gain: 0.28, detune: -4 },   // D2 warm body A
      { freq: 73.42, type: 'sawtooth', gain: 0.09, detune: 5 },    // D2 analog richness B
      { freq: 110.0, type: 'triangle', gain: 0.16, detune: -3 },   // A2 cinematic fifth
      { freq: 146.83, type: 'sine', gain: 0.1, detune: 6 },        // D3 gentle octave air
      { freq: 174.61, type: 'sine', gain: 0.045, detune: -5 },     // F3 subtle melancholic hue
    ];

    for (const v of voices) {
      const osc = ctx.createOscillator();
      const vGain = ctx.createGain();
      osc.type = v.type;
      osc.frequency.value = v.freq;
      osc.detune.value = v.detune;
      vGain.gain.value = v.gain;
      osc.connect(vGain);
      vGain.connect(lp1);
      osc.start();
    }

    // Ultra-subtle warm analog room tone / tape air
    const bufferLen = ctx.sampleRate * 4;
    const noiseBuf = ctx.createBuffer(1, bufferLen, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < bufferLen; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02; // gentle brown-noise smoothing
      data[i] = last * 2.2;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf;
    noise.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 180;
    noiseFilter.Q.value = 0.7;

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.07;

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);
    noise.start();

    this.droneMaster = master;
    this.droneFilter = lp1;
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
    this.droneDucking = false;

    const now = this.droneCtx.currentTime;
    const gain = this.droneMaster!.gain;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(Math.max(0.0001, gain.value), now);
    gain.exponentialRampToValueAtTime(0.14, now + 2.2);

    this.play('toggle-on', { pack: 'cinematic', volume: 0.28, cooldownMs: 120 });
    this.emit();
  }

  stopDrone() {
    if (!this.droneActive || !this.droneCtx || !this.droneMaster) return;
    this.droneActive = false;
    this.droneDucking = false;

    const now = this.droneCtx.currentTime;
    const gain = this.droneMaster.gain;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(Math.max(0.0001, gain.value), now);
    gain.exponentialRampToValueAtTime(0.0001, now + 1.0);

    this.play('toggle-off', { pack: 'studio', volume: 0.25, cooldownMs: 120 });
    this.emit();
  }

  async toggleDrone() {
    if (this.droneActive) {
      this.stopDrone();
    } else {
      await this.startDrone();
    }
  }

  // Gentle filter bloom when switching discs while the ambient drone is active
  pulseDrone() {
    if (!this.droneActive || !this.droneCtx || !this.droneFilter || this.droneDucking) return;
    const now = this.droneCtx.currentTime;
    const f = this.droneFilter.frequency;
    f.cancelScheduledValues(now);
    f.setValueAtTime(Math.max(180, f.value), now);
    f.linearRampToValueAtTime(380, now + 0.45);
    f.exponentialRampToValueAtTime(240, now + 2.4);
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
