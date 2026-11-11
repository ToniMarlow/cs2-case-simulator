import React, { useEffect, useRef, useState } from 'react';
import {
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
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { InventoryItem, RARITIES, RarityKey, SkinTemplate, ThemeMode } from '../types/cs2';
import { INITIAL_CASES as CS2_CASES, getAllTemplates, instantiateSkin } from '../data/cs2Database';
import { LiquidGlassCard, SkinCard, THEMES } from './LiquidGlassUI';
import { CaseBattleArena } from './CaseBattleArena';
import { playClickSound, playLoseSound, playTickSound, playWinSound } from '../utils/soundManager';

export type MiniGameTab =
  | 'lobby'
  | 'casebattle'
  | 'crash'
  | 'upgrader'
  | 'mines'
  | 'tradeup'
  | 'coinflip'
  | 'blackjack'
  | 'clicker'
  | 'exchanger';

interface MiniGamesHubProps {
  balance: number;
  inventory: InventoryItem[];
  themeMode?: ThemeMode;
  defaultFastSpin?: boolean;
  initialGame?: MiniGameTab;
  onChangeBalance: (delta: number) => void;
  onAddInventoryItem: (item: InventoryItem) => void;
  onAddMultipleItems?: (items: InventoryItem[]) => void;
  onRemoveInventoryItems: (ids: string[]) => void;
  onRecordGameWin: (isUpgrade?: boolean) => void;
  onRecordBattlePlayed?: (won: boolean) => void;
  onNotify?: (
    title: string,
    message: string,
    type?: 'error' | 'warning' | 'success' | 'info' | 'reward'
  ) => void;
}

const RARITY_ORDER: RarityKey[] = ['milspec', 'restricted', 'classified', 'covert', 'gold'];

interface PlayingCard {
  rank: string;
  suit: '♠' | '♥' | '♦' | '♣';
  value: number;
}

interface GameLobbyCardInfo {
  id: Exclude<MiniGameTab, 'lobby'>;
  title: string;
  subtitle: string;
  badge: string;
  colors: [string, string];
  accent: string;
  icon: keyof typeof Ionicons.glyphMap;
  previewImg: string;
}

const GAME_CARDS: GameLobbyCardInfo[] = [
  {
    id: 'casebattle',
    title: 'Битва Кейсов',
    subtitle: 'Дуэли с ботами: Клатч, Терминал, Реверс и Общий банк',
    badge: '🔥 ХИТ ОБНОВЛЕНИЯ',
    colors: ['#7C2D12', '#EA580C'],
    accent: '#F97316',
    icon: 'trophy',
    previewImg: CS2_CASES[0]?.image || '',
  },
  {
    id: 'crash',
    title: 'Ракетка (Crash X)',
    subtitle: 'Успей забрать ставку до взрыва графика (до x50)',
    badge: '🚀 ИКСЫ ДО x50',
    colors: ['#0C4A6E', '#0284C7'],
    accent: '#38BDF8',
    icon: 'rocket',
    previewImg: CS2_CASES[1]?.items[0]?.image || '',
  },
  {
    id: 'upgrader',
    title: 'Апгрейдер Скинов',
    subtitle: 'Прокрути колесо шанса и преврати дешёвый скин в нож',
    badge: '⚡ КРАФТ x1.5 — x10',
    colors: ['#78350F', '#D97706'],
    accent: '#FBBF24',
    icon: 'sync-circle',
    previewImg: CS2_CASES[0]?.items[CS2_CASES[0].items.length - 1]?.image || '',
  },
  {
    id: 'mines',
    title: 'Сапёр CS2 (Мины 5x5)',
    subtitle: 'Открывай ячейки с кристаллами и обходи бомбы C4',
    badge: '💣 РИСК И КУШ',
    colors: ['#4C1D95', '#7C3AED'],
    accent: '#A855F7',
    icon: 'grid',
    previewImg: CS2_CASES[2]?.image || '',
  },
  {
    id: 'tradeup',
    title: 'Контракт Обмена',
    subtitle: 'Обменяй 5 скинов одной редкости на скин рангом выше',
    badge: '📜 5 В 1 КРАФТ',
    colors: ['#831843', '#DB2777'],
    accent: '#F472B6',
    icon: 'layers',
    previewImg: CS2_CASES[3]?.items[2]?.image || '',
  },
  {
    id: 'coinflip',
    title: 'Монетка (CT vs T)',
    subtitle: 'Выбери сторону Спецназа или Террористов и удвой баланс',
    badge: '🪙 ШАНС 50/50',
    colors: ['#1E3A8A', '#2563EB'],
    accent: '#60A5FA',
    icon: 'disc',
    previewImg: CS2_CASES[4]?.image || '',
  },
  {
    id: 'blackjack',
    title: 'Блэкджек 21',
    subtitle: 'Классическая карточная дуэль против дилера казино CS2',
    badge: '🃏 КАРТЫ 21',
    colors: ['#064E3B', '#059669'],
    accent: '#34D399',
    icon: 'albums',
    previewImg: CS2_CASES[5]?.image || '',
  },
  {
    id: 'clicker',
    title: 'Цех Сборки Кейсов',
    subtitle: 'Подработка при банкротстве (+$0.50 за клик) + Размен скинов',
    badge: '🛠️ АНТИ-БАНКРОТ',
    colors: ['#1E293B', '#334155'],
    accent: '#38BDF8',
    icon: 'hammer',
    previewImg: CS2_CASES[6]?.image || '',
  },
];

export const MiniGamesHub: React.FC<MiniGamesHubProps> = ({
  balance,
  inventory,
  themeMode = 'bright',
  defaultFastSpin = false,
  initialGame = 'lobby',
  onChangeBalance,
  onAddInventoryItem,
  onAddMultipleItems,
  onRemoveInventoryItems,
  onRecordGameWin,
  onRecordBattlePlayed,
  onNotify,
}) => {
  const [activeGame, setActiveGame] = useState<MiniGameTab>(initialGame);
  const theme = THEMES[themeMode] || THEMES.bright;

  useEffect(() => {
    if (initialGame && initialGame !== 'lobby') {
      setActiveGame(initialGame);
    }
  }, [initialGame]);

  const notify = (
    title: string,
    message: string,
    type: 'error' | 'warning' | 'success' | 'info' | 'reward' = 'info'
  ) => {
    if (onNotify) {
      onNotify(title, message, type);
    }
  };

  // ==================== 1. CRASH (РАКЕТКА С ГРАФИКОМ) ====================
  const [crashBet, setCrashBet] = useState('10');
  const [crashRunning, setCrashRunning] = useState(false);
  const [crashMultiplier, setCrashMultiplier] = useState(1.0);
  const [crashBusted, setCrashBusted] = useState(false);
  const [cashedOutAt, setCashedOutAt] = useState<number | null>(null);
  const [crashHistory, setCrashHistory] = useState<number[]>([1.42, 2.85, 1.08, 4.92, 1.24]);
  const crashTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const crashTargetRef = useRef<number>(1.0);

  useEffect(() => {
    return () => {
      if (crashTimerRef.current) clearInterval(crashTimerRef.current);
    };
  }, []);

  const startCrash = () => {
    const bet = Number(crashBet);
    if (isNaN(bet) || bet <= 0) {
      notify('Некорректная ставка', 'Введите положительную сумму ставки в долларах.', 'warning');
      return;
    }
    if (bet > balance) {
      notify(
        'Недостаточно средств на балансе',
        `Для запуска Ракетки нужно $${bet.toFixed(2)}, а у вас $${balance.toFixed(2)}.`,
        'error'
      );
      return;
    }
    onChangeBalance(-bet);
    setCrashRunning(true);
    setCrashBusted(false);
    setCashedOutAt(null);
    setCrashMultiplier(1.0);

    // Tougher house edge so players can lose money if greedy
    const r = Math.random();
    const crashPoint =
      r < 0.14 ? 1.01 : Number(Math.max(1.03, 0.91 / (1 - r)).toFixed(2));
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
    notify('Выигрыш в Ракетке!', `Вы забрали $${winAmount.toFixed(2)} на коэффициенте ${lockedMult.toFixed(2)}x!`, 'reward');
  };

  const crashProgress = Math.min(1, Math.log10(Math.max(1, crashMultiplier)) / 1.3);
  const rocketX = 24 + crashProgress * 290;
  const rocketY = 140 - Math.pow(crashProgress, 1.35) * 108;
  const curvePath = `M 24 140 Q ${24 + crashProgress * 160} 140 ${rocketX} ${rocketY}`;

  // ==================== 2. UPGRADER (КРУГОВОЕ КОЛЕСО) ====================
  const [selectedUpgradeSkin, setSelectedUpgradeSkin] = useState<InventoryItem | null>(null);
  const [upgradeMultiplier, setUpgradeMultiplier] = useState<1.5 | 2 | 5 | 10>(2);
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);
  const [upgradeResultMsg, setUpgradeResultMsg] = useState<{ text: string; win: boolean } | null>(
    null
  );
  const wheelAngleAnim = useRef(new Animated.Value(0)).current;
  const currentRotationRef = useRef(0);

  const chanceMap: Record<1.5 | 2 | 5 | 10, number> = {
    1.5: 58,
    2: 43,
    5: 17,
    10: 8,
  };
  const winChance = chanceMap[upgradeMultiplier];

  const runUpgrade = () => {
    if (isWheelSpinning) return;
    if (!selectedUpgradeSkin) {
      notify('Скин не выбран', 'Выберите предмет со своего склада внизу для апгрейда.', 'warning');
      return;
    }

    setIsWheelSpinning(true);
    setUpgradeResultMsg(null);

    const skinUsed = selectedUpgradeSkin;
    const roll = Math.random() * 100;
    const isWin = roll <= winChance;

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
      duration: defaultFastSpin ? 1800 : 3600,
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
        notify(
          'Апгрейд успешен!',
          `Вы улучшили скин до ${upgraded.weapon} | ${upgraded.name} ($${upgraded.price.toFixed(2)})`,
          'reward'
        );
      } else {
        setSelectedUpgradeSkin(null);
        setUpgradeResultMsg({
          text: 'НЕУДАЧА! Скин сгорел при попытке улучшения.',
          win: false,
        });
        playLoseSound();
        notify('Апгрейд не удался', 'Бегунок остановился мимо зелёного сектора. Скин утерян.', 'warning');
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
  const [minesBet, setMinesBet] = useState('10');
  const [minesCount, setMinesCount] = useState(4);
  const [minesActive, setMinesActive] = useState(false);
  const [minePositions, setMinePositions] = useState<number[]>([]);
  const [revealedCells, setRevealedCells] = useState<number[]>([]);
  const [minesGameOver, setMinesGameOver] = useState(false);

  const startMines = () => {
    const bet = Number(minesBet);
    if (isNaN(bet) || bet <= 0 || bet > balance) {
      notify(
        'Недостаточно средств',
        `Для старта игры в Мины нужно $${bet > 0 ? bet.toFixed(2) : '1.00'}, ваш баланс: $${balance.toFixed(2)}.`,
        'error'
      );
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
    return Number((mult * 0.94).toFixed(2));
  };

  const pressMineCell = (idx: number) => {
    if (!minesActive || revealedCells.includes(idx) || minesGameOver) return;
    if (minePositions.includes(idx)) {
      setRevealedCells([...revealedCells, idx]);
      setMinesGameOver(true);
      setMinesActive(false);
      playLoseSound();
      notify('Взрыв на мине!', 'Вы наткнулись на бомбу C4 и потеряли ставку.', 'error');
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
    notify('Куш в Минах забран!', `На ваш баланс зачислено +$${win.toFixed(2)}`, 'reward');
  };

  // ==================== 4. COINFLIP (CT vs T) ====================
  const [coinBet, setCoinBet] = useState('15');
  const [coinSide, setCoinSide] = useState<'CT' | 'T'>('CT');
  const [coinFlipping, setCoinFlipping] = useState(false);
  const [coinLanded, setCoinLanded] = useState<'CT' | 'T'>('CT');
  const [coinResult, setCoinResult] = useState<{ text: string; win: boolean } | null>(null);
  const coinFlipAnim = useRef(new Animated.Value(0)).current;

  const flipCoin = () => {
    if (coinFlipping) return;
    const bet = Number(coinBet);
    if (isNaN(bet) || bet <= 0 || bet > balance) {
      notify(
        'Недостаточно средств',
        `Для броска монетки требуется $${bet > 0 ? bet.toFixed(2) : '1.00'}.`,
        'error'
      );
      return;
    }
    onChangeBalance(-bet);
    setCoinFlipping(true);
    setCoinResult(null);
    coinFlipAnim.setValue(0);

    const outcome: 'CT' | 'T' = Math.random() < 0.48 ? coinSide : coinSide === 'CT' ? 'T' : 'CT';

    Animated.timing(coinFlipAnim, {
      toValue: 1,
      duration: defaultFastSpin ? 750 : 1400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setCoinLanded(outcome);
      setCoinFlipping(false);
      if (outcome === coinSide) {
        const prize = Number((bet * 1.94).toFixed(2));
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

  // ==================== 5. BLACKJACK 21 ====================
  const [bjBet, setBjBet] = useState('15');
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
      notify('Недостаточно средств', 'Пополните баланс в Цехе Сборки или продайте скины.', 'error');
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
      setBjStatus('Перебор (>21)! Дилер забирает банк.');
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

  // ==================== 6. TRADE-UP CONTRACT ====================
  const [contractIds, setContractIds] = useState<string[]>([]);
  const [contractMessage, setContractMessage] = useState<string | null>(null);

  const toggleContractSkin = (item: InventoryItem) => {
    if (item.rarity === 'gold') {
      notify('Недоступно для Контракта', 'Ножи и перчатки нельзя использовать в контракте обмена.', 'warning');
      return;
    }
    if (contractIds.includes(item.instanceId)) {
      setContractIds(contractIds.filter((id) => id !== item.instanceId));
      return;
    }
    if (contractIds.length >= 5) {
      notify('Слоты заполнены', 'В контракте уже выбрано 5 предметов.', 'info');
      return;
    }
    if (contractIds.length > 0) {
      const firstItem = inventory.find((i) => i.instanceId === contractIds[0]);
      if (firstItem && firstItem.rarity !== item.rarity) {
        notify('Разная редкость', 'Все 5 скинов в контракте должны быть одной редкости!', 'warning');
        return;
      }
    }
    setContractIds([...contractIds, item.instanceId]);
  };

  const executeTradeUp = () => {
    if (contractIds.length < 5) {
      notify('Заполните 5 слотов', 'Выберите 5 скинов одной редкости со склада снизу.', 'warning');
      return;
    }
    const items = inventory.filter((i) => contractIds.includes(i.instanceId));
    const currentRarity = items[0].rarity;
    const totalInputVal = items.reduce((s, i) => s + i.price, 0);
    const nextRarityIndex = Math.min(
      RARITY_ORDER.indexOf(currentRarity) + 1,
      RARITY_ORDER.length - 1
    );
    const nextRarity = RARITY_ORDER[nextRarityIndex];

    const pool = getAllTemplates().filter((t) => t.rarity === nextRarity && !t.isSticker);
    const chosen = pool[Math.floor(Math.random() * pool.length)] || getAllTemplates()[0];
    const crafted = instantiateSkin(chosen);
    // Realistic trade-up value (0.65x to 1.45x of input value)
    crafted.price = Number((totalInputVal * (0.65 + Math.random() * 0.8)).toFixed(2));

    onRemoveInventoryItems(contractIds);
    onAddInventoryItem(crafted);
    setContractIds([]);
    setContractMessage(`КРАФТ УСПЕШЕН: ${crafted.weapon} | ${crafted.name} ($${crafted.price})`);
    onRecordGameWin(false);
    playWinSound();
    notify('Контракт подписан!', `Получен ${crafted.weapon} | ${crafted.name} ($${crafted.price.toFixed(2)})`, 'reward');
  };

  // ==================== 7. BANKRUPTCY CLICKER & EXCHANGER ====================
  const [clickCount, setClickCount] = useState(0);
  const allShopSkins = getAllTemplates();

  const handleWorkClick = () => {
    playClickSound();
    setClickCount((c) => c + 1);
    onChangeBalance(0.5);
  };

  const buyFromExchanger = (template: SkinTemplate) => {
    if (balance < template.basePrice) {
      notify(
        'Недостаточно средств',
        `Для покупки ${template.weapon} | ${template.name} нужно $${template.basePrice.toFixed(2)}`,
        'error'
      );
      return;
    }
    onChangeBalance(-template.basePrice);
    const created = instantiateSkin(template);
    created.price = Number(template.basePrice.toFixed(2));
    onAddInventoryItem(created);
    playWinSound();
    notify('Покупка выполнена!', `${created.weapon} | ${created.name} добавлен на ваш склад.`, 'success');
  };

  const selectedContractItems = contractIds
    .map((id) => inventory.find((i) => i.instanceId === id))
    .filter(Boolean) as InventoryItem[];

  // ==================== LOBBY VIEW (БЛОКИ ИГР С КАРТИНКАМИ И НАЗВАНИЯМИ) ====================
  if (activeGame === 'lobby') {
    return (
      <View style={styles.container}>
        <LiquidGlassCard themeMode={themeMode} style={styles.lobbyHeroBanner}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.lobbyTag, { color: theme.accent }]}>
              🎮 ИГРОВОЙ ЗАЛ CS2 • ВЫБЕРИТЕ РЕЖИМ
            </Text>
            <Text style={[styles.lobbyHeroTitle, { color: theme.textPrimary }]}>
              МИНИ-ИГРЫ И БИТВА КЕЙСОВ
            </Text>
            <Text style={[styles.lobbyHeroSub, { color: theme.textSecondary }]}>
              Нажмите на любую карточку игры ниже, чтобы войти и испытать удачу!
            </Text>
          </View>
        </LiquidGlassCard>

        <View style={styles.lobbyGrid}>
          {GAME_CARDS.map((card) => (
            <TouchableOpacity
              key={card.id}
              activeOpacity={0.88}
              onPress={() => {
                playClickSound();
                setActiveGame(card.id);
              }}
              style={[
                styles.gameBlockCard,
                { borderColor: `${card.accent}66` },
              ]}
            >
              <LinearGradient
                colors={card.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />

              {/* Top Badge */}
              <View style={styles.blockTopRow}>
                <View style={styles.blockBadgePill}>
                  <Text style={styles.blockBadgeText}>{card.badge}</Text>
                </View>
                <Ionicons name={card.icon} size={18} color="#FFFFFF" />
              </View>

              {/* Game Artwork Preview */}
              <View style={styles.blockArtworkWrap}>
                {card.previewImg ? (
                  <Image
                    source={{ uri: card.previewImg }}
                    style={styles.blockArtworkImg}
                    resizeMode="contain"
                  />
                ) : (
                  <Ionicons name={card.icon} size={48} color="#FFFFFF" />
                )}
              </View>

              {/* Title & Description */}
              <View>
                <Text style={styles.blockTitle}>{card.title}</Text>
                <Text numberOfLines={2} style={styles.blockSubtitle}>
                  {card.subtitle}
                </Text>
                <View style={styles.blockPlayBtn}>
                  <Text style={styles.blockPlayBtnText}>ИГРАТЬ →</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  // ==================== CASE BATTLE ARENA ====================
  if (activeGame === 'casebattle') {
    return (
      <CaseBattleArena
        balance={balance}
        themeMode={themeMode}
        defaultFastSpin={defaultFastSpin}
        onUpdateBalance={onChangeBalance}
        onAddItems={(items) => {
          if (onAddMultipleItems) {
            onAddMultipleItems(items);
          } else {
            items.forEach((i) => onAddInventoryItem(i));
          }
        }}
        onNotify={notify}
        onBattlePlayed={onRecordBattlePlayed}
        onBack={() => setActiveGame('lobby')}
      />
    );
  }

  // ==================== INDIVIDUAL GAME VIEWS ====================
  return (
    <View style={styles.container}>
      {/* Back to Game Hall Header */}
      <View style={styles.insideGameTopBar}>
        <TouchableOpacity
          style={styles.backToLobbyBtn}
          onPress={() => {
            playClickSound();
            setActiveGame('lobby');
          }}
        >
          <Ionicons name="arrow-back" size={18} color="#0284C7" />
          <Text style={styles.backToLobbyText}>← Назад в Игровой Зал</Text>
        </TouchableOpacity>
      </View>

      {/* ==================== 1. CRASH ==================== */}
      {activeGame === 'crash' && (
        <LiquidGlassCard
          themeMode={themeMode}
          style={styles.gameCard}
          glowColor="rgba(56, 189, 248, 0.45)"
        >
          <View style={styles.gameHeaderRow}>
            <Text style={[styles.gameTitle, { color: theme.textPrimary }]}>
              🚀 РАКЕТКА (CRASH X)
            </Text>
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
                ? '💥 ВЗРЫВ РАКЕТЫ! СТАВКА СГОРЕЛА'
                : cashedOutAt
                ? `✅ ЗАБРАНО НА ${cashedOutAt.toFixed(2)}x`
                : crashRunning
                ? '🚀 НАБИРАЕТ ВЫСОТУ...'
                : 'СДЕЛАЙТЕ СТАВКУ ДЛЯ СТАРТА'}
            </Text>
          </View>

          <View style={styles.inputRow}>
            <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Ставка ($):</Text>
            <TextInput
              value={crashBet}
              onChangeText={setCrashBet}
              keyboardType="numeric"
              editable={!crashRunning}
              style={[styles.betInput, { color: theme.textPrimary }]}
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

      {/* ==================== 2. UPGRADER ==================== */}
      {activeGame === 'upgrader' && (
        <LiquidGlassCard
          themeMode={themeMode}
          style={styles.gameCard}
          glowColor="rgba(245, 158, 11, 0.45)"
        >
          <Text style={[styles.gameTitle, { color: theme.textPrimary }]}>
            ⚡ АПГРЕЙДЕР СКИНОВ
          </Text>
          <Text style={[styles.gameSub, { color: theme.textSecondary }]}>
            Попадите стрелкой в зелёную дугу круга, чтобы улучшить выбранный скин!
          </Text>

          <View style={styles.wheelStage}>
            <Svg width={184} height={184}>
              <Circle
                cx={92}
                cy={92}
                r={wheelRadius}
                stroke="rgba(148,163,184,0.22)"
                strokeWidth={14}
                fill="none"
              />
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

            <View style={styles.wheelCenterBox}>
              {selectedUpgradeSkin ? (
                <>
                  <Image
                    source={{ uri: selectedUpgradeSkin.image }}
                    style={{ width: 70, height: 48 }}
                    resizeMode="contain"
                  />
                  <Text style={styles.wheelChanceNum}>{winChance}%</Text>
                  <Text style={[styles.wheelSubText, { color: theme.textSecondary }]}>
                    → ${(selectedUpgradeSkin.price * upgradeMultiplier).toFixed(2)}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.wheelChanceNum}>{winChance}%</Text>
                  <Text style={[styles.wheelSubText, { color: theme.textSecondary }]}>
                    Выберите скин
                  </Text>
                </>
              )}
            </View>

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

          <View style={styles.multRow}>
            {([1.5, 2, 5, 10] as const).map((m) => (
              <TouchableOpacity
                key={m}
                disabled={isWheelSpinning}
                onPress={() => setUpgradeMultiplier(m)}
                style={[styles.multBtn, upgradeMultiplier === m && styles.multBtnActive]}
              >
                <Text style={[styles.multBtnText, { color: theme.textPrimary }]}>x{m}</Text>
                <Text style={styles.multChanceText}>{chanceMap[m]}%</Text>
              </TouchableOpacity>
            ))}
          </View>

          {upgradeResultMsg && (
            <Text
              style={[
                styles.statusBanner,
                { color: upgradeResultMsg.win ? '#10B981' : '#EF4444' },
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
                : 'ВЫБЕРИТЕ СКИН СО СКЛАДА НИЖЕ'}
            </Text>
          </TouchableOpacity>

          <Text style={[styles.sectionSubTitle, { color: theme.textSecondary }]}>
            Ваш склад для апгрейда ({inventory.length}):
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
            {inventory.map((item) => (
              <SkinCard
                key={item.instanceId}
                item={item}
                compact
                themeMode={themeMode}
                selected={selectedUpgradeSkin?.instanceId === item.instanceId}
                onPress={() => setSelectedUpgradeSkin(item)}
              />
            ))}
          </ScrollView>
        </LiquidGlassCard>
      )}

      {/* ==================== 3. MINES ==================== */}
      {activeGame === 'mines' && (
        <LiquidGlassCard
          themeMode={themeMode}
          style={styles.gameCard}
          glowColor="rgba(168, 85, 247, 0.45)"
        >
          <Text style={[styles.gameTitle, { color: theme.textPrimary }]}>
            💣 САПЁР CS2 (МИНЫ 5x5)
          </Text>
          <Text style={[styles.gameSub, { color: theme.textSecondary }]}>
            Текущий множитель:{' '}
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
                          ? '#EF4444'
                          : '#10B981'
                        : '#64748B'
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.inputRow}>
            <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Ставка ($):</Text>
            <TextInput
              value={minesBet}
              onChangeText={setMinesBet}
              keyboardType="numeric"
              editable={!minesActive}
              style={[styles.betInput, { color: theme.textPrimary }]}
            />
            <View style={styles.bombCountRow}>
              {[3, 5, 10, 15].map((cnt) => (
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

      {/* ==================== 4. TRADE-UP ==================== */}
      {activeGame === 'tradeup' && (
        <LiquidGlassCard
          themeMode={themeMode}
          style={styles.gameCard}
          glowColor="rgba(236, 72, 153, 0.45)"
        >
          <Text style={[styles.gameTitle, { color: theme.textPrimary }]}>
            📜 КОНТРАКТ ОБМЕНА CS2
          </Text>
          <Text style={[styles.gameSub, { color: theme.textSecondary }]}>
            Положите 5 скинов одной редкости в слоты, чтобы получить предмет редкостью выше!
          </Text>

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
                    r && { borderColor: r.color, backgroundColor: 'rgba(56,189,248,0.08)' },
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
            <Text style={[styles.primaryActionText, { color: '#FFFFFF' }]}>
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
                  themeMode={themeMode}
                  selected={contractIds.includes(item.instanceId)}
                  onPress={() => toggleContractSkin(item)}
                />
              ))}
          </ScrollView>
        </LiquidGlassCard>
      )}

      {/* ==================== 5. COINFLIP ==================== */}
      {activeGame === 'coinflip' && (
        <LiquidGlassCard
          themeMode={themeMode}
          style={styles.gameCard}
          glowColor="rgba(250, 204, 21, 0.45)"
        >
          <Text style={[styles.gameTitle, { color: theme.textPrimary }]}>
            🪙 МОНЕТКА CS2 (CT vs T)
          </Text>
          <Text style={[styles.gameSub, { color: theme.textSecondary }]}>
            Выберите фракцию и удвойте свою ставку (x1.94)
          </Text>

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
                color={coinLanded === 'CT' ? '#0284C7' : '#D97706'}
              />
              <Text style={[styles.coinBadgeText, { color: theme.textPrimary }]}>
                {coinLanded}
              </Text>
            </Animated.View>
          </View>

          <View style={styles.multRow}>
            <TouchableOpacity
              onPress={() => setCoinSide('CT')}
              style={[styles.multBtn, coinSide === 'CT' && styles.multBtnActive]}
            >
              <Text style={[styles.multBtnText, { color: theme.textPrimary }]}>CT (Спецназ)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCoinSide('T')}
              style={[styles.multBtn, coinSide === 'T' && styles.multBtnActive]}
            >
              <Text style={[styles.multBtnText, { color: theme.textPrimary }]}>T (Террористы)</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputRow}>
            <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Ставка ($):</Text>
            <TextInput
              value={coinBet}
              onChangeText={setCoinBet}
              keyboardType="numeric"
              style={[styles.betInput, { color: theme.textPrimary }]}
            />
          </View>

          {coinResult && (
            <Text
              style={[
                styles.statusBanner,
                { color: coinResult.win ? '#10B981' : '#EF4444' },
              ]}
            >
              {coinResult.text}
            </Text>
          )}

          <TouchableOpacity style={styles.primaryActionBtn} onPress={flipCoin}>
            <Text style={styles.primaryActionText}>
              {coinFlipping ? 'МОНЕТА В ВОЗДУХЕ...' : 'БРОСИТЬ МОНЕТУ (x1.94)'}
            </Text>
          </TouchableOpacity>
        </LiquidGlassCard>
      )}

      {/* ==================== 6. BLACKJACK 21 ==================== */}
      {activeGame === 'blackjack' && (
        <LiquidGlassCard
          themeMode={themeMode}
          style={styles.gameCard}
          glowColor="rgba(16, 185, 129, 0.45)"
        >
          <Text style={[styles.gameTitle, { color: theme.textPrimary }]}>🃏 БЛЭКДЖЕК 21</Text>
          <Text style={[styles.gameSub, { color: theme.textSecondary }]}>
            Наберите 21 очко и обыграйте дилера!
          </Text>

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
              Ваша рука ({handSum(playerHand)} очков):
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
                <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Ставка ($):</Text>
                <TextInput
                  value={bjBet}
                  onChangeText={setBjBet}
                  keyboardType="numeric"
                  style={[styles.betInput, { color: theme.textPrimary }]}
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

      {/* ==================== 7. CLICKER & EXCHANGER ==================== */}
      {(activeGame === 'clicker' || activeGame === 'exchanger') && (
        <LiquidGlassCard
          themeMode={themeMode}
          style={styles.gameCard}
          glowColor="rgba(56, 189, 248, 0.45)"
        >
          <Text style={[styles.gameTitle, { color: theme.textPrimary }]}>
            🛠️ ЦЕХ СБОРКИ КЕЙСОВ (АНТИ-БАНКРОТ)
          </Text>
          <Text style={[styles.gameSub, { color: theme.textSecondary }]}>
            Проиграли весь баланс в лудке? Собирайте оружейные ящики вручную (+$0.50 за нажатие), чтобы вернуться в игру!
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleWorkClick}
            style={styles.clickerBigBtn}
          >
            <LinearGradient
              colors={['#0284C7', '#0369A1']}
              style={StyleSheet.absoluteFillObject}
            />
            <MaterialCommunityIcons name="treasure-chest" size={42} color="#FACC15" />
            <Text style={styles.clickerBtnTitle}>СОБРАТЬ ОРУЖЕЙНЫЙ ЯЩИК (+$0.50)</Text>
            <Text style={styles.clickerBtnSub}>
              Собрано ящиков за смену: {clickCount} (+${(clickCount * 0.5).toFixed(2)})
            </Text>
          </TouchableOpacity>

          <Text style={[styles.gameTitle, { color: theme.textPrimary, marginTop: 18 }]}>
            🛒 МАГАЗИН ПРЯМОГО РАЗМЕНА СКИНОВ
          </Text>
          <Text style={[styles.gameSub, { color: theme.textSecondary }]}>
            Обменяйте баланс напрямую на любой скин из оружейной базы:
          </Text>

          <View style={styles.shopGrid}>
            {allShopSkins.slice(0, 16).map((skin) => (
              <SkinCard
                key={skin.id}
                item={skin}
                themeMode={themeMode}
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
    paddingBottom: 20,
  },
  lobbyHeroBanner: {
    padding: 16,
    marginBottom: 14,
  },
  lobbyTag: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  lobbyHeroTitle: {
    fontSize: 19,
    fontWeight: '900',
    marginTop: 2,
  },
  lobbyHeroSub: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  lobbyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gameBlockCard: {
    width: '48.4%',
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 13,
    marginBottom: 12,
    overflow: 'hidden',
    justifyContent: 'space-between',
    minHeight: 205,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  blockTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blockBadgePill: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  blockBadgeText: {
    color: '#FDE047',
    fontSize: 8,
    fontWeight: '900',
  },
  blockArtworkWrap: {
    height: 76,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  blockArtworkImg: {
    width: 112,
    height: 74,
  },
  blockTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  blockSubtitle: {
    color: 'rgba(255,255,255,0.84)',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 3,
    lineHeight: 13,
  },
  blockPlayBtn: {
    marginTop: 8,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 10,
    paddingVertical: 6,
    alignItems: 'center',
  },
  blockPlayBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  insideGameTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backToLobbyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(56, 189, 248, 0.16)',
    borderWidth: 1.2,
    borderColor: '#38BDF8',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
  },
  backToLobbyText: {
    color: '#0284C7',
    fontWeight: '900',
    fontSize: 12,
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
    fontSize: 16,
    fontWeight: '900',
  },
  gameSub: {
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
    backgroundColor: 'rgba(15,23,42,0.8)',
  },
  histText: {
    fontSize: 10,
    fontWeight: '800',
  },
  crashDisplay: {
    height: 158,
    borderRadius: 18,
    backgroundColor: 'rgba(10, 18, 36, 0.92)',
    borderWidth: 1.2,
    borderColor: 'rgba(56, 189, 248, 0.35)',
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
    color: '#CBD5E1',
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
    backgroundColor: '#F59E0B',
    marginTop: 2,
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
    borderWidth: 1.4,
    borderStyle: 'dashed',
    borderColor: 'rgba(148,163,184,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(148,163,184,0.08)',
  },
  slotNumberText: {
    color: '#64748B',
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
    fontWeight: '800',
    fontSize: 12,
  },
  betInput: {
    backgroundColor: 'rgba(148,163,184,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(56,189,248,0.4)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
    fontWeight: '800',
    minWidth: 85,
  },
  primaryActionBtn: {
    backgroundColor: '#0284C7',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  primaryActionText: {
    color: '#FFFFFF',
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
    backgroundColor: 'rgba(15, 23, 42, 0.12)',
    borderWidth: 1.2,
    borderColor: 'rgba(148, 163, 184, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  mineCellSafe: {
    backgroundColor: 'rgba(16, 185, 129, 0.22)',
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
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
  },
  bombChipActive: {
    backgroundColor: '#7C3AED',
    borderWidth: 1,
    borderColor: '#C4B5FD',
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
    backgroundColor: 'rgba(148, 163, 184, 0.14)',
    borderWidth: 1.2,
    borderColor: 'rgba(148, 163, 184, 0.3)',
    alignItems: 'center',
  },
  multBtnActive: {
    backgroundColor: 'rgba(245, 158, 11, 0.24)',
    borderColor: '#F59E0B',
  },
  multBtnText: {
    fontWeight: '900',
    fontSize: 14,
  },
  multChanceText: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  statusBanner: {
    color: '#10B981',
    fontWeight: '900',
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 12,
  },
  sectionSubTitle: {
    fontSize: 11,
    fontWeight: '800',
    marginTop: 14,
  },
  shopGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  bjTable: {
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(56,189,248,0.25)',
  },
  bjLabel: {
    color: '#CBD5E1',
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
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
  clickerBigBtn: {
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#38BDF8',
  },
  clickerBtnTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    marginTop: 8,
  },
  clickerBtnSub: {
    color: '#E0F2FE',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
  },
});
