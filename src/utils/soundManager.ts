import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

let soundEnabled = true;
let webAudioCtx: any = null;

function getWebAudioContext() {
  if (Platform.OS !== 'web') return null;
  if (!webAudioCtx && typeof window !== 'undefined') {
    const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      webAudioCtx = new AudioCtx();
    }
  }
  if (webAudioCtx && webAudioCtx.state === 'suspended') {
    webAudioCtx.resume().catch(() => {});
  }
  return webAudioCtx;
}

function playSynthTone(freq: number, durationSec: number, slideFreq = 0, gainVal = 0.12) {
  try {
    const ctx = getWebAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    if (slideFreq !== 0) {
      osc.frequency.linearRampToValueAtTime(freq + slideFreq, ctx.currentTime + durationSec);
    }
    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSec);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + durationSec);
  } catch {}
}

export function setSoundEnabled(val: boolean) {
  soundEnabled = val;
}

let lastTickTime = 0;

export function playTickSound() {
  const now = Date.now();
  // Throttle ticks to max 14 per second so mobile CPU never stutters during roulette spin!
  if (now - lastTickTime < 70) return;
  lastTickTime = now;

  if (Platform.OS !== 'web') {
    Haptics.selectionAsync().catch(() => {});
  }
  if (!soundEnabled) return;
  playSynthTone(880, 0.025, -240, 0.08);
}

export const playClickSound = playTickSound;

export function playDropSound(isRare = false) {
  if (Platform.OS !== 'web') {
    if (isRare) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
  }
  if (!soundEnabled) return;
  if (isRare) {
    playSynthTone(540, 0.38, 420, 0.18);
  } else {
    playSynthTone(420, 0.2, 160, 0.14);
  }
}

export function playWinSound() {
  if (Platform.OS !== 'web') {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  }
  if (!soundEnabled) return;
  playSynthTone(520, 0.25, 320, 0.15);
}

export function playLoseSound() {
  if (Platform.OS !== 'web') {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
  }
  if (!soundEnabled) return;
  playSynthTone(290, 0.25, -120, 0.14);
}
