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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  AutoSellThreshold,
  CaseContainer,
  CatalogCategory,
  InventoryItem,
  RARITIES,
  RarityKey,
  SkinTemplate,
  ThemeMode,
} from '../types/cs2';
import { rollSkinFromCase } from '../data/cs2Database';
import {
  playCS2GoldFanfare,
  playCS2ItemLock,
  playClickSound,
  playDropSound,
  playTickSound,
} from '../utils/soundManager';
import { SkinCard, THEMES } from './LiquidGlassUI';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRACK_WIDTH = Math.min(SCREEN_WIDTH - 20, 420);
const CARD_WIDTH = 154;
const CARD_MARGIN = 6;
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

const AUTO_SELL_OPTIONS: { key: AutoSellThreshold; label: string; desc: string; color: string }[] = [
  { key: 'milspec', label: 'Армейское и ниже', desc: 'Авто-продажа синих скинов', color: '#4B69FF' },
  { key: 'restricted', label: 'Запрещённое и ниже', desc: 'Армейское + Запрещённое (синее и фиолетовое)', color: '#8847FF' },
  { key: 'classified', label: 'Засекреченное и ниже', desc: 'Все скины вплоть до розовых', color: '#D32CE6' },
  { key: 'all_except_gold', label: 'Всё кроме Ножей (★ Gold)', desc: 'Продавать абсолютно всё, кроме ★ Ножей/Перчаток', color: '#FFD700' },
  { key: 'none', label: 'Не продавать', desc: 'Все выбитые скины сохранять в инвентарь', color: '#9CA3AF' },
];

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
  onAutoSellDrops?: (wonItems: InventoryItem[]) => void;
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
  onAutoSellDrops,
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

  // New Toggles
  const [autoOpen, setAutoOpen] = useState<boolean>(false);
  const [autoSell, setAutoSell] = useState<boolean>(false);
  const [autoSellThreshold, setAutoSellThreshold] = useState<AutoSellThreshold>('milspec');
  const [autoSellModalOpen, setAutoSellModalOpen] = useState<boolean>(false);
  const [autoSoldItems, setAutoSoldItems] = useState<InventoryItem[]>([]);

  const autoOpenRef = useRef(false);
  const autoOpenTimerRef = useRef<any>(null);
  const balanceRef = useRef(balance);

  useEffect(() => {
    balanceRef.current = balance;
  }, [balance]);

  useEffect(() => {
    autoOpenRef.current = autoOpen;
    if (!autoOpen && autoOpenTimerRef.current) {
      clearTimeout(autoOpenTimerRef.current);
      autoOpenTimerRef.current = null;
    }
  }, [autoOpen]);

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
      if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
      scrollAnims.forEach((a) => a.removeAllListeners());
    };
  }, []);

  const shouldAutoSell = (item: InventoryItem) => {
    if (!autoSell) return false;
    if (autoSellThreshold === 'none') return false;
    if (autoSellThreshold === 'milspec') return item.rarity === 'milspec';
    if (autoSellThreshold === 'restricted') return item.rarity === 'milspec' || item.rarity === 'restricted';
    if (autoSellThreshold === 'classified') return item.rarity === 'milspec' || item.rarity === 'restricted' || item.rarity === 'classified';
    if (autoSellThreshold === 'all_except_gold') return item.rarity !== 'gold';
    return false;
  };

  const finishOpening = (winners: InventoryItem[]) => {
    scrollAnims.forEach((a) => a.removeAllListeners());
    setStageState('result');

    const hasGold = winners.some((w) => w.rarity === 'gold');
    const hasUltraRare = winners.some((w) => w.rarity === 'gold' || w.rarity === 'covert');

    if (hasGold) {
      playCS2GoldFanfare();
    } else {
      playCS2ItemLock();
      playDropSound(hasUltraRare);
    }

    const toSell = winners.filter(shouldAutoSell);
    const toKeep = winners.filter((w) => !shouldAutoSell(w));

    setAutoSoldItems(toSell);

    if (toSell.length > 0) {
      if (onAutoSellDrops) {
        onAutoSellDrops(toSell);
      } else {
        onSellDrops(toSell);
      }
    }
    if (toKeep.length > 0) {
      onCompleteDrops(toKeep);
    }

    // Auto-Open Next Case Trigger
    if (autoOpenRef.current) {
      const nextDelay = fastSpin ? 550 : 1600;
      autoOpenTimerRef.current = setTimeout(() => {
        if (autoOpenRef.current) {
          const totalCost = Number((caseItem.price * openCount).toFixed(2));
          if (balanceRef.current >= totalCost) {
            handleUnlockContainer();
          } else {
            setAutoOpen(false);
          }
        }
      }, nextDelay);
    }
  };

  const handleUnlockContainer = () => {
    if (stageState === 'spinning') return;
    const totalCost = Number((caseItem.price * openCount).toFixed(2));
    const ok = onTrySpendBalance(totalCost, openCount);
    if (!ok) {
      setAutoOpen(false);
      return;
    }

    setStageState('spinning');
    setAcceleratedThisSpin(fastSpin);
    setAutoSoldItems([]);
    lastTickIndex.current = -1;

    const allStrips: InventoryItem[][] = [];
    const winners: InventoryItem[] = [];
    const animations: Animated.CompositeAnimation[] = [];

    const centerOffset = TRACK_WIDTH / 2 - ITEM_SPAN / 2;
    const baseDuration = fastSpin ? 1650 : 4400;
    const cascadeDelay = fastSpin ? 70 : 160;

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
        duration: 650 + s * 40,
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

  const handleStopAutoOpen = () => {
    playClickSound();
    setAutoOpen(false);
    if (autoOpenTimerRef.current) {
      clearTimeout(autoOpenTimerRef.current);
      autoOpenTimerRef.current = null;
    }
  };

  const regularSkins = [...caseItem.items]
    .filter((s) => s.rarity !== 'gold')
    .sort((a, b) => RARITY_SORT_ORDER[a.rarity] - RARITY_SORT_ORDER[b.rarity]);

  const goldSkins = [...caseItem.items].filter((s) => s.rarity === 'gold');

  const totalWonPrice = wonSkins.reduce((acc, s) => acc + s.price, 0);
  const totalOpenCost = Number((caseItem.price * openCount).toFixed(2));
  const isCompactMulti = openCount >= 3;

  const currentThresholdObj = AUTO_SELL_OPTIONS.find((o) => o.key === autoSellThreshold) || AUTO_SELL_OPTIONS[0];

  return (
    <View style={[styles.rootContainer, { backgroundColor: theme.bgGradient[0] }]}>
      {/* ==================== CS2 CASE HEADER ==================== */}
      <View
        style={[
          styles.caseHeader,
          {
            backgroundColor: theme.headerBg,
            borderColor: theme.cardBorder,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            handleStopAutoOpen();
            onBack();
          }}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={20} color={theme.textPrimary} />
        </TouchableOpacity>

        <View style={{ flex: 1, marginHorizontal: 8 }}>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={[styles.caseHeaderTitle, { color: theme.textPrimary }]}
          >
            {caseItem.name}
          </Text>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={[styles.caseHeaderSub, { color: theme.textSecondary }]}
          >
            {caseItem.subtitle || 'Контейнер со скинами CS2'}
          </Text>
        </View>

        <View style={[styles.pricePill, { backgroundColor: theme.surfaceBg }]}>
          <Text allowFontScaling={false} style={styles.pricePillText}>
            ${caseItem.price.toFixed(2)}
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 12, paddingBottom: 175 }}
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
              <Text
                allowFontScaling={false}
                style={[styles.idleHintText, { color: theme.textSecondary }]}
              >
                Нажмите «Разблокировать контейнер» снизу для открытия
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
                      backgroundColor: theme.isLight ? '#F3F4F6' : '#11141C',
                      borderColor: theme.cardBorder,
                    },
                  ]}
                >
                  {/* Center CS2 Vertical Marker & Golden Pointers */}
                  <View style={styles.centerMarkerLine} />
                  <View style={styles.topPointer} />
                  <View style={styles.bottomPointer} />

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
                              allowFontScaling={false}
                              numberOfLines={1}
                              style={[styles.rWeapon, { color: theme.textSecondary }]}
                            >
                              {isGoldMystery ? '★ Особый предмет' : item.weapon}
                            </Text>
                            <Text
                              allowFontScaling={false}
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
              <Text
                allowFontScaling={false}
                style={[styles.resultHeaderLabel, { color: theme.textSecondary }]}
              >
                ВЫПАЛО: {wonSkins.length} ПРЕДМ. • СУММА ${totalWonPrice.toFixed(2)}
              </Text>

              {/* Auto-Sold Notification Banner */}
              {autoSoldItems.length > 0 && (
                <View style={styles.autoSoldAlertBanner}>
                  <Ionicons name="flash" size={14} color="#16A34A" />
                  <Text allowFontScaling={false} style={styles.autoSoldAlertText}>
                    Авто-продано в баланс: {autoSoldItems.length} шт. (+${autoSoldItems.reduce((acc, i) => acc + i.price, 0).toFixed(2)})
                  </Text>
                </View>
              )}

              {wonSkins.length === 1 ? (
                <View style={styles.singleDropShowcase}>
                  <View style={styles.singleDropBadges}>
                    <View
                      style={[
                        styles.rarityTagPill,
                        { backgroundColor: RARITIES[wonSkins[0].rarity].color },
                      ]}
                    >
                      <Text allowFontScaling={false} style={styles.rarityTagPillText}>
                        {RARITIES[wonSkins[0].rarity].name}
                      </Text>
                    </View>
                    {wonSkins[0].statTrak && (
                      <View style={styles.stTagPill}>
                        <Text allowFontScaling={false} style={styles.stTagPillText}>StatTrak™</Text>
                      </View>
                    )}
                    <View style={[styles.wearTagPill, { backgroundColor: theme.surfaceBg }]}>
                      <Text
                        allowFontScaling={false}
                        style={[styles.wearTagPillText, { color: theme.textSecondary }]}
                      >
                        {wonSkins[0].wearName}
                      </Text>
                    </View>
                  </View>

                  <Image
                    source={{ uri: wonSkins[0].image }}
                    style={styles.singleDropImg}
                    resizeMode="contain"
                  />

                  <Text
                    allowFontScaling={false}
                    numberOfLines={1}
                    style={[styles.singleDropTitle, { color: theme.textPrimary }]}
                  >
                    {wonSkins[0].weapon} | {wonSkins[0].name}
                  </Text>
                  {!wonSkins[0].isSticker && (
                    <Text
                      allowFontScaling={false}
                      style={[styles.singleDropFloat, { color: theme.textMuted }]}
                    >
                      Float: {wonSkins[0].floatValue.toFixed(6)}
                    </Text>
                  )}
                  <Text allowFontScaling={false} style={styles.singleDropPrice}>
                    ${wonSkins[0].price.toFixed(2)}
                  </Text>
                </View>
              ) : (
                <View style={{ width: '100%', marginVertical: 8 }}>
                  {wonSkins.map((skin) => {
                    const r = RARITIES[skin.rarity];
                    const wasSold = autoSoldItems.some((s) => s.instanceId === skin.instanceId);
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
                            allowFontScaling={false}
                            numberOfLines={1}
                            style={[styles.multiDropName, { color: theme.textPrimary }]}
                          >
                            {skin.statTrak ? 'StatTrak™ ' : ''}
                            {skin.weapon} | {skin.name}
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={{ color: theme.textSecondary, fontSize: 10 }}
                          >
                            {r.name} • {skin.wear}
                          </Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                          <Text allowFontScaling={false} style={styles.multiDropPrice}>
                            ${skin.price.toFixed(2)}
                          </Text>
                          {wasSold && (
                            <Text style={styles.soldBadgeSmall}>[ПРОДАНО]</Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}

              {/* Post-Drop Action Row */}
              <View style={styles.resultActionsRow}>
                <TouchableOpacity
                  style={[styles.resultSecondaryBtn, { backgroundColor: theme.surfaceBg }]}
                  onPress={() => {
                    handleStopAutoOpen();
                    setStageState('idle');
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={[styles.resultSecondaryBtnText, { color: theme.textPrimary }]}
                  >
                    В СКЛАД
                  </Text>
                </TouchableOpacity>

                {wonSkins.length === 1 && (
                  <TouchableOpacity
                    style={[styles.resultSecondaryBtn, { backgroundColor: theme.surfaceBg }]}
                    onPress={() => onInspectDrop(wonSkins[0])}
                  >
                    <Text
                      allowFontScaling={false}
                      style={[styles.resultSecondaryBtnText, { color: theme.textPrimary }]}
                    >
                      3D ОСМОТР
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.resultSellBtn}
                  onPress={() => {
                    handleStopAutoOpen();
                    onSellDrops(wonSkins);
                    setStageState('idle');
                  }}
                >
                  <Text allowFontScaling={false} style={styles.resultSellBtnText}>
                    ПРОДАТЬ (${totalWonPrice.toFixed(2)})
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* ==================== CASE CONTENTS GRID (КАК В CS2) ==================== */}
        <View style={styles.contentsHeaderRow}>
          <Text
            allowFontScaling={false}
            style={[styles.contentsTitle, { color: theme.textPrimary }]}
          >
            СОДЕРЖИМОЕ ({caseItem.items.length})
          </Text>
          {goldSkins.length > 0 && (
            <TouchableOpacity
              onPress={() => setShowGoldList((v) => !v)}
              style={styles.goldFilterPill}
            >
              <Text allowFontScaling={false} style={styles.goldFilterPillText}>
                {showGoldList
                  ? 'Обычные скины'
                  : `★ Ножи / Перчатки (${goldSkins.length})`}
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

              {/* Special Gold Mystery Tile */}
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
                      size={32}
                      color="#EAB308"
                    />
                  </View>
                  <Text
                    allowFontScaling={false}
                    style={[styles.goldSpecialTitle, { color: theme.textPrimary }]}
                  >
                    ★ Редкий особый предмет
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[styles.goldSpecialSub, { color: theme.textSecondary }]}
                  >
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
        {/* ROW 1: MULTI OPEN PILLS + FAST SPIN */}
        <View style={styles.controlsTopRow}>
          <View style={styles.multiPillsRow}>
            {[1, 2, 3, 4, 5].map((cnt) => {
              const active = openCount === cnt;
              return (
                <TouchableOpacity
                  key={cnt}
                  disabled={stageState === 'spinning' || autoOpen}
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
                    allowFontScaling={false}
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
              allowFontScaling={false}
              style={[
                styles.fastPillText,
                { color: fastSpin ? '#111827' : theme.textSecondary },
              ]}
            >
              Быстро
            </Text>
          </TouchableOpacity>
        </View>

        {/* ROW 2: DUAL TOGGLES (АВТО-ОТКРЫТИЕ & АВТО-ПРОДАЖА) */}
        <View style={styles.dualTogglesRow}>
          {/* 1. Авто-открытие тумблер */}
          <TouchableOpacity
            onPress={() => {
              playClickSound();
              if (autoOpen) {
                handleStopAutoOpen();
              } else {
                setAutoOpen(true);
                if (stageState === 'idle') {
                  handleUnlockContainer();
                }
              }
            }}
            style={[
              styles.togglePillBtn,
              {
                backgroundColor: autoOpen ? '#16A34A' : theme.surfaceBg,
                borderColor: autoOpen ? '#22C55E' : theme.cardBorder,
              },
            ]}
          >
            <Ionicons
              name="sync-circle-outline"
              size={14}
              color={autoOpen ? '#FFFFFF' : theme.textSecondary}
            />
            <Text
              allowFontScaling={false}
              style={[
                styles.togglePillText,
                { color: autoOpen ? '#FFFFFF' : theme.textPrimary },
              ]}
            >
              Авто: {autoOpen ? 'ВКЛ ⚡' : 'ВЫКЛ'}
            </Text>
          </TouchableOpacity>

          {/* 2. Авто-продажа тумблер + настройка качества */}
          <View style={styles.autoSellGroup}>
            <TouchableOpacity
              onPress={() => {
                playClickSound();
                setAutoSell((v) => !v);
              }}
              style={[
                styles.togglePillBtn,
                {
                  backgroundColor: autoSell ? '#2563EB' : theme.surfaceBg,
                  borderColor: autoSell ? '#3B82F6' : theme.cardBorder,
                  flex: 1,
                },
              ]}
            >
              <Ionicons
                name="cash-outline"
                size={14}
                color={autoSell ? '#FFFFFF' : theme.textSecondary}
              />
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                style={[
                  styles.togglePillText,
                  { color: autoSell ? '#FFFFFF' : theme.textPrimary },
                ]}
              >
                Авто-продажа: {autoSell ? 'ВКЛ' : 'ВЫКЛ'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                playClickSound();
                setAutoSellModalOpen(true);
              }}
              style={[
                styles.gearThresholdBtn,
                {
                  backgroundColor: theme.surfaceBg,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[styles.gearThresholdLabel, { color: currentThresholdObj.color }]}
              >
                {currentThresholdObj.label.split(' ')[0]}
              </Text>
              <Ionicons name="options-outline" size={13} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* MAIN BIG ACTION / UNLOCK / STOP BUTTON */}
        {autoOpen ? (
          <TouchableOpacity
            onPress={handleStopAutoOpen}
            style={styles.stopAutoOpenBtn}
          >
            <Ionicons name="stop-circle" size={18} color="#FFFFFF" />
            <Text allowFontScaling={false} style={styles.stopAutoOpenBtnText}>
              СТОП АВТО-ОТКРЫТИЕ
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={stageState === 'spinning'}
            onPress={handleUnlockContainer}
            style={[
              styles.cs2GreenUnlockBtn,
              stageState === 'spinning' && { opacity: 0.6 },
            ]}
          >
            <Text allowFontScaling={false} style={styles.cs2GreenUnlockText}>
              {stageState === 'spinning'
                ? 'ОТКРЫВАЕМ КОНТЕЙНЕР...'
                : `РАЗБЛОКИРОВАТЬ (x${openCount}) • $${totalOpenCost.toFixed(2)}`}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ==================== AUTO-SELL THRESHOLD MODAL ==================== */}
      <Modal
        visible={autoSellModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setAutoSellModalOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: theme.cardBg,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <View>
                <Text
                  allowFontScaling={false}
                  style={[styles.modalTitle, { color: theme.textPrimary }]}
                >
                  Настройка авто-продажи
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[styles.modalSubtitle, { color: theme.textSecondary }]}
                >
                  Выберите, какое качество скинов сразу продавать
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setAutoSellModalOpen(false)}
                style={styles.modalCloseBtn}
              >
                <Ionicons name="close" size={20} color={theme.textPrimary} />
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 12, gap: 8 }}>
              {AUTO_SELL_OPTIONS.map((opt) => {
                const active = autoSellThreshold === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    onPress={() => {
                      playClickSound();
                      setAutoSellThreshold(opt.key);
                      setAutoSell(opt.key !== 'none');
                      setAutoSellModalOpen(false);
                    }}
                    style={[
                      styles.thresholdOptionRow,
                      {
                        backgroundColor: theme.surfaceBg,
                        borderColor: active ? opt.color : theme.cardBorder,
                        borderWidth: active ? 2 : 1,
                      },
                    ]}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        allowFontScaling={false}
                        style={[styles.thresholdOptionTitle, { color: opt.color }]}
                      >
                        {opt.label}
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={[styles.thresholdOptionDesc, { color: theme.textSecondary }]}
                      >
                        {opt.desc}
                      </Text>
                    </View>
                    {active && (
                      <Ionicons name="checkmark-circle" size={20} color={opt.color} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Keep CaseRouletteModal export for backward compatibility
export const CaseRouletteModal: React.FC<any> = () => null;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  caseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  backBtn: {
    padding: 6,
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
    padding: 12,
    marginBottom: 14,
    minHeight: 230,
    justifyContent: 'center',
    alignItems: 'center',
  },
  idleStageBox: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  heroCaseImage: {
    width: 250,
    height: 185,
  },
  idleHintText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  spinningStageBox: {
    width: '100%',
    alignItems: 'center',
  },
  trackContainer: {
    width: TRACK_WIDTH,
    height: 184,
    borderRadius: 12,
    borderWidth: 1.5,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 8,
  },
  trackContainerCompact: {
    height: 110,
    marginBottom: 6,
  },
  centerMarkerLine: {
    position: 'absolute',
    left: TRACK_WIDTH / 2 - 1.5,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: '#EAB308',
    zIndex: 20,
    shadowColor: '#EAB308',
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },
  topPointer: {
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
    borderTopColor: '#EAB308',
    zIndex: 22,
  },
  bottomPointer: {
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
    borderBottomColor: '#EAB308',
    zIndex: 22,
  },
  stripRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rouletteCard: {
    width: CARD_WIDTH,
    height: 164,
    marginHorizontal: CARD_MARGIN,
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 10,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  rouletteCardCompact: {
    height: 98,
    padding: 6,
  },
  rouletteImg: {
    width: '100%',
    height: 104,
  },
  rouletteImgCompact: {
    width: '100%',
    height: 52,
  },
  goldMysteryBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(234, 179, 8, 0.16)',
    borderRadius: 8,
  },
  goldStarText: {
    color: '#EAB308',
    fontSize: 28,
    fontWeight: '900',
  },
  goldMysteryLabel: {
    color: '#EAB308',
    fontSize: 9,
    fontWeight: '800',
  },
  rWeapon: {
    fontSize: 10,
    fontWeight: '600',
  },
  rName: {
    fontSize: 12,
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
    marginBottom: 6,
  },
  autoSoldAlertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(22, 163, 74, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(22, 163, 74, 0.3)',
  },
  autoSoldAlertText: {
    color: '#22C55E',
    fontSize: 11,
    fontWeight: '700',
  },
  singleDropShowcase: {
    alignItems: 'center',
    width: '100%',
  },
  singleDropBadges: {
    flexDirection: 'row',
    gap: 6,
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
    backgroundColor: '#F97316',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  stTagPillText: {
    color: '#FFFFFF',
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
    width: 270,
    height: 180,
    marginVertical: 6,
  },
  singleDropTitle: {
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
  },
  singleDropFloat: {
    fontSize: 10,
    marginTop: 2,
  },
  singleDropPrice: {
    fontSize: 20,
    fontWeight: '900',
    color: '#16A34A',
    marginTop: 4,
  },
  multiDropItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    marginBottom: 6,
  },
  multiDropImg: {
    width: 48,
    height: 38,
  },
  multiDropName: {
    fontSize: 12,
    fontWeight: '700',
  },
  multiDropPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#16A34A',
  },
  soldBadgeSmall: {
    fontSize: 9,
    fontWeight: '800',
    color: '#22C55E',
    marginTop: 2,
  },
  resultActionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    width: '100%',
  },
  resultSecondaryBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultSecondaryBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  resultSellBtn: {
    flex: 1.5,
    backgroundColor: '#16A34A',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultSellBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  contentsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  contentsTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  goldFilterPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: 'rgba(234, 179, 8, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.4)',
  },
  goldFilterPillText: {
    color: '#EAB308',
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
    minHeight: 160,
  },
  goldCircleIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(234, 179, 8, 0.14)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  goldSpecialTitle: {
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
  },
  goldSpecialSub: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 8,
  },
  bottomUnlockBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 24,
    borderTopWidth: 1,
    gap: 8,
  },
  controlsTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  multiPillsRow: {
    flexDirection: 'row',
    gap: 5,
  },
  countPill: {
    width: 38,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 30,
    borderRadius: 8,
  },
  fastPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  dualTogglesRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  togglePillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  togglePillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  autoSellGroup: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  gearThresholdBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 32,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  gearThresholdLabel: {
    fontSize: 10,
    fontWeight: '800',
  },
  cs2GreenUnlockBtn: {
    backgroundColor: '#16A34A',
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#16A34A',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  cs2GreenUnlockText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  stopAutoOpenBtn: {
    backgroundColor: '#DC2626',
    height: 46,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#DC2626',
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 4,
  },
  stopAutoOpenBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  modalSubtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  modalCloseBtn: {
    padding: 4,
  },
  thresholdOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
  },
  thresholdOptionTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  thresholdOptionDesc: {
    fontSize: 11,
    marginTop: 2,
  },
});
