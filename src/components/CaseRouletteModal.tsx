import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
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
import { Ionicons } from '@expo/vector-icons';
import { CaseContainer, InventoryItem, RARITIES } from '../types/cs2';
import { rollSkinFromCase } from '../data/cs2Database';
import { playDropSound, playTickSound } from '../utils/soundManager';
import { LiquidGlassCard } from './LiquidGlassUI';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRACK_WIDTH = Math.min(SCREEN_WIDTH, 440);
const CARD_WIDTH = 132;
const CARD_MARGIN = 6;
const ITEM_SPAN = CARD_WIDTH + CARD_MARGIN * 2;
const WINNING_INDEX = 24;
const TOTAL_ITEMS = 29;

interface CaseRouletteModalProps {
  visible: boolean;
  caseItem: CaseContainer | null;
  openCount: number; // 1 to 5 simultaneous cases
  fastSpin?: boolean;
  onToggleFastSpin?: () => void;
  onClose: () => void;
  onCompleteDrops: (wonItems: InventoryItem[]) => void;
  onSellDrops: (wonItems: InventoryItem[]) => void;
  onInspectDrop?: (wonItem: InventoryItem) => void;
}

export const CaseRouletteModal: React.FC<CaseRouletteModalProps> = ({
  visible,
  caseItem,
  openCount = 1,
  fastSpin = false,
  onToggleFastSpin,
  onClose,
  onCompleteDrops,
  onSellDrops,
  onInspectDrop,
}) => {
  const [strips, setStrips] = useState<InventoryItem[][]>([]);
  const [wonSkins, setWonSkins] = useState<InventoryItem[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [acceleratedThisSpin, setAcceleratedThisSpin] = useState(false);

  const scrollAnims = useRef<Animated.Value[]>([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const targetTranslatesRef = useRef<number[]>([0, 0, 0, 0, 0]);
  const resultScale = useRef(new Animated.Value(0.6)).current;
  const goldPulse = useRef(new Animated.Value(0)).current;
  const lastTickIndex = useRef<number>(-1);
  const animRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (visible && caseItem) {
      startMultiOpening(caseItem, Math.max(1, Math.min(5, openCount)), fastSpin);
    }
  }, [visible, caseItem, openCount]);

  const finishOpening = (winners: InventoryItem[]) => {
    scrollAnims.forEach((a) => a.removeAllListeners());
    setIsSpinning(false);
    setShowResult(true);

    const hasUltraRare = winners.some(
      (w) => w.rarity === 'gold' || w.rarity === 'covert' || w.rarity === 'classified'
    );
    playDropSound(hasUltraRare);
    onCompleteDrops(winners);

    Animated.spring(resultScale, {
      toValue: 1,
      friction: 6,
      tension: 75,
      useNativeDriver: true,
    }).start();

    if (hasUltraRare) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(goldPulse, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(goldPulse, {
            toValue: 0.25,
            duration: 900,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  };

  const startMultiOpening = (container: CaseContainer, count: number, isFast: boolean) => {
    setShowResult(false);
    setIsSpinning(true);
    setAcceleratedThisSpin(isFast);
    resultScale.setValue(0.6);
    goldPulse.setValue(0);
    lastTickIndex.current = -1;

    const allStrips: InventoryItem[][] = [];
    const winners: InventoryItem[] = [];
    const animations: Animated.CompositeAnimation[] = [];

    const centerOffset = TRACK_WIDTH / 2 - ITEM_SPAN / 2;
    const baseDuration = isFast ? 1850 : 4800;
    const cascadeDelay = isFast ? 95 : 210;

    for (let s = 0; s < count; s++) {
      scrollAnims[s].setValue(0);
      const rowItems: InventoryItem[] = [];
      for (let i = 0; i < TOTAL_ITEMS; i++) {
        rowItems.push(rollSkinFromCase(container));
      }
      const winner = rowItems[WINNING_INDEX];
      allStrips.push(rowItems);
      winners.push(winner);

      const jitter = (Math.random() - 0.5) * (CARD_WIDTH * 0.45);
      const targetTranslate = -(WINNING_INDEX * ITEM_SPAN - centerOffset + jitter);
      targetTranslatesRef.current[s] = targetTranslate;

      if (s === 0) {
        scrollAnims[0].addListener(({ value }) => {
          const currentIdx = Math.floor((Math.abs(value) + TRACK_WIDTH / 2) / ITEM_SPAN);
          if (
            currentIdx !== lastTickIndex.current &&
            currentIdx >= 0 &&
            currentIdx < TOTAL_ITEMS
          ) {
            lastTickIndex.current = currentIdx;
            playTickSound();
          }
        });
      }

      animations.push(
        Animated.timing(scrollAnims[s], {
          toValue: targetTranslate,
          duration: baseDuration + s * cascadeDelay,
          easing: Easing.bezier(0.12, 0.85, 0.22, 1),
          useNativeDriver: true,
        })
      );
    }

    setStrips(allStrips);
    setWonSkins(winners);

    const parallelAnim = Animated.parallel(animations);
    animRef.current = parallelAnim;
    parallelAnim.start(({ finished }) => {
      if (finished) {
        finishOpening(winners);
      }
    });
  };

  // Accelerates the spin smoothly instead of instant-skipping!
  const handleTriggerFastSpin = () => {
    if (onToggleFastSpin) {
      onToggleFastSpin();
    }
    if (!isSpinning || wonSkins.length === 0 || acceleratedThisSpin) return;
    setAcceleratedThisSpin(true);
    if (animRef.current) {
      animRef.current.stop();
    }
    const fastAnimations = strips.map((_, s) =>
      Animated.timing(scrollAnims[s], {
        toValue: targetTranslatesRef.current[s],
        duration: 850 + s * 60,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    );
    const parallelFast = Animated.parallel(fastAnimations);
    animRef.current = parallelFast;
    parallelFast.start(({ finished }) => {
      if (finished) {
        finishOpening(wonSkins);
      }
    });
  };

  if (!caseItem) return null;

  const totalWonPrice = wonSkins.reduce((acc, item) => acc + item.price, 0);
  const bestDrop = [...wonSkins].sort((a, b) => b.price - a.price)[0] || wonSkins[0];
  const bestRarity = bestDrop ? RARITIES[bestDrop.rarity] : RARITIES.milspec;
  const isCompactMulti = strips.length > 1;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <LinearGradient
          colors={['rgba(8, 15, 32, 0.96)', 'rgba(15, 28, 55, 0.98)']}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Rare Drop Ambient Flash */}
        {showResult &&
          (bestDrop?.rarity === 'gold' || bestDrop?.rarity === 'covert') && (
            <Animated.View
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFillObject,
                {
                  backgroundColor: bestRarity.glow.replace('0.5', '0.18').replace('0.6', '0.22'),
                  opacity: goldPulse,
                },
              ]}
            />
          )}

        <View style={styles.contentColumn}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.multiBadge}>
              <Ionicons
                name={acceleratedThisSpin || fastSpin ? 'flash' : 'disc'}
                size={13}
                color={acceleratedThisSpin || fastSpin ? '#FACC15' : '#38BDF8'}
              />
              <Text style={styles.openingLabel}>
                {acceleratedThisSpin || fastSpin ? '⚡ БЫСТРАЯ ПРОКРУТКА' : 'ОТКРЫТИЕ'} x{strips.length} •{' '}
                {caseItem.name.toUpperCase()}
              </Text>
            </View>
          </View>

          {/* Multi-Reel Roulette Tracks */}
          {!showResult && (
            <ScrollView
              style={{ maxHeight: 560, width: TRACK_WIDTH }}
              contentContainerStyle={{ justifyContent: 'center' }}
              showsVerticalScrollIndicator={false}
            >
              {strips.map((strip, sIdx) => (
                <View
                  key={sIdx}
                  style={[
                    styles.trackContainer,
                    isCompactMulti && styles.trackContainerCompact,
                  ]}
                >
                  <View style={styles.centerLaser} />
                  <View style={styles.centerTriangleTop} />
                  <View style={styles.centerTriangleBottom} />

                  <Animated.View
                    style={[
                      styles.stripRow,
                      {
                        transform: [{ translateX: scrollAnims[sIdx] }],
                      },
                    ]}
                  >
                    {strip.map((item, idx) => {
                      const r = RARITIES[item.rarity];
                      const isGoldMystery = item.rarity === 'gold' && isSpinning;
                      return (
                        <View
                          key={`${item.instanceId}_${idx}`}
                          style={[
                            styles.rouletteCard,
                            isCompactMulti && styles.rouletteCardCompact,
                            { borderColor: r.color },
                          ]}
                        >
                          <LinearGradient
                            colors={['rgba(15, 24, 45, 0.96)', r.glow]}
                            style={StyleSheet.absoluteFillObject}
                          />
                          {isGoldMystery ? (
                            <View style={styles.goldMysteryBox}>
                              <Text style={styles.goldStarText}>★</Text>
                              <Text style={styles.goldMysteryLabel}>RARE SPECIAL</Text>
                            </View>
                          ) : (
                            <Image
                              source={{ uri: item.image }}
                              style={
                                isCompactMulti
                                  ? styles.rouletteImgCompact
                                  : styles.rouletteImg
                              }
                              resizeMode="contain"
                            />
                          )}
                          <View>
                            <Text numberOfLines={1} style={styles.rWeapon}>
                              {item.weapon}
                            </Text>
                            <Text numberOfLines={1} style={[styles.rName, { color: '#FFFFFF' }]}>
                              {item.name}
                            </Text>
                            <View style={[styles.rBottomBar, { backgroundColor: r.color }]} />
                          </View>
                        </View>
                      );
                    })}
                  </Animated.View>
                </View>
              ))}
            </ScrollView>
          )}

          {/* Result Drop Showcase */}
          {showResult && wonSkins.length > 0 ? (
            <Animated.View style={[styles.resultWrap, { transform: [{ scale: resultScale }] }]}>
              <LiquidGlassCard
                glowColor={bestRarity.color}
                themeMode="cyber_blue"
                style={styles.resultCard}
              >
                <Text style={[styles.rarityBanner, { color: bestRarity.color }]}>
                  ★ ВЫПАЛО ПРЕДМЕТОВ: {wonSkins.length} НА СУММУ ${totalWonPrice.toFixed(2)} ★
                </Text>

                {wonSkins.length === 1 ? (
                  <View style={{ alignItems: 'center', width: '100%' }}>
                    <View style={styles.badgesWrap}>
                      {wonSkins[0].statTrak && (
                        <View style={styles.stPill}>
                          <Text style={styles.stPillText}>StatTrak™</Text>
                        </View>
                      )}
                      {wonSkins[0].souvenir && (
                        <View style={styles.souvPill}>
                          <Text style={styles.souvPillText}>СУВЕНИРНЫЙ</Text>
                        </View>
                      )}
                      <View style={styles.wearPill}>
                        <Text style={styles.wearPillText}>{wonSkins[0].wearName}</Text>
                      </View>
                    </View>

                    <Image
                      source={{ uri: wonSkins[0].image }}
                      style={styles.bigDropImg}
                      resizeMode="contain"
                    />

                    <Text style={styles.wonTitle}>
                      {wonSkins[0].weapon} |{' '}
                      <Text style={{ color: bestRarity.color }}>{wonSkins[0].name}</Text>
                    </Text>

                    {!wonSkins[0].isSticker && (
                      <Text style={styles.wonFloat}>
                        Float: {wonSkins[0].floatValue.toFixed(6)}
                      </Text>
                    )}

                    <Text style={styles.wonPrice}>${wonSkins[0].price.toFixed(2)}</Text>
                  </View>
                ) : (
                  <ScrollView
                    style={{ maxHeight: 340, width: '100%', marginVertical: 12 }}
                    showsVerticalScrollIndicator={false}
                  >
                    {wonSkins.map((skin) => {
                      const r = RARITIES[skin.rarity];
                      return (
                        <TouchableOpacity
                          key={skin.instanceId}
                          onPress={() => {
                            if (onInspectDrop) {
                              onClose();
                              onInspectDrop(skin);
                            }
                          }}
                          style={[styles.multiDropRow, { borderColor: r.color }]}
                        >
                          <LinearGradient
                            colors={[r.glow.replace('0.45', '0.2'), 'rgba(15,23,42,0.85)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={StyleSheet.absoluteFillObject}
                          />
                          <Image
                            source={{ uri: skin.image }}
                            style={styles.multiDropImg}
                            resizeMode="contain"
                          />
                          <View style={{ flex: 1, marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                              <Text style={[styles.multiDropRarity, { color: r.color }]}>
                                {r.name.toUpperCase()}
                              </Text>
                              {skin.statTrak && <Text style={styles.stMini}>ST™</Text>}
                              <Text style={styles.wearMini}>{skin.wear}</Text>
                            </View>
                            <Text numberOfLines={1} style={styles.multiDropName}>
                              {skin.weapon} | {skin.name}
                            </Text>
                          </View>
                          <Text style={styles.multiDropPrice}>${skin.price.toFixed(2)}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                )}

                <View style={styles.actionRow}>
                  <TouchableOpacity style={styles.keepBtn} onPress={onClose}>
                    <Text style={styles.keepBtnText}>ВСЕ В СКЛАД</Text>
                  </TouchableOpacity>

                  {wonSkins.length === 1 && onInspectDrop && (
                    <TouchableOpacity
                      style={styles.inspectBtn}
                      onPress={() => {
                        onClose();
                        onInspectDrop(wonSkins[0]);
                      }}
                    >
                      <Text style={styles.inspectBtnText}>3D ОСМОТР</Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={styles.sellNowBtn}
                    onPress={() => {
                      onSellDrops(wonSkins);
                      onClose();
                    }}
                  >
                    <Text style={styles.sellNowText}>
                      ПРОДАТЬ (${totalWonPrice.toFixed(2)})
                    </Text>
                  </TouchableOpacity>
                </View>
              </LiquidGlassCard>
            </Animated.View>
          ) : (
            <View style={styles.spinningStatusWrap}>
              <TouchableOpacity
                style={[
                  styles.fastSpinBtn,
                  (acceleratedThisSpin || fastSpin) && styles.fastSpinBtnActive,
                ]}
                onPress={handleTriggerFastSpin}
              >
                <Ionicons
                  name="flash"
                  size={15}
                  color={acceleratedThisSpin || fastSpin ? '#0F172A' : '#FACC15'}
                />
                <Text
                  style={[
                    styles.fastSpinBtnText,
                    (acceleratedThisSpin || fastSpin) && { color: '#0F172A' },
                  ]}
                >
                  {acceleratedThisSpin || fastSpin
                    ? '⚡ БЫСТРОЕ ОТКРЫТИЕ АКТИВНО (x2.5 СКОРОСТЬ)'
                    : '⚡ ВКЛЮЧИТЬ БЫСТРОЕ ОТКРЫТИЕ (УСКОРИТЬ ПРОКРУТКУ)'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  contentColumn: {
    width: '100%',
    maxWidth: 440,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 14,
  },
  multiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(56, 189, 248, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.4)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  openingLabel: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.1,
  },
  trackContainer: {
    width: TRACK_WIDTH,
    height: 170,
    backgroundColor: 'rgba(10, 18, 36, 0.94)',
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: 'rgba(56, 189, 248, 0.35)',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 8,
    borderRadius: 14,
  },
  trackContainerCompact: {
    height: 104,
    marginBottom: 6,
  },
  centerLaser: {
    position: 'absolute',
    left: TRACK_WIDTH / 2 - 1.5,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: '#FFD700',
    zIndex: 20,
    shadowColor: '#FFD700',
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  centerTriangleTop: {
    position: 'absolute',
    top: 0,
    left: TRACK_WIDTH / 2 - 7,
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFD700',
    zIndex: 21,
  },
  centerTriangleBottom: {
    position: 'absolute',
    bottom: 0,
    left: TRACK_WIDTH / 2 - 7,
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFD700',
    zIndex: 21,
  },
  stripRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rouletteCard: {
    width: CARD_WIDTH,
    height: 148,
    marginHorizontal: CARD_MARGIN,
    borderRadius: 16,
    borderWidth: 1.4,
    padding: 8,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  rouletteCardCompact: {
    height: 92,
    padding: 6,
  },
  rouletteImg: {
    width: '100%',
    height: 86,
  },
  rouletteImgCompact: {
    width: '100%',
    height: 46,
  },
  goldMysteryBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.18)',
    borderRadius: 10,
  },
  goldStarText: {
    color: '#FFD700',
    fontSize: 28,
    fontWeight: '900',
  },
  goldMysteryLabel: {
    color: '#FDE047',
    fontSize: 8,
    fontWeight: '900',
  },
  rWeapon: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '800',
  },
  rName: {
    fontSize: 11,
    fontWeight: '900',
  },
  rBottomBar: {
    height: 3,
    borderRadius: 2,
    marginTop: 3,
  },
  resultWrap: {
    width: '100%',
    marginTop: 8,
  },
  resultCard: {
    padding: 18,
    alignItems: 'center',
  },
  rarityBanner: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
  },
  badgesWrap: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  stPill: {
    backgroundColor: 'rgba(255, 110, 20, 0.25)',
    borderWidth: 1,
    borderColor: '#FF6E14',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  stPillText: {
    color: '#FF8A3D',
    fontWeight: '900',
    fontSize: 11,
  },
  souvPill: {
    backgroundColor: 'rgba(255, 215, 0, 0.22)',
    borderWidth: 1,
    borderColor: '#FFD700',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  souvPillText: {
    color: '#FFD700',
    fontWeight: '900',
    fontSize: 11,
  },
  wearPill: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  wearPillText: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '700',
  },
  bigDropImg: {
    width: 240,
    height: 155,
    marginVertical: 8,
  },
  wonTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  wonFloat: {
    color: '#CBD5E1',
    fontSize: 11,
    marginTop: 4,
  },
  wonPrice: {
    color: '#10B981',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 6,
  },
  multiDropRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 14,
    borderWidth: 1.2,
    marginBottom: 8,
    overflow: 'hidden',
  },
  multiDropImg: {
    width: 64,
    height: 46,
  },
  multiDropRarity: {
    fontSize: 9,
    fontWeight: '900',
  },
  stMini: {
    color: '#FB923C',
    fontSize: 9,
    fontWeight: '900',
  },
  wearMini: {
    color: '#CBD5E1',
    fontSize: 9,
    fontWeight: '800',
  },
  multiDropName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    marginTop: 2,
  },
  multiDropPrice: {
    color: '#34D399',
    fontSize: 14,
    fontWeight: '900',
    marginLeft: 8,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
    width: '100%',
  },
  keepBtn: {
    flex: 1,
    backgroundColor: 'rgba(56, 189, 248, 0.22)',
    borderWidth: 1.2,
    borderColor: '#38BDF8',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  keepBtnText: {
    color: '#38BDF8',
    fontWeight: '900',
    fontSize: 11,
  },
  inspectBtn: {
    flex: 1,
    backgroundColor: 'rgba(168, 85, 247, 0.24)',
    borderWidth: 1.2,
    borderColor: '#A855F7',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  inspectBtnText: {
    color: '#E9D5FF',
    fontWeight: '900',
    fontSize: 11,
  },
  sellNowBtn: {
    flex: 1,
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  sellNowText: {
    color: '#052E16',
    fontWeight: '900',
    fontSize: 11,
  },
  spinningStatusWrap: {
    marginTop: 16,
    alignItems: 'center',
  },
  fastSpinBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: 'rgba(250, 204, 21, 0.16)',
    borderWidth: 1.3,
    borderColor: '#FACC15',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 14,
  },
  fastSpinBtnActive: {
    backgroundColor: '#FACC15',
    borderColor: '#FDE047',
  },
  fastSpinBtnText: {
    color: '#FACC15',
    fontWeight: '900',
    fontSize: 11,
  },
});
