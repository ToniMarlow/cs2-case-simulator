import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  CaseContainer,
  CatalogCategory,
  InventoryItem,
  RARITIES,
  RarityKey,
  SkinTemplate,
  ThemeMode,
} from '../types/cs2';
import { rollSkinFromCase } from '../data/cs2Database';
import { playClickSound, playDropSound, playTickSound } from '../utils/soundManager';
import { SkinCard, THEMES } from './LiquidGlassUI';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRACK_WIDTH = Math.min(SCREEN_WIDTH - 28, 412);
const CARD_WIDTH = 124;
const CARD_MARGIN = 5;
const ITEM_SPAN = CARD_WIDTH + CARD_MARGIN * 2;
const WINNING_INDEX = 24;
const TOTAL_ITEMS = 29;

const RARITY_SORT_ORDER: Record<RarityKey, number> = {
  milspec: 1,
  restricted: 2,
  classified: 3,
  covert: 4,
  gold: 5,
};

interface CS2CaseScreenProps {
  caseItem: CaseContainer;
  balance: number;
  themeMode: ThemeMode;
  fastSpin: boolean;
  onToggleFastSpin: () => void;
  onBack: () => void;
  onTrySpendBalance: (cost: number, count: number) => boolean;
  onCompleteDrops: (wonItems: InventoryItem[]) => void;
  onSellDrops: (wonItems: InventoryItem[]) => void;
  onInspectDrop: (item: InventoryItem) => void;
  onPreviewTemplate: (skin: SkinTemplate, category: CatalogCategory) => void;
}

