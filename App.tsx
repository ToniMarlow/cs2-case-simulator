import { CatalogImage } from "./src/components/CatalogImage";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
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
import {
  CS2_AVATARS,
  CS2_RANKS,
  DAILY_CARE_PACKAGE,
  getCS2Rank,
  getNextCS2Rank,
  getPremierRating,
  INITIAL_CASES,
  INITIAL_QUESTS,
  instantiateSkin,
  rollRandomKnife,
} from './src/data/cs2Database';
import {
  GameNotificationBanner,
  InGameNotification,
  InspectSkinModal,
  LiquidGlassCard,
  SkinCard,
  THEMES,
} from './src/components/LiquidGlassUI';
import { CS2CaseScreen } from './src/components/CaseRouletteModal';
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
import {
  playClickSound,
  playDropSound,
  playStickerApplySound,
  playStickerScrapeSound,
  playWinSound,
  setSoundEnabled,
} from './src/utils/soundManager';

const STORAGE_KEY = '@cs2_liquid_glass_save_v3';
const INTERFACE_VERSION = 1;

const EMPTY_STATS = { opened: 0, spent: 0, dropValue: 0, saleRevenue: 0 };
type OpeningStats = typeof EMPTY_STATS;
type AccountWithStats = StoredAccountRecord & { openingStats?: OpeningStats };

function readOpeningStats(saved: unknown): OpeningStats {
  const stats = saved as Partial<OpeningStats> | null | undefined;
  const numberOrZero = (value: unknown) =>
    typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : 0;
  return {
    opened: Math.floor(numberOrZero(stats?.opened)),
    spent: numberOrZero(stats?.spent),
    dropValue: numberOrZero(stats?.dropValue),
    saleRevenue: numberOrZero(stats?.saleRevenue),
  };
}

