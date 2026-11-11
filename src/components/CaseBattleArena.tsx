import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  CaseBattleFormat,
  CaseBattleMode,
  CaseContainer,
  InventoryItem,
  RARITIES,
  ThemeMode,
} from '../types/cs2';
import { INITIAL_CASES as CS2_CASES, rollSkinFromCase } from '../data/cs2Database';
import { playClickSound, playDropSound, playTickSound } from '../utils/soundManager';
import { LiquidGlassCard, THEMES } from './LiquidGlassUI';

interface CaseBattleArenaProps {
  balance: number;
  themeMode: ThemeMode;
  defaultFastSpin: boolean;
  onUpdateBalance: (delta: number) => void;
  onAddItems: (items: InventoryItem[]) => void;
  onNotify: (
    title: string,
    message: string,
    type?: 'error' | 'warning' | 'success' | 'info' | 'reward'
  ) => void;
  onBattlePlayed?: (won: boolean) => void;
  onBack: () => void;
}

interface BattleParticipant {
  id: string;
  name: string;
  avatar: string;
  isPlayer: boolean;
  team: 'A' | 'B' | 'C';
  drops: InventoryItem[];
  totalValue: number;
  lastDropValue: number;
}

const BOT_PROFILES = [
  { name: 's1mple_AI', avatar: '🎯' },
  { name: 'donk_Bot', avatar: '⚡' },
  { name: 'm0NESY_AI', avatar: '🦅' },
  { name: 'ZywOo_Bot', avatar: '👑' },
  { name: 'NiKo_Deagle', avatar: '🔥' },
];

const BATTLE_MODES: {
  id: CaseBattleMode;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  desc: string;
}[] = [
  {
    id: 'clutch',
    title: 'КЛАТЧ',
    icon: 'trophy',
    color: '#F59E0B',
    desc: 'Побеждает самый дорогой общий дроп. Победитель забирает ВСЕ скины!',
  },
  {
    id: 'terminal',
    title: 'ТЕРМИНАЛ',
    icon: 'nuclear',
    color: '#EF4444',
    desc: 'Всё решает ПОСЛЕДНИЙ кейс! У кого дороже последний дроп — забирает всё!',
  },
  {
    id: 'reverse',
    title: 'РЕВЕРС',
    icon: 'swap-vertical',
    color: '#A855F7',
    desc: 'Выбили за $1, а бот за $2? Побеждаете ВЫ! Выигрывает самый ДЕШЁВЫЙ дроп!',
  },
  {
    id: 'shared',
    title: 'ОБЩИЙ',
    icon: 'people',
    color: '#10B981',
    desc: 'Весь выбитый дроп со всех кейсов делится поровну между участниками!',
  },
];

