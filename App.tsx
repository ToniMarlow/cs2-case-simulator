import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Modal,
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
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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
import { CaseRouletteModal } from './src/components/CaseRouletteModal';
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

  // Settings state (Bright theme default as requested!)
  const [themeMode, setThemeMode] = useState<ThemeMode>('bright');
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [fastSpin, setFastSpin] = useState<boolean>(false);
  const [showLiveTicker, setShowLiveTicker] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Custom In-Game Notification state (replaces all native Alert.alert!)
  const [notification, setNotification] = useState<InGameNotification | null>(null);
  const notifyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Navigation & UI state
  const [activeTab, setActiveTab] = useState<BottomNavTab>('cases');
  const [requestedMiniGame, setRequestedMiniGame] = useState<MiniGameTab>('lobby');
  const [catalogCategory, setCatalogCategory] = useState<CatalogCategory>('base_cases');
  const [viewingCaseDetails, setViewingCaseDetails] = useState<CaseContainer | null>(null);
  const [selectedCase, setSelectedCase] = useState<CaseContainer | null>(null);
  const [openMultiplier, setOpenMultiplier] = useState<number>(1);
  const [rouletteOpen, setRouletteOpen] = useState<boolean>(false);
  const [inspectedSkin, setInspectedSkin] = useState<InventoryItem | null>(null);
  const [invFilter, setInvFilter] = useState<'all' | RarityKey>('all');
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
    }, 4300);
  };

  // Load saved state on startup
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

  // Auto-save active session & update verified accounts registry for cross-login persistence
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
    // Scale daily reward realistically so economy stays challenging
    const scaledReward = Math.max(2.5, Number((amount * 0.2).toFixed(2)));
    setBalance((b) => Number((b + scaledReward).toFixed(2)));
    setLastClaimDate(todayKey);
    setStreakDay((d) => (d >= 7 ? 1 : d + 1));
    setEloRating((e) => e + 120);
    setDailyModalOpen(false);
    playWinSound();
    showNotify(
      'Ежедневный бонус получен!',
      `На ваш баланс зачислено +$${scaledReward.toFixed(2)} и +120 CS Rating!`,
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

  const handleOpenCasePress = (container: CaseContainer, count = 1) => {
    const totalCost = Number((container.price * count).toFixed(2));
    if (balance < totalCost) {
      showNotify(
        'Недостаточно средств ($)',
        `Для открытия x${count} «${container.name}» нужно $${totalCost.toFixed(
          2
        )} (у вас $${balance.toFixed(2)}). Продайте скины на складе или заработайте в Цехе Сборки!`,
        'error'
      );
      return;
    }
    setViewingCaseDetails(null);
    setBalance((b) => Number((b - totalCost).toFixed(2)));
    setSelectedCase(container);
    setOpenMultiplier(count);
    setRouletteOpen(true);
    setEloRating((e) => e + count * 45);
    incrementQuest('open_cases', count);
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
    showNotify(
      'Дроп продан!',
      `Вы продали ${itemsToSell.length} предм. за +$${sum.toFixed(2)}`,
      'success'
    );
  };

  const handleSellItem = (item: InventoryItem) => {
    setInventory((prev) => prev.filter((i) => i.instanceId !== item.instanceId));
    setBalance((b) => Number((b + item.price).toFixed(2)));
    incrementQuest('sell_items', 1);
    playWinSound();
    showNotify(
      'Скин продан',
      `${item.weapon} | ${item.name} продан за +$${item.price.toFixed(2)}`,
      'success'
    );
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
    showNotify('Наклейка нанесена!', `Стикер ${sticker.name} добавлен на оружие.`, 'info');
  };

  const handlePreviewTemplate = (skin: SkinTemplate, category: CatalogCategory) => {
    const mock = instantiateSkin(skin, category);
    setViewingCaseDetails(null);
    setInspectedSkin(mock);
  };

  const handleSellAllCheap = () => {
    const cheap = inventory.filter((i) => i.rarity === 'milspec' || i.rarity === 'restricted');
    if (cheap.length === 0) {
      showNotify(
        'Нет недорогих скинов',
        'На складе нет армейских или запрещённых предметов для массовой продажи.',
        'warning'
      );
      return;
    }
    const totalSum = cheap.reduce((acc, i) => acc + i.price, 0);
    const cheapIds = new Set(cheap.map((i) => i.instanceId));
    setInventory((prev) => prev.filter((i) => !cheapIds.has(i.instanceId)));
    setBalance((b) => Number((b + totalSum).toFixed(2)));
    incrementQuest('sell_items', cheap.length);
    playWinSound();
    showNotify(
      'Массовая продажа выполнена!',
      `Продано ${cheap.length} предм. на общую сумму +$${totalSum.toFixed(2)}`,
      'success'
    );
  };

  const handleSellEntireInventory = () => {
    if (inventory.length === 0) {
      showNotify('Склад пуст', 'В вашем инвентаре пока нет предметов.', 'warning');
      return;
    }
    const totalSum = inventory.reduce((acc, i) => acc + i.price, 0);
    const count = inventory.length;
    setInventory([]);
    setBalance((b) => Number((b + totalSum).toFixed(2)));
    incrementQuest('sell_items', count);
    playWinSound();
    showNotify(
      'Весь склад продан!',
      `Продано ${count} предм. на сумму +$${totalSum.toFixed(2)}`,
      'reward'
    );
  };

  const handleClaimQuest = (quest: QuestItem) => {
    if (quest.claimed || quest.progress < quest.target) return;
    setQuests((prev) =>
      prev.map((q) => (q.id === quest.id ? { ...q, claimed: true } : q))
    );
    setBalance((b) => Number((b + quest.reward).toFixed(2)));
    setEloRating((e) => e + 150);
    playWinSound();
    showNotify(
      'Миссия выполнена!',
      `Награда +$${quest.reward.toFixed(2)} зачислена на ваш баланс!`,
      'reward'
    );
  };

  const theme = THEMES[themeMode] || THEMES.bright;

  if (!isLoaded) {
    return <View style={{ flex: 1, backgroundColor: theme.bgGradient[0] }} />;
  }

  const filteredCases = INITIAL_CASES.filter((c) => c.category === catalogCategory);
  const filteredInventory =
    invFilter === 'all' ? inventory : inventory.filter((i) => i.rarity === invFilter);
  const filteredQuests =
    questFilter === 'all' ? quests : quests.filter((q) => q.difficulty === questFilter);
  const totalInventoryValue = inventory.reduce((acc, i) => acc + i.price, 0);
  const rankData = getRankByElo(eloRating);
  const bestPlayerSkin = [...inventory].sort((a, b) => b.price - a.price)[0];

  // Bankruptcy detection: player has less than $0.90 and zero items in inventory
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
          borderRadius: 42,
          borderWidth: 2,
          borderColor: theme.cardBorder,
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.45), 0 0 60px rgba(56, 189, 248, 0.18)',
          overflow: 'hidden',
        }
      : { flex: 1, width: '100%' };

  return (
    <View style={[styles.desktopStage, { backgroundColor: theme.bgGradient[2] }]}>
      <StatusBar
        barStyle={theme.isLight ? 'dark-content' : 'light-content'}
        backgroundColor={theme.bgGradient[0]}
      />
      <LinearGradient
        colors={theme.bgGradient}
        style={StyleSheet.absoluteFillObject}
      />

      {/* MOBILE PHONE SIMULATOR FRAME */}
      <SafeAreaView style={[styles.phoneContainer, webPhoneFrame]}>
        <LinearGradient
          colors={theme.bgGradient}
          style={StyleSheet.absoluteFillObject}
        />

        {/* CUSTOM IN-GAME NOTIFICATION TOAST (REPLACES SYSTEM ALERTS) */}
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
              } else {
                setBalance(25.0);
                setInventory([]);
                setQuests(INITIAL_QUESTS);
                setEloRating(1000);
              }
              showNotify(
                `Добро пожаловать, ${profile.nickname}!`,
                'Аккаунт защищён паролем и синхронизирован с облачным кодом CS2 Drop.',
                'success'
              );
            }}
          />
        ) : (
          <>
            {/* TOP MODERN HEADER */}
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
                onPress={() => setActiveTab('profile')}
              >
                <Image
                  source={require('./assets/icon.png')}
                  style={styles.avatarMini}
                />
                <View>
                  <Text style={[styles.brandName, { color: theme.textPrimary }]}>
                    {user.nickname}
                  </Text>
                  <View
                    style={[
                      styles.headerRankBadge,
                      { backgroundColor: rankData.current.badgeBg },
                    ]}
                  >
                    <Text
                      style={[
                        styles.headerRankText,
                        { color: rankData.current.color },
                      ]}
                    >
                      {eloRating.toLocaleString()} ELO • {rankData.current.title}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.balanceGroup}>
                <TouchableOpacity
                  style={[
                    styles.plusMoneyBtn,
                    canClaimDaily && {
                      borderColor: '#F59E0B',
                      backgroundColor: 'rgba(245, 158, 11, 0.2)',
                    },
                  ]}
                  onPress={() => setDailyModalOpen(true)}
                >
                  <Ionicons
                    name="gift"
                    size={16}
                    color={canClaimDaily ? '#F59E0B' : theme.textSecondary}
                  />
                </TouchableOpacity>

                <View style={styles.walletPill}>
                  <Ionicons name="wallet-outline" size={14} color="#059669" />
                  <Text style={styles.walletAmount}>${balance.toFixed(2)}</Text>
                </View>
              </View>
            </View>

            {/* BANKRUPTCY WARNING & RECOVERY BANNER */}
            {isBankrupt && (
              <View style={styles.bankruptBanner}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.bankruptTitle}>
                    🚨 ВЫ ОБАНКРОТИЛИСЬ (БАЛАНС $0, СКЛАД ПУСТ)!
                  </Text>
                  <Text style={styles.bankruptSub}>
                    Отправляйтесь в Цех Сборки Кейсов (+$0.50 за клик) или возьмите микро-субсидию!
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.bankruptActionBtn}
                  onPress={() => {
                    playClickSound();
                    setRequestedMiniGame('clicker');
                    setActiveTab('minigames');
                  }}
                >
                  <Text style={styles.bankruptActionText}>В ЦЕХ (+$0.50)</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* RECENT LIVE DROPS TICKER */}
            {showLiveTicker && inventory.length > 0 && (
              <View
                style={[
                  styles.liveTickerBar,
                  {
                    backgroundColor: theme.surfaceBg,
                    borderColor: theme.cardBorder,
                  },
                ]}
              >
                <View style={styles.liveDotBadge}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveText}>DROP</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {inventory.slice(0, 10).map((drop) => {
                    const r = RARITIES[drop.rarity];
                    return (
                      <TouchableOpacity
                        key={drop.instanceId}
                        onPress={() => setInspectedSkin(drop)}
                        style={[
                          styles.tickerItem,
                          {
                            borderColor: r.color,
                            backgroundColor: theme.isLight ? '#FFFFFF' : '#0F172A',
                          },
                        ]}
                      >
                        <Image
                          source={{ uri: drop.image }}
                          style={styles.tickerImg}
                          resizeMode="contain"
                        />
                        <Text
                          numberOfLines={1}
                          style={[styles.tickerName, { color: theme.textPrimary }]}
                        >
                          {drop.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            )}

            {/* MAIN CONTENT SCROLL */}
            <ScrollView
              style={styles.mainScroll}
              contentContainerStyle={{ paddingBottom: 112 }}
              showsVerticalScrollIndicator={false}
            >
              {/* ==================== TAB 1: CASES (60 CASES ACROSS 4 TABS) ==================== */}
              {activeTab === 'cases' && (
                <View>
                  {/* Featured Hero Showcase */}
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setRequestedMiniGame('casebattle');
                      setActiveTab('minigames');
                    }}
                  >
                    <LiquidGlassCard
                      themeMode={themeMode}
                      glowColor="#F59E0B"
                      style={styles.heroCard}
                    >
                      <LinearGradient
                        colors={[
                          'rgba(245, 158, 11, 0.24)',
                          'rgba(56, 189, 248, 0.16)',
                          'transparent',
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={StyleSheet.absoluteFillObject}
                      />
                      <View style={styles.heroContentRow}>
                        <View style={{ flex: 1 }}>
                          <View style={styles.seasonBadge}>
                            <Ionicons name="flame" size={11} color="#D97706" />
                            <Text style={styles.seasonBadgeText}>
                              GLOBAL UPDATE 2.0 • 60 КЕЙСОВ И 1,145 СКИНОВ
                            </Text>
                          </View>
                          <Text style={[styles.heroTitle, { color: theme.textPrimary }]}>
                            ⚔️ Новая игра: Битва Кейсов с Ботами!
                          </Text>
                          <Text style={[styles.heroSubtitle, { color: theme.textSecondary }]}>
                            Режимы: Терминал, Реверс, Клатч и Общий дроп • Нажми чтобы войти!
                          </Text>
                        </View>
                        <Image
                          source={{
                            uri:
                              INITIAL_CASES[0]?.items[INITIAL_CASES[0].items.length - 1]
                                ?.image || INITIAL_CASES[0].image,
                          }}
                          style={styles.heroSkinImg}
                          resizeMode="contain"
                        />
                      </View>
                    </LiquidGlassCard>
                  </TouchableOpacity>

                  {/* Fast Spin Quick Toggle Bar */}
                  <View style={styles.quickToolbar}>
                    <Text style={[styles.caseCountBadgeText, { color: theme.textSecondary }]}>
                      Доступно в разделе: {filteredCases.length} шт. (Всего: {INITIAL_CASES.length})
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        playClickSound();
                        setFastSpin((v) => !v);
                      }}
                      style={[
                        styles.fastSpinTogglePill,
                        fastSpin && styles.fastSpinTogglePillActive,
                      ]}
                    >
                      <Ionicons
                        name="flash"
                        size={13}
                        color={fastSpin ? '#0F172A' : '#D97706'}
                      />
                      <Text
                        style={[
                          styles.fastSpinToggleText,
                          fastSpin && { color: '#0F172A' },
                        ]}
                      >
                        {fastSpin ? '⚡ Быстрое открытие: ВКЛ' : '⚡ Быстрое открытие'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* 4 Catalog Segmented Pills */}
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.catalogTabsRow}
                  >
                    {[
                      {
                        key: 'base_cases',
                        title: 'Базовые кейсы (19)',
                        icon: 'cube-outline' as const,
                        accent: '#0284C7',
                      },
                      {
                        key: 'black_market',
                        title: 'Чёрный рынок (15)',
                        icon: 'skull-outline' as const,
                        accent: '#D97706',
                      },
                      {
                        key: 'capsules',
                        title: 'Капсулы (14)',
                        icon: 'pricetag-outline' as const,
                        accent: '#DB2777',
                      },
                      {
                        key: 'souvenir',
                        title: 'Сувенирные (12)',
                        icon: 'trophy-outline' as const,
                        accent: '#CA8A04',
                      },
                    ].map((cat) => {
                      const active = catalogCategory === cat.key;
                      return (
                        <TouchableOpacity
                          key={cat.key}
                          onPress={() => setCatalogCategory(cat.key as CatalogCategory)}
                          style={[
                            styles.catChip,
                            {
                              backgroundColor: theme.surfaceBg,
                              borderColor: active ? cat.accent : theme.cardBorder,
                            },
                            active && { borderWidth: 1.8 },
                          ]}
                        >
                          <Ionicons
                            name={cat.icon}
                            size={15}
                            color={active ? cat.accent : theme.textMuted}
                          />
                          <Text
                            style={[
                              styles.catChipText,
                              { color: active ? theme.textPrimary : theme.textSecondary },
                            ]}
                          >
                            {cat.title}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>

                  {/* BENTO 2-COLUMN CASE GRID */}
                  <View style={styles.bentoCaseGrid}>
                    {filteredCases.map((caseObj) => (
                      <TouchableOpacity
                        key={caseObj.id}
                        activeOpacity={0.88}
                        onPress={() => setViewingCaseDetails(caseObj)}
                        style={styles.bentoCaseTile}
                      >
                        <LiquidGlassCard
                          themeMode={themeMode}
                          glowColor={`${caseObj.accentColor}66`}
                          style={styles.bentoInner}
                        >
                          <LinearGradient
                            colors={[
                              `${caseObj.accentColor}28`,
                              theme.isLight
                                ? 'rgba(255, 255, 255, 0.85)'
                                : 'rgba(15, 23, 42, 0.75)',
                              theme.isLight
                                ? 'rgba(241, 245, 249, 0.95)'
                                : 'rgba(10, 14, 26, 0.95)',
                            ]}
                            style={StyleSheet.absoluteFillObject}
                          />

                          <View style={styles.bentoTopRow}>
                            <View
                              style={[
                                styles.itemCountPill,
                                theme.isLight && { backgroundColor: 'rgba(15,23,42,0.07)' },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.itemCountText,
                                  { color: theme.textSecondary },
                                ]}
                              >
                                {caseObj.items.length} скинов
                              </Text>
                            </View>
                            <Ionicons
                              name="eye-outline"
                              size={15}
                              color={theme.textSecondary}
                            />
                          </View>

                          <View style={styles.bentoImgWrap}>
                            <Image
                              source={{ uri: caseObj.image }}
                              style={styles.bentoCaseImg}
                              resizeMode="contain"
                            />
                          </View>

                          <Text
                            numberOfLines={1}
                            style={[styles.bentoCaseTitle, { color: theme.textPrimary }]}
                          >
                            {caseObj.name.replace('Кейс ', '').replace('Капсула ', '')}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={[styles.bentoCaseSub, { color: theme.textSecondary }]}
                          >
                            {caseObj.subtitle}
                          </Text>

                          <TouchableOpacity
                            style={[
                              styles.bentoOpenBtn,
                              { backgroundColor: caseObj.accentColor },
                            ]}
                            onPress={() => handleOpenCasePress(caseObj)}
                          >
                            <Text style={styles.bentoOpenPrice}>
                              ОТКРЫТЬ • ${caseObj.price.toFixed(2)}
                            </Text>
                          </TouchableOpacity>
                        </LiquidGlassCard>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {/* ==================== TAB 2: INVENTORY & 3D INSPECT ==================== */}
              {activeTab === 'inventory' && (
                <View>
                  <LiquidGlassCard themeMode={themeMode} style={styles.invSummaryCard}>
                    <View style={styles.invSummaryRow}>
                      <View>
                        <Text style={[styles.invTotalLabel, { color: theme.textSecondary }]}>
                          ПРЕДМЕТОВ НА СКЛАДЕ: {inventory.length}
                        </Text>
                        <Text style={[styles.invTotalValue, { color: theme.textPrimary }]}>
                          ${totalInventoryValue.toFixed(2)}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', gap: 6 }}>
                        <TouchableOpacity
                          style={styles.sellAllCheapBtn}
                          onPress={handleSellAllCheap}
                        >
                          <Ionicons name="flash-outline" size={14} color="#EF4444" />
                          <Text style={styles.sellAllCheapText}>Слить синьку</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.sellAllCheapBtn,
                            {
                              borderColor: '#10B981',
                              backgroundColor: 'rgba(16,185,129,0.14)',
                            },
                          ]}
                          onPress={handleSellEntireInventory}
                        >
                          <Text style={[styles.sellAllCheapText, { color: '#059669' }]}>
                            Продать всё
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Rarity Filter */}
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={{ marginTop: 12 }}
                    >
                      {(
                        ['all', 'gold', 'covert', 'classified', 'restricted', 'milspec'] as const
                      ).map((rKey) => (
                        <TouchableOpacity
                          key={rKey}
                          onPress={() => setInvFilter(rKey)}
                          style={[
                            styles.filterChip,
                            invFilter === rKey && styles.filterChipActive,
                          ]}
                        >
                          <Text
                            style={[
                              styles.filterChipText,
                              {
                                color:
                                  invFilter === rKey ? '#0284C7' : theme.textSecondary,
                              },
                            ]}
                          >
                            {rKey === 'all' ? 'Все' : RARITIES[rKey].name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </LiquidGlassCard>

                  {filteredInventory.length === 0 ? (
                    <View style={styles.emptyBox}>
                      <Ionicons name="cube-outline" size={44} color={theme.textMuted} />
                      <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                        Склад пока пуст. Откройте кейс или сразитесь с ботами в Битве Кейсов!
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

              {/* ==================== TAB 3: MINI-GAMES & CASE BATTLE ==================== */}
              {activeTab === 'minigames' && (
                <MiniGamesHub
                  balance={balance}
                  inventory={inventory}
                  themeMode={themeMode}
                  defaultFastSpin={fastSpin}
                  initialGame={requestedMiniGame}
                  onChangeBalance={(delta) => setBalance((b) => Number((b + delta).toFixed(2)))}
                  onAddInventoryItem={(item) => setInventory((prev) => [item, ...prev])}
                  onAddMultipleItems={(items) => setInventory((prev) => [...items, ...prev])}
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

              {/* ==================== TAB 4: UPGRADED MULTI-TIER QUESTS ==================== */}
              {activeTab === 'quests' && (
                <View>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setDailyModalOpen(true)}
                  >
                    <LiquidGlassCard
                      themeMode={themeMode}
                      glowColor="#F59E0B"
                      style={{ padding: 14, marginBottom: 14 }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Ionicons name="gift" size={24} color="#D97706" />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#D97706', fontWeight: '900', fontSize: 13 }}>
                            ЕЖЕДНЕВНАЯ НАГРАДА (ДЕНЬ {streakDay} ИЗ 7)
                          </Text>
                          <Text
                            style={{
                              color: theme.textSecondary,
                              fontSize: 11,
                              marginTop: 2,
                            }}
                          >
                            {canClaimDaily
                              ? 'Нажмите здесь, чтобы забрать сегодняшний бонус!'
                              : 'Бонус на сегодня получен — возвращайтесь завтра!'}
                          </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#D97706" />
                      </View>
                    </LiquidGlassCard>
                  </TouchableOpacity>

                  <Text style={[styles.sectionHeader, { color: theme.textPrimary }]}>
                    Система Контрактов и Миссий CS2
                  </Text>

                  {/* Quest Difficulty Tabs */}
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginBottom: 12 }}
                  >
                    {(
                      [
                        { id: 'all', label: 'Все миссии' },
                        { id: 'daily', label: 'Ежедневные' },
                        { id: 'battle', label: 'Боевые (Битвы/Игры)' },
                        { id: 'collector', label: 'Коллекционер' },
                        { id: 'hardcore', label: '🔥 Хардкор' },
                      ] as const
                    ).map((qf) => (
                      <TouchableOpacity
                        key={qf.id}
                        onPress={() => setQuestFilter(qf.id)}
                        style={[
                          styles.filterChip,
                          questFilter === qf.id && styles.filterChipActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.filterChipText,
                            {
                              color:
                                questFilter === qf.id ? '#0284C7' : theme.textSecondary,
                            },
                          ]}
                        >
                          {qf.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                  {filteredQuests.map((q) => {
                    const completed = q.progress >= q.target;
                    const pct = Math.min(100, Math.round((q.progress / q.target) * 100));
                    const diffColors: Record<QuestDifficulty, string> = {
                      daily: '#0284C7',
                      battle: '#F59E0B',
                      collector: '#A855F7',
                      hardcore: '#EF4444',
                    };
                    const diffLabels: Record<QuestDifficulty, string> = {
                      daily: 'ЕЖЕДНЕВНОЕ',
                      battle: 'БОЕВОЕ ИСПЫТАНИЕ',
                      collector: 'КОЛЛЕКЦИЯ',
                      hardcore: 'ХАРДКОР',
                    };
                    const badgeCol = diffColors[q.difficulty] || '#0284C7';

                    return (
                      <LiquidGlassCard
                        key={q.id}
                        themeMode={themeMode}
                        style={styles.questCard}
                      >
                        <View style={styles.questRow}>
                          <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                              <View
                                style={[
                                  styles.questDiffBadge,
                                  { backgroundColor: `${badgeCol}22`, borderColor: badgeCol },
                                ]}
                              >
                                <Text style={[styles.questDiffText, { color: badgeCol }]}>
                                  {diffLabels[q.difficulty]}
                                </Text>
                              </View>
                            </View>
                            <Text style={[styles.questTitle, { color: theme.textPrimary }]}>
                              {q.title}
                            </Text>
                            <Text style={[styles.questDesc, { color: theme.textSecondary }]}>
                              {q.description}
                            </Text>
                            <View style={styles.questBarBg}>
                              <View
                                style={[
                                  styles.questBarFill,
                                  { width: `${pct}%`, backgroundColor: badgeCol },
                                ]}
                              />
                            </View>
                            <Text style={[styles.questProg, { color: theme.textMuted }]}>
                              Прогресс: {q.progress} / {q.target} ({pct}%)
                            </Text>
                          </View>
                          <TouchableOpacity
                            disabled={!completed || q.claimed}
                            onPress={() => handleClaimQuest(q)}
                            style={[
                              styles.questBtn,
                              completed && !q.claimed && styles.questBtnReady,
                              q.claimed && styles.questBtnClaimed,
                            ]}
                          >
                            <Text style={styles.questBtnText}>
                              {q.claimed
                                ? 'ПОЛУЧЕНО'
                                : completed
                                ? `ЗАБРАТЬ +$${q.reward}`
                                : `+$${q.reward}`}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </LiquidGlassCard>
                    );
                  })}
                </View>
              )}

              {/* ==================== TAB 5: PROFILE & LEADERBOARD ==================== */}
              {activeTab === 'profile' && (
                <View>
                  <LiquidGlassCard themeMode={themeMode} style={styles.profileCard}>
                    <View style={[styles.avatarCircle, { backgroundColor: user.avatarColor }]}>
                      <Text style={styles.avatarLetter}>
                        {user.nickname[0]?.toUpperCase() || 'P'}
                      </Text>
                    </View>
                    <Text style={[styles.profileNick, { color: theme.textPrimary }]}>
                      {user.nickname}
                    </Text>
                    <Text style={[styles.profileEmail, { color: theme.textSecondary }]}>
                      ✅ ПОДТВЕРЖДЁН • {user.email}
                    </Text>

                    <View
                      style={[
                        styles.premierCardBox,
                        { borderColor: rankData.current.color },
                      ]}
                    >
                      <View style={styles.premierTopRow}>
                        <Text
                          style={[
                            styles.premierRankTitle,
                            { color: rankData.current.color },
                          ]}
                        >
                          {rankData.current.title}
                        </Text>
                        <Text style={[styles.premierEloVal, { color: theme.textPrimary }]}>
                          {eloRating.toLocaleString()} CS RATING
                        </Text>
                      </View>
                      <View style={styles.questBarBg}>
                        <View
                          style={[
                            styles.questBarFill,
                            {
                              width: `${rankData.progressPct}%`,
                              backgroundColor: rankData.current.color,
                            },
                          ]}
                        />
                      </View>
                      <Text style={[styles.premierNextHint, { color: theme.textSecondary }]}>
                        {rankData.next
                          ? `До звания «${rankData.next.title}»: ещё ${(
                              rankData.next.minElo - eloRating
                            ).toLocaleString()} ELO`
                          : 'Максимальное звание Легенды CS2 достигнуто!'}
                      </Text>
                    </View>

                    <View style={styles.statsGrid}>
                      <View style={styles.statBox}>
                        <Text style={styles.statVal}>${balance.toFixed(2)}</Text>
                        <Text style={[styles.statLbl, { color: theme.textSecondary }]}>
                          Баланс
                        </Text>
                      </View>
                      <View style={styles.statBox}>
                        <Text style={styles.statVal}>{inventory.length}</Text>
                        <Text style={[styles.statLbl, { color: theme.textSecondary }]}>
                          Предметов
                        </Text>
                      </View>
                      <View style={styles.statBox}>
                        <Text style={styles.statVal}>${totalInventoryValue.toFixed(2)}</Text>
                        <Text style={[styles.statLbl, { color: theme.textSecondary }]}>
                          Инвентарь
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={[styles.settingBtn, { borderColor: theme.cardBorder }]}
                      onPress={() => setActiveTab('settings')}
                    >
                      <Ionicons name="settings-outline" size={18} color="#0284C7" />
                      <Text style={[styles.settingBtnText, { color: theme.textPrimary }]}>
                        Открыть Настройки Темы и Синхронизации →
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.settingBtn,
                        { borderColor: 'rgba(239,68,68,0.45)', marginTop: 10 },
                      ]}
                      onPress={() => setUser(null)}
                    >
                      <Ionicons name="log-out-outline" size={18} color="#EF4444" />
                      <Text style={[styles.settingBtnText, { color: '#EF4444' }]}>
                        Выйти или сменить аккаунт
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

              {/* ==================== TAB 6: SETTINGS (НАСТРОЙКИ ТЕМЫ И ИГРЫ) ==================== */}
              {activeTab === 'settings' && (
                <View>
                  <LiquidGlassCard themeMode={themeMode} style={styles.settingsCard}>
                    <Text style={[styles.sectionHeader, { color: theme.textPrimary }]}>
                      ⚙️ Настройки Интерфейса и Игры
                    </Text>

                    <Text style={[styles.settingsSubTitle, { color: theme.textSecondary }]}>
                      1. ВЫБОР ФОНА И ТЕМЫ ОФОРМЛЕНИЯ:
                    </Text>
                    {(Object.values(THEMES) as (typeof THEMES)['bright'][]).map((t) => {
                      const active = themeMode === t.id;
                      return (
                        <TouchableOpacity
                          key={t.id}
                          onPress={() => {
                            playClickSound();
                            setThemeMode(t.id);
                            showNotify(
                              `Тема изменена: ${t.name}`,
                              t.subtitle,
                              'info'
                            );
                          }}
                          style={[
                            styles.themeOptionRow,
                            {
                              borderColor: active ? '#0284C7' : theme.cardBorder,
                              backgroundColor: active
                                ? 'rgba(2, 132, 199, 0.14)'
                                : theme.surfaceBg,
                            },
                          ]}
                        >
                          <View
                            style={[
                              styles.themePreviewDot,
                              { backgroundColor: t.bgGradient[1] },
                            ]}
                          />
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
                            size={22}
                            color={active ? '#0284C7' : theme.textMuted}
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
                      2. ПАРАМЕТРЫ ОТКРЫТИЯ КЕЙСОВ И ЗВУКА:
                    </Text>

                    <TouchableOpacity
                      style={[styles.toggleSettingRow, { borderColor: theme.cardBorder }]}
                      onPress={() => {
                        playClickSound();
                        setFastSpin((v) => !v);
                      }}
                    >
                      <Ionicons name="flash" size={20} color="#F59E0B" />
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.toggleTitle, { color: theme.textPrimary }]}>
                          ⚡ Быстрое открытие кейсов (x2.5 скорость)
                        </Text>
                        <Text style={[styles.toggleSub, { color: theme.textSecondary }]}>
                          Ускоряет анимацию рулетки кейсов и битвы кейсов без пропуска
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: fastSpin ? '#10B981' : theme.textMuted,
                          fontWeight: '900',
                        }}
                      >
                        {fastSpin ? 'ВКЛ' : 'ВЫКЛ'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.toggleSettingRow, { borderColor: theme.cardBorder }]}
                      onPress={() => {
                        const next = !soundOn;
                        setSoundOn(next);
                        setSoundEnabled(next);
                      }}
                    >
                      <Ionicons
                        name={soundOn ? 'volume-high' : 'volume-mute'}
                        size={20}
                        color="#0284C7"
                      />
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.toggleTitle, { color: theme.textPrimary }]}>
                          🔊 Звуковые эффекты CS2
                        </Text>
                        <Text style={[styles.toggleSub, { color: theme.textSecondary }]}>
                          Щелчки рулетки, звуки выпадения тайного и ножей
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: soundOn ? '#10B981' : theme.textMuted,
                          fontWeight: '900',
                        }}
                      >
                        {soundOn ? 'ВКЛ' : 'ВЫКЛ'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.toggleSettingRow, { borderColor: theme.cardBorder }]}
                      onPress={() => setShowLiveTicker((v) => !v)}
                    >
                      <Ionicons name="pulse" size={20} color="#10B981" />
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.toggleTitle, { color: theme.textPrimary }]}>
                          📡 Живая лента недавнего дропа
                        </Text>
                        <Text style={[styles.toggleSub, { color: theme.textSecondary }]}>
                          Показывать полосу последних выбитых предметов сверху экрана
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: showLiveTicker ? '#10B981' : theme.textMuted,
                          fontWeight: '900',
                        }}
                      >
                        {showLiveTicker ? 'ВКЛ' : 'ВЫКЛ'}
                      </Text>
                    </TouchableOpacity>

                    {/* Cloud Sync Export / Import Section */}
                    <Text
                      style={[
                        styles.settingsSubTitle,
                        { color: theme.textSecondary, marginTop: 16 },
                      ]}
                    >
                      3. КРОСС-ДЕВАЙС СИНХРОНИЗАЦИЯ ПРОГРЕССА ({user.email}):
                    </Text>
                    <Text style={[styles.toggleSub, { color: theme.textSecondary, marginBottom: 6 }]}>
                      Скопируйте этот код синхронизации, чтобы перенести свой баланс, звание и все скины на другое устройство:
                    </Text>
                    <TextInput
                      value={currentSyncToken}
                      editable={false}
                      selectTextOnFocus
                      style={[
                        styles.syncCodeBox,
                        { color: theme.textPrimary, borderColor: theme.cardBorder },
                      ]}
                    />

                    <Text
                      style={[
                        styles.toggleSub,
                        { color: theme.textSecondary, marginTop: 10, marginBottom: 6 },
                      ]}
                    >
                      Или вставьте код синхронизации с другого устройства:
                    </Text>
                    <TextInput
                      placeholder="Вставьте код CS2SYNC-..."
                      placeholderTextColor="#64748B"
                      value={importSyncInput}
                      onChangeText={setImportSyncInput}
                      style={[
                        styles.syncCodeBox,
                        { color: theme.textPrimary, borderColor: theme.cardBorder },
                      ]}
                    />
                    <TouchableOpacity
                      style={styles.syncImportBtn}
                      onPress={() => {
                        const decoded = decodeCloudSyncToken(importSyncInput);
                        if (!decoded) {
                          showNotify(
                            'Ошибка кода синхронизации',
                            'Проверьте, что код начинается с CS2SYNC-',
                            'error'
                          );
                          return;
                        }
                        setUser(decoded.profile);
                        setBalance(decoded.balance);
                        setInventory(decoded.inventory);
                        setEloRating(decoded.eloRating);
                        setImportSyncInput('');
                        showNotify(
                          'Прогресс успешно синхронизирован!',
                          `Восстановлен аккаунт ${decoded.profile.nickname} ($${decoded.balance.toFixed(2)}, скинов: ${decoded.inventory.length})`,
                          'reward'
                        );
                      }}
                    >
                      <Ionicons name="cloud-download-outline" size={16} color="#FFFFFF" />
                      <Text style={styles.syncImportBtnText}>
                        ЗАГРУЗИТЬ ПРОГРЕСС ПО КОДУ
                      </Text>
                    </TouchableOpacity>
                  </LiquidGlassCard>
                </View>
              )}
            </ScrollView>

            {/* SLEEK FLOATING VECTOR BOTTOM BAR (6 TABS INCLUDING SETTINGS) */}
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
                { key: 'cases', icon: 'grid-outline' as const, label: 'Кейсы' },
                { key: 'inventory', icon: 'briefcase-outline' as const, label: 'Склад' },
                { key: 'minigames', icon: 'game-controller-outline' as const, label: 'Игры' },
                { key: 'quests', icon: 'ribbon-outline' as const, label: 'Миссии' },
                { key: 'profile', icon: 'person-outline' as const, label: 'Профиль' },
                { key: 'settings', icon: 'settings-outline' as const, label: 'Настройки' },
              ].map((item) => {
                const active = activeTab === item.key;
                return (
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => {
                      playClickSound();
                      if (item.key === 'minigames') {
                        setRequestedMiniGame('lobby');
                      }
                      setActiveTab(item.key as BottomNavTab);
                    }}
                    style={[styles.navItem, active && styles.navItemActive]}
                  >
                    <Ionicons
                      name={item.icon}
                      size={19}
                      color={active ? '#0284C7' : theme.textMuted}
                    />
                    <Text
                      style={[
                        styles.navLabel,
                        { color: active ? '#0284C7' : theme.textMuted },
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

        {/* CASE CONTENTS PREVIEW DRAWER MODAL */}
        <Modal visible={Boolean(viewingCaseDetails)} transparent animationType="fade">
          <View style={styles.modalBackdrop}>
            {viewingCaseDetails && (
              <LiquidGlassCard
                themeMode={themeMode}
                glowColor={viewingCaseDetails.accentColor}
                style={styles.caseDrawerSheet}
              >
                <View style={styles.drawerHeader}>
                  <Image
                    source={{ uri: viewingCaseDetails.image }}
                    style={styles.drawerCaseImg}
                    resizeMode="contain"
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.drawerTitle, { color: theme.textPrimary }]}>
                      {viewingCaseDetails.name}
                    </Text>
                    <Text style={[styles.drawerSub, { color: theme.textSecondary }]}>
                      {viewingCaseDetails.subtitle}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.closeCircle}
                    onPress={() => setViewingCaseDetails(null)}
                  >
                    <Ionicons name="close" size={18} color={theme.textPrimary} />
                  </TouchableOpacity>
                </View>

                {/* Multi-Open Selector x1..x5 + Fast Spin Toggle */}
                <View style={styles.multiSelectRow}>
                  {[1, 2, 3, 4, 5].map((cnt) => {
                    const active = openMultiplier === cnt;
                    return (
                      <TouchableOpacity
                        key={cnt}
                        onPress={() => setOpenMultiplier(cnt)}
                        style={[
                          styles.multiCountBtn,
                          active && {
                            backgroundColor: `${viewingCaseDetails.accentColor}33`,
                            borderColor: viewingCaseDetails.accentColor,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.multiCountText,
                            { color: active ? theme.textPrimary : theme.textSecondary },
                          ]}
                        >
                          x{cnt}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}

                  <TouchableOpacity
                    onPress={() => setFastSpin((v) => !v)}
                    style={[
                      styles.multiCountBtn,
                      fastSpin && {
                        backgroundColor: 'rgba(250, 204, 21, 0.28)',
                        borderColor: '#F59E0B',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.multiCountText,
                        { color: fastSpin ? '#D97706' : theme.textSecondary },
                      ]}
                    >
                      ⚡ БЫСТРО
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[
                    styles.drawerOpenBigBtn,
                    { backgroundColor: viewingCaseDetails.accentColor },
                  ]}
                  onPress={() => handleOpenCasePress(viewingCaseDetails, openMultiplier)}
                >
                  <Text style={styles.drawerOpenBigText}>
                    {fastSpin ? '⚡ БЫСТРО ОТКРЫТЬ ' : 'ОТКРЫТЬ '}x{openMultiplier} ЗА ${(
                      viewingCaseDetails.price * openMultiplier
                    ).toFixed(2)}
                  </Text>
                </TouchableOpacity>

                <Text style={[styles.drawerSectionLbl, { color: theme.textSecondary }]}>
                  Содержимое ({viewingCaseDetails.items.length} скинов • Нажмите для 3D-осмотра):
                </Text>

                <ScrollView
                  style={{ maxHeight: 370 }}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.invGrid}>
                    {viewingCaseDetails.items.map((skin) => (
                      <SkinCard
                        key={skin.id}
                        item={skin}
                        themeMode={themeMode}
                        onPress={() =>
                          handlePreviewTemplate(skin, viewingCaseDetails.category)
                        }
                      />
                    ))}
                  </View>
                </ScrollView>
              </LiquidGlassCard>
            )}
          </View>
        </Modal>

        {/* ROULETTE MODAL (WITH FAST SPIN INSTEAD OF INSTANT SKIP) */}
        <CaseRouletteModal
          visible={rouletteOpen}
          caseItem={selectedCase}
          openCount={openMultiplier}
          fastSpin={fastSpin}
          onToggleFastSpin={() => setFastSpin((v) => !v)}
          onClose={() => setRouletteOpen(false)}
          onCompleteDrops={handleCompleteDrops}
          onSellDrops={handleSellDrops}
          onInspectDrop={(won) => setInspectedSkin(won)}
        />

        {/* 3D SKIN INSPECTOR MODAL */}
        <SkinInspectorModal
          visible={Boolean(inspectedSkin)}
          item={inspectedSkin}
          onClose={() => setInspectedSkin(null)}
          onSell={handleSellItem}
          onApplySticker={handleApplySticker}
        />

        {/* DAILY REWARD 7-DAY STREAK MODAL */}
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
    width: 36,
    height: 36,
    borderRadius: 12,
  },
  brandName: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  headerRankBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    marginTop: 2,
    alignSelf: 'flex-start',
  },
  headerRankText: {
    fontSize: 9,
    fontWeight: '900',
  },
  premierCardBox: {
    width: '100%',
    backgroundColor: 'rgba(56,189,248,0.06)',
    borderWidth: 1.2,
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
  },
  premierTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  premierRankTitle: {
    fontSize: 13,
    fontWeight: '900',
  },
  premierEloVal: {
    fontSize: 12,
    fontWeight: '900',
  },
  premierNextHint: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 6,
  },
  balanceGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  plusMoneyBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(16, 185, 129, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1.2,
    borderColor: 'rgba(16, 185, 129, 0.45)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  walletAmount: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '900',
  },
  bankruptBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.16)',
    borderBottomWidth: 1.5,
    borderColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 10,
  },
  bankruptTitle: {
    color: '#DC2626',
    fontSize: 11,
    fontWeight: '900',
  },
  bankruptSub: {
    color: '#334155',
    fontSize: 10,
    fontWeight: '700',
  },
  bankruptActionBtn: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
  },
  bankruptActionText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  liveTickerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
  },
  liveDotBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.18)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  liveText: {
    color: '#EF4444',
    fontSize: 9,
    fontWeight: '900',
  },
  tickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginRight: 6,
    gap: 5,
  },
  tickerImg: {
    width: 24,
    height: 18,
  },
  tickerName: {
    fontSize: 10,
    fontWeight: '700',
    maxWidth: 70,
  },
  mainScroll: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  heroCard: {
    padding: 15,
    marginBottom: 10,
  },
  heroContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seasonBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 5,
  },
  seasonBadgeText: {
    color: '#D97706',
    fontSize: 9,
    fontWeight: '900',
  },
  heroTitle: {
    fontSize: 16,
    fontWeight: '900',
  },
  heroSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 3,
  },
  heroSkinImg: {
    width: 105,
    height: 74,
    marginLeft: 8,
  },
  quickToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  caseCountBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  fastSpinTogglePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F59E0B',
    backgroundColor: 'rgba(245, 158, 11, 0.14)',
  },
  fastSpinTogglePillActive: {
    backgroundColor: '#FACC15',
  },
  fastSpinToggleText: {
    color: '#D97706',
    fontSize: 10,
    fontWeight: '900',
  },
  catalogTabsRow: {
    marginBottom: 12,
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 14,
    borderWidth: 1,
    marginRight: 8,
  },
  catChipText: {
    fontWeight: '800',
    fontSize: 12,
  },
  bentoCaseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bentoCaseTile: {
    width: '48.2%',
    marginBottom: 13,
  },
  bentoInner: {
    padding: 12,
    alignItems: 'center',
  },
  bentoTopRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCountPill: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  itemCountText: {
    fontSize: 9,
    fontWeight: '800',
  },
  bentoImgWrap: {
    height: 98,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  bentoCaseImg: {
    width: 118,
    height: 90,
  },
  bentoCaseTitle: {
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
  },
  bentoCaseSub: {
    fontSize: 10,
    marginTop: 2,
    marginBottom: 10,
    textAlign: 'center',
  },
  bentoOpenBtn: {
    width: '100%',
    paddingVertical: 9,
    borderRadius: 11,
    alignItems: 'center',
  },
  bentoOpenPrice: {
    color: '#040D1A',
    fontWeight: '900',
    fontSize: 11,
    letterSpacing: 0.4,
  },
  invSummaryCard: {
    padding: 15,
    marginBottom: 14,
  },
  invSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  invTotalLabel: {
    fontSize: 10,
    fontWeight: '800',
  },
  invTotalValue: {
    fontSize: 20,
    fontWeight: '900',
    marginTop: 2,
  },
  sellAllCheapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(239, 68, 68, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
  },
  sellAllCheapText: {
    color: '#EF4444',
    fontSize: 11,
    fontWeight: '800',
  },
  filterChip: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 9,
    backgroundColor: 'rgba(148, 163, 184, 0.14)',
    marginRight: 7,
  },
  filterChipActive: {
    backgroundColor: 'rgba(2, 132, 199, 0.18)',
    borderWidth: 1,
    borderColor: '#0284C7',
  },
  filterChipText: {
    fontSize: 11,
    fontWeight: '800',
  },
  invGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyBox: {
    padding: 44,
    alignItems: 'center',
    gap: 10,
  },
  emptyText: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '600',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 10,
  },
  questCard: {
    padding: 14,
    marginBottom: 10,
  },
  questRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  questDiffBadge: {
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 5,
    marginBottom: 3,
  },
  questDiffText: {
    fontSize: 8,
    fontWeight: '900',
  },
  questTitle: {
    fontSize: 14,
    fontWeight: '900',
  },
  questDesc: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '600',
  },
  questBarBg: {
    height: 6,
    backgroundColor: 'rgba(148,163,184,0.2)',
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  questBarFill: {
    height: '100%',
    backgroundColor: '#0284C7',
  },
  questProg: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  },
  questBtn: {
    backgroundColor: 'rgba(148,163,184,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  questBtnReady: {
    backgroundColor: '#10B981',
  },
  questBtnClaimed: {
    backgroundColor: 'rgba(148,163,184,0.12)',
  },
  questBtnText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 11,
  },
  profileCard: {
    padding: 20,
    alignItems: 'center',
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarLetter: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
  },
  profileNick: {
    fontSize: 20,
    fontWeight: '900',
  },
  profileEmail: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 3,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(2, 132, 199, 0.08)',
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  statVal: {
    color: '#0284C7',
    fontSize: 14,
    fontWeight: '900',
  },
  statLbl: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  settingBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 13,
    borderWidth: 1.2,
  },
  settingBtnText: {
    fontWeight: '800',
    fontSize: 12,
  },
  settingsCard: {
    padding: 16,
  },
  settingsSubTitle: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  themeOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    marginBottom: 8,
  },
  themePreviewDot: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#38BDF8',
  },
  themeOptionTitle: {
    fontSize: 13,
    fontWeight: '900',
  },
  themeOptionSub: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  toggleSettingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 8,
  },
  toggleTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  toggleSub: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  syncCodeBox: {
    borderWidth: 1.2,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 11,
    fontWeight: '700',
    backgroundColor: 'rgba(148,163,184,0.1)',
  },
  syncImportBtn: {
    marginTop: 8,
    backgroundColor: '#0284C7',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  syncImportBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    height: 64,
    borderRadius: 22,
    borderWidth: 1.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 4,
    overflow: 'hidden',
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  navItemActive: {
    backgroundColor: 'rgba(2, 132, 199, 0.14)',
  },
  navLabel: {
    fontSize: 9,
    fontWeight: '800',
    marginTop: 2,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
  },
  caseDrawerSheet: {
    width: '100%',
    maxWidth: 420,
    padding: 16,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  drawerCaseImg: {
    width: 68,
    height: 56,
  },
  drawerTitle: {
    fontSize: 16,
    fontWeight: '900',
  },
  drawerSub: {
    fontSize: 11,
    marginTop: 2,
  },
  closeCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(148,163,184,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  multiSelectRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  multiCountBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(148,163,184,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.3)',
    alignItems: 'center',
  },
  multiCountText: {
    fontWeight: '900',
    fontSize: 12,
  },
  drawerOpenBigBtn: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 14,
  },
  drawerOpenBigText: {
    color: '#040D1A',
    fontWeight: '900',
    fontSize: 13,
  },
  drawerSectionLbl: {
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 10,
  },
});
