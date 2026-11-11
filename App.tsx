import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import {
  CaseContainer,
  CatalogCategory,
  InventoryItem,
  QuestDifficulty,
  QuestItem,
  RARITIES,
  RarityKey,
  SkinTemplate,
  ThemeMode,
  UserProfile,
} from './src/types/cs2';
import { INITIAL_CASES, INITIAL_QUESTS, instantiateSkin } from './src/data/cs2Database';
import {
  GameNotificationBanner,
  InGameNotification,
  LiquidGlassCard,
  SkinCard,
  THEMES,
} from './src/components/LiquidGlassUI';
import { CS2CaseScreen } from './src/components/CaseRouletteModal';
import { SkinInspectorModal } from './src/components/SkinInspectorModal';
import { MiniGamesHub, MiniGameTab } from './src/components/MiniGamesHub';
import {
  ACCOUNTS_REGISTRY_KEY,
  AuthScreen,
  decodeCloudSyncToken,
  encodeCloudSyncToken,
  StoredAccountRecord,
} from './src/components/AuthScreen';
import {
  DailyRewardModal,
  getRankByElo,
  LeaderboardSection,
} from './src/components/RankAndRewardsModal';
import { playClickSound, playWinSound, setSoundEnabled } from './src/utils/soundManager';

const STORAGE_KEY = '@cs2_liquid_glass_save_v3';

