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

function playSynthTone(freq: number, durationSec: number, slideFreq = 0, gainVal = 0.12, type: OscillatorType = 'triangle') {
  try {
    const ctx = getWebAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    if (slideFreq !== 0) {
      osc.frequency.linearRampToValueAtTime(freq + slideFreq, ctx.currentTime + durationSec);
    }
    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationSec);
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

// Authentic CS2 Roulette wheel tick
export function playTickSound() {
  const now = Date.now();
  if (now - lastTickTime < 45) return;
  lastTickTime = now;

  if (Platform.OS !== 'web') {
    Haptics.selectionAsync().catch(() => {});
  }
  if (!soundEnabled) return;
  playSynthTone(1250, 0.018, -480, 0.09, 'sine');
}

export const playClickSound = playTickSound;

// Authentic CS2 heavy lock-in chunk when roulette stops on winner
export function playCS2ItemLock() {
  if (Platform.OS !== 'web') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
  }
  if (!soundEnabled) return;
  // Low sub-bass thump + metallic latch
  playSynthTone(110, 0.16, -30, 0.25, 'sine');
  setTimeout(() => {
    playSynthTone(750, 0.04, -320, 0.12, 'triangle');
  }, 25);
}

// Iconic CS2 Red / Knife gold fanfare
export function playCS2GoldFanfare() {
  if (Platform.OS !== 'web') {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  }
  if (!soundEnabled) return;
  // Deep sub impact
  playSynthTone(75, 0.5, 0, 0.35, 'sine');
  // Shimmering chord arpeggio
  setTimeout(() => playSynthTone(523.25, 0.28, 0, 0.18, 'triangle'), 30); // C5
  setTimeout(() => playSynthTone(659.25, 0.28, 0, 0.18, 'triangle'), 80); // E5
  setTimeout(() => playSynthTone(783.99, 0.35, 0, 0.22, 'triangle'), 140); // G5
  setTimeout(() => playSynthTone(1046.5, 0.45, 120, 0.26, 'sine'), 210); // C6
}

export function playDropSound(isRare = false) {
  if (isRare) {
    playCS2GoldFanfare();
  } else {
    playCS2ItemLock();
  }
}

export function playStickerApplySound() {
  if (Platform.OS !== 'web') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
  }
  if (!soundEnabled) return;
  // Paper snap & smooth peel
  playSynthTone(920, 0.04, -380, 0.12, 'sine');
  setTimeout(() => playSynthTone(440, 0.09, 120, 0.15, 'triangle'), 35);
}

export function playStickerScrapeSound() {
  if (Platform.OS !== 'web') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  }
  if (!soundEnabled) return;
  playSynthTone(340, 0.06, -90, 0.08, 'sawtooth' as any);
}

export function playWinSound() {
  if (Platform.OS !== 'web') {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  }
  if (!soundEnabled) return;
  playSynthTone(440, 0.15, 0, 0.14, 'triangle');
  setTimeout(() => playSynthTone(659.25, 0.25, 0, 0.16, 'sine'), 70);
  setTimeout(() => playSynthTone(880, 0.3, 80, 0.18, 'sine'), 140);
}

export function playLoseSound() {
  if (Platform.OS !== 'web') {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
  }
  if (!soundEnabled) return;
  playSynthTone(310, 0.2, -80, 0.15, 'sine');
  setTimeout(() => playSynthTone(220, 0.28, -60, 0.18, 'triangle'), 100);
}
