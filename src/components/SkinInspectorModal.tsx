import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { InventoryItem, RARITIES } from '../types/cs2';
import { TOURNAMENT_STICKERS } from '../data/cs2Database';
import { playWinSound } from '../utils/soundManager';

interface SkinInspectorModalProps {
  visible: boolean;
  item: InventoryItem | null;
  onClose: () => void;
  onSell: (item: InventoryItem) => void;
  onApplySticker?: (itemId: string, sticker: { name: string; image: string }) => void;
}

export const SkinInspectorModal: React.FC<SkinInspectorModalProps> = ({
  visible,
  item,
  onClose,
  onSell,
  onApplySticker,
}) => {
  const [angleMode, setAngleMode] = useState<'side' | 'playside' | 'backside' | 'zoom'>('side');
  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setAngleMode('side');
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: 2200,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 2200,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      floatAnim.stopAnimation();
    }
  }, [visible]);

  const switchAngle = (mode: 'side' | 'playside' | 'backside' | 'zoom') => {
    setAngleMode(mode);
    const toVal = mode === 'side' ? 0 : mode === 'playside' ? 1 : mode === 'backside' ? -1 : 2;
    Animated.spring(rotateAnim, {
      toValue: toVal,
      friction: 6,
      tension: 60,
      useNativeDriver: true,
    }).start();
  };

  if (!item) return null;

  const rarity = RARITIES[item.rarity] || RARITIES.milspec;
  const patternSeed = (item.instanceId.charCodeAt(2) * 13 + item.instanceId.charCodeAt(5) * 7) % 999 + 1;

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-7, 7],
  });

  const scaleVal =
    angleMode === 'zoom' ? 1.28 : angleMode === 'playside' ? 1.1 : angleMode === 'backside' ? 1.05 : 1.0;
  const rotateZ =
    angleMode === 'playside'
      ? '-8deg'
      : angleMode === 'backside'
      ? '9deg'
      : angleMode === 'zoom'
      ? '-3deg'
      : '0deg';

  const floatPercent = Math.min(99, Math.max(1, item.floatValue * 100));

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <LinearGradient
          colors={['rgba(5, 8, 17, 0.96)', rarity.glow.replace('0.45', '0.28'), 'rgba(5, 8, 17, 0.99)']}
          style={StyleSheet.absoluteFillObject}
        />

        <View style={styles.inspectorSheet}>
          {/* Top Bar */}
          <View style={styles.topRow}>
            <View>
              <View style={styles.rarityPillRow}>
                <View style={[styles.rarityDot, { backgroundColor: rarity.color }]} />
                <Text style={[styles.rarityLabel, { color: rarity.color }]}>
                  {rarity.name.toUpperCase()}
                </Text>
                {item.statTrak && (
                  <View style={styles.stTag}>
                    <Text style={styles.stTagText}>StatTrak™ 000042</Text>
                  </View>
                )}
                {item.souvenir && (
                  <View style={styles.souvTag}>
                    <Text style={styles.souvTagText}>★ СУВЕНИР</Text>
                  </View>
                )}
              </View>
              <Text style={styles.weaponTitle}>
                {item.weapon} <Text style={{ color: rarity.color }}>| {item.name}</Text>
              </Text>
            </View>

            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* 3D Showroom Stage */}
          <View style={[styles.stageBox, { borderColor: rarity.color }]}>
            <LinearGradient
              colors={['rgba(15,23,42,0.4)', rarity.glow, 'rgba(10,15,29,0.85)']}
              style={StyleSheet.absoluteFillObject}
            />

            {/* Pedestal Neon Ring */}
            <View style={[styles.neonFloorRing, { borderColor: rarity.color, shadowColor: rarity.color }]} />

            <Animated.View
              style={[
                styles.modelHolder,
                {
                  transform: [
                    { translateY },
                    { scale: scaleVal },
                    { rotateZ },
                    { scaleX: angleMode === 'backside' ? -1 : 1 },
                  ],
                },
              ]}
            >
              <Image source={{ uri: item.image }} style={styles.heroModelImg} resizeMode="contain" />
            </Animated.View>

            {/* Applied Stickers on Weapon */}
            {item.stickers && item.stickers.length > 0 && (
              <View style={styles.appliedStickersBar}>
                {item.stickers.map((st, idx) => (
                  <View key={idx} style={styles.stickerSlot}>
                    <Image source={{ uri: st.image }} style={styles.stickerImg} resizeMode="contain" />
                  </View>
                ))}
              </View>
            )}

            {/* Camera Angle Controls */}
            <View style={styles.angleBar}>
              {[
                { key: 'side', label: 'Обзор 360°' },
                { key: 'playside', label: 'Лицевая' },
                { key: 'backside', label: 'Обратная' },
                { key: 'zoom', label: 'Макро x1.3' },
              ].map((btn) => (
                <TouchableOpacity
                  key={btn.key}
                  onPress={() => switchAngle(btn.key as any)}
                  style={[styles.angleBtn, angleMode === btn.key && { borderColor: rarity.color, backgroundColor: 'rgba(255,255,255,0.14)' }]}
                >
                  <Text style={styles.angleBtnText}>{btn.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Float Value & Pattern Telemetry */}
          {!item.isSticker && (
            <View style={styles.telemetryBox}>
              <View style={styles.telemetryHeader}>
                <Text style={styles.telemetryTitle}>КАЧЕСТВО: {item.wearName.toUpperCase()}</Text>
                <Text style={styles.patternText}>Паттерн: #{patternSeed}</Text>
              </View>

              <Text style={styles.floatNumber}>Float: {item.floatValue.toFixed(8)}</Text>

              {/* CS2 Wear Spectrum Bar */}
              <View style={styles.spectrumTrack}>
                <View style={[styles.segFN, { flex: 7 }]} />
                <View style={[styles.segMW, { flex: 8 }]} />
                <View style={[styles.segFT, { flex: 23 }]} />
                <View style={[styles.segWW, { flex: 7 }]} />
                <View style={[styles.segBS, { flex: 55 }]} />
                <View style={[styles.floatPointer, { left: `${floatPercent}%` }]} />
              </View>
              <View style={styles.spectrumLabels}>
                <Text style={styles.specText}>FN (0.00)</Text>
                <Text style={styles.specText}>MW (0.07)</Text>
                <Text style={styles.specText}>FT (0.15)</Text>
                <Text style={styles.specText}>WW (0.38)</Text>
                <Text style={styles.specText}>BS (0.45–1.00)</Text>
              </View>
            </View>
          )}

          {/* Sticker Craft Bar (Apply Free Holo/Gold Stickers onto Weapon) */}
          {!item.isSticker && onApplySticker && (item.stickers?.length || 0) < 4 && (
            <View style={styles.stickerCraftSection}>
              <Text style={styles.craftTitle}>
                ✨ Наклеить турнирный стикер на скин ({item.stickers?.length || 0}/4 слотов):
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 6 }}>
                {TOURNAMENT_STICKERS.map((st, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.craftStickerBtn}
                    onPress={() => {
                      onApplySticker(item.instanceId, st);
                      playWinSound();
                    }}
                  >
                    <Image source={{ uri: st.image }} style={styles.craftStickerIcon} resizeMode="contain" />
                    <Text numberOfLines={1} style={styles.craftStickerName}>
                      + Клеить
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Bottom Actions */}
          <View style={styles.bottomActions}>
            <View style={styles.priceBlock}>
              <Text style={styles.priceBlockLabel}>РЫНОЧНАЯ СТОИМОСТЬ</Text>
              <Text style={styles.priceBlockVal}>${item.price.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.sellActionBtn}
              onPress={() => {
                onSell(item);
                onClose();
              }}
            >
              <Text style={styles.sellActionText}>ПРОДАТЬ ЗА ${item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  inspectorSheet: {
    width: '100%',
    maxWidth: 460,
    borderRadius: 28,
    backgroundColor: 'rgba(11, 16, 30, 0.92)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.16)',
    padding: 18,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  rarityPillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  rarityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  rarityLabel: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  stTag: {
    backgroundColor: 'rgba(255, 110, 20, 0.22)',
    borderWidth: 1,
    borderColor: '#FF6E14',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 5,
  },
  stTagText: {
    color: '#FF8A3D',
    fontSize: 10,
    fontWeight: '900',
  },
  souvTag: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderWidth: 1,
    borderColor: '#FFD700',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 5,
  },
  souvTagText: {
    color: '#FFD700',
    fontSize: 10,
    fontWeight: '900',
  },
  weaponTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#E2E8F0',
    fontSize: 15,
    fontWeight: '900',
  },
  stageBox: {
    height: 250,
    borderRadius: 22,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 14,
  },
  neonFloorRing: {
    position: 'absolute',
    bottom: 32,
    width: 240,
    height: 36,
    borderRadius: 120,
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.03)',
    transform: [{ scaleY: 0.45 }],
  },
  modelHolder: {
    width: '90%',
    height: 175,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroModelImg: {
    width: '100%',
    height: '100%',
  },
  appliedStickersBar: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    gap: 6,
  },
  stickerSlot: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickerImg: {
    width: 34,
    height: 34,
  },
  angleBar: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    gap: 6,
  },
  angleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
  },
  angleBtnText: {
    color: '#F8FAFC',
    fontSize: 10,
    fontWeight: '800',
  },
  telemetryBox: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 12,
  },
  telemetryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  telemetryTitle: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '900',
  },
  patternText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
  },
  floatNumber: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    marginVertical: 6,
  },
  spectrumTrack: {
    height: 8,
    borderRadius: 4,
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'relative',
  },
  segFN: { backgroundColor: '#10B981' },
  segMW: { backgroundColor: '#84CC16' },
  segFT: { backgroundColor: '#EAB308' },
  segWW: { backgroundColor: '#F97316' },
  segBS: { backgroundColor: '#EF4444' },
  floatPointer: {
    position: 'absolute',
    top: -2,
    width: 4,
    height: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  spectrumLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  specText: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '700',
  },
  stickerCraftSection: {
    marginBottom: 14,
  },
  craftTitle: {
    color: '#CBD5E1',
    fontSize: 11,
    fontWeight: '700',
  },
  craftStickerBtn: {
    width: 66,
    height: 64,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    padding: 4,
  },
  craftStickerIcon: {
    width: 40,
    height: 38,
  },
  craftStickerName: {
    color: '#38BDF8',
    fontSize: 9,
    fontWeight: '800',
    marginTop: 2,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  priceBlock: {
    flex: 1,
  },
  priceBlockLabel: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '800',
  },
  priceBlockVal: {
    color: '#10B981',
    fontSize: 22,
    fontWeight: '900',
  },
  sellActionBtn: {
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
  },
  sellActionText: {
    color: '#032215',
    fontWeight: '900',
    fontSize: 13,
  },
});