type BottomNavTab = 'cases' | 'inventory' | 'minigames' | 'quests' | 'profile' | 'settings';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [balance, setBalance] = useState<number>(25.0);
  const [inventory, setInventoryState] = useState<InventoryItem[]>([]);
  const inventoryRef = useRef(inventory);
  const saveQueue = useRef<Promise<void>>(Promise.resolve());
  const openingInProgress = useRef(false);
  const [savingOpening, setSavingOpening] = useState(false);
  const [openingStats, setOpeningStats] = useState<OpeningStats>(EMPTY_STATS);
  const setInventory = (update: React.SetStateAction<InventoryItem[]>) => {
    // Sales must see removals immediately, even before React renders again.
    const next = typeof update === 'function' ? update(inventoryRef.current) : update;
    inventoryRef.current = next;
    setInventoryState(next);
  };
  const [quests, setQuests] = useState<QuestItem[]>(INITIAL_QUESTS);
  const [eloRating, setEloRating] = useState<number>(1000);
  const [streakDay, setStreakDay] = useState<number>(1);
  const [lastClaimDate, setLastClaimDate] = useState<string>('');
  const [dailyModalOpen, setDailyModalOpen] = useState<boolean>(false);

  const [themeMode, setThemeMode] = useState<ThemeMode>('bright');
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [fastSpin, setFastSpin] = useState<boolean>(false);
  const [showLiveTicker, setShowLiveTicker] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [notification, setNotification] = useState<InGameNotification | null>(null);
  const notifyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Navigation & Filters
  const [activeTab, setActiveTab] = useState<BottomNavTab>('cases');
  const [requestedMiniGame, setRequestedMiniGame] = useState<MiniGameTab>('lobby');
  const [catalogCategory, setCatalogCategory] = useState<CatalogCategory | 'all'>('all');
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>('agent-4726');
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
          setOpeningStats(readOpeningStats(parsed.openingStats));
          if (typeof parsed.balance === 'number') setBalance(parsed.balance);
          if (Array.isArray(parsed.inventory)) setInventory(parsed.inventory);
          if (Array.isArray(parsed.quests) && parsed.quests.length >= INITIAL_QUESTS.length) {
            setQuests(parsed.quests);
          }
          if (typeof parsed.eloRating === 'number') setEloRating(parsed.eloRating);
          if (typeof parsed.streakDay === 'number') setStreakDay(parsed.streakDay);
          if (typeof parsed.lastClaimDate === 'string') setLastClaimDate(parsed.lastClaimDate);
          if (parsed.interfaceVersion === INTERFACE_VERSION && Object.prototype.hasOwnProperty.call(THEMES, parsed.themeMode)) {
            setThemeMode(parsed.themeMode);
          }
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

  const snapshot = {
    interfaceVersion: INTERFACE_VERSION,
    user, balance, inventory, quests, eloRating, streakDay, lastClaimDate,
    themeMode, soundOn, fastSpin, showLiveTicker, openingStats,
  };

  const queueSave = (next: typeof snapshot) => {
    const write = saveQueue.current.then(async () => {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      if (!next.user?.email) return;
      try {
        const regRaw = await AsyncStorage.getItem(ACCOUNTS_REGISTRY_KEY);
        const registry: Record<string, AccountWithStats> = regRaw ? JSON.parse(regRaw) : {};
        registry[next.user.email.toLowerCase()] = {
          profile: next.user,
          balance: next.balance,
          inventory: next.inventory,
          quests: next.quests,
          eloRating: next.eloRating,
          streakDay: next.streakDay,
          lastClaimDate: next.lastClaimDate,
          openingStats: next.openingStats,
          updatedAt: Date.now(),
        };
        await AsyncStorage.setItem(ACCOUNTS_REGISTRY_KEY, JSON.stringify(registry));
      } catch {
        showNotify('Ошибка сохранения профиля', 'Основной прогресс сохранён. Копия профиля обновится при следующем сохранении.', 'error');
      }
    });
    saveQueue.current = write.catch(() => {});
    return write;
  };

  useEffect(() => {
    if (!isLoaded || openingInProgress.current) return;
    queueSave(snapshot).catch(() => {
      showNotify('Ошибка сохранения', 'Не удалось полностью сохранить прогресс.', 'error');
    });
  }, [
    user, balance, inventory, quests, eloRating, streakDay, lastClaimDate,
    themeMode, soundOn, fastSpin, showLiveTicker, openingStats, isLoaded,
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

  const handleOpenCases = async (
    totalCost: number,
    winners: InventoryItem[],
    autoSold: InventoryItem[]
  ): Promise<boolean> => {
    if (openingInProgress.current) return false;
    if (balance < totalCost) {
      showNotify('Недостаточно средств', `Нужно $${totalCost.toFixed(2)}.`, 'error');
      return false;
    }

    const soldIds = new Set(autoSold.map((item) => item.instanceId));
    const kept = winners.filter((item) => !soldIds.has(item.instanceId));
    const rareCount = kept.filter((item) => item.rarity === 'covert' || item.rarity === 'gold').length;
    const saleRevenue = autoSold.reduce((sum, item) => sum + item.price, 0);
    const dropValue = winners.reduce((sum, item) => sum + item.price, 0);
    const questIncrements: Partial<Record<QuestItem['type'], number>> = {
      open_cases: winners.length,
      get_covert: rareCount,
      sell_items: autoSold.length,
    };
    const next = {
      ...snapshot,
      balance: Number((balance - totalCost + saleRevenue).toFixed(2)),
      inventory: kept.length ? [...kept, ...inventoryRef.current] : inventoryRef.current,
      eloRating: eloRating + winners.length * 45 + rareCount * 350,
      quests: quests.map((quest) => {
        const increment = questIncrements[quest.type];
        return increment
          ? { ...quest, progress: Math.min(quest.target, quest.progress + increment) }
          : quest;
      }),
      openingStats: {
        opened: openingStats.opened + winners.length,
        spent: Number((openingStats.spent + totalCost).toFixed(2)),
        dropValue: Number((openingStats.dropValue + dropValue).toFixed(2)),
        saleRevenue: Number((openingStats.saleRevenue + saleRevenue).toFixed(2)),
      },
    };

    openingInProgress.current = true;
    setSavingOpening(true);
    try {
      await queueSave(next);
      setBalance(next.balance);
      setInventory(next.inventory);
      setQuests(next.quests);
      setEloRating(next.eloRating);
      setOpeningStats(next.openingStats);
      return true;
    } catch {
      showNotify('Кейс не открыт', 'Не удалось сохранить результат. Попробуйте снова.', 'error');
      return false;
    } finally {
      openingInProgress.current = false;
      setSavingOpening(false);
    }
  };

  const creditSale = (items: InventoryItem[]) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    setBalance((balance) => Number((balance + total).toFixed(2)));
    incrementQuest('sell_items', items.length);
    setOpeningStats((current) => ({
      ...current,
      saleRevenue: Number((current.saleRevenue + total).toFixed(2)),
    }));
    playWinSound();
    return total;
  };

  const sellInventoryItems = (items: InventoryItem[]) => {
    const ids = new Set(items.map((item) => item.instanceId));
    const toSell = inventoryRef.current.filter((item) => ids.has(item.instanceId) && !item.isLocked);
    if (toSell.length === 0) return 0;
    const soldIds = new Set(toSell.map((item) => item.instanceId));
    setInventory((current) => current.filter((item) => !soldIds.has(item.instanceId)));
    return creditSale(toSell);
  };

  const handleToggleLockItem = (instanceId: string) => {
    playClickSound();
    setInventory((prev) =>
      prev.map((item) => {
        if (item.instanceId === instanceId) {
          const nextLock = !item.isLocked;
          showNotify(
            nextLock ? 'Скин заблокирован 🔒' : 'Замок снят 🔓',
            nextLock
              ? `${item.weapon} | ${item.name} защищён от быстрой продажи и контрактов.`
              : `${item.weapon} | ${item.name} теперь можно продать или отправить в контракт.`,
            'info'
          );
          return { ...item, isLocked: nextLock };
        }
        return item;
      })
    );
    if (inspectedSkin && inspectedSkin.instanceId === instanceId) {
      setInspectedSkin((prev) => (prev ? { ...prev, isLocked: !prev.isLocked } : null));
    }
  };

  const handleSellItem = (item: InventoryItem) => {
    const current = inventoryRef.current.find((entry) => entry.instanceId === item.instanceId);
    if (!current) return;
    if (current.isLocked) {
      showNotify('Скин защищён замком 🔒', 'Снимите замок перед продажей.', 'warning');
      return;
    }
    sellInventoryItems([current]);
  };

  const handleApplyStickerToWeapon = (instanceId: string, sticker: InventoryItem, slot: number) => {
    playStickerApplySound();
    setInventory((prev) => {
      let removedOne = false;
      const filtered = prev.filter((it) => {
        if (!removedOne && it.instanceId === sticker.instanceId) {
          removedOne = true;
          return false;
        }
        return true;
      });

      return filtered.map((it) => {
        if (it.instanceId === instanceId) {
          const nextStickers = [...(it.stickers || [])];
          nextStickers[slot] = { name: sticker.name, image: sticker.image, wear: 0 };
          const bonusPrice = Number((sticker.price * 0.25).toFixed(2));
          const updated = {
            ...it,
            stickers: nextStickers.filter(Boolean),
            price: Number((it.price + bonusPrice).toFixed(2)),
          };
          if (inspectedSkin && inspectedSkin.instanceId === instanceId) {
            setInspectedSkin(updated);
          }
          return updated;
        }
        return it;
      });
    });
    showNotify(
      'Наклейка нанесена! 🏷',
      `Наклейка ${sticker.name} нанесена на оружие! Стоимость увеличена.`,
      'success'
    );
  };

  const handleScrapeStickerFromWeapon = (instanceId: string, slot: number) => {
    playStickerScrapeSound();
    setInventory((prev) =>
      prev.map((it) => {
        if (it.instanceId === instanceId) {
          const nextStickers = [...(it.stickers || [])];
          if (nextStickers[slot]) {
            const curWear = nextStickers[slot].wear || 0;
            if (curWear >= 2) {
              nextStickers.splice(slot, 1);
              showNotify('Наклейка стёрта', 'Наклейка была полностью удалена с оружия.', 'info');
            } else {
              nextStickers[slot] = { ...nextStickers[slot], wear: curWear + 1 };
              showNotify('Наклейка потёрта', `Степень износа наклейки увеличена (${curWear + 1}/3).`, 'info');
            }
          }
          const updated = { ...it, stickers: nextStickers };
          if (inspectedSkin && inspectedSkin.instanceId === instanceId) {
            setInspectedSkin(updated);
          }
          return updated;
        }
        return it;
      })
    );
  };

  const handleRemoveStickerFromWeapon = (instanceId: string, slot: number) => {
    playStickerScrapeSound();
    setInventory((prev) =>
      prev.map((it) => {
        if (it.instanceId === instanceId) {
          const nextStickers = [...(it.stickers || [])];
          nextStickers.splice(slot, 1);
          const updated = { ...it, stickers: nextStickers };
          if (inspectedSkin && inspectedSkin.instanceId === instanceId) {
            setInspectedSkin(updated);
          }
          return updated;
        }
        return it;
      })
    );
    showNotify('Наклейка снята', 'Наклейка снята со слота.', 'info');
  };

  const handlePreviewTemplate = (skin: SkinTemplate, category: CatalogCategory) => {
    const mock = instantiateSkin(skin, category);
    setInspectedSkin(mock);
  };

  const handleSellAllCheap = () => {
    const cheap = inventoryRef.current.filter(
      (i) => !i.isLocked && (i.rarity === 'milspec' || i.rarity === 'restricted')
    );
    if (cheap.length === 0) {
      showNotify(
        'Нет доступных скинов для продажи',
        'Недорогие скины отсутствуют или защищены замком 🔒.',
        'warning'
      );
      return;
    }
    const totalSum = sellInventoryItems(cheap);
    showNotify('Продано', `Продано ${cheap.length} предм. на +$${totalSum.toFixed(2)}`, 'success');
  };

  const handleSellEntireInventory = () => {
    const toSell = inventoryRef.current.filter((i) => !i.isLocked);
    const lockedCount = inventoryRef.current.length - toSell.length;
    if (toSell.length === 0) {
      if (lockedCount > 0) {
        showNotify('Все скины защищены замком 🔒', `У вас ${lockedCount} предметов под замком.`, 'warning');
      } else {
        showNotify('Инвентарь пуст', 'Нет предметов для продажи.', 'info');
      }
      return;
    }
    const totalSum = sellInventoryItems(toSell);
    showNotify(
      'Склад продан',
      `Продано ${toSell.length} предм. на сумму $${totalSum.toFixed(2)}${lockedCount > 0 ? ` (${lockedCount} под замком 🔒 сохранены)` : ''}`,
      'success'
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
  };

  const theme = THEMES[themeMode] || THEMES.bright;

  // Filter & Sort Inventory
  const filteredInventory = useMemo(() => inventory
    .filter((i) => (invFilter === 'all' ? true : i.rarity === invFilter))
    .sort((a, b) => {
      if (invSort === 'price_desc') return b.price - a.price;
      if (invSort === 'price_asc') return a.price - b.price;
      return b.obtainedAt - a.obtainedAt;
    }), [inventory, invFilter, invSort]);

  if (!isLoaded) {
    return <View style={{ flex: 1, backgroundColor: theme.bgGradient[0] }} />;
  }

  // Filter & Sort Cases
  const filteredCases = INITIAL_CASES.filter((c) => {
    if (catalogCategory !== 'all' && c.category !== catalogCategory) return false;
    if (caseSearchQuery.trim() !== '') {
      const q = caseSearchQuery.trim().toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.items.some((i) => i.weapon.toLowerCase().includes(q) || i.name.toLowerCase().includes(q))
      );
    }
    return true;
  }).sort((a, b) => {
    if (casePriceSort === 'asc') return a.price - b.price;
    if (casePriceSort === 'desc') return b.price - a.price;
    return 0;
  });

  const filteredQuests =
    questFilter === 'all' ? quests : quests.filter((q) => q.difficulty === questFilter);
  const totalInventoryValue = inventory.reduce((acc, i) => acc + i.price, 0);
  const rankData = getRankByElo(eloRating);
  const cs2Rank = getCS2Rank(eloRating);
  const nextRankData = getNextCS2Rank(eloRating);
  const premierRating = getPremierRating(eloRating);
  const currentAvatar = CS2_AVATARS.find((a) => a.id === selectedAvatarId) || CS2_AVATARS[0];
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
    <View style={[styles.desktopStage, { backgroundColor: theme.isLight ? '#E3E7DE' : theme.bgGradient[0] }]}>
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
              setOpeningStats(readOpeningStats((restoredData as AccountWithStats | undefined)?.openingStats));
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
                accessibilityRole="button"
                accessibilityLabel="Открыть профиль"
                onPress={() => {
                  setOpenedCaseScreen(null);
                  setActiveTab('profile');
                }}
              >
                <View style={[styles.avatarBox, { backgroundColor: theme.surfaceBg, borderColor: theme.cardBorder, borderWidth: 1 }]}>
                  {currentAvatar.image ? (
                    <CatalogImage
                      image={currentAvatar.image} label={currentAvatar.name}
                      style={styles.avatarImgSmall}
                      resizeMode="cover"
                    />
                  ) : (
                    <Ionicons name="person" size={16} color="#FFFFFF" />
                  )}
                </View>
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Text
                      allowFontScaling={false}
                      numberOfLines={1}
                      style={[styles.brandName, { color: theme.textPrimary, maxWidth: 95 }]}
                    >
                      {user.nickname}
                    </Text>
                    <View style={[styles.premierHeaderBadge, { backgroundColor: premierRating.color }]}>
                      <Text allowFontScaling={false} style={styles.premierHeaderBadgeText}>
                        {premierRating.rating.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                  <Text
                    allowFontScaling={false}
                    numberOfLines={1}
                    style={[styles.rankTextMini, { color: theme.textSecondary, maxWidth: 120 }]}
                  >
                    {cs2Rank.nameRu}
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={styles.balanceGroup}>
                <TouchableOpacity
                  style={[styles.iconHeaderBtn, { backgroundColor: theme.surfaceBg }]}
                  onPress={() => setDailyModalOpen(true)}
                >
                  <Ionicons
                    name="gift-outline"
                    size={17}
                    color={canClaimDaily ? '#EAB308' : theme.textSecondary}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.iconHeaderBtn,
                    { backgroundColor: theme.surfaceBg },
                    activeTab === 'settings' && { borderColor: '#16A34A', borderWidth: 1.5 },
                  ]}
                  onPress={() => {
                    playClickSound();
                    setOpenedCaseScreen(null);
                    setActiveTab('settings');
                  }}
                >
                  <Ionicons
                    name="settings-outline"
                    size={17}
                    color={activeTab === 'settings' ? '#16A34A' : theme.textSecondary}
                  />
                </TouchableOpacity>

                <View style={[styles.walletPill, { backgroundColor: theme.surfaceBg }]}>
                  <Text style={[styles.walletLabel, { color: theme.textSecondary }]}>Баланс</Text>
                  <Text allowFontScaling={false} style={[styles.walletAmount, { color: theme.accent }]}>${balance.toFixed(2)}</Text>
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
                  onOpenCases={handleOpenCases}
                  onSellDrops={sellInventoryItems}
                  onInspectDrop={(won) => setInspectedSkin(won)}
                  onPreviewTemplate={handlePreviewTemplate}
                />
              ) : activeTab === 'inventory' ? (
                <FlatList
                  style={{ flex: 1 }}
                  contentContainerStyle={{ paddingBottom: 24 }}
                  showsVerticalScrollIndicator={false}
                  data={filteredInventory}
                  numColumns={2}
                  initialNumToRender={8}
                  maxToRenderPerBatch={8}
                  windowSize={5}
                  columnWrapperStyle={styles.invGrid}
                  keyExtractor={(item) => item.instanceId}
                  ListHeaderComponent={
                    <View>
                      <Text accessibilityRole="header" style={[styles.pageHeading, { color: theme.textPrimary }]}>Инвентарь</Text>
                      <LiquidGlassCard themeMode={themeMode} style={styles.invSummaryCard}>
                        <View style={styles.invSummaryRow}>
                          <View>
                            <Text style={[styles.invTotalLabel, { color: theme.textSecondary }]}>
                              Предметов на складе: {inventory.length}
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
                                Продать дешёвые
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[styles.invActionBtn, { backgroundColor: theme.accent }]}
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
                                      backgroundColor: active ? theme.accent : theme.surfaceBg,
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
                    </View>
                  }
                  ListEmptyComponent={
                        <View style={styles.emptyBox}>
                          <Ionicons name="cube-outline" size={40} color={theme.textMuted} />
                          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                            На складе пока нет предметов
                          </Text>
                        </View>
                  }
                  renderItem={({ item }) => (
                    <SkinCard
                      item={item}
                      themeMode={themeMode}
                      onPress={() => setInspectedSkin(item)}
                      actionLabel={`Продать $${item.price.toFixed(2)}`}
                      onAction={() => handleSellItem(item)}
                    />
                  )}
                />
              ) : (
                <ScrollView
                  style={{ flex: 1 }}
                  contentContainerStyle={{ paddingBottom: 24 }}
                  showsVerticalScrollIndicator={false}
                >
                  {/* ==================== TAB 1: CASES CATALOG ==================== */}
                  {activeTab === 'cases' && (
                    <View>
                      <Text accessibilityRole="header" style={[styles.pageHeading, { color: theme.textPrimary }]}>Каталог</Text>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.catalogTabsRow}
                      >
                        {[
                          { key: 'all', title: 'Все кейсы' },
                          { key: 'base_cases', title: 'Официальные' },
                          { key: 'black_market', title: 'Чёрный рынок' },
                          { key: 'capsules', title: 'Капсулы' },
                          { key: 'souvenir', title: 'Сувенирные' },
                        ].map((cat) => {
                          const active = catalogCategory === cat.key;
                          return (
                            <TouchableOpacity
                              key={cat.key}
                              onPress={() => setCatalogCategory(cat.key as CatalogCategory | 'all')}
                              style={[
                                styles.catChip,
                                {
                                  backgroundColor: active ? theme.accent : theme.cardBg,
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
                            placeholder="Найти контейнер"
                            accessibilityLabel="Поиск контейнера"
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
                            accessibilityRole="button"
                          >
                            <View style={[styles.caseImgWrap, { backgroundColor: theme.surfaceBg }]}>
                              <CatalogImage
                                image={caseObj.image}
                                label={caseObj.name}
                                style={styles.caseImg}
                                resizeMode="contain"
                              />
                            </View>
                            <View style={styles.caseDetails}>
                              <Text numberOfLines={2} style={[styles.caseTitle, { color: theme.textPrimary }]}>
                                {caseObj.name.replace('Кейс ', '').replace('Капсула ', '')}
                              </Text>
                              <Text numberOfLines={1} style={[styles.caseSubtitle, { color: theme.textSecondary }]}>
                                {caseObj.items.length} предм. · {caseObj.subtitle}
                              </Text>
                              {caseObj.badgeTag && (
                                <Text numberOfLines={1} style={[styles.caseTag, { color: theme.accent }]}>
                                  {caseObj.badgeTag}
                                </Text>
                              )}
                            </View>
                            <View style={styles.casePriceColumn}>
                              <Text style={[styles.casePriceBadge, { color: theme.accent }]}>
                                ${caseObj.price.toFixed(2)}
                              </Text>
                              <Ionicons name="chevron-forward-outline" size={15} color={theme.textMuted} />
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
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
                      {/* CS2 Rank & Premier Rating Card */}
                      <LiquidGlassCard themeMode={themeMode} style={styles.profileCard}>
                        <View style={styles.profileTopRow}>
                          <View style={[styles.avatarBoxLarge, { borderColor: currentAvatar.color, borderWidth: 2 }]}>
                            {currentAvatar.image ? (
                              <CatalogImage
                                image={currentAvatar.image} label={currentAvatar.name}
                                style={styles.avatarImgLarge}
                                resizeMode="cover"
                              />
                            ) : (
                              <Ionicons name="person" size={28} color="#FFFFFF" />
                            )}
                          </View>
                          <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                              <Text
                                allowFontScaling={false}
                                numberOfLines={1}
                                style={[styles.profileNick, { color: theme.textPrimary }]}
                              >
                                {user.nickname}
                              </Text>
                              <View style={[styles.premierHeaderBadge, { backgroundColor: premierRating.color }]}>
                                <Text allowFontScaling={false} style={styles.premierHeaderBadgeText}>
                                  {premierRating.rating.toLocaleString()}
                                </Text>
                              </View>
                            </View>
                            <Text
                              allowFontScaling={false}
                              numberOfLines={1}
                              style={[styles.profileAgentName, { color: currentAvatar.color }]}
                            >
                              {currentAvatar.fullName}
                            </Text>
                            <Text
                              allowFontScaling={false}
                              numberOfLines={1}
                              style={[styles.profileEmail, { color: theme.textSecondary }]}
                            >
                              {currentAvatar.fraction} • {currentAvatar.teamName}
                            </Text>
                          </View>
                        </View>

                        {/* CS2 Rank Badge & Progress */}
                        <View style={[styles.cs2RankShowcase, { backgroundColor: theme.surfaceBg }]}>
                          <View style={styles.cs2RankTitleRow}>
                            <Ionicons name={cs2Rank.icon as any} size={20} color={premierRating.color} />
                            <Text
                              allowFontScaling={false}
                              style={[styles.cs2RankTitleText, { color: theme.textPrimary }]}
                            >
                              {cs2Rank.nameRu} ({cs2Rank.name})
                            </Text>
                          </View>

                          <View style={styles.rankProgressBarBg}>
                            <View
                              style={[
                                styles.rankProgressBarFill,
                                {
                                  width: `${Math.round(nextRankData.progress * 100)}%`,
                                  backgroundColor: premierRating.color,
                                },
                              ]}
                            />
                          </View>
                          <Text
                            allowFontScaling={false}
                            style={[styles.rankProgressHint, { color: theme.textMuted }]}
                          >
                            {nextRankData.nextRank
                              ? `Прогресс ${Math.round(nextRankData.progress * 100)}% • До ${nextRankData.nextRank.nameRu}: ${nextRankData.needed} ELO`
                              : 'Максимальное звание CS2 достигнуто!'}
                          </Text>
                        </View>

                        {/* Avatar Picker (Original CS2 Agents) */}
                        <View style={styles.avatarPickerSection}>
                          <Text
                            allowFontScaling={false}
                            style={[styles.avatarPickerTitle, { color: theme.textSecondary }]}
                          >
                            Выберите агента CS2 (Оригинальные модели):
                          </Text>
                          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.avatarScroll}>
                            {CS2_AVATARS.map((av) => {
                              const active = selectedAvatarId === av.id;
                              return (
                                <TouchableOpacity
                                  key={av.id}
                                  onPress={() => {
                                    playClickSound();
                                    setSelectedAvatarId(av.id);
                                  }}
                                  style={[
                                    styles.avatarPickerItem,
                                    { backgroundColor: theme.surfaceBg },
                                    active && { borderColor: av.color, borderWidth: 2 },
                                  ]}
                                >
                                  <CatalogImage
                                    image={av.image} label={av.name}
                                    style={styles.avatarPickerImg}
                                    resizeMode="cover"
                                  />
                                  <View style={{ flex: 1 }}>
                                    <Text
                                      allowFontScaling={false}
                                      numberOfLines={1}
                                      style={[styles.avatarPickerName, { color: theme.textPrimary }]}
                                    >
                                      {av.name}
                                    </Text>
                                    <Text
                                      allowFontScaling={false}
                                      numberOfLines={1}
                                      style={[styles.avatarPickerTeam, { color: av.color }]}
                                    >
                                      {av.teamName}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              );
                            })}
                          </ScrollView>
                        </View>

                        {/* Stats Grid */}
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
                          <View style={[styles.statBox, { backgroundColor: theme.surfaceBg }]}>
                            <Text style={[styles.statVal, { color: '#EAB308' }]}>
                              {inventory.filter((i) => i.isLocked).length}
                            </Text>
                            <Text style={[styles.statLbl, { color: theme.textSecondary }]}>
                              Под замком 🔒
                            </Text>
                          </View>
                        </View>

                        <Text style={[styles.dailyCareTitle, { color: theme.textPrimary, marginTop: 12 }]}>
                          Статистика кейсов и продаж
                        </Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 6 }}>
                          {[
                            ['Открыто кейсов', String(openingStats.opened)],
                            ['Потрачено на кейсы', '$' + openingStats.spent.toFixed(2)],
                            ['Стоимость дропа', '$' + openingStats.dropValue.toFixed(2)],
                            ['Выручка от продаж', '$' + openingStats.saleRevenue.toFixed(2)],
                          ].map(([label, value]) => (
                            <View key={label} style={{ width: '50%', paddingVertical: 6 }}>
                              <Text style={[styles.statVal, { color: theme.textPrimary }]}>{value}</Text>
                              <Text style={[styles.statLbl, { color: theme.textSecondary }]}>{label}</Text>
                            </View>
                          ))}
                        </View>

                        {/* Daily Care Package Trigger */}
                        <TouchableOpacity
                          style={[styles.dailyCareBtn, { backgroundColor: theme.surfaceBg }]}
                          onPress={() => setDailyModalOpen(true)}
                        >
                          <Ionicons name="gift" size={18} color="#EAB308" />
                          <View style={{ flex: 1, marginLeft: 8 }}>
                            <Text style={[styles.dailyCareTitle, { color: theme.textPrimary }]}>
                              Календарь наград CS2
                            </Text>
                            <Text style={[styles.dailyCareSub, { color: theme.textSecondary }]}>
                              Серия: День {streakDay} из 7 • В конце гарантированный Нож ★
                            </Text>
                          </View>
                          <Ionicons name="chevron-forward" size={16} color={theme.textMuted} />
                        </TouchableOpacity>

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
                            setOpeningStats(readOpeningStats((decoded as AccountWithStats).openingStats));
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

            {/* Tab navigation */}
            <View
              style={[
                styles.bottomBar,
                activeTab === 'cases' && openedCaseScreen && { display: 'none' },
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
                    accessibilityRole="tab"
                    accessibilityState={{ selected: active }}
                    accessibilityLabel={item.label}
                  >
                    <View style={[styles.navIcon, active && { backgroundColor: theme.surfaceBg }]}>
                      <Ionicons name={item.icon} size={20} color={active ? theme.accent : theme.textMuted} />
                    </View>
                    <Text
                      allowFontScaling={false}
                      numberOfLines={1}
                      style={[
                        styles.navLabel,
                        { color: active ? theme.accent : theme.textMuted },
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

        <InspectSkinModal
          visible={Boolean(inspectedSkin)}
          item={inspectedSkin}
          themeMode={themeMode}
          availableStickers={inventory.filter((i) => i.isSticker)}
          onClose={() => setInspectedSkin(null)}
          onToggleLock={handleToggleLockItem}
          onSell={handleSellItem}
          onContract={(item) => {
            setInspectedSkin(null);
            setRequestedMiniGame('tradeup');
            setActiveTab('minigames');
          }}
          onApplySticker={handleApplyStickerToWeapon}
          onScrapeSticker={handleScrapeStickerFromWeapon}
          onRemoveSticker={handleRemoveStickerFromWeapon}
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
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  profileChip: {
    flexShrink: 1,
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
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 65,
    alignItems: 'center',
  },
  walletLabel: { fontSize: 9, fontWeight: '600' },
  walletAmount: { fontSize: 14, fontWeight: '800', fontVariant: ['tabular-nums'] },
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
  mainContentWrap: { flex: 1, paddingHorizontal: 18, paddingTop: 10 },
  pageHeading: { fontSize: 34, lineHeight: 41, letterSpacing: -1.4, fontWeight: '800', marginTop: 8, marginBottom: 18 },
  catalogTabsRow: { marginBottom: 14 },
  catChip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 22, borderWidth: 1, marginRight: 8 },
  catChipText: { fontWeight: '700', fontSize: 12 },
  searchSortRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  searchBox: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 9,
    paddingHorizontal: 12, borderRadius: 14, borderWidth: 1, height: 45,
  },
  searchInput: { flex: 1, fontSize: 14, paddingVertical: 0 },
  sortBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 12, borderRadius: 14, borderWidth: 1, height: 45,
  },
  sortBtnText: { fontSize: 12, fontWeight: '700' },
  bentoCaseGrid: { gap: 10 },
  caseCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: 18,
    borderWidth: 1, padding: 10, minHeight: 100,
  },
  caseImgWrap: { width: 82, height: 78, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  caseImg: { width: 72, height: 67 },
  caseDetails: { flex: 1, gap: 5 },
  caseTitle: { fontSize: 15, fontWeight: '800', lineHeight: 18 },
  caseSubtitle: { fontSize: 11, lineHeight: 14 },
  caseTag: { fontSize: 10, fontWeight: '700' },
  casePriceColumn: { alignItems: 'flex-end', gap: 8 },
  casePriceBadge: { fontSize: 14, fontWeight: '800', fontVariant: ['tabular-nums'] },
  invSummaryCard: {
    padding: 15,
    marginBottom: 16,
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
    fontSize: 24,
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
    minHeight: 64, borderTopWidth: 1, flexDirection: 'row',
    alignItems: 'stretch', paddingHorizontal: 12, paddingVertical: 5,
  },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  navIcon: { minWidth: 45, height: 31, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  navLabel: { fontSize: 11, fontWeight: '700' },
  avatarBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  avatarImgSmall: {
    width: 36,
    height: 36,
  },
  avatarBoxLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginRight: 12,
  },
  avatarImgLarge: {
    width: 64,
    height: 64,
  },
  profileAgentName: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  premierHeaderBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  premierHeaderBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  profileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  cs2RankShowcase: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  cs2RankTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  cs2RankTitleText: {
    fontSize: 13,
    fontWeight: '800',
  },
  rankProgressBarBg: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
    marginBottom: 6,
  },
  rankProgressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  rankProgressHint: {
    fontSize: 10,
  },
  avatarPickerSection: {
    marginBottom: 14,
  },
  avatarPickerTitle: {
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 8,
  },
  avatarScroll: {
    flexDirection: 'row',
  },
  avatarPickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    minWidth: 165,
  },
  avatarPickerImg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  avatarPickerName: {
    fontSize: 11,
    fontWeight: '700',
  },
  avatarPickerTeam: {
    fontSize: 9,
    fontWeight: '700',
    marginTop: 1,
  },
  dailyCareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  dailyCareTitle: {
    fontSize: 12,
    fontWeight: '800',
  },
  dailyCareSub: {
    fontSize: 10,
    marginTop: 2,
  },
});