export const CaseBattleArena: React.FC<CaseBattleArenaProps> = ({
  balance,
  themeMode,
  defaultFastSpin,
  onUpdateBalance,
  onAddItems,
  onNotify,
  onBattlePlayed,
  onBack,
}) => {
  const theme = THEMES[themeMode] || THEMES.bright;

  const [mode, setMode] = useState<CaseBattleMode>('clutch');
  const [format, setFormat] = useState<CaseBattleFormat>('1v1');
  const [fastBattle, setFastBattle] = useState<boolean>(defaultFastSpin);
  const [selectedCases, setSelectedCases] = useState<CaseContainer[]>([
    CS2_CASES[0],
    CS2_CASES[1],
    CS2_CASES[2],
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState<number>(-1);
  const [participants, setParticipants] = useState<BattleParticipant[]>([]);
  const [battleFinished, setBattleFinished] = useState(false);
  const [winnerSummary, setWinnerSummary] = useState<{
    playerWon: boolean;
    title: string;
    subtitle: string;
    rewardItems: InventoryItem[];
    sharedBonusCash: number;
  } | null>(null);

  const spinPulse = useRef(new Animated.Value(0)).current;
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const totalCost = selectedCases.reduce((sum, c) => sum + c.price, 0);

  const handleAddCase = (c: CaseContainer) => {
    if (isRunning) return;
    if (selectedCases.length >= 6) {
      onNotify(
        'Максимум 6 кейсов в битве',
        'Уберите один из выбранных кейсов, чтобы добавить другой.',
        'warning'
      );
      return;
    }
    playClickSound();
    setSelectedCases((prev) => [...prev, c]);
  };

  const handleRemoveCase = (index: number) => {
    if (isRunning) return;
    if (selectedCases.length <= 1) {
      onNotify(
        'Минимум 1 кейс',
        'Для запуска Битвы Кейсов нужен хотя бы 1 кейс.',
        'warning'
      );
      return;
    }
    playClickSound();
    setSelectedCases((prev) => prev.filter((_, idx) => idx !== index));
  };

  const startBattle = () => {
    if (isRunning) return;
    if (balance < totalCost) {
      onNotify(
        'Недостаточно средств для Битвы Кейсов',
        `Стоимость входа: $${totalCost.toFixed(2)}, ваш баланс: $${balance.toFixed(2)}. Продайте скины или соберите кейсы в кликере!`,
        'error'
      );
      return;
    }

    onUpdateBalance(-totalCost);
    playClickSound();

    // Build participant roster
    const shuffledBots = [...BOT_PROFILES].sort(() => Math.random() - 0.5);
    const initialRoster: BattleParticipant[] = [
      {
        id: 'player',
        name: 'ВЫ (ИГРОК)',
        avatar: '😎',
        isPlayer: true,
        team: 'A',
        drops: [],
        totalValue: 0,
        lastDropValue: 0,
      },
    ];

    if (format === '1v1') {
      initialRoster.push({
        id: 'bot_1',
        name: shuffledBots[0].name,
        avatar: shuffledBots[0].avatar,
        isPlayer: false,
        team: 'B',
        drops: [],
        totalValue: 0,
        lastDropValue: 0,
      });
    } else if (format === '1v1v1') {
      initialRoster.push(
        {
          id: 'bot_1',
          name: shuffledBots[0].name,
          avatar: shuffledBots[0].avatar,
          isPlayer: false,
          team: 'B',
          drops: [],
          totalValue: 0,
          lastDropValue: 0,
        },
        {
          id: 'bot_2',
          name: shuffledBots[1].name,
          avatar: shuffledBots[1].avatar,
          isPlayer: false,
          team: 'C',
          drops: [],
          totalValue: 0,
          lastDropValue: 0,
        }
      );
    } else if (format === '2v2') {
      initialRoster.push(
        {
          id: 'bot_ally',
          name: `${shuffledBots[0].name} (Союзник)`,
          avatar: '🤝',
          isPlayer: false,
          team: 'A',
          drops: [],
          totalValue: 0,
          lastDropValue: 0,
        },
        {
          id: 'bot_enemy1',
          name: shuffledBots[1].name,
          avatar: shuffledBots[1].avatar,
          isPlayer: false,
          team: 'B',
          drops: [],
          totalValue: 0,
          lastDropValue: 0,
        },
        {
          id: 'bot_enemy2',
          name: shuffledBots[2].name,
          avatar: shuffledBots[2].avatar,
          isPlayer: false,
          team: 'B',
          drops: [],
          totalValue: 0,
          lastDropValue: 0,
        }
      );
    }

    // Pre-roll all rounds so state transitions are deterministic and rock-solid
    const allRoundDrops: InventoryItem[][] = selectedCases.map((container) =>
      initialRoster.map(() => rollSkinFromCase(container))
    );

    setParticipants(initialRoster);
    setBattleFinished(false);
    setWinnerSummary(null);
    setIsRunning(true);
    setCurrentRound(0);

    const stepMs = fastBattle ? 900 : 1950;
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    Animated.loop(
      Animated.sequence([
        Animated.timing(spinPulse, {
          toValue: 1,
          duration: fastBattle ? 260 : 500,
          useNativeDriver: true,
        }),
        Animated.timing(spinPulse, {
          toValue: 0.25,
          duration: fastBattle ? 260 : 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    selectedCases.forEach((_, roundIdx) => {
      const t = setTimeout(() => {
        playTickSound();
        setCurrentRound(roundIdx);

        setParticipants((prev) =>
          prev.map((p, pIdx) => {
            const drop = allRoundDrops[roundIdx][pIdx];
            const updatedDrops = [...p.drops, drop];
            const totalVal = Number(
              updatedDrops.reduce((s, item) => s + item.price, 0).toFixed(2)
            );
            return {
              ...p,
              drops: updatedDrops,
              totalValue: totalVal,
              lastDropValue: drop.price,
            };
          })
        );
      }, (roundIdx + 1) * stepMs);

      timersRef.current.push(t);
    });

    const finishTimer = setTimeout(() => {
      spinPulse.stopAnimation();
      finalizeBattle(initialRoster, allRoundDrops);
    }, selectedCases.length * stepMs + 450);

    timersRef.current.push(finishTimer);
  };

  const finalizeBattle = (
    baseRoster: BattleParticipant[],
    allRoundDrops: InventoryItem[][]
  ) => {
    const finalRoster: BattleParticipant[] = baseRoster.map((p, pIdx) => {
      const drops = allRoundDrops.map((r) => r[pIdx]);
      const totalValue = Number(drops.reduce((s, d) => s + d.price, 0).toFixed(2));
      const lastDropValue = drops[drops.length - 1]?.price || 0;
      return {
        ...p,
        drops,
        totalValue,
        lastDropValue,
      };
    });

    const allBattleDrops: InventoryItem[] = finalRoster.flatMap((p) => p.drops);
    const totalPoolValue = Number(
      allBattleDrops.reduce((s, d) => s + d.price, 0).toFixed(2)
    );

    let playerWon = false;
    let title = '';
    let subtitle = '';
    let rewardItems: InventoryItem[] = [];
    let sharedBonusCash = 0;

    if (mode === 'shared') {
      // Shared mode: player keeps their own drops + gets cash difference so everyone gets equal share
      playerWon = true;
      const equalShare = Number((totalPoolValue / finalRoster.length).toFixed(2));
      const playerOwnDrops = finalRoster[0].drops;
      const playerOwnVal = finalRoster[0].totalValue;
      rewardItems = playerOwnDrops;
      sharedBonusCash = Number(Math.max(0, equalShare - playerOwnVal).toFixed(2));
      onAddItems(rewardItems);
      if (sharedBonusCash > 0) {
        onUpdateBalance(sharedBonusCash);
      }
      title = '🤝 ОБЩИЙ КУШ РАЗДЕЛЁН ПОРОВНУ!';
      subtitle = `Общий банк: $${totalPoolValue.toFixed(2)} • Ваша доля: $${equalShare.toFixed(2)} (скины в складе${
        sharedBonusCash > 0 ? ` + $${sharedBonusCash.toFixed(2)} компенсация` : ''
      })`;
    } else if (format === '2v2') {
      const teamAScore = finalRoster
        .filter((p) => p.team === 'A')
        .reduce(
          (s, p) => s + (mode === 'terminal' ? p.lastDropValue : p.totalValue),
          0
        );
      const teamBScore = finalRoster
        .filter((p) => p.team === 'B')
        .reduce(
          (s, p) => s + (mode === 'terminal' ? p.lastDropValue : p.totalValue),
          0
        );

      if (mode === 'reverse') {
        playerWon = teamAScore <= teamBScore;
      } else {
        playerWon = teamAScore >= teamBScore;
      }

      if (playerWon) {
        // Player gets half of all battle drops (their drops + 1 enemy's drops)
        rewardItems = [
          ...finalRoster[0].drops,
          ...(finalRoster[2]?.drops || []),
        ];
        onAddItems(rewardItems);
        const wonVal = rewardItems.reduce((s, i) => s + i.price, 0);
        title = '🏆 ПОБЕДА КОМАНДЫ 2x2!';
        subtitle = `Ваша команда выиграла в режиме «${
          BATTLE_MODES.find((m) => m.id === mode)?.title
        }»! Вы забрали ${rewardItems.length} скинов на $${wonVal.toFixed(2)}!`;
      } else {
        title = '💀 ПОРАЖЕНИЕ КОМАНДЫ 2x2';
        subtitle = `Боты переиграли вашу команду ($${teamBScore.toFixed(2)} против $${teamAScore.toFixed(2)}) и забрали весь дроп.`;
      }
    } else {
      // 1v1 or 1v1v1
      const scores = finalRoster.map((p) => ({
        id: p.id,
        name: p.name,
        metric: mode === 'terminal' ? p.lastDropValue : p.totalValue,
      }));

      const sorted = [...scores].sort((a, b) =>
        mode === 'reverse' ? a.metric - b.metric : b.metric - a.metric
      );

      const winner = sorted[0];
      playerWon = winner.id === 'player';

      if (playerWon) {
        rewardItems = allBattleDrops;
        onAddItems(rewardItems);
        title = `🏆 ПОБЕДА В БИТВЕ КЕЙСОВ (${
          BATTLE_MODES.find((m) => m.id === mode)?.title
        })!`;
        subtitle = `Вы забрали ВЕСЬ дроп соперников (${rewardItems.length} шт.) на сумму $${totalPoolValue.toFixed(2)}!`;
      } else {
        title = `💀 ПОБЕДИЛ БОТ ${winner.name}`;
        subtitle =
          mode === 'reverse'
            ? `В режиме «Реверс» у бота оказался более дешёвый дроп ($${winner.metric.toFixed(2)}), и он забрал весь банк $${totalPoolValue.toFixed(2)}!`
            : mode === 'terminal'
            ? `В режиме «Терминал» последний кейс бота дал $${winner.metric.toFixed(2)}! Бот забрал все скины.`
            : `Бот выбил скинов на $${winner.metric.toFixed(2)} и забрал весь банк ($${totalPoolValue.toFixed(2)}).`;
      }
    }

    playDropSound(playerWon);
    setIsRunning(false);
    setBattleFinished(true);
    setWinnerSummary({
      playerWon,
      title,
      subtitle,
      rewardItems,
      sharedBonusCash,
    });

    if (onBattlePlayed) {
      onBattlePlayed(playerWon);
    }

    onNotify(
      title,
      subtitle,
      playerWon ? 'reward' : 'warning'
    );
  };

  const activeModeInfo = BATTLE_MODES.find((m) => m.id === mode) || BATTLE_MODES[0];

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={18} color="#38BDF8" />
          <Text style={styles.backBtnText}>Назад в Игровой Зал</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.fastToggleChip,
            fastBattle && styles.fastToggleChipActive,
          ]}
          onPress={() => {
            playClickSound();
            setFastBattle((v) => !v);
          }}
        >
          <Ionicons
            name="flash"
            size={14}
            color={fastBattle ? '#0F172A' : '#FACC15'}
          />
          <Text
            style={[
              styles.fastToggleText,
              fastBattle && { color: '#0F172A' },
            ]}
          >
            {fastBattle ? '⚡ БЫСТРЫЙ РЕЖИМ ВКЛ' : '⚡ БЫСТРЫЙ РЕЖИМ'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Hero Banner */}
      <LiquidGlassCard
        themeMode={themeMode}
        glowColor={activeModeInfo.color}
        style={styles.heroCard}
      >
        <View style={styles.heroHeaderRow}>
          <View>
            <Text style={[styles.heroTag, { color: activeModeInfo.color }]}>
              ⚔️ CS2 ARENA • СОРЕВНОВАНИЕ С БОТАМИ
            </Text>
            <Text style={[styles.heroTitle, { color: theme.textPrimary }]}>
              БИТВА КЕЙСОВ (CASE BATTLE)
            </Text>
          </View>
          <View style={[styles.costBadge, { borderColor: activeModeInfo.color }]}>
            <Text style={styles.costLabel}>СТОИМОСТЬ ВХОДА</Text>
            <Text style={styles.costVal}>${totalCost.toFixed(2)}</Text>
          </View>
        </View>

        {/* 4 Battle Modes Selector */}
        <Text style={[styles.sectionSubTitle, { color: theme.textSecondary }]}>
          1. ВЫБЕРИТЕ РЕЖИМ ОТКРЫТИЯ КЕЙСОВ:
        </Text>
        <View style={styles.modesGrid}>
          {BATTLE_MODES.map((m) => {
            const active = mode === m.id;
            return (
              <TouchableOpacity
                key={m.id}
                disabled={isRunning}
                onPress={() => {
                  playClickSound();
                  setMode(m.id);
                }}
                style={[
                  styles.modeCard,
                  {
                    borderColor: active ? m.color : 'rgba(148,163,184,0.25)',
                    backgroundColor: active
                      ? `${m.color}22`
                      : theme.isLight
                      ? 'rgba(15,23,42,0.04)'
                      : 'rgba(15,23,42,0.55)',
                  },
                ]}
              >
                <View style={styles.modeCardHeader}>
                  <Ionicons
                    name={m.icon}
                    size={16}
                    color={active ? m.color : theme.textSecondary}
                  />
                  <Text
                    style={[
                      styles.modeCardTitle,
                      { color: active ? m.color : theme.textPrimary },
                    ]}
                  >
                    {m.title}
                  </Text>
                </View>
                <Text
                  numberOfLines={2}
                  style={[styles.modeCardDesc, { color: theme.textSecondary }]}
                >
                  {m.desc}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Format Selector (1v1, 1v1v1, 2v2) */}
        <View style={styles.formatRow}>
          <Text style={[styles.sectionSubTitle, { color: theme.textSecondary, marginBottom: 0 }]}>
            2. БОТЫ:
          </Text>
          <View style={styles.formatPills}>
            {(
              [
                { id: '1v1', label: '1 на 1 (Дуэль)' },
                { id: '1v1v1', label: '1x1x1 (3 игрока)' },
                { id: '2v2', label: '2 на 2 (Команды)' },
              ] as { id: CaseBattleFormat; label: string }[]
            ).map((f) => {
              const active = format === f.id;
              return (
                <TouchableOpacity
                  key={f.id}
                  disabled={isRunning}
                  onPress={() => {
                    playClickSound();
                    setFormat(f.id);
                  }}
                  style={[
                    styles.formatPill,
                    active && {
                      backgroundColor: '#0284C7',
                      borderColor: '#38BDF8',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.formatPillText,
                      active && { color: '#FFFFFF' },
                    ]}
                  >
                    {f.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Selected Cases Lineup */}
        <Text style={[styles.sectionSubTitle, { color: theme.textSecondary, marginTop: 10 }]}>
          3. КЕЙСЫ В БИТВЕ ({selectedCases.length}/6 — нажмите чтобы убрать):
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.selectedCasesScroll}
        >
          {selectedCases.map((c, idx) => {
            const isActiveRound = isRunning && currentRound === idx;
            const isLastTerminal =
              mode === 'terminal' && idx === selectedCases.length - 1;
            return (
              <TouchableOpacity
                key={`${c.id}_${idx}`}
                disabled={isRunning}
                onPress={() => handleRemoveCase(idx)}
                style={[
                  styles.selectedCaseItem,
                  isActiveRound && styles.selectedCaseItemActive,
                  isLastTerminal && { borderColor: '#EF4444' },
                ]}
              >
                <Text style={styles.roundBadge}>
                  {isLastTerminal ? '🔥 ФИНАЛ' : `РАУНД ${idx + 1}`}
                </Text>
                <Image
                  source={{ uri: c.image }}
                  style={styles.selectedCaseImg}
                  resizeMode="contain"
                />
                <Text numberOfLines={1} style={styles.selectedCaseName}>
                  {c.name}
                </Text>
                <Text style={styles.selectedCasePrice}>${c.price.toFixed(2)}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Add Cases Catalog Strip */}
        <Text style={[styles.sectionSubTitle, { color: theme.textSecondary, marginTop: 8 }]}>
          ДОБАВИТЬ КЕЙС В БИТВУ:
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 4 }}
        >
          {CS2_CASES.slice(0, 24).map((c) => (
            <TouchableOpacity
              key={c.id}
              disabled={isRunning}
              onPress={() => handleAddCase(c)}
              style={styles.catalogCaseChip}
            >
              <Image
                source={{ uri: c.image }}
                style={styles.catalogCaseImg}
                resizeMode="contain"
              />
              <View style={{ maxWidth: 105 }}>
                <Text numberOfLines={1} style={styles.catalogCaseName}>
                  {c.name}
                </Text>
                <Text style={styles.catalogCasePrice}>+${c.price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Start Battle Button */}
        <TouchableOpacity
          disabled={isRunning}
          onPress={startBattle}
          style={[
            styles.startBattleBtn,
            isRunning && { opacity: 0.6 },
          ]}
        >
          <LinearGradient
            colors={['#F59E0B', '#EA580C']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFillObject}
          />
          <MaterialCommunityIcons name="sword-cross" size={20} color="#FFFFFF" />
          <Text style={styles.startBattleBtnText}>
            {isRunning
              ? `ОТКРЫВАЕМ РАУНД ${currentRound + 1} ИЗ ${selectedCases.length}...`
              : `НАЧАТЬ БИТВУ С БОТАМИ ЗА $${totalCost.toFixed(2)}`}
          </Text>
        </TouchableOpacity>
      </LiquidGlassCard>

      {/* Live Battle Arena Columns */}
      {participants.length > 0 && (
        <LiquidGlassCard
          themeMode={themeMode}
          glowColor="#38BDF8"
          style={styles.arenaCard}
        >
          <View style={styles.arenaTitleRow}>
            <Text style={[styles.arenaTitle, { color: theme.textPrimary }]}>
              {isRunning
                ? `🎰 ИДЁТ ОТКРЫТИЕ: КЕЙС ${currentRound + 1} ИЗ ${selectedCases.length}`
                : '📊 ИТОГИ РАУНДОВ БИТВЫ'}
            </Text>
            <View style={[styles.modePillMini, { backgroundColor: `${activeModeInfo.color}25` }]}>
              <Text style={[styles.modePillMiniText, { color: activeModeInfo.color }]}>
                РЕЖИМ: {activeModeInfo.title}
              </Text>
            </View>
          </View>

          {winnerSummary && battleFinished && (
            <View
              style={[
                styles.winnerBanner,
                {
                  borderColor: winnerSummary.playerWon ? '#10B981' : '#EF4444',
                  backgroundColor: winnerSummary.playerWon
                    ? 'rgba(16, 185, 129, 0.16)'
                    : 'rgba(239, 68, 68, 0.16)',
                },
              ]}
            >
              <Text
                style={[
                  styles.winnerTitle,
                  { color: winnerSummary.playerWon ? '#10B981' : '#EF4444' },
                ]}
              >
                {winnerSummary.title}
              </Text>
              <Text style={[styles.winnerSub, { color: theme.textPrimary }]}>
                {winnerSummary.subtitle}
              </Text>
            </View>
          )}

          {/* Participant Rows */}
          {participants.map((p) => {
            const metricVal =
              mode === 'terminal' ? p.lastDropValue : p.totalValue;
            return (
              <View
                key={p.id}
                style={[
                  styles.participantBox,
                  p.isPlayer && styles.participantBoxPlayer,
                ]}
              >
                <View style={styles.participantHeader}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontSize: 20 }}>{p.avatar}</Text>
                    <View>
                      <Text
                        style={[
                          styles.participantName,
                          { color: p.isPlayer ? '#0284C7' : theme.textPrimary },
                        ]}
                      >
                        {p.name}
                      </Text>
                      <Text style={{ color: theme.textMuted, fontSize: 10, fontWeight: '700' }}>
                        Выбито скинов: {p.drops.length}/{selectedCases.length}
                      </Text>
                    </View>
                  </View>

                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.participantTotalLabel}>
                      {mode === 'terminal' ? 'ФИНАЛЬНЫЙ КЕЙС' : 'СУММА ДРОПА'}
                    </Text>
                    <Text style={styles.participantTotalVal}>
                      ${metricVal.toFixed(2)}
                    </Text>
                  </View>
                </View>

                {/* Drops Feed */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ marginTop: 8 }}
                >
                  {p.drops.map((d, dIdx) => {
                    const r = RARITIES[d.rarity] || RARITIES.milspec;
                    const isTerminalFinal =
                      mode === 'terminal' && dIdx === selectedCases.length - 1;
                    return (
                      <View
                        key={`${d.instanceId}_${dIdx}`}
                        style={[
                          styles.dropMiniCard,
                          { borderColor: r.color },
                          isTerminalFinal && styles.dropMiniCardTerminal,
                        ]}
                      >
                        <Image
                          source={{ uri: d.image }}
                          style={styles.dropMiniImg}
                          resizeMode="contain"
                        />
                        <Text numberOfLines={1} style={styles.dropMiniWeapon}>
                          {d.weapon}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={[styles.dropMiniName, { color: r.color }]}
                        >
                          {d.name}
                        </Text>
                        <Text style={styles.dropMiniPrice}>${d.price.toFixed(2)}</Text>
                      </View>
                    );
                  })}

                  {isRunning && p.drops.length < selectedCases.length && (
                    <Animated.View
                      style={[
                        styles.spinningPlaceholder,
                        { opacity: spinPulse },
                      ]}
                    >
                      <Ionicons name="sync" size={22} color="#38BDF8" />
                      <Text style={styles.spinningPlaceholderText}>Крутится...</Text>
                    </Animated.View>
                  )}
                </ScrollView>
              </View>
            );
          })}
        </LiquidGlassCard>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderWidth: 1,
    borderColor: '#38BDF8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  backBtnText: {
    color: '#0284C7',
    fontWeight: '900',
    fontSize: 12,
  },
  fastToggleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(250, 204, 21, 0.16)',
    borderWidth: 1,
    borderColor: '#FACC15',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  fastToggleChipActive: {
    backgroundColor: '#FACC15',
  },
  fastToggleText: {
    color: '#D97706',
    fontWeight: '900',
    fontSize: 11,
  },
  heroCard: {
    padding: 15,
    marginBottom: 14,
  },
  heroHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroTag: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: 2,
  },
  costBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.14)',
    borderWidth: 1.2,
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingVertical: 6,
    alignItems: 'flex-end',
  },
  costLabel: {
    color: '#64748B',
    fontSize: 8,
    fontWeight: '900',
  },
  costVal: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '900',
  },
  sectionSubTitle: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.7,
    marginBottom: 6,
  },
  modesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 12,
  },
  modeCard: {
    width: '48.4%',
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 10,
  },
  modeCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 3,
  },
  modeCardTitle: {
    fontSize: 12,
    fontWeight: '900',
  },
  modeCardDesc: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 13,
  },
  formatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 6,
  },
  formatPills: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  formatPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
  },
  formatPillText: {
    color: '#0284C7',
    fontSize: 11,
    fontWeight: '800',
  },
  selectedCasesScroll: {
    marginVertical: 4,
  },
  selectedCaseItem: {
    width: 96,
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: 'rgba(56, 189, 248, 0.35)',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    padding: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  selectedCaseItemActive: {
    borderColor: '#FACC15',
    borderWidth: 2,
  },
  roundBadge: {
    color: '#38BDF8',
    fontSize: 8,
    fontWeight: '900',
    marginBottom: 2,
  },
  selectedCaseImg: {
    width: 64,
    height: 48,
  },
  selectedCaseName: {
    color: '#F8FAFC',
    fontSize: 10,
    fontWeight: '800',
    marginTop: 3,
  },
  selectedCasePrice: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: '900',
  },
  catalogCaseChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.3)',
    backgroundColor: 'rgba(15, 23, 42, 0.82)',
    marginRight: 8,
  },
  catalogCaseImg: {
    width: 36,
    height: 28,
  },
  catalogCaseName: {
    color: '#F8FAFC',
    fontSize: 10,
    fontWeight: '800',
  },
  catalogCasePrice: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '900',
  },
  startBattleBtn: {
    marginTop: 14,
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    overflow: 'hidden',
  },
  startBattleBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  arenaCard: {
    padding: 15,
  },
  arenaTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  arenaTitle: {
    fontSize: 13,
    fontWeight: '900',
  },
  modePillMini: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  modePillMiniText: {
    fontSize: 10,
    fontWeight: '900',
  },
  winnerBanner: {
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  winnerTitle: {
    fontSize: 14,
    fontWeight: '900',
  },
  winnerSub: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 3,
    lineHeight: 16,
  },
  participantBox: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.28)',
    backgroundColor: 'rgba(15, 23, 42, 0.12)',
    padding: 10,
    marginBottom: 10,
  },
  participantBoxPlayer: {
    borderColor: '#38BDF8',
    borderWidth: 1.5,
  },
  participantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participantName: {
    fontSize: 13,
    fontWeight: '900',
  },
  participantTotalLabel: {
    color: '#64748B',
    fontSize: 8,
    fontWeight: '900',
  },
  participantTotalVal: {
    color: '#10B981',
    fontSize: 15,
    fontWeight: '900',
  },
  dropMiniCard: {
    width: 96,
    borderRadius: 12,
    borderWidth: 1.2,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    padding: 7,
    marginRight: 8,
    alignItems: 'center',
  },
  dropMiniCardTerminal: {
    borderWidth: 2,
    backgroundColor: 'rgba(127, 29, 29, 0.45)',
  },
  dropMiniImg: {
    width: 68,
    height: 46,
  },
  dropMiniWeapon: {
    color: '#94A3B8',
    fontSize: 8,
    fontWeight: '800',
    marginTop: 2,
  },
  dropMiniName: {
    fontSize: 10,
    fontWeight: '900',
  },
  dropMiniPrice: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: '900',
    marginTop: 2,
  },
  spinningPlaceholder: {
    width: 96,
    height: 98,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#38BDF8',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
  },
  spinningPlaceholderText: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '800',
    marginTop: 4,
  },
});