type BottomNavTab = 'cases' | 'inventory' | 'minigames' | 'quests' | 'profile' | 'settings';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [balance, setBalance] = useState<number>(25.0);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [quests, setQuests] = useState<QuestItem[]>(INITIAL_QUESTS);
  const [eloRating, setEloRating] = useState<number>(1000);
  const [streakDay, setStreakDay] = useState<number>(1);
  const [lastClaimDate, setLastClaimDate] = useState<string>('');
  const [dailyModalOpen, setDailyModalOpen] = useState<boolean>(false);

  // Default to CS2 Panorama Matte Dark ('obsidian'), switchable to Clean Light ('bright')
  const [themeMode, setThemeMode] = useState<ThemeMode>('obsidian');
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [fastSpin, setFastSpin] = useState<boolean>(false);
  const [showLiveTicker, setShowLiveTicker] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [notification, setNotification] = useState<InGameNotification | null>(null);
  const notifyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Navigation & Filters
  const [activeTab, setActiveTab] = useState<BottomNavTab>('cases');
  const [requestedMiniGame, setRequestedMiniGame] = useState<MiniGameTab>('lobby');
  const [catalogCategory, setCatalogCategory] = useState<CatalogCategory>('base_cases');
  const [caseSearchQuery, setCaseSearchQuery] = useState<string>('');
  const [casePriceSort, setCasePriceSort] = useState<'default' | 'asc' | 'desc'>('default');

  // Active Full-Screen CS2 Case View
  const [openedCaseScreen, setOpenedCaseScreen] = useState<CaseContainer | null>(null);

  const [inspectedSkin, setInspectedSkin] = useState<InventoryItem | null>(null);
  const [invFilter, setInvFilter] = useState<'all' | RarityKey>('all');
  const [invSort, setInvSort] = useState<'price_desc' | 'price_asc' | 'recent'>('price_desc');
  const [questFilter, setQuestFilter] = useState<'all' | QuestDifficulty>('all');
  const [importSyncInput, setImportSyncInput] = useState<string>('');

  const showNotify = (
    title: string,
    message: string,
    type: InGameNotification['type'] = 'info'
  ) => {
    if (notifyTimerRef.current) clearTimeout(notifyTimerRef.current);
    setNotification({
      id: String(Date.now()),
      title,
      message,
      type,
    });
    notifyTimerRef.current = setTimeout(() => {
      setNotification(null);
    }, 3800);
  };

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.user) setUser(parsed.user);
          if (typeof parsed.balance === 'number') setBalance(parsed.balance);
          if (Array.isArray(parsed.inventory)) setInventory(parsed.inventory);
          if (Array.isArray(parsed.quests) && parsed.quests.length >= INITIAL_QUESTS.length) {
            setQuests(parsed.quests);
          }
          if (typeof parsed.eloRating === 'number') setEloRating(parsed.eloRating);
          if (typeof parsed.streakDay === 'number') setStreakDay(parsed.streakDay);
          if (typeof parsed.lastClaimDate === 'string') setLastClaimDate(parsed.lastClaimDate);
          if (parsed.themeMode) setThemeMode(parsed.themeMode);
          if (typeof parsed.fastSpin === 'boolean') setFastSpin(parsed.fastSpin);
          if (typeof parsed.showLiveTicker === 'boolean') {
            setShowLiveTicker(parsed.showLiveTicker);
          }
          if (typeof parsed.soundOn === 'boolean') {
            setSoundOn(parsed.soundOn);
            setSoundEnabled(parsed.soundOn);
          }
        }
      } catch {}
      setIsLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const payload = JSON.stringify({
      user,
      balance,
      inventory,
      quests,
      eloRating,
      streakDay,
      lastClaimDate,
      themeMode,
      soundOn,
      fastSpin,
      showLiveTicker,
    });
    AsyncStorage.setItem(STORAGE_KEY, payload).catch(() => {});

    if (user?.email) {
      (async () => {
        try {
          const regRaw = await AsyncStorage.getItem(ACCOUNTS_REGISTRY_KEY);
          const reg: Record<string, StoredAccountRecord> = regRaw ? JSON.parse(regRaw) : {};
          reg[user.email.toLowerCase()] = {
            profile: user,
            balance,
            inventory,
            quests,
            eloRating,
            streakDay,
            lastClaimDate,
            updatedAt: Date.now(),
          };
          await AsyncStorage.setItem(ACCOUNTS_REGISTRY_KEY, JSON.stringify(reg));
        } catch {}
      })();
    }
  }, [
    user,
    balance,
    inventory,
    quests,
    eloRating,
    streakDay,
    lastClaimDate,
    themeMode,
    soundOn,
    fastSpin,
    showLiveTicker,
    isLoaded,
  ]);

  const todayKey = new Date().toISOString().slice(0, 10);
  const canClaimDaily = lastClaimDate !== todayKey;

  const handleClaimDailyBonus = (amount: number) => {
    if (!canClaimDaily) return;
    const scaledReward = Math.max(2.5, Number((amount * 0.2).toFixed(2)));
    setBalance((b) => Number((b + scaledReward).toFixed(2)));
    setLastClaimDate(todayKey);
    setStreakDay((d) => (d >= 7 ? 1 : d + 1));
    setEloRating((e) => e + 120);
    setDailyModalOpen(false);
    playWinSound();
    showNotify(
      'Ежедневный бонус получен',
      `На баланс зачислено +$${scaledReward.toFixed(2)}`,
      'reward'
    );
  };

  const incrementQuest = (type: QuestItem['type'], amount = 1) => {
    setQuests((prev) =>
      prev.map((q) =>
        q.type === type ? { ...q, progress: Math.min(q.target, q.progress + amount) } : q
      )
    );
  };

  const handleTrySpendForCase = (totalCost: number, count: number): boolean => {
    if (balance < totalCost) {
      showNotify(
        'Недостаточно средств',
        `Нужно $${totalCost.toFixed(2)} (ваш баланс $${balance.toFixed(2)}). Продайте скины или заработайте в Цехе.`,
        'error'
      );
      return false;
    }
    setBalance((b) => Number((b - totalCost).toFixed(2)));
    setEloRating((e) => e + count * 45);
    incrementQuest('open_cases', count);
    return true;
  };

  const handleCompleteDrops = (wonItems: InventoryItem[]) => {
    setInventory((prev) => [...wonItems, ...prev]);
    const rareCount = wonItems.filter(
      (w) => w.rarity === 'covert' || w.rarity === 'gold'
    ).length;
    if (rareCount > 0) {
      setEloRating((e) => e + rareCount * 350);
      incrementQuest('get_covert', rareCount);
    }
  };

  const handleSellDrops = (itemsToSell: InventoryItem[]) => {
    const ids = new Set(itemsToSell.map((i) => i.instanceId));
    const sum = itemsToSell.reduce((acc, i) => acc + i.price, 0);
    setInventory((prev) => prev.filter((i) => !ids.has(i.instanceId)));
    setBalance((b) => Number((b + sum).toFixed(2)));
    incrementQuest('sell_items', itemsToSell.length);
    playWinSound();
  };

  const handleSellItem = (item: InventoryItem) => {
    setInventory((prev) => prev.filter((i) => i.instanceId !== item.instanceId));
    setBalance((b) => Number((b + item.price).toFixed(2)));
    incrementQuest('sell_items', 1);
    playWinSound();
  };

  const handleApplySticker = (itemId: string, sticker: { name: string; image: string }) => {
    setInventory((prev) =>
      prev.map((it) => {
        if (it.instanceId !== itemId) return it;
        const nextStickers = [...(it.stickers || []), sticker].slice(0, 4);
        const updated = {
          ...it,
          stickers: nextStickers,
          price: Number((it.price + 1.5).toFixed(2)),
        };
        setInspectedSkin(updated);
        return updated;
      })
    );
  };

  const handlePreviewTemplate = (skin: SkinTemplate, category: CatalogCategory) => {
    const mock = instantiateSkin(skin, category);
    setInspectedSkin(mock);
  };

  const handleSellAllCheap = () => {
    const cheap = inventory.filter((i) => i.rarity === 'milspec' || i.rarity === 'restricted');
    if (cheap.length === 0) {
      showNotify('Нет синих и фиолетовых скинов', 'На складе нет недорогих скинов.', 'warning');
      return;
    }
    const totalSum = cheap.reduce((acc, i) => acc + i.price, 0);
    const cheapIds = new Set(cheap.map((i) => i.instanceId));
    setInventory((prev) => prev.filter((i) => !cheapIds.has(i.instanceId)));
    setBalance((b) => Number((b + totalSum).toFixed(2)));
    incrementQuest('sell_items', cheap.length);
    playWinSound();
    showNotify('Продано', `Продано ${cheap.length} предм. на +$${totalSum.toFixed(2)}`, 'success');
  };

  const handleSellEntireInventory = () => {
    if (inventory.length === 0) return;
    const totalSum = inventory.reduce((acc, i) => acc + i.price, 0);
    const count = inventory.length;
    setInventory([]);
    setBalance((b) => Number((b + totalSum).toFixed(2)));
    incrementQuest('sell_items', count);
    playWinSound();
    showNotify('Склад продан', `Получено +$${totalSum.toFixed(2)}`, 'success');
  };

  const handleClaimQuest = (quest: QuestItem) => {
    if (quest.claimed || quest.progress < quest.target) return;
    setQuests((prev) =>
      prev.map((q) => (q.id === quest.id ? { ...q, claimed: true } : q))
    );
    setBalance((b) => Number((b + quest.reward).toFixed(2)));
    setEloRating((e) => e + 150);
    playWinSound();
  };

  const theme = THEMES[themeMode] || THEMES.obsidian;

  if (!isLoaded) {
    return <View style={{ flex: 1, backgroundColor: theme.bgGradient[0] }} />;
  }

  // Filter & Sort Cases
  const filteredCases = INITIAL_CASES.filter((c) => {
    if (c.category !== catalogCategory) return false;
    if (caseSearchQuery.trim() !== '') {
      const q = caseSearchQuery.trim().toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q)
      );
    }
    return true;
  }).sort((a, b) => {
    if (casePriceSort === 'asc') return a.price - b.price;
    if (casePriceSort === 'desc') return b.price - a.price;
    return 0;
  });

  // Filter & Sort Inventory
  const filteredInventory = [...inventory]
    .filter((i) => (invFilter === 'all' ? true : i.rarity === invFilter))
    .sort((a, b) => {
      if (invSort === 'price_desc') return b.price - a.price;
      if (invSort === 'price_asc') return a.price - b.price;
      return b.obtainedAt - a.obtainedAt;
    });

  const filteredQuests =
    questFilter === 'all' ? quests : quests.filter((q) => q.difficulty === questFilter);
  const totalInventoryValue = inventory.reduce((acc, i) => acc + i.price, 0);
  const rankData = getRankByElo(eloRating);
  const bestPlayerSkin = [...inventory].sort((a, b) => b.price - a.price)[0];
  const isBankrupt = balance < 0.9 && inventory.length === 0;

  const currentSyncToken = user
    ? encodeCloudSyncToken({
        profile: user,
        balance,
        inventory,
        quests,
        eloRating,
        streakDay,
        lastClaimDate,
        updatedAt: Date.now(),
      })
    : '';

  const webPhoneFrame: any =
    Platform.OS === 'web'
      ? {
          maxWidth: 440,
          width: '100%',
          height: '96%',
          maxHeight: 915,
          borderRadius: 32,
          borderWidth: 1,
          borderColor: theme.cardBorder,
          overflow: 'hidden',
        }
      : { flex: 1, width: '100%' };

  return (
    <View style={[styles.desktopStage, { backgroundColor: theme.bgGradient[0] }]}>
      <StatusBar
        barStyle={theme.isLight ? 'dark-content' : 'light-content'}
        backgroundColor={theme.headerBg}
      />

      <SafeAreaView
        style={[
          styles.phoneContainer,
          webPhoneFrame,
          { backgroundColor: theme.bgGradient[0] },
        ]}
      >
        <GameNotificationBanner
          notification={notification}
          onDismiss={() => setNotification(null)}
        />

        {!user ? (
          <AuthScreen
            onLoginSuccess={(profile, restoredData) => {
              setUser(profile);
              if (restoredData) {
                setBalance(restoredData.balance);
                setInventory(restoredData.inventory);
                if (restoredData.quests && restoredData.quests.length > 0) {
                  setQuests(restoredData.quests);
                }
                setEloRating(restoredData.eloRating);
                setStreakDay(restoredData.streakDay);
                setLastClaimDate(restoredData.lastClaimDate);
              }
            }}
          />
        ) : (
          <>
            {/* CLEAN MINIMALIST TOP HEADER */}
            <View
              style={[
                styles.topHeader,
                {
                  backgroundColor: theme.headerBg,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.profileChip}
                onPress={() => {
                  setOpenedCaseScreen(null);
                  setActiveTab('profile');
                }}
              >
                <Image source={require('./assets/icon.png')} style={styles.avatarMini} />
                <View>
                  <Text style={[styles.brandName, { color: theme.textPrimary }]}>
                    {user.nickname}
                  </Text>
                  <Text style={[styles.rankTextMini, { color: theme.textSecondary }]}>
                    {eloRating.toLocaleString()} ELO • {rankData.current.title}
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={styles.balanceGroup}>
                {/* Quick Theme Switcher Button */}
                <TouchableOpacity
                  style={[styles.iconHeaderBtn, { backgroundColor: theme.surfaceBg }]}
                  onPress={() => {
                    playClickSound();
                    setThemeMode((prev) => (prev === 'obsidian' ? 'bright' : 'obsidian'));
                  }}
                >
                  <Ionicons
                    name={theme.isLight ? 'moon-outline' : 'sunny-outline'}
                    size={16}
                    color={theme.textSecondary}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.iconHeaderBtn, { backgroundColor: theme.surfaceBg }]}
                  onPress={() => setDailyModalOpen(true)}
                >
                  <Ionicons
                    name="gift-outline"
                    size={16}
                    color={canClaimDaily ? '#EAB308' : theme.textSecondary}
                  />
                </TouchableOpacity>

                <View style={[styles.walletPill, { backgroundColor: theme.surfaceBg }]}>
                  <Text style={styles.walletAmount}>${balance.toFixed(2)}</Text>
                </View>
              </View>
            </View>

            {/* BANKRUPTCY BANNER */}
            {isBankrupt && (
              <View style={[styles.bankruptBar, { backgroundColor: theme.cardBg, borderColor: theme.cardBorder }]}>
                <Text style={[styles.bankruptText, { color: theme.textSecondary }]}>
                  Баланс $0.00 • Заработайте на кейсы в Цехе сборки
                </Text>
                <TouchableOpacity
                  style={styles.bankruptBtn}
                  onPress={() => {
                    setOpenedCaseScreen(null);
                    setRequestedMiniGame('clicker');
                    setActiveTab('minigames');
                  }}
                >
                  <Text style={styles.bankruptBtnText}>Цех (+$0.50)</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* MAIN CONTENT AREA */}
            <View style={styles.mainContentWrap}>
              {/* FULL-SCREEN CS2 CASE INSPECTION & OPENING SCREEN */}
              {activeTab === 'cases' && openedCaseScreen ? (
                <CS2CaseScreen
                  caseItem={openedCaseScreen}
                  balance={balance}
                  themeMode={themeMode}
                  fastSpin={fastSpin}
                  onToggleFastSpin={() => setFastSpin((v) => !v)}
                  onBack={() => setOpenedCaseScreen(null)}
                  onTrySpendBalance={handleTrySpendForCase}
                  onCompleteDrops={handleCompleteDrops}
                  onSellDrops={handleSellDrops}
                  onInspectDrop={(won) => setInspectedSkin(won)}
                  onPreviewTemplate={handlePreviewTemplate}
                />
              ) : (
                <ScrollView
                  style={{ flex: 1 }}
                  contentContainerStyle={{ paddingBottom: 96 }}
                  showsVerticalScrollIndicator={false}
                >
                  {/* ==================== TAB 1: CASES CATALOG ==================== */}
                  {activeTab === 'cases' && (
                    <View>
                      {/* 4 Category Tabs */}
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.catalogTabsRow}
                      >
                        {[
                          { key: 'base_cases', title: 'Кейсы CS2' },
                          { key: 'black_market', title: 'Коллекции' },
                          { key: 'capsules', title: 'Капсулы' },
                          { key: 'souvenir', title: 'Сувенирные' },
                        ].map((cat) => {
                          const active = catalogCategory === cat.key;
                          return (
                            <TouchableOpacity
                              key={cat.key}
                              onPress={() => setCatalogCategory(cat.key as CatalogCategory)}
                              style={[
                                styles.catChip,
                                {
                                  backgroundColor: active ? '#16A34A' : theme.cardBg,
                                  borderColor: theme.cardBorder,
                                },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.catChipText,
                                  { color: active ? '#FFFFFF' : theme.textSecondary },
                                ]}
                              >
                                {cat.title}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </ScrollView>

                      {/* Search & Price Sort Row */}
                      <View style={styles.searchSortRow}>
                        <View
                          style={[
                            styles.searchBox,
                            {
                              backgroundColor: theme.cardBg,
                              borderColor: theme.cardBorder,
                            },
                          ]}
                        >
                          <Ionicons name="search-outline" size={15} color={theme.textMuted} />
                          <TextInput
                            placeholder="Поиск кейса..."
                            placeholderTextColor={theme.textMuted}
                            value={caseSearchQuery}
                            onChangeText={setCaseSearchQuery}
                            style={[styles.searchInput, { color: theme.textPrimary }]}
                          />
                        </View>

                        <TouchableOpacity
                          onPress={() => {
                            playClickSound();
                            setCasePriceSort((prev) =>
                              prev === 'default' ? 'asc' : prev === 'asc' ? 'desc' : 'default'
                            );
                          }}
                          style={[
                            styles.sortBtn,
                            {
                              backgroundColor: theme.cardBg,
                              borderColor: theme.cardBorder,
                            },
                          ]}
                        >
                          <Ionicons name="swap-vertical-outline" size={14} color={theme.textSecondary} />
                          <Text style={[styles.sortBtnText, { color: theme.textSecondary }]}>
                            {casePriceSort === 'asc'
                              ? 'Дешёвые'
                              : casePriceSort === 'desc'
                              ? 'Дорогие'
                              : 'Цена'}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      {/* Clean Minimalist 2-Column Case Grid (Clicking opens the CS2 Case Screen!) */}
                      <View style={styles.bentoCaseGrid}>
                        {filteredCases.map((caseObj) => (
                          <TouchableOpacity
                            key={caseObj.id}
                            activeOpacity={0.85}
                            onPress={() => {
                              playClickSound();
                              setOpenedCaseScreen(caseObj);
                            }}
                            style={[
                              styles.caseCard,
                              {
                                backgroundColor: theme.cardBg,
                                borderColor: theme.cardBorder,
                              },
                            ]}
                          >
                            <View style={styles.caseCardTopRow}>
                              <Text style={[styles.caseItemCount, { color: theme.textMuted }]}>
                                {caseObj.items.length} предм.
                              </Text>
                              <Text style={styles.casePriceBadge}>
                                ${caseObj.price.toFixed(2)}
                              </Text>
                            </View>

                            <View style={styles.caseImgWrap}>
                              <Image
                                source={{ uri: caseObj.image }}
                                style={styles.caseImg}
                                resizeMode="contain"
                              />
                            </View>

                            <Text
                              numberOfLines={1}
                              style={[styles.caseTitle, { color: theme.textPrimary }]}
                            >
                              {caseObj.name.replace('Кейс ', '').replace('Капсула ', '')}
                            </Text>
                            <Text
                              numberOfLines={1}
                              style={[styles.caseSubtitle, { color: theme.textSecondary }]}
                            >
                              {caseObj.subtitle}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  )}

                  {/* ==================== TAB 2: INVENTORY ==================== */}
                  {activeTab === 'inventory' && (
                    <View>
                      <LiquidGlassCard themeMode={themeMode} style={styles.invSummaryCard}>
                        <View style={styles.invSummaryRow}>
                          <View>
                            <Text style={[styles.invTotalLabel, { color: theme.textSecondary }]}>
                              СКЛАД ({inventory.length} ПРЕДМ.)
                            </Text>
                            <Text style={[styles.invTotalValue, { color: theme.textPrimary }]}>
                              ${totalInventoryValue.toFixed(2)}
                            </Text>
                          </View>

                          <View style={{ flexDirection: 'row', gap: 6 }}>
                            <TouchableOpacity
                              style={[styles.invActionBtn, { backgroundColor: theme.surfaceBg }]}
                              onPress={handleSellAllCheap}
                            >
                              <Text style={[styles.invActionBtnText, { color: theme.textPrimary }]}>
                                Продать синьку
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[styles.invActionBtn, { backgroundColor: '#16A34A' }]}
                              onPress={handleSellEntireInventory}
                            >
                              <Text style={[styles.invActionBtnText, { color: '#FFFFFF' }]}>
                                Продать всё
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>

                        {/* Sort & Rarity Filter */}
                        <View style={[styles.rowBetween, { marginTop: 12 }]}>
                          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {(
                              ['all', 'gold', 'covert', 'classified', 'restricted', 'milspec'] as const
                            ).map((rKey) => {
                              const active = invFilter === rKey;
                              return (
                                <TouchableOpacity
                                  key={rKey}
                                  onPress={() => setInvFilter(rKey)}
                                  style={[
                                    styles.filterChip,
                                    {
                                      backgroundColor: active ? '#16A34A' : theme.surfaceBg,
                                    },
                                  ]}
                                >
                                  <Text
                                    style={[
                                      styles.filterChipText,
                                      { color: active ? '#FFFFFF' : theme.textSecondary },
                                    ]}
                                  >
                                    {rKey === 'all' ? 'Все' : RARITIES[rKey].name}
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                          </ScrollView>

                          <TouchableOpacity
                            onPress={() =>
                              setInvSort((s) =>
                                s === 'price_desc'
                                  ? 'price_asc'
                                  : s === 'price_asc'
                                  ? 'recent'
                                  : 'price_desc'
                              )
                            }
                            style={[styles.sortMiniBtn, { backgroundColor: theme.surfaceBg }]}
                          >
                            <Ionicons name="funnel-outline" size={12} color={theme.textSecondary} />
                            <Text style={{ color: theme.textSecondary, fontSize: 10, fontWeight: '700' }}>
                              {invSort === 'price_desc'
                                ? 'Дорогие'
                                : invSort === 'price_asc'
                                ? 'Дешёвые'
                                : 'Новые'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </LiquidGlassCard>

                      {filteredInventory.length === 0 ? (
                        <View style={styles.emptyBox}>
                          <Ionicons name="cube-outline" size={40} color={theme.textMuted} />
                          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                            На складе пока нет предметов
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.invGrid}>
                          {filteredInventory.map((item) => (
                            <SkinCard
                              key={item.instanceId}
                              item={item}
                              themeMode={themeMode}
                              onPress={() => setInspectedSkin(item)}
                              actionLabel={`Продать $${item.price.toFixed(2)}`}
                              onAction={() => handleSellItem(item)}
                            />
                          ))}
                        </View>
                      )}
                    </View>
                  )}

                  {/* ==================== TAB 3: MINI-GAMES ==================== */}
                  {activeTab === 'minigames' && (
                    <MiniGamesHub
                      balance={balance}
                      inventory={inventory}
                      themeMode={themeMode}
                      defaultFastSpin={fastSpin}
                      initialGame={requestedMiniGame}
                      onChangeBalance={(delta) =>
                        setBalance((b) => Number((b + delta).toFixed(2)))
                      }
                      onAddInventoryItem={(item) => setInventory((prev) => [item, ...prev])}
                      onAddMultipleItems={(items) =>
                        setInventory((prev) => [...items, ...prev])
                      }
                      onRemoveInventoryItems={(ids) =>
                        setInventory((prev) => prev.filter((i) => !ids.includes(i.instanceId)))
                      }
                      onRecordGameWin={(isUpgrade) => {
                        setEloRating((e) => e + (isUpgrade ? 220 : 140));
                        incrementQuest('win_games', 1);
                        if (isUpgrade) incrementQuest('upgrade_win', 1);
                      }}
                      onRecordBattlePlayed={(won) => {
                        if (won) {
                          setEloRating((e) => e + 280);
                          incrementQuest('win_case_battle', 1);
                          incrementQuest('win_games', 1);
                        }
                      }}
                      onNotify={showNotify}
                    />
                  )}

                  {/* ==================== TAB 4: QUESTS ==================== */}
                  {activeTab === 'quests' && (
                    <View>
                      <Text style={[styles.sectionHeader, { color: theme.textPrimary }]}>
                        Контракты и миссии
                      </Text>

                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginBottom: 12 }}
                      >
                        {(
                          [
                            { id: 'all', label: 'Все' },
                            { id: 'daily', label: 'Ежедневные' },
                            { id: 'battle', label: 'Игры и битвы' },
                            { id: 'collector', label: 'Коллекция' },
                            { id: 'hardcore', label: 'Хардкор' },
                          ] as const
                        ).map((qf) => {
                          const active = questFilter === qf.id;
                          return (
                            <TouchableOpacity
                              key={qf.id}
                              onPress={() => setQuestFilter(qf.id)}
                              style={[
                                styles.filterChip,
                                {
                                  backgroundColor: active ? '#16A34A' : theme.cardBg,
                                },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.filterChipText,
                                  { color: active ? '#FFFFFF' : theme.textSecondary },
                                ]}
                              >
                                {qf.label}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </ScrollView>

                      {filteredQuests.map((q) => {
                        const completed = q.progress >= q.target;
                        const pct = Math.min(100, Math.round((q.progress / q.target) * 100));
                        return (
                          <LiquidGlassCard
                            key={q.id}
                            themeMode={themeMode}
                            style={styles.questCard}
                          >
                            <View style={styles.questRow}>
                              <View style={{ flex: 1 }}>
                                <Text style={[styles.questTitle, { color: theme.textPrimary }]}>
                                  {q.title}
                                </Text>
                                <Text style={[styles.questDesc, { color: theme.textSecondary }]}>
                                  {q.description}
                                </Text>
                                <View
                                  style={[
                                    styles.questBarBg,
                                    { backgroundColor: theme.surfaceBg },
                                  ]}
                                >
                                  <View style={[styles.questBarFill, { width: `${pct}%` }]} />
                                </View>
                                <Text style={[styles.questProg, { color: theme.textMuted }]}>
                                  {q.progress} / {q.target}
                                </Text>
                              </View>
                              <TouchableOpacity
                                disabled={!completed || q.claimed}
                                onPress={() => handleClaimQuest(q)}
                                style={[
                                  styles.questBtn,
                                  { backgroundColor: theme.surfaceBg },
                                  completed && !q.claimed && { backgroundColor: '#16A34A' },
                                ]}
                              >
                                <Text
                                  style={[
                                    styles.questBtnText,
                                    {
                                      color:
                                        completed && !q.claimed
                                          ? '#FFFFFF'
                                          : theme.textSecondary,
                                    },
                                  ]}
                                >
                                  {q.claimed ? 'Готово' : `+$${q.reward}`}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </LiquidGlassCard>
                        );
                      })}
                    </View>
                  )}

                  {/* ==================== TAB 5: PROFILE ==================== */}
                  {activeTab === 'profile' && (
                    <View>
                      <LiquidGlassCard themeMode={themeMode} style={styles.profileCard}>
                        <Text style={[styles.profileNick, { color: theme.textPrimary }]}>
                          {user.nickname}
                        </Text>
                        <Text style={[styles.profileEmail, { color: theme.textSecondary }]}>
                          {user.email}
                        </Text>

                        <View style={styles.statsGrid}>
                          <View style={[styles.statBox, { backgroundColor: theme.surfaceBg }]}>
                            <Text style={[styles.statVal, { color: theme.textPrimary }]}>
                              ${balance.toFixed(2)}
                            </Text>
                            <Text style={[styles.statLbl, { color: theme.textSecondary }]}>
                              Баланс
                            </Text>
                          </View>
                          <View style={[styles.statBox, { backgroundColor: theme.surfaceBg }]}>
                            <Text style={[styles.statVal, { color: theme.textPrimary }]}>
                              {inventory.length}
                            </Text>
                            <Text style={[styles.statLbl, { color: theme.textSecondary }]}>
                              Скинов
                            </Text>
                          </View>
                          <View style={[styles.statBox, { backgroundColor: theme.surfaceBg }]}>
                            <Text style={[styles.statVal, { color: '#16A34A' }]}>
                              ${totalInventoryValue.toFixed(2)}
                            </Text>
                            <Text style={[styles.statLbl, { color: theme.textSecondary }]}>
                              Стоимость
                            </Text>
                          </View>
                        </View>

                        <TouchableOpacity
                          style={[styles.settingBtn, { backgroundColor: theme.surfaceBg }]}
                          onPress={() => setUser(null)}
                        >
                          <Text style={{ color: '#EF4444', fontWeight: '700', fontSize: 12 }}>
                            Сменить аккаунт
                          </Text>
                        </TouchableOpacity>
                      </LiquidGlassCard>

                      <LeaderboardSection
                        playerNickname={user.nickname}
                        playerElo={eloRating}
                        playerNetWorth={balance + totalInventoryValue}
                        playerBestSkin={
                          bestPlayerSkin
                            ? `${bestPlayerSkin.weapon} | ${bestPlayerSkin.name}`
                            : 'Новичок CS2'
                        }
                      />
                    </View>
                  )}

                  {/* ==================== TAB 6: SETTINGS ==================== */}
                  {activeTab === 'settings' && (
                    <View>
                      <LiquidGlassCard themeMode={themeMode} style={styles.settingsCard}>
                        <Text style={[styles.sectionHeader, { color: theme.textPrimary }]}>
                          Настройки
                        </Text>

                        <Text style={[styles.settingsSubTitle, { color: theme.textSecondary }]}>
                          ТЕМА ОФОРМЛЕНИЯ
                        </Text>
                        {(Object.values(THEMES) as (typeof THEMES)['obsidian'][]).map((t) => {
                          const active = themeMode === t.id;
                          return (
                            <TouchableOpacity
                              key={t.id}
                              onPress={() => {
                                playClickSound();
                                setThemeMode(t.id);
                              }}
                              style={[
                                styles.themeOptionRow,
                                {
                                  backgroundColor: theme.surfaceBg,
                                  borderColor: active ? '#16A34A' : theme.cardBorder,
                                },
                              ]}
                            >
                              <View style={{ flex: 1 }}>
                                <Text
                                  style={[
                                    styles.themeOptionTitle,
                                    { color: theme.textPrimary },
                                  ]}
                                >
                                  {t.name}
                                </Text>
                                <Text
                                  style={[
                                    styles.themeOptionSub,
                                    { color: theme.textSecondary },
                                  ]}
                                >
                                  {t.subtitle}
                                </Text>
                              </View>
                              <Ionicons
                                name={active ? 'checkmark-circle' : 'ellipse-outline'}
                                size={20}
                                color={active ? '#16A34A' : theme.textMuted}
                              />
                            </TouchableOpacity>
                          );
                        })}

                        <Text
                          style={[
                            styles.settingsSubTitle,
                            { color: theme.textSecondary, marginTop: 14 },
                          ]}
                        >
                          ИГРОВОЙ ПРОЦЕСС
                        </Text>

                        <TouchableOpacity
                          style={[
                            styles.toggleSettingRow,
                            { backgroundColor: theme.surfaceBg },
                          ]}
                          onPress={() => setFastSpin((v) => !v)}
                        >
                          <Text style={[styles.toggleTitle, { color: theme.textPrimary }]}>
                            Быстрое открытие кейсов
                          </Text>
                          <Text
                            style={{
                              color: fastSpin ? '#16A34A' : theme.textMuted,
                              fontWeight: '800',
                            }}
                          >
                            {fastSpin ? 'ВКЛ' : 'ВЫКЛ'}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.toggleSettingRow,
                            { backgroundColor: theme.surfaceBg },
                          ]}
                          onPress={() => {
                            const next = !soundOn;
                            setSoundOn(next);
                            setSoundEnabled(next);
                          }}
                        >
                          <Text style={[styles.toggleTitle, { color: theme.textPrimary }]}>
                            Звуковые эффекты
                          </Text>
                          <Text
                            style={{
                              color: soundOn ? '#16A34A' : theme.textMuted,
                              fontWeight: '800',
                            }}
                          >
                            {soundOn ? 'ВКЛ' : 'ВЫКЛ'}
                          </Text>
                        </TouchableOpacity>

                        <Text
                          style={[
                            styles.settingsSubTitle,
                            { color: theme.textSecondary, marginTop: 14 },
                          ]}
                        >
                          КОД СИНХРОНИЗАЦИИ АККАУНТА
                        </Text>
                        <TextInput
                          value={currentSyncToken}
                          editable={false}
                          selectTextOnFocus
                          style={[
                            styles.syncCodeBox,
                            {
                              color: theme.textPrimary,
                              backgroundColor: theme.surfaceBg,
                              borderColor: theme.cardBorder,
                            },
                          ]}
                        />

                        <TextInput
                          placeholder="Вставьте код CS2SYNC- для загрузки..."
                          placeholderTextColor={theme.textMuted}
                          value={importSyncInput}
                          onChangeText={setImportSyncInput}
                          style={[
                            styles.syncCodeBox,
                            {
                              color: theme.textPrimary,
                              backgroundColor: theme.surfaceBg,
                              borderColor: theme.cardBorder,
                              marginTop: 8,
                            },
                          ]}
                        />
                        <TouchableOpacity
                          style={styles.syncImportBtn}
                          onPress={() => {
                            const decoded = decodeCloudSyncToken(importSyncInput);
                            if (!decoded) {
                              showNotify('Ошибка кода', 'Проверьте код CS2SYNC-', 'error');
                              return;
                            }
                            setUser(decoded.profile);
                            setBalance(decoded.balance);
                            setInventory(decoded.inventory);
                            setEloRating(decoded.eloRating);
                            setImportSyncInput('');
                            showNotify('Готово', 'Прогресс синхронизирован', 'success');
                          }}
                        >
                          <Text style={styles.syncImportBtnText}>Загрузить по коду</Text>
                        </TouchableOpacity>
                      </LiquidGlassCard>
                    </View>
                  )}
                </ScrollView>
              )}
            </View>

            {/* MINIMALIST BOTTOM NAVIGATION BAR */}
            <View
              style={[
                styles.bottomBar,
                {
                  backgroundColor: theme.tabBarBg,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              {[
                { key: 'cases', icon: 'cube-outline' as const, label: 'Кейсы' },
                { key: 'inventory', icon: 'briefcase-outline' as const, label: 'Склад' },
                { key: 'minigames', icon: 'game-controller-outline' as const, label: 'Игры' },
                { key: 'quests', icon: 'checkbox-outline' as const, label: 'Миссии' },
                { key: 'profile', icon: 'person-outline' as const, label: 'Профиль' },
                { key: 'settings', icon: 'settings-outline' as const, label: 'Настройки' },
              ].map((item) => {
                const active = activeTab === item.key;
                return (
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => {
                      playClickSound();
                      setOpenedCaseScreen(null);
                      if (item.key === 'minigames') {
                        setRequestedMiniGame('lobby');
                      }
                      setActiveTab(item.key as BottomNavTab);
                    }}
                    style={styles.navItem}
                  >
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={active ? '#16A34A' : theme.textMuted}
                    />
                    <Text
                      style={[
                        styles.navLabel,
                        { color: active ? '#16A34A' : theme.textMuted },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        <SkinInspectorModal
          visible={Boolean(inspectedSkin)}
          item={inspectedSkin}
          onClose={() => setInspectedSkin(null)}
          onSell={handleSellItem}
          onApplySticker={handleApplySticker}
        />

        <DailyRewardModal
          visible={dailyModalOpen}
          streakDay={streakDay}
          canClaimToday={canClaimDaily}
          onClaim={handleClaimDailyBonus}
          onClose={() => setDailyModalOpen(false)}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  desktopStage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneContainer: {
    position: 'relative',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  profileChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarMini: {
    width: 34,
    height: 34,
    borderRadius: 10,
  },
  brandName: {
    fontSize: 14,
    fontWeight: '800',
  },
  rankTextMini: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 1,
  },
  balanceGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconHeaderBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  walletAmount: {
    color: '#16A34A',
    fontSize: 13,
    fontWeight: '800',
  },
  bankruptBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  bankruptText: {
    fontSize: 11,
    fontWeight: '600',
  },
  bankruptBtn: {
    backgroundColor: '#16A34A',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  bankruptBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  mainContentWrap: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  catalogTabsRow: {
    marginBottom: 10,
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
  },
  catChipText: {
    fontWeight: '700',
    fontSize: 12,
  },
  searchSortRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    height: 36,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    paddingVertical: 0,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    height: 36,
  },
  sortBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  bentoCaseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  caseCard: {
    width: '48.4%',
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  caseCardTopRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  caseItemCount: {
    fontSize: 10,
    fontWeight: '600',
  },
  casePriceBadge: {
    color: '#16A34A',
    fontSize: 12,
    fontWeight: '800',
  },
  caseImgWrap: {
    height: 92,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  caseImg: {
    width: 114,
    height: 86,
  },
  caseTitle: {
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  caseSubtitle: {
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
  },
  invSummaryCard: {
    padding: 14,
    marginBottom: 12,
  },
  invSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  invTotalLabel: {
    fontSize: 10,
    fontWeight: '700',
  },
  invTotalValue: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: 2,
  },
  invActionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
  },
  invActionBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 6,
  },
  filterChipText: {
    fontSize: 11,
    fontWeight: '700',
  },
  sortMiniBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 6,
  },
  invGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyBox: {
    padding: 40,
    alignItems: 'center',
    gap: 8,
  },
  emptyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
  },
  questCard: {
    padding: 12,
    marginBottom: 8,
  },
  questRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  questTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  questDesc: {
    fontSize: 11,
    marginTop: 2,
  },
  questBarBg: {
    height: 5,
    borderRadius: 2.5,
    marginTop: 8,
    overflow: 'hidden',
  },
  questBarFill: {
    height: '100%',
    backgroundColor: '#16A34A',
  },
  questProg: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
  questBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  questBtnText: {
    fontWeight: '800',
    fontSize: 11,
  },
  profileCard: {
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  profileNick: {
    fontSize: 18,
    fontWeight: '800',
  },
  profileEmail: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    width: '100%',
    gap: 8,
    marginBottom: 14,
  },
  statBox: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  statVal: {
    fontSize: 14,
    fontWeight: '800',
  },
  statLbl: {
    fontSize: 10,
    marginTop: 2,
  },
  settingBtn: {
    width: '100%',
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },
  settingsCard: {
    padding: 16,
  },
  settingsSubTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  themeOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  themeOptionTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  themeOptionSub: {
    fontSize: 11,
    marginTop: 2,
  },
  toggleSettingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  toggleTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  syncCodeBox: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 11,
  },
  syncImportBtn: {
    marginTop: 8,
    backgroundColor: '#16A34A',
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: 'center',
  },
  syncImportBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
});
