import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  CaseContainer,
  CatalogCategory,
  InventoryItem,
  QuestItem,
  RARITIES,
  RarityKey,
  SkinTemplate,
  UserProfile,
} from './src/types/cs2';
import { INITIAL_CASES, INITIAL_QUESTS, instantiateSkin } from './src/data/cs2Database';
import { LiquidGlassCard, SkinCard } from './src/components/LiquidGlassUI';
import { CaseRouletteModal } from './src/components/CaseRouletteModal';
import { SkinInspectorModal } from './src/components/SkinInspectorModal';
import { MiniGamesHub } from './src/components/MiniGamesHub';
import { AuthScreen } from './src/components/AuthScreen';
import {
  DailyRewardModal,
  getRankByElo,
  LeaderboardSection,
} from './src/components/RankAndRewardsModal';
import { playWinSound, setSoundEnabled } from './src/utils/soundManager';

const STORAGE_KEY = '@cs2_liquid_glass_save_v2';

type BottomNavTab = 'cases' | 'inventory' | 'minigames' | 'quests' | 'profile';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [balance, setBalance] = useState<number>(1000.0);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [quests, setQuests] = useState<QuestItem[]>(INITIAL_QUESTS);
  const [eloRating, setEloRating] = useState<number>(1250);
  const [streakDay, setStreakDay] = useState<number>(1);
  const [lastClaimDate, setLastClaimDate] = useState<string>('');
  const [dailyModalOpen, setDailyModalOpen] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Navigation & UI state
  const [activeTab, setActiveTab] = useState<BottomNavTab>('cases');
  const [catalogCategory, setCatalogCategory] = useState<CatalogCategory>('base_cases');
  const [viewingCaseDetails, setViewingCaseDetails] = useState<CaseContainer | null>(null);
  const [selectedCase, setSelectedCase] = useState<CaseContainer | null>(null);
  const [openMultiplier, setOpenMultiplier] = useState<number>(1);
  const [rouletteOpen, setRouletteOpen] = useState<boolean>(false);
  const [inspectedSkin, setInspectedSkin] = useState<InventoryItem | null>(null);
  const [invFilter, setInvFilter] = useState<'all' | RarityKey>('all');

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
          if (Array.isArray(parsed.quests)) setQuests(parsed.quests);
          if (typeof parsed.eloRating === 'number') setEloRating(parsed.eloRating);
          if (typeof parsed.streakDay === 'number') setStreakDay(parsed.streakDay);
          if (typeof parsed.lastClaimDate === 'string') setLastClaimDate(parsed.lastClaimDate);
          if (typeof parsed.soundOn === 'boolean') {
            setSoundOn(parsed.soundOn);
            setSoundEnabled(parsed.soundOn);
          }
        }
      } catch {}
      setIsLoaded(true);
    })();
  }, []);

  // Auto-save whenever state changes
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
      soundOn,
    });
    AsyncStorage.setItem(STORAGE_KEY, payload).catch(() => {});
  }, [user, balance, inventory, quests, eloRating, streakDay, lastClaimDate, soundOn, isLoaded]);

  const todayKey = new Date().toISOString().slice(0, 10);
  const canClaimDaily = lastClaimDate !== todayKey;

  const handleClaimDailyBonus = (amount: number) => {
    if (!canClaimDaily) return;
    setBalance((b) => Number((b + amount).toFixed(2)));
    setLastClaimDate(todayKey);
    setStreakDay((d) => (d >= 7 ? 1 : d + 1));
    setEloRating((e) => e + 200);
    setDailyModalOpen(false);
    playWinSound();
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
      Alert.alert(
        'Недостаточно средств ($)',
        `Для открытия x${count} «${container.name}» нужно $${totalCost.toFixed(
          2
        )}. Продай скины из инвентаря или выполни задания!`
      );
      return;
    }
    setViewingCaseDetails(null);
    setBalance((b) => Number((b - totalCost).toFixed(2)));
    setSelectedCase(container);
    setOpenMultiplier(count);
    setRouletteOpen(true);
    setEloRating((e) => e + count * 85);
    incrementQuest('open_cases', count);
  };

  const handleCompleteDrops = (wonItems: InventoryItem[]) => {
    setInventory((prev) => [...wonItems, ...prev]);
    const rareCount = wonItems.filter(
      (w) => w.rarity === 'covert' || w.rarity === 'gold'
    ).length;
    if (rareCount > 0) {
      setEloRating((e) => e + rareCount * 450);
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
          price: Number((it.price + 4.5).toFixed(2)),
        };
        setInspectedSkin(updated);
        return updated;
      })
    );
  };

  const handlePreviewTemplate = (skin: SkinTemplate, category: CatalogCategory) => {
    const mock = instantiateSkin(skin, category);
    setViewingCaseDetails(null);
    setInspectedSkin(mock);
  };

  const handleSellAllCheap = () => {
    const cheap = inventory.filter((i) => i.rarity === 'milspec' || i.rarity === 'restricted');
    if (cheap.length === 0) {
      Alert.alert('Нет дешёвых предметов', 'В инвентаре нет армейских или запрещённых скинов.');
      return;
    }
    const totalSum = cheap.reduce((acc, i) => acc + i.price, 0);
    const cheapIds = new Set(cheap.map((i) => i.instanceId));
    setInventory((prev) => prev.filter((i) => !cheapIds.has(i.instanceId)));
    setBalance((b) => Number((b + totalSum).toFixed(2)));
    incrementQuest('sell_items', cheap.length);
    playWinSound();
    Alert.alert('Продано!', `Продано ${cheap.length} предм. на сумму +$${totalSum.toFixed(2)}`);
  };

  const handleClaimQuest = (quest: QuestItem) => {
    if (quest.claimed || quest.progress < quest.target) return;
    setQuests((prev) =>
      prev.map((q) => (q.id === quest.id ? { ...q, claimed: true } : q))
    );
    setBalance((b) => Number((b + quest.reward).toFixed(2)));
    playWinSound();
  };

  if (!isLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#04060D' }} />;
  }

  const filteredCases = INITIAL_CASES.filter((c) => c.category === catalogCategory);
  const filteredInventory =
    invFilter === 'all' ? inventory : inventory.filter((i) => i.rarity === invFilter);
  const totalInventoryValue = inventory.reduce((acc, i) => acc + i.price, 0);
  const rankData = getRankByElo(eloRating);
  const bestPlayerSkin = [...inventory].sort((a, b) => b.price - a.price)[0];

  const webPhoneFrame: any =
    Platform.OS === 'web'
      ? {
          maxWidth: 440,
          width: '100%',
          height: '96%',
          maxHeight: 915,
          borderRadius: 42,
          borderWidth: 2,
          borderColor: 'rgba(255, 255, 255, 0.14)',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.85), 0 0 60px rgba(56, 189, 248, 0.14)',
          overflow: 'hidden',
        }
      : { flex: 1, width: '100%' };

  return (
    <View style={styles.desktopStage}>
      <StatusBar barStyle="light-content" backgroundColor="#04060D" />
      <LinearGradient
        colors={['#03050B', '#080D1C', '#0E152B']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* MOBILE PHONE SIMULATOR FRAME */}
      <SafeAreaView style={[styles.phoneContainer, webPhoneFrame]}>
        <LinearGradient
          colors={['#060914', '#0B1122', '#080C18']}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Ambient Soft Glows */}
        <View style={styles.ambientTopGlow} />
        <View style={styles.ambientBottomGlow} />

        {!user ? (
          <AuthScreen onLoginSuccess={(profile) => setUser(profile)} />
        ) : (
          <>
            {/* TOP MODERN HEADER */}
            <View style={styles.topHeader}>
              <TouchableOpacity
                style={styles.profileChip}
                onPress={() => setActiveTab('profile')}
              >
                <LinearGradient
                  colors={['#38BDF8', '#6366F1']}
                  style={styles.avatarMini}
                >
                  <Text style={styles.avatarMiniText}>
                    {user.nickname[0]?.toUpperCase() || 'P'}
                  </Text>
                </LinearGradient>
                <View>
                  <Text style={styles.brandName}>{user.nickname}</Text>
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
                      borderColor: '#FFD700',
                      backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    },
                  ]}
                  onPress={() => setDailyModalOpen(true)}
                >
                  <Ionicons
                    name="gift"
                    size={16}
                    color={canClaimDaily ? '#FFD700' : '#94A3B8'}
                  />
                </TouchableOpacity>

                <View style={styles.walletPill}>
                  <Ionicons name="wallet-outline" size={14} color="#34D399" />
                  <Text style={styles.walletAmount}>${balance.toFixed(2)}</Text>
                </View>
              </View>
            </View>

            {/* RECENT LIVE DROPS TICKER */}
            {inventory.length > 0 && (
              <View style={styles.liveTickerBar}>
                <View style={styles.liveDotBadge}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveText}>DROP</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {inventory.slice(0, 8).map((drop) => {
                    const r = RARITIES[drop.rarity];
                    return (
                      <TouchableOpacity
                        key={drop.instanceId}
                        onPress={() => setInspectedSkin(drop)}
                        style={[styles.tickerItem, { borderColor: r.color }]}
                      >
                        <Image
                          source={{ uri: drop.image }}
                          style={styles.tickerImg}
                          resizeMode="contain"
                        />
                        <Text numberOfLines={1} style={styles.tickerName}>
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
              contentContainerStyle={{ paddingBottom: 110 }}
              showsVerticalScrollIndicator={false}
            >
              {/* ==================== TAB 1: CASES (BENTO 2x2 GRID) ==================== */}
              {activeTab === 'cases' && (
                <View>
                  {/* Featured Hero Showcase */}
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setViewingCaseDetails(INITIAL_CASES[5])}
                  >
                    <LiquidGlassCard
                      glowColor="rgba(245, 158, 11, 0.35)"
                      style={styles.heroCard}
                    >
                      <LinearGradient
                        colors={['rgba(245, 158, 11, 0.20)', 'rgba(168, 85, 247, 0.12)', 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={StyleSheet.absoluteFillObject}
                      />
                      <View style={styles.heroContentRow}>
                        <View style={{ flex: 1 }}>
                          <View style={styles.seasonBadge}>
                            <Ionicons name="sparkles" size={11} color="#FBBF24" />
                            <Text style={styles.seasonBadgeText}>BLACK MARKET EXCLUSIVE</Text>
                          </View>
                          <Text style={styles.heroTitle}>Dragon Lore & Karambit Sapphire</Text>
                          <Text style={styles.heroSubtitle}>
                            Реальные 3D-рендеры Steam • Осмотр скинов и стикеров
                          </Text>
                        </View>
                        <Image
                          source={{ uri: INITIAL_CASES[5]?.items[7]?.image || INITIAL_CASES[0].image }}
                          style={styles.heroSkinImg}
                          resizeMode="contain"
                        />
                      </View>
                    </LiquidGlassCard>
                  </TouchableOpacity>

                  {/* 4 Catalog Segmented Pills */}
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.catalogTabsRow}
                  >
                    {[
                      {
                        key: 'base_cases',
                        title: 'Базовые кейсы',
                        icon: 'cube-outline' as const,
                        accent: '#38BDF8',
                      },
                      {
                        key: 'black_market',
                        title: 'Чёрный рынок',
                        icon: 'skull-outline' as const,
                        accent: '#F59E0B',
                      },
                      {
                        key: 'capsules',
                        title: 'Капсулы',
                        icon: 'pricetag-outline' as const,
                        accent: '#EC4899',
                      },
                      {
                        key: 'souvenir',
                        title: 'Сувенирные',
                        icon: 'trophy-outline' as const,
                        accent: '#EAB308',
                      },
                    ].map((cat) => {
                      const active = catalogCategory === cat.key;
                      return (
                        <TouchableOpacity
                          key={cat.key}
                          onPress={() => setCatalogCategory(cat.key as CatalogCategory)}
                          style={[
                            styles.catChip,
                            active && {
                              backgroundColor: 'rgba(255, 255, 255, 0.11)',
                              borderColor: cat.accent,
                            },
                          ]}
                        >
                          <Ionicons
                            name={cat.icon}
                            size={15}
                            color={active ? cat.accent : '#64748B'}
                          />
                          <Text style={[styles.catChipText, active && styles.catChipTextActive]}>
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
                          glowColor="rgba(255,255,255,0.10)"
                          style={styles.bentoInner}
                        >
                          <LinearGradient
                            colors={[
                              `${caseObj.accentColor}26`,
                              'rgba(15, 23, 42, 0.4)',
                              'rgba(10, 14, 26, 0.95)',
                            ]}
                            style={StyleSheet.absoluteFillObject}
                          />

                          {/* Top item count & preview button */}
                          <View style={styles.bentoTopRow}>
                            <View style={styles.itemCountPill}>
                              <Text style={styles.itemCountText}>
                                {caseObj.items.length} скинов
                              </Text>
                            </View>
                            <Ionicons name="eye-outline" size={15} color="#94A3B8" />
                          </View>

                          {/* Floating Case Image */}
                          <View style={styles.bentoImgWrap}>
                            <Image
                              source={{ uri: caseObj.image }}
                              style={styles.bentoCaseImg}
                              resizeMode="contain"
                            />
                          </View>

                          <Text numberOfLines={1} style={styles.bentoCaseTitle}>
                            {caseObj.name.replace('Кейс ', '').replace('Капсула ', '')}
                          </Text>
                          <Text numberOfLines={1} style={styles.bentoCaseSub}>
                            {caseObj.subtitle}
                          </Text>

                          {/* Price & Quick Open Button */}
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
                  <LiquidGlassCard style={styles.invSummaryCard}>
                    <View style={styles.invSummaryRow}>
                      <View>
                        <Text style={styles.invTotalLabel}>
                          ПРЕДМЕТОВ В ИНВЕНТАРЕ: {inventory.length}
                        </Text>
                        <Text style={styles.invTotalValue}>
                          ${totalInventoryValue.toFixed(2)}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.sellAllCheapBtn}
                        onPress={handleSellAllCheap}
                      >
                        <Ionicons name="flash-outline" size={14} color="#FCA5A5" />
                        <Text style={styles.sellAllCheapText}>Продать ширпотреб</Text>
                      </TouchableOpacity>
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
                          <Text style={styles.filterChipText}>
                            {rKey === 'all' ? 'Все' : RARITIES[rKey].name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </LiquidGlassCard>

                  {filteredInventory.length === 0 ? (
                    <View style={styles.emptyBox}>
                      <Ionicons name="cube-outline" size={42} color="#334155" />
                      <Text style={styles.emptyText}>
                        Инвентарь пока пуст. Открой кейс, чтобы выбить свой первый скин!
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.invGrid}>
                      {filteredInventory.map((item) => (
                        <SkinCard
                          key={item.instanceId}
                          item={item}
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
                  onChangeBalance={(delta) => setBalance((b) => Number((b + delta).toFixed(2)))}
                  onAddInventoryItem={(item) => setInventory((prev) => [item, ...prev])}
                  onRemoveInventoryItems={(ids) =>
                    setInventory((prev) => prev.filter((i) => !ids.includes(i.instanceId)))
                  }
                  onRecordGameWin={(isUpgrade) => {
                    setEloRating((e) => e + (isUpgrade ? 260 : 180));
                    incrementQuest('win_games', 1);
                    if (isUpgrade) incrementQuest('upgrade_win', 1);
                  }}
                />
              )}

              {/* ==================== TAB 4: QUESTS ==================== */}
              {activeTab === 'quests' && (
                <View>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setDailyModalOpen(true)}
                  >
                    <LiquidGlassCard
                      glowColor="#FFD700"
                      style={{ padding: 14, marginBottom: 14 }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Ionicons name="gift" size={24} color="#FFD700" />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#FFD700', fontWeight: '900', fontSize: 13 }}>
                            ЕЖЕДНЕВНАЯ НАГРАДА (ДЕНЬ {streakDay} ИЗ 7)
                          </Text>
                          <Text style={{ color: '#94A3B8', fontSize: 11, marginTop: 2 }}>
                            {canClaimDaily
                              ? 'Нажми здесь, чтобы забрать сегодняшний денежный бонус!'
                              : 'Бонус на сегодня получен — возвращайся завтра!'}
                          </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#FFD700" />
                      </View>
                    </LiquidGlassCard>
                  </TouchableOpacity>

                  <Text style={styles.sectionHeader}>Задания и Бонусы</Text>
                  {quests.map((q) => {
                    const completed = q.progress >= q.target;
                    const pct = Math.min(100, Math.round((q.progress / q.target) * 100));
                    return (
                      <LiquidGlassCard key={q.id} style={styles.questCard}>
                        <View style={styles.questRow}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.questTitle}>{q.title}</Text>
                            <Text style={styles.questDesc}>{q.description}</Text>
                            <View style={styles.questBarBg}>
                              <View style={[styles.questBarFill, { width: `${pct}%` }]} />
                            </View>
                            <Text style={styles.questProg}>
                              Выполнено: {q.progress} из {q.target}
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
                                ? 'ГОТОВО'
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
                  <LiquidGlassCard style={styles.profileCard}>
                    <View style={[styles.avatarCircle, { backgroundColor: user.avatarColor }]}>
                      <Text style={styles.avatarLetter}>
                        {user.nickname[0]?.toUpperCase() || 'P'}
                      </Text>
                    </View>
                    <Text style={styles.profileNick}>{user.nickname}</Text>
                    <Text style={styles.profileEmail}>
                      {user.provider.toUpperCase()} • {user.email}
                    </Text>

                    {/* Premier Rank & Progress Bar */}
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
                        <Text style={styles.premierEloVal}>
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
                      <Text style={styles.premierNextHint}>
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
                        <Text style={styles.statLbl}>Баланс</Text>
                      </View>
                      <View style={styles.statBox}>
                        <Text style={styles.statVal}>{inventory.length}</Text>
                        <Text style={styles.statLbl}>Предметов</Text>
                      </View>
                      <View style={styles.statBox}>
                        <Text style={styles.statVal}>${totalInventoryValue.toFixed(2)}</Text>
                        <Text style={styles.statLbl}>Инвентарь</Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.settingBtn}
                      onPress={() => {
                        const next = !soundOn;
                        setSoundOn(next);
                        setSoundEnabled(next);
                      }}
                    >
                      <Ionicons
                        name={soundOn ? 'volume-high-outline' : 'volume-mute-outline'}
                        size={18}
                        color="#38BDF8"
                      />
                      <Text style={styles.settingBtnText}>
                        Звуковые эффекты CS2: {soundOn ? 'ВКЛЮЧЕНЫ' : 'ВЫКЛЮЧЕНЫ'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.settingBtn,
                        { borderColor: 'rgba(239,68,68,0.4)', marginTop: 10 },
                      ]}
                      onPress={() => setUser(null)}
                    >
                      <Ionicons name="log-out-outline" size={18} color="#F87171" />
                      <Text style={[styles.settingBtnText, { color: '#F87171' }]}>
                        Сменить аккаунт (Google / Яндекс / Mail.ru)
                      </Text>
                    </TouchableOpacity>
                  </LiquidGlassCard>

                  {/* World & Friends Collectors Leaderboard */}
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
            </ScrollView>

            {/* SLEEK FLOATING VECTOR BOTTOM BAR */}
            <View style={styles.bottomBar}>
              {[
                { key: 'cases', icon: 'grid-outline' as const, label: 'Кейсы' },
                { key: 'inventory', icon: 'briefcase-outline' as const, label: 'Склад' },
                { key: 'minigames', icon: 'game-controller-outline' as const, label: 'Игры' },
                { key: 'quests', icon: 'ribbon-outline' as const, label: 'Миссии' },
                { key: 'profile', icon: 'person-outline' as const, label: 'Профиль' },
              ].map((item) => {
                const active = activeTab === item.key;
                return (
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => setActiveTab(item.key as BottomNavTab)}
                    style={[styles.navItem, active && styles.navItemActive]}
                  >
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={active ? '#38BDF8' : '#64748B'}
                    />
                    <Text style={[styles.navLabel, active && styles.navLabelActive]}>
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
                    <Text style={styles.drawerTitle}>{viewingCaseDetails.name}</Text>
                    <Text style={styles.drawerSub}>{viewingCaseDetails.subtitle}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.closeCircle}
                    onPress={() => setViewingCaseDetails(null)}
                  >
                    <Ionicons name="close" size={18} color="#F8FAFC" />
                  </TouchableOpacity>
                </View>

                {/* Multi-Open Selector x1..x5 */}
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
                            active && { color: '#FFFFFF' },
                          ]}
                        >
                          x{cnt}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <TouchableOpacity
                  style={[
                    styles.drawerOpenBigBtn,
                    { backgroundColor: viewingCaseDetails.accentColor },
                  ]}
                  onPress={() => handleOpenCasePress(viewingCaseDetails, openMultiplier)}
                >
                  <Text style={styles.drawerOpenBigText}>
                    ОТКРЫТЬ x{openMultiplier} ЗА ${(
                      viewingCaseDetails.price * openMultiplier
                    ).toFixed(2)}
                  </Text>
                </TouchableOpacity>

                <Text style={styles.drawerSectionLbl}>
                  Содержимое кейса ({viewingCaseDetails.items.length} скинов • Нажми для 3D-осмотра):
                </Text>

                <ScrollView
                  style={{ maxHeight: 380 }}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.invGrid}>
                    {viewingCaseDetails.items.map((skin) => (
                      <SkinCard
                        key={skin.id}
                        item={skin}
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

        {/* ROULETTE MODAL */}
        <CaseRouletteModal
          visible={rouletteOpen}
          caseItem={selectedCase}
          openCount={openMultiplier}
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
    backgroundColor: '#03050B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneContainer: {
    backgroundColor: '#060914',
    position: 'relative',
  },
  ambientTopGlow: {
    position: 'absolute',
    top: -90,
    left: -50,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
  },
  ambientBottomGlow: {
    position: 'absolute',
    bottom: 40,
    right: -60,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(168, 85, 247, 0.10)',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarMiniText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  brandName: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  userSub: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '700',
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
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
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
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '900',
  },
  premierNextHint: {
    color: '#64748B',
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
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.35)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
  },
  walletAmount: {
    color: '#34D399',
    fontSize: 14,
    fontWeight: '900',
  },
  liveTickerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
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
    color: '#FCA5A5',
    fontSize: 9,
    fontWeight: '900',
  },
  tickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
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
    color: '#E2E8F0',
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
    padding: 16,
    marginBottom: 14,
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
    backgroundColor: 'rgba(245, 158, 11, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 6,
  },
  seasonBadgeText: {
    color: '#FBBF24',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
  heroSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 4,
  },
  heroSkinImg: {
    width: 115,
    height: 78,
    marginLeft: 8,
  },
  catalogTabsRow: {
    marginBottom: 14,
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginRight: 8,
  },
  catChipText: {
    color: '#64748B',
    fontWeight: '800',
    fontSize: 12,
  },
  catChipTextActive: {
    color: '#F8FAFC',
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
    backgroundColor: 'rgba(255,255,255,0.07)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  itemCountText: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '800',
  },
  bentoImgWrap: {
    height: 102,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  bentoCaseImg: {
    width: 120,
    height: 94,
  },
  bentoCaseTitle: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
  },
  bentoCaseSub: {
    color: '#64748B',
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
  },
  invTotalLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '800',
  },
  invTotalValue: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 2,
  },
  sellAllCheapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(239, 68, 68, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 11,
  },
  sellAllCheapText: {
    color: '#FCA5A5',
    fontSize: 11,
    fontWeight: '800',
  },
  filterChip: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginRight: 7,
  },
  filterChipActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.2)',
    borderWidth: 1,
    borderColor: '#38BDF8',
  },
  filterChipText: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '700',
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
    color: '#64748B',
    fontSize: 13,
    textAlign: 'center',
  },
  sectionHeader: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
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
  questTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '800',
  },
  questDesc: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 2,
  },
  questBarBg: {
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  questBarFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
  },
  questProg: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  },
  questBtn: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
  },
  questBtnReady: {
    backgroundColor: '#10B981',
  },
  questBtnClaimed: {
    backgroundColor: 'rgba(255,255,255,0.03)',
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
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  profileEmail: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 3,
    marginBottom: 18,
  },
  statsGrid: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  statVal: {
    color: '#38BDF8',
    fontSize: 14,
    fontWeight: '900',
  },
  statLbl: {
    color: '#64748B',
    fontSize: 10,
    marginTop: 2,
  },
  settingBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  settingBtnText: {
    color: '#E2E8F0',
    fontWeight: '700',
    fontSize: 12,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 12,
    left: 14,
    right: 14,
    height: 64,
    borderRadius: 22,
    backgroundColor: 'rgba(10, 15, 29, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 6,
    overflow: 'hidden',
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  navItemActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.14)',
  },
  navLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  navLabelActive: {
    color: '#38BDF8',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  drawerSub: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  closeCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  multiSelectRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  multiCountBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
  },
  multiCountText: {
    color: '#94A3B8',
    fontWeight: '900',
    fontSize: 13,
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
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 10,
  },
});
