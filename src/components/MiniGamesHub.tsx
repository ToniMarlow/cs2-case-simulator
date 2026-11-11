import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgGrad, Path, Stop } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { InventoryItem, RARITIES, RarityKey, SkinTemplate } from '../types/cs2';
import { getAllTemplates, instantiateSkin } from '../data/cs2Database';
import { LiquidGlassCard, SkinCard } from './LiquidGlassUI';
import { playLoseSound, playTickSound, playWinSound } from '../utils/soundManager';

type MiniGameTab =
  | 'crash'
  | 'upgrader'
  | 'mines'
  | 'tradeup'
  | 'coinflip'
  | 'blackjack'
  | 'exchanger';

interface MiniGamesHubProps {
  balance: number;
  inventory: InventoryItem[];
  onChangeBalance: (delta: number) => void;
  onAddInventoryItem: (item: InventoryItem) => void;
  onRemoveInventoryItems: (ids: string[]) => void;
  onRecordGameWin: (isUpgrade?: boolean) => void;
}

const RARITY_ORDER: RarityKey[] = ['milspec', 'restricted', 'classified', 'covert', 'gold'];

interface PlayingCard {
  rank: string;
  suit: '♠' | '♥' | '♦' | '♣';
  value: number;
}

export const MiniGamesHub: React.FC<MiniGamesHubProps> = ({
  balance,
  inventory,
  onChangeBalance,
  onAddInventoryItem,
  onRemoveInventoryItems,
  onRecordGameWin,
}) => {
  const [activeGame, setActiveGame] = useState<MiniGameTab>('crash');

  // ==================== 1. CRASH (РАКЕТКА С ГРАФИКОМ) ====================
  const [crashBet, setCrashBet] = useState('25');
  const [crashRunning, setCrashRunning] = useState(false);
  const [crashMultiplier, setCrashMultiplier] = useState(1.0);
  const [crashBusted, setCrashBusted] = useState(false);
  const [cashedOutAt, setCashedOutAt] = useState<number | null>(null);
  const [crashHistory, setCrashHistory] = useState<number[]>([1.84, 3.45, 1.12, 7.92, 1.56]);
  const crashTimerRef = useRef<NodeJS.Timeout | null>(null);
  const crashTargetRef = useRef<number>(1.0);

  useEffect(() => {
    return () => {
      if (crashTimerRef.current) clearInterval(crashTimerRef.current);
    };
  }, []);

  const startCrash = () => {
    const bet = Number(crashBet);
    if (isNaN(bet) || bet <= 0 || bet > balance) {
      Alert.alert('Недостаточно средств', 'Проверь сумму ставки.');
      return;
    }
    onChangeBalance(-bet);
    setCrashRunning(true);
    setCrashBusted(false);
    setCashedOutAt(null);
    setCrashMultiplier(1.0);

    const r = Math.random();
    const crashPoint = r < 0.05 ? 1.02 : Number(Math.max(1.04, 0.97 / (1 - r)).toFixed(2));
    crashTargetRef.current = Math.min(crashPoint, 50.0);

    let current = 1.0;
    crashTimerRef.current = setInterval(() => {
      current = Number((current + current * 0.026).toFixed(2));
      if (current >= crashTargetRef.current) {
        if (crashTimerRef.current) clearInterval(crashTimerRef.current);
        const finalPoint = crashTargetRef.current;
        setCrashMultiplier(finalPoint);
        setCrashRunning(false);
        setCrashBusted(true);
        setCrashHistory((prev) => [finalPoint, ...prev.slice(0, 6)]);
        playLoseSound();
      } else {
        setCrashMultiplier(current);
      }
    }, 85);
  };

  const cashOutCrash = () => {
    if (!crashRunning || cashedOutAt) return;
    if (crashTimerRef.current) clearInterval(crashTimerRef.current);
    const bet = Number(crashBet);
    const winAmount = Number((bet * crashMultiplier).toFixed(2));
    const lockedMult = crashMultiplier;
    setCashedOutAt(lockedMult);
    setCrashRunning(false);
    setCrashHistory((prev) => [lockedMult, ...prev.slice(0, 6)]);
    onChangeBalance(winAmount);
    onRecordGameWin(false);
    playWinSound();
  };

  // Compute SVG trajectory progress (0..1)
  const crashProgress = Math.min(1, Math.log10(Math.max(1, crashMultiplier)) / 1.3);
  const rocketX = 24 + crashProgress * 290;
  const rocketY = 140 - Math.pow(crashProgress, 1.35) * 108;
  const curvePath = `M 24 140 Q ${24 + crashProgress * 160} 140 ${rocketX} ${rocketY}`;

  // ==================== 2. UPGRADER (КРУГОВОЕ КОЛЕСО С БЕГУНКОМ) ====================
  const [selectedUpgradeSkin, setSelectedUpgradeSkin] = useState<InventoryItem | null>(null);
  const [upgradeMultiplier, setUpgradeMultiplier] = useState<1.5 | 2 | 5 | 10>(2);
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);
  const [upgradeResultMsg, setUpgradeResultMsg] = useState<{ text: string; win: boolean } | null>(
    null
  );
  const wheelAngleAnim = useRef(new Animated.Value(0)).current;
  const currentRotationRef = useRef(0);

  const chanceMap: Record<1.5 | 2 | 5 | 10, number> = {
    1.5: 62,
    2: 47,
    5: 19,
    10: 9.5,
  };
  const winChance = chanceMap[upgradeMultiplier];

  const runUpgrade = () => {
    if (isWheelSpinning) return;
    if (!selectedUpgradeSkin) {
      Alert.alert('Выбери скин', 'Сначала выбери предмет из своего инвентаря снизу.');
      return;
    }

    setIsWheelSpinning(true);
    setUpgradeResultMsg(null);

    const skinUsed = selectedUpgradeSkin;
    const roll = Math.random() * 100; // 0..100
    const isWin = roll <= winChance;

    // Map roll (0..100) to angle (0..360 deg). Winning zone is 0 .. (winChance * 3.6) deg
    const targetDegreeInCircle = isWin
      ? Math.random() * (winChance * 3.6 * 0.88) + 4
      : winChance * 3.6 + 8 + Math.random() * ((100 - winChance) * 3.6 - 16);

    const extraSpins = 360 * 5;
    const baseFullSpins =
      Math.ceil(currentRotationRef.current / 360) * 360 + extraSpins;
    const finalAngle = baseFullSpins + targetDegreeInCircle;
    currentRotationRef.current = finalAngle;

    Animated.timing(wheelAngleAnim, {
      toValue: finalAngle,
      duration: 3800,
      easing: Easing.bezier(0.12, 0.85, 0.2, 1),
      useNativeDriver: true,
    }).start(() => {
      setIsWheelSpinning(false);
      onRemoveInventoryItems([skinUsed.instanceId]);

      if (isWin) {
        const targetValue = skinUsed.price * upgradeMultiplier;
        const all = getAllTemplates();
        let bestMatch = all[0];
        for (const t of all) {
          if (Math.abs(t.basePrice - targetValue) < Math.abs(bestMatch.basePrice - targetValue)) {
            bestMatch = t;
          }
        }
        const upgraded = instantiateSkin(bestMatch);
        upgraded.price = Number(targetValue.toFixed(2));
        onAddInventoryItem(upgraded);
        setSelectedUpgradeSkin(upgraded);
        setUpgradeResultMsg({
          text: `УСПЕХ! Выпал ${upgraded.weapon} | ${upgraded.name} ($${upgraded.price})`,
          win: true,
        });
        onRecordGameWin(true);
        playWinSound();
      } else {
        setSelectedUpgradeSkin(null);
        setUpgradeResultMsg({
          text: 'НЕУДАЧА! Стрелка остановилась мимо зелёного сектора.',
          win: false,
        });
        playLoseSound();
      }
    });
  };

  const wheelRadius = 76;
  const wheelCircumference = 2 * Math.PI * wheelRadius;
  const strokeDashoffset = wheelCircumference * (1 - winChance / 100);
  const pointerRotate = wheelAngleAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  // ==================== 3. MINES (МИНЫ 5x5) ====================
  const [minesBet, setMinesBet] = useState('20');
  const [minesCount, setMinesCount] = useState(3);
  const [minesActive, setMinesActive] = useState(false);
  const [minePositions, setMinePositions] = useState<number[]>([]);
  const [revealedCells, setRevealedCells] = useState<number[]>([]);
  const [minesGameOver, setMinesGameOver] = useState(false);

  const startMines = () => {
    const bet = Number(minesBet);
    if (isNaN(bet) || bet <= 0 || bet > balance) {
      Alert.alert('Ошибка', 'Некорректная сумма ставки.');
      return;
    }
    onChangeBalance(-bet);
    const bombs: number[] = [];
    while (bombs.length < minesCount) {
      const pos = Math.floor(Math.random() * 25);
      if (!bombs.includes(pos)) bombs.push(pos);
    }
    setMinePositions(bombs);
    setRevealedCells([]);
    setMinesGameOver(false);
    setMinesActive(true);
  };

  const currentMinesMultiplier = () => {
    if (revealedCells.length === 0) return 1.0;
    let mult = 1.0;
    for (let i = 0; i < revealedCells.length; i++) {
      mult *= (25 - i) / (25 - minesCount - i);
    }
    return Number((mult * 0.97).toFixed(2));
  };

  const pressMineCell = (idx: number) => {
    if (!minesActive || revealedCells.includes(idx) || minesGameOver) return;
    if (minePositions.includes(idx)) {
      setRevealedCells([...revealedCells, idx]);
      setMinesGameOver(true);
      setMinesActive(false);
      playLoseSound();
    } else {
      const next = [...revealedCells, idx];
      setRevealedCells(next);
      playWinSound();
    }
  };

  const cashOutMines = () => {
    if (!minesActive || revealedCells.length === 0) return;
    const win = Number((Number(minesBet) * currentMinesMultiplier()).toFixed(2));
    onChangeBalance(win);
    setMinesActive(false);
    setMinesGameOver(true);
    onRecordGameWin(false);
    playWinSound();
  };

  // ==================== 4. COINFLIP (3D АНИМАЦИЯ МОНЕТКИ CT vs T) ====================
  const [coinBet, setCoinBet] = useState('50');
  const [coinSide, setCoinSide] = useState<'CT' | 'T'>('CT');
  const [coinFlipping, setCoinFlipping] = useState(false);
  const [coinLanded, setCoinLanded] = useState<'CT' | 'T'>('CT');
  const [coinResult, setCoinResult] = useState<{ text: string; win: boolean } | null>(null);
  const coinFlipAnim = useRef(new Animated.Value(0)).current;

  const flipCoin = () => {
    if (coinFlipping) return;
    const bet = Number(coinBet);
    if (isNaN(bet) || bet <= 0 || bet > balance) {
      Alert.alert('Ошибка', 'Недостаточно баланса для броска монетки.');
      return;
    }
    onChangeBalance(-bet);
    setCoinFlipping(true);
    setCoinResult(null);
    coinFlipAnim.setValue(0);

    const outcome: 'CT' | 'T' = Math.random() < 0.5 ? 'CT' : 'T';

    Animated.timing(coinFlipAnim, {
      toValue: 1,
      duration: 1400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setCoinLanded(outcome);
      setCoinFlipping(false);
      if (outcome === coinSide) {
        const prize = Number((bet * 1.96).toFixed(2));
        onChangeBalance(prize);
        setCoinResult({ text: `ВЫПАЛО ${outcome}! ПОБЕДА +$${prize}`, win: true });
        onRecordGameWin(false);
        playWinSound();
      } else {
        setCoinResult({ text: `ВЫПАЛО ${outcome}! ПРОИГРЫШ -$${bet}`, win: false });
        playLoseSound();
      }
    });
  };

  const coinScaleX = coinFlipAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [1, -1, 1, -1, 1],
  });

  // ==================== 5. BLACKJACK (ГРАФИЧЕСКИЕ КАРТЫ ♠ ♥ ♦ ♣) ====================
  const [bjBet, setBjBet] = useState('40');
  const [playerHand, setPlayerHand] = useState<PlayingCard[]>([]);
  const [dealerHand, setDealerHand] = useState<PlayingCard[]>([]);
  const [bjActive, setBjActive] = useState(false);
  const [bjStatus, setBjStatus] = useState('');

  const drawPlayingCard = (): PlayingCard => {
    const suits: ('♠' | '♥' | '♦' | '♣')[] = ['♠', '♥', '♦', '♣'];
    const ranks = [
      { r: '2', v: 2 },
      { r: '3', v: 3 },
      { r: '4', v: 4 },
      { r: '5', v: 5 },
      { r: '6', v: 6 },
      { r: '7', v: 7 },
      { r: '8', v: 8 },
      { r: '9', v: 9 },
      { r: '10', v: 10 },
      { r: 'J', v: 10 },
      { r: 'Q', v: 10 },
      { r: 'K', v: 10 },
      { r: 'A', v: 11 },
    ];
    const pick = ranks[Math.floor(Math.random() * ranks.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    return { rank: pick.r, suit, value: pick.v };
  };

  const handSum = (hand: PlayingCard[]) => {
    let total = hand.reduce((a, b) => a + b.value, 0);
    let aces = hand.filter((c) => c.value === 11).length;
    while (total > 21 && aces > 0) {
      total -= 10;
      aces--;
    }
    return total;
  };

  const startBlackjack = () => {
    const bet = Number(bjBet);
    if (isNaN(bet) || bet <= 0 || bet > balance) {
      Alert.alert('Ошибка', 'Недостаточно средств на балансе.');
      return;
    }
    onChangeBalance(-bet);
    setPlayerHand([drawPlayingCard(), drawPlayingCard()]);
    setDealerHand([drawPlayingCard()]);
    setBjActive(true);
    setBjStatus('');
    playTickSound();
  };

  const hitBlackjack = () => {
    if (!bjActive) return;
    const next = [...playerHand, drawPlayingCard()];
    setPlayerHand(next);
    playTickSound();
    if (handSum(next) > 21) {
      setBjActive(false);
      setBjStatus('Перебор! Дилер забирает банк.');
      playLoseSound();
    }
  };

  const standBlackjack = () => {
    if (!bjActive) return;
    const d = [...dealerHand];
    while (handSum(d) < 17) {
      d.push(drawPlayingCard());
    }
    setDealerHand(d);
    setBjActive(false);

    const pScore = handSum(playerHand);
    const dScore = handSum(d);
    const bet = Number(bjBet);

    if (dScore > 21 || pScore > dScore) {
      const win = Number((bet * 2).toFixed(2));
      onChangeBalance(win);
      setBjStatus(`Победа! (${pScore} против ${dScore}) +$${win}`);
      onRecordGameWin(false);
      playWinSound();
    } else if (pScore === dScore) {
      onChangeBalance(bet);
      setBjStatus(`Ничья (${pScore}:${dScore}) • Возврат ставки`);
    } else {
      setBjStatus(`Дилер победил (${dScore} против ${pScore})`);
      playLoseSound();
    }
  };

  // ==================== 6. TRADE-UP (5 ВИЗУАЛЬНЫХ СЛОТОВ) ====================
  const [contractIds, setContractIds] = useState<string[]>([]);
  const [contractMessage, setContractMessage] = useState<string | null>(null);

  const toggleContractSkin = (item: InventoryItem) => {
    if (item.rarity === 'gold') {
      Alert.alert('Недоступно', 'Ножи и перчатки нельзя использовать в контракте обмена.');
      return;
    }
    if (contractIds.includes(item.instanceId)) {
      setContractIds(contractIds.filter((id) => id !== item.instanceId));
      return;
    }
    if (contractIds.length >= 5) {
      Alert.alert('Слоты заполнены', 'В контракте уже выбрано 5 предметов.');
      return;
    }
    if (contractIds.length > 0) {
      const firstItem = inventory.find((i) => i.instanceId === contractIds[0]);
      if (firstItem && firstItem.rarity !== item.rarity) {
        Alert.alert('Разная редкость', 'Все 5 скинов в контракте должны быть одной редкости!');
        return;
      }
    }
    setContractIds([...contractIds, item.instanceId]);
  };

  const executeTradeUp = () => {
    if (contractIds.length < 5) {
      Alert.alert('Заполни 5 слотов', 'Выбери 5 скинов одной редкости из инвентаря снизу.');
      return;
    }
    const items = inventory.filter((i) => contractIds.includes(i.instanceId));
    const currentRarity = items[0].rarity;
    const nextRarityIndex = Math.min(
      RARITY_ORDER.indexOf(currentRarity) + 1,
      RARITY_ORDER.length - 1
    );
    const nextRarity = RARITY_ORDER[nextRarityIndex];

    const pool = getAllTemplates().filter((t) => t.rarity === nextRarity && !t.isSticker);
    const chosen = pool[Math.floor(Math.random() * pool.length)] || getAllTemplates()[0];
    const crafted = instantiateSkin(chosen);

    onRemoveInventoryItems(contractIds);
    onAddInventoryItem(crafted);
    setContractIds([]);
    setContractMessage(`КРАФТ УСПЕШЕН: ${crafted.weapon} | ${crafted.name} ($${crafted.price})`);
    onRecordGameWin(false);
    playWinSound();
  };

  // ==================== 7. EXCHANGER ====================
  const allShopSkins = getAllTemplates();

  const buyFromExchanger = (template: SkinTemplate) => {
    if (balance < template.basePrice) {
      Alert.alert('Недостаточно баланса', `Для размена нужно $${template.basePrice.toFixed(2)}`);
      return;
    }
    onChangeBalance(-template.basePrice);
    const created = instantiateSkin(template);
    created.price = Number(template.basePrice.toFixed(2));
    onAddInventoryItem(created);
    playWinSound();
    Alert.alert('Размен выполнен!', `${created.weapon} | ${created.name} добавлен на склад.`);
  };

  const selectedContractItems = contractIds
    .map((id) => inventory.find((i) => i.instanceId === id))
    .filter(Boolean) as InventoryItem[];

  return (
    <View style={styles.container}>
      {/* Sub-navigation bar */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
        {[
          { id: 'crash', label: 'Ракетка', icon: 'rocket-outline' as const },
          { id: 'upgrader', label: 'Апгрейд', icon: 'sync-circle-outline' as const },
          { id: 'mines', label: 'Мины', icon: 'Apps-outline' as const },
          { id: 'tradeup', label: 'Контракт', icon: 'layers-outline' as const },
          { id: 'coinflip', label: 'Монетка', icon: 'disc-outline' as const },
          { id: 'blackjack', label: 'Блэкджек 21', icon: 'albums-outline' as const },
          { id: 'exchanger', label: 'Размен', icon: 'swap-horizontal-outline' as const },
        ].map((t) => {
          const active = activeGame === t.id;
          return (
            <TouchableOpacity
              key={t.id}
              onPress={() => setActiveGame(t.id as MiniGameTab)}
              style={[styles.gameTabBtn, active && styles.gameTabBtnActive]}
            >
              <Text style={[styles.gameTabText, active && styles.gameTabTextActive]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ==================== 1. CRASH WITH SVG TRAJECTORY ==================== */}
      {activeGame === 'crash' && (
        <LiquidGlassCard style={styles.gameCard} glowColor="rgba(56, 189, 248, 0.35)">
          <View style={styles.gameHeaderRow}>
            <Text style={styles.gameTitle}>РАКЕТКА (CRASH)</Text>
            <View style={styles.historyRow}>
              {crashHistory.slice(0, 4).map((h, i) => (
                <View
                  key={i}
                  style={[
                    styles.histPill,
                    { borderColor: h >= 2 ? '#10B981' : '#64748B' },
                  ]}
                >
                  <Text
                    style={[
                      styles.histText,
                      { color: h >= 2 ? '#34D399' : '#94A3B8' },
                    ]}
                  >
                    {h.toFixed(2)}x
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.crashDisplay, crashBusted && styles.crashDisplayBusted]}>
            <Svg width="340" height="155" style={StyleSheet.absoluteFillObject}>
              <Defs>
                <SvgGrad id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <Stop offset="0" stopColor="#38BDF8" stopOpacity="0.3" />
                  <Stop
                    offset="1"
                    stopColor={crashBusted ? '#EF4444' : '#00F5A0'}
                    stopOpacity="1"
                  />
                </SvgGrad>
              </Defs>
              <Path
                d={curvePath}
                stroke="url(#lineGrad)"
                strokeWidth="4"
                fill="none"
              />
              <Circle
                cx={rocketX}
                cy={rocketY}
                r="6"
                fill={crashBusted ? '#EF4444' : '#00F5A0'}
              />
            </Svg>

            <Text style={[styles.crashMultText, crashBusted && { color: '#EF4444' }]}>
              {crashMultiplier.toFixed(2)}x
            </Text>
            <Text style={styles.crashStateText}>
              {crashBusted
                ? '💥 ВЗРЫВ РАКЕТЫ!'
                : cashedOutAt
                ? `✅ ЗАБРАНО НА ${cashedOutAt.toFixed(2)}x`
                : crashRunning
                ? '🚀 НАБИРАЕТ ВЫСОТУ...'
                : 'СДЕЛАЙ СТАВКУ ДЛЯ СТАРТА'}
            </Text>
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Ставка ($):</Text>
            <TextInput
              value={crashBet}
              onChangeText={setCrashBet}
              keyboardType="numeric"
              editable={!crashRunning}
              style={styles.betInput}
            />
          </View>

          {!crashRunning ? (
            <TouchableOpacity style={styles.primaryActionBtn} onPress={startCrash}>
              <Text style={styles.primaryActionText}>ЗАПУСТИТЬ РАКЕТКУ</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.primaryActionBtn, { backgroundColor: '#10B981' }]}
              onPress={cashOutCrash}
            >
              <Text style={styles.primaryActionText}>
                ЗАБРАТЬ ${(Number(crashBet) * crashMultiplier).toFixed(2)}
              </Text>
            </TouchableOpacity>
          )}
        </LiquidGlassCard>
      )}

      {/* ==================== 2. UPGRADER WITH CIRCULAR WHEEL ==================== */}
      {activeGame === 'upgrader' && (
        <LiquidGlassCard style={styles.gameCard} glowColor="rgba(245, 158, 11, 0.35)">
          <Text style={styles.gameTitle}>АПГРЕЙДЕР СКИНОВ</Text>
          <Text style={styles.gameSub}>
            Попади бегунком в зелёную дугу круга, чтобы улучшить скин!
          </Text>

          {/* Circular SVG Wheel */}
          <View style={styles.wheelStage}>
            <Svg width={184} height={184}>
              {/* Background ring */}
              <Circle
                cx={92}
                cy={92}
                r={wheelRadius}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={14}
                fill="none"
              />
              {/* Green winning sector */}
              <Circle
                cx={92}
                cy={92}
                r={wheelRadius}
                stroke="#10B981"
                strokeWidth={14}
                fill="none"
                strokeDasharray={`${wheelCircumference} ${wheelCircumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                rotation="-90"
                origin="92, 92"
              />
            </Svg>

            {/* Center Info */}
            <View style={styles.wheelCenterBox}>
              {selectedUpgradeSkin ? (
                <>
                  <Image
                    source={{ uri: selectedUpgradeSkin.image }}
                    style={{ width: 70, height: 48 }}
                    resizeMode="contain"
                  />
                  <Text style={styles.wheelChanceNum}>{winChance}%</Text>
                  <Text style={styles.wheelSubText}>
                    -> ${(selectedUpgradeSkin.price * upgradeMultiplier).toFixed(2)}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.wheelChanceNum}>{winChance}%</Text>
                  <Text style={styles.wheelSubText}>Выбери скин</Text>
                </>
              )}
            </View>

            {/* Spinning Pointer Needle */}
            <Animated.View
              pointerEvents="none"
              style={[
                styles.wheelNeedleContainer,
                { transform: [{ rotate: pointerRotate }] },
              ]}
            >
              <View style={styles.wheelNeedleTip} />
            </Animated.View>
          </View>

          {/* Multiplier Selector */}
          <View style={styles.multRow}>
            {([1.5, 2, 5, 10] as const).map((m) => (
              <TouchableOpacity
                key={m}
                disabled={isWheelSpinning}
                onPress={() => setUpgradeMultiplier(m)}
                style={[styles.multBtn, upgradeMultiplier === m && styles.multBtnActive]}
              >
                <Text style={styles.multBtnText}>x{m}</Text>
                <Text style={styles.multChanceText}>{chanceMap[m]}%</Text>
              </TouchableOpacity>
            ))}
          </View>

          {upgradeResultMsg && (
            <Text
              style={[
                styles.statusBanner,
                { color: upgradeResultMsg.win ? '#34D399' : '#F87171' },
              ]}
            >
              {upgradeResultMsg.text}
            </Text>
          )}

          <TouchableOpacity
            style={[styles.primaryActionBtn, { backgroundColor: '#F59E0B' }]}
            onPress={runUpgrade}
          >
            <Text style={styles.primaryActionText}>
              {isWheelSpinning
                ? 'КРУТИМ КОЛЕСО...'
                : selectedUpgradeSkin
                ? `КРУТИТЬ АПГРЕЙД (ШАНС ${winChance}%)`
                : 'ВЫБЕРИ СКИН НИЖЕ'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionSubTitle}>Твой склад для апгрейда:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
            {inventory.map((item) => (
              <SkinCard
                key={item.instanceId}
                item={item}
                compact
                selected={selectedUpgradeSkin?.instanceId === item.instanceId}
                onPress={() => setSelectedUpgradeSkin(item)}
              />
            ))}
          </ScrollView>
        </LiquidGlassCard>
      )}

      {/* ==================== 3. MINES ==================== */}
      {activeGame === 'mines' && (
        <LiquidGlassCard style={styles.gameCard} glowColor="rgba(168, 85, 247, 0.35)">
          <Text style={styles.gameTitle}>САПЁР CS2 (МИНЫ 5x5)</Text>
          <Text style={styles.gameSub}>
            Множитель:{' '}
            <Text style={{ color: '#10B981', fontWeight: '900' }}>
              {currentMinesMultiplier()}x
            </Text>
          </Text>

          <View style={styles.minesGrid}>
            {Array.from({ length: 25 }).map((_, idx) => {
              const isRevealed = revealedCells.includes(idx);
              const isBomb = minePositions.includes(idx);
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() => pressMineCell(idx)}
                  style={[
                    styles.mineCell,
                    isRevealed && !isBomb && styles.mineCellSafe,
                    isRevealed && isBomb && styles.mineCellBomb,
                  ]}
                >
                  <Ionicons
                    name={
                      isRevealed
                        ? isBomb
                          ? 'flame'
                          : 'diamond'
                        : minesGameOver && isBomb
                        ? 'flame-outline'
                        : 'help'
                    }
                    size={20}
                    color={
                      isRevealed
                        ? isBomb
                          ? '#FCA5A5'
                          : '#34D399'
                        : '#64748B'
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Ставка ($):</Text>
            <TextInput
              value={minesBet}
              onChangeText={setMinesBet}
              keyboardType="numeric"
              editable={!minesActive}
              style={styles.betInput}
            />
            <View style={styles.bombCountRow}>
              {[3, 5, 10].map((cnt) => (
                <TouchableOpacity
                  key={cnt}
                  disabled={minesActive}
                  onPress={() => setMinesCount(cnt)}
                  style={[styles.bombChip, minesCount === cnt && styles.bombChipActive]}
                >
                  <Text style={styles.bombChipText}>{cnt} бомб</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {!minesActive ? (
            <TouchableOpacity style={styles.primaryActionBtn} onPress={startMines}>
              <Text style={styles.primaryActionText}>НАЧАТЬ ИГРУ В МИНЫ</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.primaryActionBtn, { backgroundColor: '#10B981' }]}
              onPress={cashOutMines}
            >
              <Text style={styles.primaryActionText}>
                ЗАБРАТЬ ${(Number(minesBet) * currentMinesMultiplier()).toFixed(2)}
              </Text>
            </TouchableOpacity>
          )}
        </LiquidGlassCard>
      )}

      {/* ==================== 4. TRADE-UP WITH 5 SLOTS ==================== */}
      {activeGame === 'tradeup' && (
        <LiquidGlassCard style={styles.gameCard} glowColor="rgba(236, 72, 153, 0.35)">
          <Text style={styles.gameTitle}>КОНТРАКТ ОБМЕНА CS2</Text>
          <Text style={styles.gameSub}>
            Положи 5 скинов одной редкости в слоты, чтобы скрафтить предмет редкостью выше!
          </Text>

          {/* 5 Visual Slots */}
          <View style={styles.slotsRow}>
            {[0, 1, 2, 3, 4].map((slotIdx) => {
              const slotItem = selectedContractItems[slotIdx];
              const r = slotItem ? RARITIES[slotItem.rarity] : null;
              return (
                <TouchableOpacity
                  key={slotIdx}
                  onPress={() => slotItem && toggleContractSkin(slotItem)}
                  style={[
                    styles.contractSlot,
                    r && { borderColor: r.color, backgroundColor: 'rgba(255,255,255,0.08)' },
                  ]}
                >
                  {slotItem ? (
                    <Image
                      source={{ uri: slotItem.image }}
                      style={{ width: 48, height: 38 }}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text style={styles.slotNumberText}>#{slotIdx + 1}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {contractMessage && <Text style={styles.statusBanner}>{contractMessage}</Text>}

          <TouchableOpacity
            style={[styles.primaryActionBtn, { backgroundColor: '#EC4899' }]}
            onPress={executeTradeUp}
          >
            <Text style={styles.primaryActionText}>
              ПОДПИСАТЬ КОНТРАКТ ({contractIds.length} / 5)
            </Text>
          </TouchableOpacity>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
            {inventory
              .filter((i) => i.rarity !== 'gold' && !i.isSticker)
              .map((item) => (
                <SkinCard
                  key={item.instanceId}
                  item={item}
                  compact
                  selected={contractIds.includes(item.instanceId)}
                  onPress={() => toggleContractSkin(item)}
                />
              ))}
          </ScrollView>
        </LiquidGlassCard>
      )}

      {/* ==================== 5. COINFLIP WITH 3D COIN ==================== */}
      {activeGame === 'coinflip' && (
        <LiquidGlassCard style={styles.gameCard} glowColor="rgba(250, 204, 21, 0.35)">
          <Text style={styles.gameTitle}>МОНЕТКА CS2 (CT vs T)</Text>
          <Text style={styles.gameSub}>Выбери фракцию и удвой свою ставку (x1.96)</Text>

          <View style={styles.coinArena}>
            <Animated.View
              style={[
                styles.bigCoinCircle,
                {
                  borderColor: coinLanded === 'CT' ? '#38BDF8' : '#F59E0B',
                  backgroundColor:
                    coinLanded === 'CT'
                      ? 'rgba(56, 189, 248, 0.18)'
                      : 'rgba(245, 158, 11, 0.18)',
                  transform: [{ scaleX: coinScaleX }],
                },
              ]}
            >
              <Ionicons
                name={coinLanded === 'CT' ? 'shield-half-outline' : 'flame-outline'}
                size={42}
                color={coinLanded === 'CT' ? '#38BDF8' : '#FBBF24'}
              />
              <Text style={styles.coinBadgeText}>{coinLanded}</Text>
            </Animated.View>
          </View>

          <View style={styles.multRow}>
            <TouchableOpacity
              onPress={() => setCoinSide('CT')}
              style={[styles.multBtn, coinSide === 'CT' && styles.multBtnActive]}
            >
              <Text style={styles.multBtnText}>CT (Спецназ)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCoinSide('T')}
              style={[styles.multBtn, coinSide === 'T' && styles.multBtnActive]}
            >
              <Text style={styles.multBtnText}>T (Террористы)</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Ставка ($):</Text>
            <TextInput
              value={coinBet}
              onChangeText={setCoinBet}
              keyboardType="numeric"
              style={styles.betInput}
            />
          </View>

          {coinResult && (
            <Text
              style={[
                styles.statusBanner,
                { color: coinResult.win ? '#34D399' : '#F87171' },
              ]}
            >
              {coinResult.text}
            </Text>
          )}

          <TouchableOpacity style={styles.primaryActionBtn} onPress={flipCoin}>
            <Text style={styles.primaryActionText}>
              {coinFlipping ? 'МОНЕТА В ВОЗДУХЕ...' : 'БРОСИТЬ МОНЕТУ (x1.96)'}
            </Text>
          </TouchableOpacity>
        </LiquidGlassCard>
      )}

      {/* ==================== 6. BLACKJACK WITH PLAYING CARDS ==================== */}
      {activeGame === 'blackjack' && (
        <LiquidGlassCard style={styles.gameCard} glowColor="rgba(99, 102, 241, 0.35)">
          <Text style={styles.gameTitle}>БЛЭКДЖЕК 21</Text>
          <Text style={styles.gameSub}>Собери 21 очко и обыграй дилера!</Text>

          <View style={styles.bjTable}>
            <Text style={styles.bjLabel}>Дилер ({handSum(dealerHand)} очков):</Text>
            <View style={styles.cardsRow}>
              {dealerHand.map((c, idx) => {
                const isRed = c.suit === '♥' || c.suit === '♦';
                return (
                  <View key={idx} style={styles.playingCard}>
                    <Text style={[styles.cardRank, isRed && { color: '#EF4444' }]}>
                      {c.rank}
                    </Text>
                    <Text style={[styles.cardSuit, isRed && { color: '#EF4444' }]}>
                      {c.suit}
                    </Text>
                  </View>
                );
              })}
            </View>

            <Text style={[styles.bjLabel, { marginTop: 12, color: '#38BDF8' }]}>
              Твоя рука ({handSum(playerHand)} очков):
            </Text>
            <View style={styles.cardsRow}>
              {playerHand.map((c, idx) => {
                const isRed = c.suit === '♥' || c.suit === '♦';
                return (
                  <View key={idx} style={styles.playingCard}>
                    <Text style={[styles.cardRank, isRed && { color: '#EF4444' }]}>
                      {c.rank}
                    </Text>
                    <Text style={[styles.cardSuit, isRed && { color: '#EF4444' }]}>
                      {c.suit}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {bjStatus !== '' && <Text style={styles.statusBanner}>{bjStatus}</Text>}

          {!bjActive ? (
            <>
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Ставка ($):</Text>
                <TextInput
                  value={bjBet}
                  onChangeText={setBjBet}
                  keyboardType="numeric"
                  style={styles.betInput}
                />
              </View>
              <TouchableOpacity style={styles.primaryActionBtn} onPress={startBlackjack}>
                <Text style={styles.primaryActionText}>РАЗДАТЬ КАРТЫ</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.multRow}>
              <TouchableOpacity
                style={[styles.primaryActionBtn, { flex: 1 }]}
                onPress={hitBlackjack}
              >
                <Text style={styles.primaryActionText}>ЕЩЁ КАРТУ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.primaryActionBtn, { flex: 1, backgroundColor: '#10B981' }]}
                onPress={standBlackjack}
              >
                <Text style={styles.primaryActionText}>ХВАТИТ</Text>
              </TouchableOpacity>
            </View>
          )}
        </LiquidGlassCard>
      )}

      {/* ==================== 7. EXCHANGER ==================== */}
      {activeGame === 'exchanger' && (
        <LiquidGlassCard style={styles.gameCard} glowColor="rgba(16, 185, 129, 0.35)">
          <Text style={styles.gameTitle}>МАГАЗИН И РАЗМЕН СКИНОВ</Text>
          <Text style={styles.gameSub}>Мгновенный обмен баланса на любой скин из базы:</Text>

          <View style={styles.shopGrid}>
            {allShopSkins.slice(0, 14).map((skin) => (
              <SkinCard
                key={skin.id}
                item={skin}
                actionLabel={`Купить $${skin.basePrice}`}
                onAction={() => buyFromExchanger(skin)}
              />
            ))}
          </View>
        </LiquidGlassCard>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsScroll: {
    marginBottom: 14,
  },
  gameTabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
    marginRight: 8,
  },
  gameTabBtnActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.18)',
    borderColor: '#38BDF8',
  },
  gameTabText: {
    color: '#64748B',
    fontWeight: '800',
    fontSize: 12,
  },
  gameTabTextActive: {
    color: '#FFFFFF',
  },
  gameCard: {
    padding: 16,
  },
  gameHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  gameTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  gameSub: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 3,
    marginBottom: 12,
  },
  historyRow: {
    flexDirection: 'row',
    gap: 5,
  },
  histPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  histText: {
    fontSize: 10,
    fontWeight: '800',
  },
  crashDisplay: {
    height: 158,
    borderRadius: 18,
    backgroundColor: 'rgba(6, 9, 19, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  crashDisplayBusted: {
    borderColor: '#EF4444',
  },
  crashMultText: {
    color: '#F8FAFC',
    fontSize: 40,
    fontWeight: '900',
  },
  crashStateText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 4,
  },
  wheelStage: {
    height: 196,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 6,
  },
  wheelCenterBox: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelChanceNum: {
    color: '#10B981',
    fontSize: 22,
    fontWeight: '900',
  },
  wheelSubText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
  },
  wheelNeedleContainer: {
    position: 'absolute',
    width: 184,
    height: 184,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wheelNeedleTip: {
    width: 10,
    height: 18,
    borderRadius: 5,
    backgroundColor: '#FFD700',
    marginTop: 2,
    shadowColor: '#FFD700',
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  slotsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  contractSlot: {
    width: '18.2%',
    height: 58,
    borderRadius: 12,
    borderWidth: 1.2,
    borderStyle: 'dashed',
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  slotNumberText: {
    color: '#475569',
    fontWeight: '900',
    fontSize: 12,
  },
  coinArena: {
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  bigCoinCircle: {
    width: 106,
    height: 106,
    borderRadius: 53,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinBadgeText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
    marginTop: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  inputLabel: {
    color: '#CBD5E1',
    fontWeight: '700',
    fontSize: 12,
  },
  betInput: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
    color: '#FFFFFF',
    fontWeight: '800',
    minWidth: 85,
  },
  primaryActionBtn: {
    backgroundColor: '#38BDF8',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  primaryActionText: {
    color: '#04121F',
    fontWeight: '900',
    fontSize: 13,
  },
  minesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  mineCell: {
    width: '18.5%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  mineCellSafe: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: '#10B981',
  },
  mineCellBomb: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
    borderColor: '#EF4444',
  },
  bombCountRow: {
    flexDirection: 'row',
    gap: 6,
  },
  bombChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  bombChipActive: {
    backgroundColor: 'rgba(168, 85, 247, 0.3)',
    borderWidth: 1,
    borderColor: '#A855F7',
  },
  bombChipText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  multRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  multBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  multBtnActive: {
    backgroundColor: 'rgba(245, 158, 11, 0.22)',
    borderColor: '#F59E0B',
  },
  multBtnText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
  },
  multChanceText: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 2,
  },
  statusBanner: {
    color: '#34D399',
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 12,
  },
  sectionSubTitle: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 14,
  },
  shopGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  bjTable: {
    backgroundColor: 'rgba(6, 9, 19, 0.78)',
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  bjLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 6,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    minHeight: 54,
  },
  playingCard: {
    width: 44,
    height: 58,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  cardRank: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 15,
  },
  cardSuit: {
    color: '#0F172A',
    fontSize: 16,
  },
});