export const CS2CaseScreen: React.FC<CS2CaseScreenProps> = ({
  caseItem,
  balance,
  themeMode,
  fastSpin,
  onToggleFastSpin,
  onBack,
  onTrySpendBalance,
  onCompleteDrops,
  onSellDrops,
  onInspectDrop,
  onPreviewTemplate,
}) => {
  const theme = THEMES[themeMode] || THEMES.obsidian;

  const [openCount, setOpenCount] = useState<number>(1);
  const [stageState, setStageState] = useState<'idle' | 'spinning' | 'result'>('idle');
  const [strips, setStrips] = useState<InventoryItem[][]>([]);
  const [wonSkins, setWonSkins] = useState<InventoryItem[]>([]);
  const [acceleratedThisSpin, setAcceleratedThisSpin] = useState<boolean>(false);
  const [showGoldList, setShowGoldList] = useState<boolean>(false);

  const scrollAnims = useRef<Animated.Value[]>([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const targetTranslatesRef = useRef<number[]>([0, 0, 0, 0, 0]);
  const lastTickIndex = useRef<number>(-1);
  const animRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    return () => {
      if (animRef.current) animRef.current.stop();
      scrollAnims.forEach((a) => a.removeAllListeners());
    };
  }, []);

  const finishOpening = (winners: InventoryItem[]) => {
    scrollAnims.forEach((a) => a.removeAllListeners());
    setStageState('result');

    const hasUltraRare = winners.some(
      (w) => w.rarity === 'gold' || w.rarity === 'covert' || w.rarity === 'classified'
    );
    playDropSound(hasUltraRare);
    onCompleteDrops(winners);
  };

  const handleUnlockContainer = () => {
    if (stageState === 'spinning') return;
    const totalCost = Number((caseItem.price * openCount).toFixed(2));
    const ok = onTrySpendBalance(totalCost, openCount);
    if (!ok) return;

    setStageState('spinning');
    setAcceleratedThisSpin(fastSpin);
    lastTickIndex.current = -1;

    const allStrips: InventoryItem[][] = [];
    const winners: InventoryItem[] = [];
    const animations: Animated.CompositeAnimation[] = [];

    const centerOffset = TRACK_WIDTH / 2 - ITEM_SPAN / 2;
    const baseDuration = fastSpin ? 1750 : 4600;
    const cascadeDelay = fastSpin ? 80 : 180;

    for (let s = 0; s < openCount; s++) {
      scrollAnims[s].setValue(0);
      const rowItems: InventoryItem[] = [];
      for (let i = 0; i < TOTAL_ITEMS; i++) {
        rowItems.push(rollSkinFromCase(caseItem));
      }
      const winner = rowItems[WINNING_INDEX];
      allStrips.push(rowItems);
      winners.push(winner);

      const jitter = (Math.random() - 0.5) * (CARD_WIDTH * 0.4);
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

  const handleSpeedUpActiveSpin = () => {
    onToggleFastSpin();
    if (stageState !== 'spinning' || wonSkins.length === 0 || acceleratedThisSpin) return;
    setAcceleratedThisSpin(true);
    if (animRef.current) animRef.current.stop();

    const fastAnimations = strips.map((_, s) =>
      Animated.timing(scrollAnims[s], {
        toValue: targetTranslatesRef.current[s],
        duration: 750 + s * 50,
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

  const regularSkins = [...caseItem.items]
    .filter((i) => i.rarity !== 'gold')
    .sort((a, b) => RARITY_SORT_ORDER[a.rarity] - RARITY_SORT_ORDER[b.rarity]);
  const goldSkins = caseItem.items.filter((i) => i.rarity === 'gold');

  const totalWonPrice = wonSkins.reduce((acc, item) => acc + item.price, 0);
  const totalOpenCost = Number((caseItem.price * openCount).toFixed(2));
  const isCompactMulti = strips.length > 1;

  return (
    <View style={styles.screenContainer}>
      {/* Top CS2 Navigation Header */}
      <View
        style={[
          styles.topBar,
          {
            backgroundColor: theme.cardBg,
            borderColor: theme.cardBorder,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: theme.surfaceBg }]}
          disabled={stageState === 'spinning'}
          onPress={() => {
            playClickSound();
            onBack();
          }}
        >
          <Ionicons name="arrow-back" size={18} color={theme.textPrimary} />
          <Text style={[styles.backBtnText, { color: theme.textPrimary }]}>Кейсы</Text>
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 8 }}>
          <Text numberOfLines={1} style={[styles.caseHeaderTitle, { color: theme.textPrimary }]}>
            {caseItem.name}
          </Text>
          <Text numberOfLines={1} style={[styles.caseHeaderSub, { color: theme.textSecondary }]}>
            {caseItem.subtitle}
          </Text>
        </View>

        <View style={[styles.pricePill, { backgroundColor: theme.surfaceBg }]}>
          <Text style={styles.pricePillText}>${caseItem.price.toFixed(2)}</Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ==================== UPPER CS2 STAGE (CASE / ROULETTE / RESULT) ==================== */}
        <View
          style={[
            styles.stageContainer,
            {
              backgroundColor: theme.cardBg,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          {stageState === 'idle' && (
            <View style={styles.idleStageBox}>
              <Image
                source={{ uri: caseItem.image }}
                style={styles.heroCaseImage}
                resizeMode="contain"
              />
              <Text style={[styles.idleHintText, { color: theme.textSecondary }]}>
                Нажмите «Разблокировать контейнер» снизу, чтобы открыть кейс
              </Text>
            </View>
          )}

          {stageState === 'spinning' && (
            <View style={styles.spinningStageBox}>
              {strips.map((strip, sIdx) => (
                <View
                  key={sIdx}
                  style={[
                    styles.trackContainer,
                    isCompactMulti && styles.trackContainerCompact,
                    {
                      backgroundColor: theme.isLight ? '#F3F4F6' : '#14161B',
                      borderColor: theme.cardBorder,
                    },
                  ]}
                >
                  {/* Center CS2 Vertical Marker Line */}
                  <View style={styles.centerMarkerLine} />

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
                      const isGoldMystery = item.rarity === 'gold';
                      return (
                        <View
                          key={`${item.instanceId}_${idx}`}
                          style={[
                            styles.rouletteCard,
                            isCompactMulti && styles.rouletteCardCompact,
                            {
                              backgroundColor: theme.skinCardBg,
                              borderColor: theme.cardBorder,
                            },
                          ]}
                        >
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
                            <Text
                              numberOfLines={1}
                              style={[styles.rWeapon, { color: theme.textSecondary }]}
                            >
                              {isGoldMystery ? '★ Особый предмет' : item.weapon}
                            </Text>
                            <Text
                              numberOfLines={1}
                              style={[styles.rName, { color: theme.textPrimary }]}
                            >
                              {isGoldMystery ? 'Нож / Перчатки' : item.name}
                            </Text>
                            <View style={[styles.rBottomBar, { backgroundColor: r.color }]} />
                          </View>
                        </View>
                      );
                    })}
                  </Animated.View>
                </View>
              ))}
            </View>
          )}

          {stageState === 'result' && wonSkins.length > 0 && (
            <View style={styles.resultStageBox}>
              <Text style={[styles.resultHeaderLabel, { color: theme.textSecondary }]}>
                ПОЛУЧЕНО ПРЕДМЕТОВ: {wonSkins.length} • НА СУММУ ${totalWonPrice.toFixed(2)}
              </Text>

              {wonSkins.length === 1 ? (
                <View style={styles.singleDropShowcase}>
                  <View style={styles.singleDropBadges}>
                    <View
                      style={[
                        styles.rarityTagPill,
                        { backgroundColor: RARITIES[wonSkins[0].rarity].color },
                      ]}
                    >
                      <Text style={styles.rarityTagPillText}>
                        {RARITIES[wonSkins[0].rarity].name}
                      </Text>
                    </View>
                    {wonSkins[0].statTrak && (
                      <View style={styles.stTagPill}>
                        <Text style={styles.stTagPillText}>StatTrak™</Text>
                      </View>
                    )}
                    <View style={[styles.wearTagPill, { backgroundColor: theme.surfaceBg }]}>
                      <Text style={[styles.wearTagPillText, { color: theme.textSecondary }]}>
                        {wonSkins[0].wearName}
                      </Text>
                    </View>
                  </View>

                  <Image
                    source={{ uri: wonSkins[0].image }}
                    style={styles.singleDropImg}
                    resizeMode="contain"
                  />

                  <Text style={[styles.singleDropTitle, { color: theme.textPrimary }]}>
                    {wonSkins[0].weapon} | {wonSkins[0].name}
                  </Text>
                  {!wonSkins[0].isSticker && (
                    <Text style={[styles.singleDropFloat, { color: theme.textMuted }]}>
                      Float: {wonSkins[0].floatValue.toFixed(6)}
                    </Text>
                  )}
                  <Text style={styles.singleDropPrice}>
                    ${wonSkins[0].price.toFixed(2)}
                  </Text>
                </View>
              ) : (
                <View style={{ width: '100%', marginVertical: 8 }}>
                  {wonSkins.map((skin) => {
                    const r = RARITIES[skin.rarity];
                    return (
                      <TouchableOpacity
                        key={skin.instanceId}
                        onPress={() => onInspectDrop(skin)}
                        style={[
                          styles.multiDropItemRow,
                          {
                            backgroundColor: theme.surfaceBg,
                            borderLeftColor: r.color,
                          },
                        ]}
                      >
                        <Image
                          source={{ uri: skin.image }}
                          style={styles.multiDropImg}
                          resizeMode="contain"
                        />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                          <Text
                            numberOfLines={1}
                            style={[styles.multiDropName, { color: theme.textPrimary }]}
                          >
                            {skin.statTrak ? 'StatTrak™ ' : ''}
                            {skin.weapon} | {skin.name}
                          </Text>
                          <Text style={{ color: theme.textSecondary, fontSize: 10 }}>
                            {r.name} • {skin.wear}
                          </Text>
                        </View>
                        <Text style={styles.multiDropPrice}>${skin.price.toFixed(2)}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}

              {/* Post-Drop Action Row */}
              <View style={styles.resultActionsRow}>
                <TouchableOpacity
                  style={[styles.resultSecondaryBtn, { backgroundColor: theme.surfaceBg }]}
                  onPress={() => setStageState('idle')}
                >
                  <Text style={[styles.resultSecondaryBtnText, { color: theme.textPrimary }]}>
                    В СКЛАД (ГОТОВО)
                  </Text>
                </TouchableOpacity>

                {wonSkins.length === 1 && (
                  <TouchableOpacity
                    style={[styles.resultSecondaryBtn, { backgroundColor: theme.surfaceBg }]}
                    onPress={() => onInspectDrop(wonSkins[0])}
                  >
                    <Text style={[styles.resultSecondaryBtnText, { color: theme.textPrimary }]}>
                      3D ОСМОТР
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.resultSellBtn}
                  onPress={() => {
                    onSellDrops(wonSkins);
                    setStageState('idle');
                  }}
                >
                  <Text style={styles.resultSellBtnText}>
                    ПРОДАТЬ (${totalWonPrice.toFixed(2)})
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* ==================== CASE CONTENTS GRID (КАК В CS2) ==================== */}
        <View style={styles.contentsHeaderRow}>
          <Text style={[styles.contentsTitle, { color: theme.textPrimary }]}>
            СОДЕРЖИМОЕ КОНТЕЙНЕРА ({caseItem.items.length})
          </Text>
          {goldSkins.length > 0 && (
            <TouchableOpacity
              onPress={() => setShowGoldList((v) => !v)}
              style={styles.goldFilterPill}
            >
              <Text style={styles.goldFilterPillText}>
                {showGoldList
                  ? 'Показать обычные скины'
                  : `★ Особые предметы (${goldSkins.length})`}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.skinsGrid}>
          {!showGoldList ? (
            <>
              {regularSkins.map((skin) => (
                <SkinCard
                  key={skin.id}
                  item={skin}
                  themeMode={themeMode}
                  onPress={() => onPreviewTemplate(skin, caseItem.category)}
                />
              ))}

              {/* Special Gold Mystery Tile (just like in CS2!) */}
              {goldSkins.length > 0 && (
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setShowGoldList(true)}
                  style={[
                    styles.goldSpecialCard,
                    {
                      backgroundColor: theme.skinCardBg,
                      borderColor: theme.cardBorder,
                    },
                  ]}
                >
                  <View style={styles.goldCircleIcon}>
                    <MaterialCommunityIcons
                      name="knife-military"
                      size={28}
                      color="#EAB308"
                    />
                  </View>
                  <Text style={[styles.goldSpecialTitle, { color: theme.textPrimary }]}>
                    ★ Редкий особый предмет
                  </Text>
                  <Text style={[styles.goldSpecialSub, { color: theme.textSecondary }]}>
                    Ножи / Перчатки ({goldSkins.length} шт.)
                  </Text>
                  <View style={[styles.rBottomBar, { backgroundColor: '#EAB308', width: '100%' }]} />
                </TouchableOpacity>
              )}
            </>
          ) : (
            goldSkins.map((skin) => (
              <SkinCard
                key={skin.id}
                item={skin}
                themeMode={themeMode}
                onPress={() => onPreviewTemplate(skin, caseItem.category)}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* ==================== STICKY BOTTOM CS2 UNLOCK BAR ==================== */}
      <View
        style={[
          styles.bottomUnlockBar,
          {
            backgroundColor: theme.tabBarBg,
            borderColor: theme.cardBorder,
          },
        ]}
      >
        <View style={styles.controlsTopRow}>
          <View style={styles.multiPillsRow}>
            {[1, 2, 3, 4, 5].map((cnt) => {
              const active = openCount === cnt;
              return (
                <TouchableOpacity
                  key={cnt}
                  disabled={stageState === 'spinning'}
                  onPress={() => {
                    playClickSound();
                    setOpenCount(cnt);
                  }}
                  style={[
                    styles.countPill,
                    {
                      backgroundColor: active ? '#16A34A' : theme.surfaceBg,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.countPillText,
                      { color: active ? '#FFFFFF' : theme.textSecondary },
                    ]}
                  >
                    x{cnt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            onPress={handleSpeedUpActiveSpin}
            style={[
              styles.fastPillBtn,
              {
                backgroundColor: fastSpin ? '#EAB308' : theme.surfaceBg,
              },
            ]}
          >
            <Ionicons
              name="flash"
              size={13}
              color={fastSpin ? '#111827' : theme.textSecondary}
            />
            <Text
              style={[
                styles.fastPillText,
                { color: fastSpin ? '#111827' : theme.textSecondary },
              ]}
            >
              Быстро
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          disabled={stageState === 'spinning'}
          onPress={handleUnlockContainer}
          style={[
            styles.cs2GreenUnlockBtn,
            stageState === 'spinning' && { opacity: 0.6 },
          ]}
        >
          <Text style={styles.cs2GreenUnlockText}>
            {stageState === 'spinning'
              ? 'ОТКРЫВАЕМ КОНТЕЙНЕР...'
              : `РАЗБЛОКИРОВАТЬ КОНТЕЙНЕР (x${openCount}) • $${totalOpenCost.toFixed(2)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Keep CaseRouletteModal for backward compatibility if needed
export const CaseRouletteModal: React.FC<any> = () => null;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
  },
  backBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  caseHeaderTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  caseHeaderSub: {
    fontSize: 11,
    marginTop: 1,
  },
  pricePill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  pricePillText: {
    color: '#16A34A',
    fontSize: 13,
    fontWeight: '800',
  },
  stageContainer: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 14,
    minHeight: 205,
    justifyContent: 'center',
    alignItems: 'center',
  },
  idleStageBox: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  heroCaseImage: {
    width: 190,
    height: 145,
  },
  idleHintText: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  spinningStageBox: {
    width: '100%',
    alignItems: 'center',
  },
  trackContainer: {
    width: TRACK_WIDTH,
    height: 152,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 6,
  },
  trackContainerCompact: {
    height: 98,
    marginBottom: 5,
  },
  centerMarkerLine: {
    position: 'absolute',
    left: TRACK_WIDTH / 2 - 1,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#EAB308',
    zIndex: 20,
  },
  stripRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rouletteCard: {
    width: CARD_WIDTH,
    height: 134,
    marginHorizontal: CARD_MARGIN,
    borderRadius: 10,
    borderWidth: 1,
    padding: 8,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  rouletteCardCompact: {
    height: 86,
    padding: 6,
  },
  rouletteImg: {
    width: '100%',
    height: 78,
  },
  rouletteImgCompact: {
    width: '100%',
    height: 44,
  },
  goldMysteryBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(234, 179, 8, 0.14)',
    borderRadius: 8,
  },
  goldStarText: {
    color: '#EAB308',
    fontSize: 24,
    fontWeight: '900',
  },
  goldMysteryLabel: {
    color: '#EAB308',
    fontSize: 8,
    fontWeight: '800',
  },
  rWeapon: {
    fontSize: 9,
    fontWeight: '600',
  },
  rName: {
    fontSize: 11,
    fontWeight: '700',
  },
  rBottomBar: {
    height: 3,
    borderRadius: 1.5,
    marginTop: 4,
  },
  resultStageBox: {
    width: '100%',
    alignItems: 'center',
  },
  resultHeaderLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  singleDropShowcase: {
    alignItems: 'center',
    marginVertical: 8,
  },
  singleDropBadges: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 6,
  },
  rarityTagPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  rarityTagPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  stTagPill: {
    backgroundColor: 'rgba(249, 115, 22, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  stTagPillText: {
    color: '#F97316',
    fontSize: 10,
    fontWeight: '800',
  },
  wearTagPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  wearTagPillText: {
    fontSize: 10,
    fontWeight: '700',
  },
  singleDropImg: {
    width: 210,
    height: 135,
    marginVertical: 4,
  },
  singleDropTitle: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  singleDropFloat: {
    fontSize: 11,
    marginTop: 2,
  },
  singleDropPrice: {
    color: '#16A34A',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 4,
  },
  multiDropItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 9,
    borderRadius: 10,
    borderLeftWidth: 4,
    marginBottom: 6,
  },
  multiDropImg: {
    width: 56,
    height: 40,
  },
  multiDropName: {
    fontSize: 12,
    fontWeight: '700',
  },
  multiDropPrice: {
    color: '#16A34A',
    fontSize: 13,
    fontWeight: '800',
  },
  resultActionsRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    marginTop: 8,
  },
  resultSecondaryBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },
  resultSecondaryBtnText: {
    fontSize: 11,
    fontWeight: '800',
  },
  resultSellBtn: {
    flex: 1,
    backgroundColor: '#16A34A',
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },
  resultSellBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  contentsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 6,
  },
  contentsTitle: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  goldFilterPill: {
    backgroundColor: 'rgba(234, 179, 8, 0.16)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  goldFilterPillText: {
    color: '#D97706',
    fontSize: 11,
    fontWeight: '800',
  },
  skinsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  goldSpecialCard: {
    width: '48.4%',
    borderRadius: 12,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 148,
  },
  goldCircleIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(234, 179, 8, 0.14)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  goldSpecialTitle: {
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 8,
  },
  goldSpecialSub: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomUnlockBar: {
    position: 'absolute',
    bottom: 68,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
  },
  controlsTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  multiPillsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  countPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  countPillText: {
    fontSize: 12,
    fontWeight: '800',
  },
  fastPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  fastPillText: {
    fontSize: 11,
    fontWeight: '800',
  },
  cs2GreenUnlockBtn: {
    backgroundColor: '#16A34A',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  cs2GreenUnlockText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
});
