import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
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
  CaseBattleFormat,
  CaseBattleMode,
  CaseContainer,
  InventoryItem,
  RARITIES,
  ThemeMode,
} from '../types/cs2';
import { INITIAL_CASES as CS2_CASES, rollSkinFromCase } from '../data/cs2Database';
import { playClickSound, playDropSound, playTickSound } from '../utils/soundManager';
import { THEMES } from './LiquidGlassUI';

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
  isPlayer: boolean;
  team: 'A' | 'B' | 'C';
  drops: InventoryItem[];
  totalValue: number;
  lastDropValue: number;
}

const BOT_NAMES = ['s1mple_AI', 'donk_Bot', 'm0NESY_AI', 'ZywOo_Bot', 'NiKo_AI'];

const BATTLE_MODES: {
  id: CaseBattleMode;
  title: string;
  desc: string;
}[] = [
  {
    id: 'clutch',
    title: 'Клатч',
    desc: 'Побеждает участник с самой высокой общей суммой дропа и забирает все скины.',
  },
  {
    id: 'terminal',
    title: 'Терминал',
    desc: 'Исход всей битвы решает только ПОСЛЕДНИЙ открытый кейс.',
  },
  {
    id: 'reverse',
    title: 'Реверс',
    desc: 'Побеждает участник, выбивший самый ДЕШЁВЫЙ дроп (меньше сумма — победа).',
  },
  {
    id: 'shared',
    title: 'Общий',
    desc: 'Общая стоимость всех выбитых скинов делится поровну между участниками.',
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
  const theme = THEMES[themeMode] || THEMES.obsidian;

  const [mode, setMode] = useState<CaseBattleMode>('clutch');
  const [format, setFormat] = useState<CaseBattleFormat>('1v1');
  const [fastBattle, setFastBattle] = useState<boolean>(defaultFastSpin);
  const [selectedCases, setSelectedCases] = useState<CaseContainer[]>([
    CS2_CASES[0],
    CS2_CASES[1],
  ]);
  const [casePickerOpen, setCasePickerOpen] = useState<boolean>(false);

  const [isRunning, setIsRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState<number>(-1);
  const [participants, setParticipants] = useState<BattleParticipant[]>([]);
  const [battleFinished, setBattleFinished] = useState(false);
  const [winnerSummary, setWinnerSummary] = useState<{
    playerWon: boolean;
    title: string;
    subtitle: string;
  } | null>(null);

  const spinPulse = useRef(new Animated.Value(0.4)).current;
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const totalCost = Number(selectedCases.reduce((sum, c) => sum + c.price, 0).toFixed(2));
  const activeModeInfo = BATTLE_MODES.find((m) => m.id === mode) || BATTLE_MODES[0];

  const handleAddCase = (c: CaseContainer) => {
    if (isRunning) return;
    if (selectedCases.length >= 5) {
      onNotify('Максимум 5 кейсов', 'В одну битву можно добавить до 5 кейсов.', 'warning');
      return;
    }
    playClickSound();
    setSelectedCases((prev) => [...prev, c]);
  };

  const handleRemoveCase = (index: number) => {
    if (isRunning) return;
    if (selectedCases.length <= 1) {
      onNotify('Минимум 1 кейс', 'В битве должен оставаться хотя бы 1 кейс.', 'warning');
      return;
    }
    playClickSound();
    setSelectedCases((prev) => prev.filter((_, idx) => idx !== index));
  };

  const startBattle = () => {
    if (isRunning) return;
    if (balance < totalCost) {
      onNotify(
        'Недостаточно средств',
        `Для старта битвы нужно $${totalCost.toFixed(2)} (у вас $${balance.toFixed(2)}).`,
        'error'
      );
      return;
    }

    onUpdateBalance(-totalCost);
    playClickSound();

    const bots = [...BOT_NAMES].sort(() => Math.random() - 0.5);
    const initialRoster: BattleParticipant[] = [
      {
        id: 'player',
        name: 'Вы',
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
        name: bots[0],
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
          name: bots[0],
          isPlayer: false,
          team: 'B',
          drops: [],
          totalValue: 0,
          lastDropValue: 0,
        },
        {
          id: 'bot_2',
          name: bots[1],
          isPlayer: false,
          team: 'C',
          drops: [],
          totalValue: 0,
          lastDropValue: 0,
        }
      );
    } else {
      initialRoster.push(
        {
          id: 'bot_ally',
          name: `${bots[0]} (Союзник)`,
          isPlayer: false,
          team: 'A',
          drops: [],
          totalValue: 0,
          lastDropValue: 0,
        },
        {
          id: 'bot_e1',
          name: bots[1],
          isPlayer: false,
          team: 'B',
          drops: [],
          totalValue: 0,
          lastDropValue: 0,
        },
        {
          id: 'bot_e2',
          name: bots[2],
          isPlayer: false,
          team: 'B',
          drops: [],
          totalValue: 0,
          lastDropValue: 0,
        }
      );
    }

    const allRoundDrops: InventoryItem[][] = selectedCases.map((container) =>
      initialRoster.map(() => rollSkinFromCase(container))
    );

    setParticipants(initialRoster);
    setBattleFinished(false);
    setWinnerSummary(null);
    setIsRunning(true);
    setCurrentRound(0);

    const stepMs = fastBattle ? 850 : 1750;
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    Animated.loop(
      Animated.sequence([
        Animated.timing(spinPulse, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.timing(spinPulse, { toValue: 0.35, duration: 350, useNativeDriver: true }),
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
    }, selectedCases.length * stepMs + 350);
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
      return { ...p, drops, totalValue, lastDropValue };
    });

    const allBattleDrops = finalRoster.flatMap((p) => p.drops);
    const totalPoolValue = Number(
      allBattleDrops.reduce((s, d) => s + d.price, 0).toFixed(2)
    );

    let playerWon = false;
    let title = '';
    let subtitle = '';

    if (mode === 'shared') {
      playerWon = true;
      const equalShare = Number((totalPoolValue / finalRoster.length).toFixed(2));
      const playerOwnDrops = finalRoster[0].drops;
      const bonusCash = Number(Math.max(0, equalShare - finalRoster[0].totalValue).toFixed(2));
      onAddItems(playerOwnDrops);
      if (bonusCash > 0) onUpdateBalance(bonusCash);
      title = 'Общий дроп разделён поровну';
      subtitle = `Общий банк: $${totalPoolValue.toFixed(2)} • Ваша доля: $${equalShare.toFixed(2)}`;
    } else if (format === '2v2') {
      const teamAScore = finalRoster
        .filter((p) => p.team === 'A')
        .reduce((s, p) => s + (mode === 'terminal' ? p.lastDropValue : p.totalValue), 0);
      const teamBScore = finalRoster
        .filter((p) => p.team === 'B')
        .reduce((s, p) => s + (mode === 'terminal' ? p.lastDropValue : p.totalValue), 0);

      playerWon = mode === 'reverse' ? teamAScore <= teamBScore : teamAScore >= teamBScore;
      if (playerWon) {
        const rewardItems = [...finalRoster[0].drops, ...(finalRoster[2]?.drops || [])];
        onAddItems(rewardItems);
        const wonVal = rewardItems.reduce((s, i) => s + i.price, 0);
        title = 'Победа вашей команды (2v2)';
        subtitle = `Получено ${rewardItems.length} предм. на сумму $${wonVal.toFixed(2)}`;
      } else {
        title = 'Поражение команды';
        subtitle = `Соперники набрали $${teamBScore.toFixed(2)} против ваших $${teamAScore.toFixed(2)}`;
      }
    } else {
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
        onAddItems(allBattleDrops);
        title = 'Победа в Битве Кейсов!';
        subtitle = `Вы забрали все ${allBattleDrops.length} скинов на сумму $${totalPoolValue.toFixed(2)}`;
      } else {
        title = `Победил ${winner.name}`;
        subtitle = `Результат соперника: $${winner.metric.toFixed(2)} (общий банк $${totalPoolValue.toFixed(2)})`;
      }
    }

    playDropSound(playerWon);
    setIsRunning(false);
    setBattleFinished(true);
    setWinnerSummary({ playerWon, title, subtitle });
    if (onBattlePlayed) onBattlePlayed(playerWon);
  };

  return (
    <View style={styles.container}>
      {/* Clean Minimalist Header */}
      <View
        style={[
          styles.headerCard,
          { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
        ]}
      >
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: theme.surfaceBg }]}
          disabled={isRunning}
          onPress={onBack}
        >
          <Ionicons name="arrow-back" size={16} color={theme.textPrimary} />
          <Text style={[styles.backBtnText, { color: theme.textPrimary }]}>Игры</Text>
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
          Битва Кейсов
        </Text>

        <TouchableOpacity
          style={[
            styles.fastBtn,
            { backgroundColor: fastBattle ? '#EAB308' : theme.surfaceBg },
          ]}
          onPress={() => {
            playClickSound();
            setFastBattle((v) => !v);
          }}
        >
          <Ionicons
            name="flash"
            size={13}
            color={fastBattle ? '#111827' : theme.textSecondary}
          />
          <Text
            style={[
              styles.fastBtnText,
              { color: fastBattle ? '#111827' : theme.textSecondary },
            ]}
          >
            Быстро
          </Text>
        </TouchableOpacity>
      </View>

      {/* Configuration Panel */}
      <View
        style={[
          styles.configCard,
          { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
        ]}
      >
        {/* Mode Segmented Control */}
        <Text style={[styles.label, { color: theme.textSecondary }]}>РЕЖИМ ИГРЫ</Text>
        <View style={[styles.segmentedRow, { backgroundColor: theme.surfaceBg }]}>
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
                  styles.segmentBtn,
                  active && { backgroundColor: theme.cardBg },
                ]}
              >
                <Text
                  style={[
                    styles.segmentBtnText,
                    { color: active ? theme.textPrimary : theme.textSecondary },
                  ]}
                >
                  {m.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={[styles.modeDesc, { color: theme.textSecondary }]}>
          {activeModeInfo.desc}
        </Text>

        {/* Format Row */}
        <View style={styles.rowBetween}>
          <Text style={[styles.label, { color: theme.textSecondary, marginBottom: 0 }]}>
            ФОРМАТ ПРОТИВ БОТОВ
          </Text>
          <View style={styles.formatGroup}>
            {(['1v1', '1v1v1', '2v2'] as CaseBattleFormat[]).map((f) => {
              const active = format === f;
              return (
                <TouchableOpacity
                  key={f}
                  disabled={isRunning}
                  onPress={() => {
                    playClickSound();
                    setFormat(f);
                  }}
                  style={[
                    styles.formatChip,
                    {
                      backgroundColor: active ? '#16A34A' : theme.surfaceBg,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.formatChipText,
                      { color: active ? '#FFFFFF' : theme.textSecondary },
                    ]}
                  >
                    {f}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Cases Lineup */}
        <View style={[styles.rowBetween, { marginTop: 14, marginBottom: 8 }]}>
          <Text style={[styles.label, { color: theme.textSecondary, marginBottom: 0 }]}>
            КЕЙСЫ В БИТВЕ ({selectedCases.length}/5)
          </Text>
          <TouchableOpacity
            disabled={isRunning}
            onPress={() => setCasePickerOpen(true)}
            style={styles.addCaseTriggerBtn}
          >
            <Ionicons name="add" size={15} color="#FFFFFF" />
            <Text style={styles.addCaseTriggerText}>Добавить кейс</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {selectedCases.map((c, idx) => {
            const isCurrent = isRunning && currentRound === idx;
            return (
              <TouchableOpacity
                key={`${c.id}_${idx}`}
                disabled={isRunning}
                onPress={() => handleRemoveCase(idx)}
                style={[
                  styles.caseSlotCard,
                  {
                    backgroundColor: theme.surfaceBg,
                    borderColor: isCurrent ? '#EAB308' : theme.cardBorder,
                  },
                ]}
              >
                <Image
                  source={{ uri: c.image }}
                  style={styles.caseSlotImg}
                  resizeMode="contain"
                />
                <Text
                  numberOfLines={1}
                  style={[styles.caseSlotName, { color: theme.textPrimary }]}
                >
                  {c.name.replace('Кейс ', '')}
                </Text>
                <Text style={styles.caseSlotPrice}>${c.price.toFixed(2)}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Start Button */}
        <TouchableOpacity
          disabled={isRunning}
          onPress={startBattle}
          style={[styles.startBtn, isRunning && { opacity: 0.6 }]}
        >
          <MaterialCommunityIcons name="sword-cross" size={17} color="#FFFFFF" />
          <Text style={styles.startBtnText}>
            {isRunning
              ? `ОТКРЫВАЕМ РАУНД ${currentRound + 1} ИЗ ${selectedCases.length}...`
              : `НАЧАТЬ БИТВУ • $${totalCost.toFixed(2)}`}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Live Battle Results */}
      {participants.length > 0 && (
        <View
          style={[
            styles.configCard,
            { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
          ]}
        >
          {winnerSummary && battleFinished && (
            <View
              style={[
                styles.resultBanner,
                {
                  backgroundColor: theme.surfaceBg,
                  borderLeftColor: winnerSummary.playerWon ? '#16A34A' : '#EF4444',
                },
              ]}
            >
              <Text
                style={[
                  styles.resultBannerTitle,
                  { color: winnerSummary.playerWon ? '#16A34A' : '#EF4444' },
                ]}
              >
                {winnerSummary.title}
              </Text>
              <Text style={[styles.resultBannerSub, { color: theme.textSecondary }]}>
                {winnerSummary.subtitle}
              </Text>
            </View>
          )}

          {participants.map((p) => {
            const score = mode === 'terminal' ? p.lastDropValue : p.totalValue;
            return (
              <View
                key={p.id}
                style={[
                  styles.participantRow,
                  {
                    backgroundColor: theme.surfaceBg,
                    borderColor: p.isPlayer ? '#16A34A' : theme.cardBorder,
                  },
                ]}
              >
                <View style={styles.rowBetween}>
                  <Text style={[styles.pName, { color: theme.textPrimary }]}>
                    {p.name}
                  </Text>
                  <Text style={styles.pScore}>${score.toFixed(2)}</Text>
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ marginTop: 8 }}
                >
                  {p.drops.map((d, dIdx) => {
                    const r = RARITIES[d.rarity] || RARITIES.milspec;
                    return (
                      <View
                        key={`${d.instanceId}_${dIdx}`}
                        style={[
                          styles.dropMiniTile,
                          {
                            backgroundColor: theme.cardBg,
                            borderColor: theme.cardBorder,
                          },
                        ]}
                      >
                        <Image
                          source={{ uri: d.image }}
                          style={styles.dropMiniImg}
                          resizeMode="contain"
                        />
                        <Text
                          numberOfLines={1}
                          style={[styles.dropMiniTitle, { color: theme.textPrimary }]}
                        >
                          {d.name}
                        </Text>
                        <Text style={styles.dropMiniPrice}>${d.price.toFixed(2)}</Text>
                        <View style={[styles.miniRarityBar, { backgroundColor: r.color }]} />
                      </View>
                    );
                  })}

                  {isRunning && p.drops.length < selectedCases.length && (
                    <Animated.View
                      style={[
                        styles.dropMiniPlaceholder,
                        { borderColor: theme.cardBorder, opacity: spinPulse },
                      ]}
                    >
                      <Text style={{ color: theme.textMuted, fontSize: 10 }}>...</Text>
                    </Animated.View>
                  )}
                </ScrollView>
              </View>
            );
          })}
        </View>
      )}

      {/* Clean Case Picker Modal */}
      <Modal visible={casePickerOpen} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.modalSheet,
              { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
            ]}
          >
            <View style={styles.rowBetween}>
              <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
                Выберите кейс для битвы
              </Text>
              <TouchableOpacity onPress={() => setCasePickerOpen(false)}>
                <Ionicons name="close" size={22} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 420, marginTop: 12 }}>
              <View style={styles.pickerGrid}>
                {CS2_CASES.map((c) => (
                  <TouchableOpacity
                    key={c.id}
                    onPress={() => {
                      handleAddCase(c);
                      setCasePickerOpen(false);
                    }}
                    style={[
                      styles.pickerCaseCard,
                      {
                        backgroundColor: theme.surfaceBg,
                        borderColor: theme.cardBorder,
                      },
                    ]}
                  >
                    <Image
                      source={{ uri: c.image }}
                      style={{ width: 72, height: 54 }}
                      resizeMode="contain"
                    />
                    <Text
                      numberOfLines={1}
                      style={[styles.caseSlotName, { color: theme.textPrimary }]}
                    >
                      {c.name.replace('Кейс ', '')}
                    </Text>
                    <Text style={styles.caseSlotPrice}>${c.price.toFixed(2)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  backBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  fastBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  fastBtnText: {
    fontSize: 11,
    fontWeight: '800',
  },
  configCard: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  segmentedRow: {
    flexDirection: 'row',
    padding: 3,
    borderRadius: 10,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  segmentBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  modeDesc: {
    fontSize: 11,
    marginTop: 6,
    marginBottom: 12,
    lineHeight: 15,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formatGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  formatChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  formatChipText: {
    fontSize: 12,
    fontWeight: '800',
  },
  addCaseTriggerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#16A34A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addCaseTriggerText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  caseSlotCard: {
    width: 96,
    borderRadius: 10,
    borderWidth: 1,
    padding: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  caseSlotImg: {
    width: 64,
    height: 48,
  },
  caseSlotName: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  },
  caseSlotPrice: {
    color: '#16A34A',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 2,
  },
  startBtn: {
    marginTop: 14,
    backgroundColor: '#16A34A',
    borderRadius: 10,
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  startBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  resultBanner: {
    borderLeftWidth: 4,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  resultBannerTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  resultBannerSub: {
    fontSize: 11,
    marginTop: 2,
  },
  participantRow: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  pName: {
    fontSize: 13,
    fontWeight: '800',
  },
  pScore: {
    color: '#16A34A',
    fontSize: 14,
    fontWeight: '900',
  },
  dropMiniTile: {
    width: 92,
    borderRadius: 10,
    borderWidth: 1,
    padding: 6,
    marginRight: 8,
    alignItems: 'center',
  },
  dropMiniImg: {
    width: 64,
    height: 44,
  },
  dropMiniTitle: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  dropMiniPrice: {
    color: '#16A34A',
    fontSize: 10,
    fontWeight: '800',
  },
  miniRarityBar: {
    width: '100%',
    height: 3,
    borderRadius: 1.5,
    marginTop: 4,
  },
  dropMiniPlaceholder: {
    width: 92,
    height: 92,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalSheet: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  pickerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pickerCaseCard: {
    width: '48.4%',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginBottom: 8,
    alignItems: 'center',
  },
});
