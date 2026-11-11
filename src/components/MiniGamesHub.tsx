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
import Svg, { Circle, Path } from 'react-native-svg';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { InventoryItem, RARITIES, RarityKey, SkinTemplate, ThemeMode } from '../types/cs2';
import { INITIAL_CASES as CS2_CASES, getAllTemplates, instantiateSkin } from '../data/cs2Database';
import { SkinCard, THEMES } from './LiquidGlassUI';
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
  id: Exclude<MiniGameTab, 'lobby' | 'exchanger'>;
  title: string;
  subtitle: string;
  tag: string;
  icon: keyof typeof Ionicons.glyphMap;
  previewImg: string;
}

const GAME_CARDS: GameLobbyCardInfo[] = [
  {
    id: 'casebattle',
    title: 'Битва Кейсов',
    subtitle: 'Открытие кейсов против ботов: Клатч, Терминал, Реверс, Общий',
    tag: '4 РЕЖИМА',
    icon: 'trophy-outline',
    previewImg: CS2_CASES[0]?.image || '',
  },
  {
    id: 'crash',
    title: 'Краш (Crash)',
    subtitle: 'Заберите выигрыш до обвала графика множителя',
    tag: 'ДО x50',
    icon: 'trending-up-outline',
    previewImg: CS2_CASES[1]?.items[0]?.image || '',
  },
  {
    id: 'upgrader',
    title: 'Апгрейдер',
    subtitle: 'Улучшение скинов со склада с коэффициентом от x1.5 до x10',
    tag: 'КРАФТ СКИНОВ',
    icon: 'sync-outline',
    previewImg: CS2_CASES[0]?.items[CS2_CASES[0].items.length - 1]?.image || '',
  },
  {
    id: 'tradeup',
    title: 'Контракт обмена',
    subtitle: 'Обмен 5 скинов одной редкости на предмет качеством выше',
    tag: '5 В 1',
    icon: 'layers-outline',
    previewImg: CS2_CASES[3]?.items[2]?.image || '',
  },
  {
    id: 'mines',
    title: 'Сапёр 5x5',
    subtitle: 'Поле из 25 ячеек: открывайте кристаллы и обходите мины',
    tag: 'МИНЫ C4',
    icon: 'grid-outline',
    previewImg: CS2_CASES[2]?.image || '',
  },
  {
    id: 'coinflip',
    title: 'Монетка CT / T',
    subtitle: 'Классическая дуэль 50 на 50 за сторону Спецназа или Террористов',
    tag: 'x1.94',
    icon: 'disc-outline',
    previewImg: CS2_CASES[4]?.image || '',
  },
  {
    id: 'blackjack',
    title: 'Блэкджек 21',
    subtitle: 'Наберите 21 очко картами и обыграйте дилера',
    tag: 'КАРТЫ',
    icon: 'albums-outline',
    previewImg: CS2_CASES[5]?.image || '',
  },
  {
    id: 'clicker',
    title: 'Цех и Магазин',
    subtitle: 'Заработок +$0.50 за клик при нулевом балансе и покупка скинов',
    tag: 'ПОДРАБОТКА',
    icon: 'hammer-outline',
    previewImg: CS2_CASES[6]?.image || '',
  },
];

export const MiniGamesHub: React.FC<MiniGamesHubProps> = ({
  balance,
  inventory,
  themeMode = 'obsidian',
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
  const theme = THEMES[themeMode] || THEMES.obsidian;

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
    if (onNotify) onNotify(title, message, type);
  };

  const applyQuickBet = (
    currentStr: string,
    setter: (val: string) => void,
    action: '1' | '5' | '10' | 'half' | 'double' | 'max'
  ) => {
    playClickSound();
    const cur = Number(currentStr) || 1;
    if (action === '1') setter('1');
    else if (action === '5') setter('5');
    else if (action === '10') setter('10');
    else if (action === 'half') setter(Math.max(1, Number((cur / 2).toFixed(2))).toString());
    else if (action === 'double')
      setter(Math.min(Math.max(1, balance), Number((cur * 2).toFixed(2))).toString());
    else if (action === 'max') setter(Math.max(1, Number(balance.toFixed(2))).toString());
  };

  // ==================== 1. CRASH ====================
  const [crashBet, setCrashBet] = useState('5');
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
    if (isNaN(bet) || bet <= 0 || bet > balance) {
      notify('Недостаточно средств', `Проверьте сумму ставки (ваш баланс $${balance.toFixed(2)}).`, 'error');
      return;
    }
    onChangeBalance(-bet);
    setCrashRunning(true);
    setCrashBusted(false);
    setCashedOutAt(null);
    setCrashMultiplier(1.0);

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
        setCrashHistory((prev) => [finalPoint, ...prev.slice(0, 5)]);
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
    setCrashHistory((prev) => [lockedMult, ...prev.slice(0, 5)]);
    onChangeBalance(winAmount);
    onRecordGameWin(false);
    playWinSound();
  };

  const crashProgress = Math.min(1, Math.log10(Math.max(1, crashMultiplier)) / 1.3);
  const rocketX = 24 + crashProgress * 290;
  const rocketY = 135 - Math.pow(crashProgress, 1.35) * 100;
  const curvePath = `M 24 135 Q ${24 + crashProgress * 160} 135 ${rocketX} ${rocketY}`;

  // ==================== 2. UPGRADER ====================
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
      notify('Выберите скин', 'Нажмите на любой предмет со склада ниже.', 'warning');
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
      duration: defaultFastSpin ? 1600 : 3200,
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
          text: `Успех! Получен ${upgraded.weapon} | ${upgraded.name} ($${upgraded.price})`,
          win: true,
        });
        onRecordGameWin(true);
        playWinSound();
      } else {
        setSelectedUpgradeSkin(null);
        setUpgradeResultMsg({
          text: 'Неудача: стрелка остановилась вне сектора успеха.',
          win: false,
        });
        playLoseSound();
      }
    });
  };

  const wheelRadius = 68;
  const wheelCircumference = 2 * Math.PI * wheelRadius;
  const strokeDashoffset = wheelCircumference * (1 - winChance / 100);
  const pointerRotate = wheelAngleAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  // ==================== 3. MINES ====================
  const [minesBet, setMinesBet] = useState('5');
  const [minesCount, setMinesCount] = useState(3);
  const [minesActive, setMinesActive] = useState(false);
  const [minePositions, setMinePositions] = useState<number[]>([]);
  const [revealedCells, setRevealedCells] = useState<number[]>([]);
  const [minesGameOver, setMinesGameOver] = useState(false);

  const startMines = () => {
    const bet = Number(minesBet);
    if (isNaN(bet) || bet <= 0 || bet > balance) {
      notify('Недостаточно средств', 'Проверьте сумму ставки.', 'error');
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
    return Number((mult * 0.95).toFixed(2));
  };

  const pressMineCell = (idx: number) => {
    if (!minesActive || revealedCells.includes(idx) || minesGameOver) return;
    if (minePositions.includes(idx)) {
      setRevealedCells([...revealedCells, idx]);
      setMinesGameOver(true);
      setMinesActive(false);
      playLoseSound();
    } else {
      setRevealedCells([...revealedCells, idx]);
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

  // ==================== 4. COINFLIP ====================
  const [coinBet, setCoinBet] = useState('5');
  const [coinSide, setCoinSide] = useState<'CT' | 'T'>('CT');
  const [coinFlipping, setCoinFlipping] = useState(false);
  const [coinLanded, setCoinLanded] = useState<'CT' | 'T'>('CT');
  const [coinResult, setCoinResult] = useState<{ text: string; win: boolean } | null>(null);
  const coinFlipAnim = useRef(new Animated.Value(0)).current;

  const flipCoin = () => {
    if (coinFlipping) return;
    const bet = Number(coinBet);
    if (isNaN(bet) || bet <= 0 || bet > balance) {
      notify('Недостаточно средств', 'Проверьте сумму ставки.', 'error');
      return;
    }
    onChangeBalance(-bet);
    setCoinFlipping(true);
    setCoinResult(null);
    coinFlipAnim.setValue(0);

    const outcome: 'CT' | 'T' = Math.random() < 0.48 ? coinSide : coinSide === 'CT' ? 'T' : 'CT';

    Animated.timing(coinFlipAnim, {
      toValue: 1,
      duration: defaultFastSpin ? 700 : 1300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setCoinLanded(outcome);
      setCoinFlipping(false);
      if (outcome === coinSide) {
        const prize = Number((bet * 1.94).toFixed(2));
        onChangeBalance(prize);
        setCoinResult({ text: `Выпало ${outcome} • Выигрыш +$${prize}`, win: true });
        onRecordGameWin(false);
        playWinSound();
      } else {
        setCoinResult({ text: `Выпало ${outcome} • Проигрыш -$${bet}`, win: false });
        playLoseSound();
      }
    });
  };

  const coinScaleX = coinFlipAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [1, -1, 1, -1, 1],
  });

  // ==================== 5. BLACKJACK ====================
  const [bjBet, setBjBet] = useState('5');
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
      notify('Недостаточно средств', 'Проверьте сумму ставки.', 'error');
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
      setBjStatus('Перебор (>21) • Победа дилера');
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
      setBjStatus(`Победа (${pScore} : ${dScore}) • Выигрыш +$${win}`);
      onRecordGameWin(false);
      playWinSound();
    } else if (pScore === dScore) {
      onChangeBalance(bet);
      setBjStatus(`Ничья (${pScore} : ${dScore}) • Возврат ставки`);
    } else {
      setBjStatus(`Дилер выиграл (${dScore} : ${pScore})`);
      playLoseSound();
    }
  };

  // ==================== 6. TRADE-UP CONTRACT ====================
  const [contractIds, setContractIds] = useState<string[]>([]);
  const [contractMessage, setContractMessage] = useState<string | null>(null);

  const toggleContractSkin = (item: InventoryItem) => {
    if (item.rarity === 'gold') {
      notify('Недоступно', 'Ножи и перчатки не участвуют в контрактах.', 'warning');
      return;
    }
    if (contractIds.includes(item.instanceId)) {
      setContractIds(contractIds.filter((id) => id !== item.instanceId));
      return;
    }
    if (contractIds.length >= 5) {
      notify('5 слотов заняты', 'Сначала уберите один предмет из слота.', 'info');
      return;
    }
    if (contractIds.length > 0) {
      const firstItem = inventory.find((i) => i.instanceId === contractIds[0]);
      if (firstItem && firstItem.rarity !== item.rarity) {
        notify('Разная редкость', 'Все 5 скинов должны быть одного качества.', 'warning');
        return;
      }
    }
    setContractIds([...contractIds, item.instanceId]);
  };

  const executeTradeUp = () => {
    if (contractIds.length < 5) {
      notify('Нужно 5 предметов', 'Выберите 5 скинов одной редкости со склада ниже.', 'warning');
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
    crafted.price = Number((totalInputVal * (0.65 + Math.random() * 0.8)).toFixed(2));

    onRemoveInventoryItems(contractIds);
    onAddInventoryItem(crafted);
    setContractIds([]);
    setContractMessage(`Получен: ${crafted.weapon} | ${crafted.name} ($${crafted.price})`);
    onRecordGameWin(false);
    playWinSound();
  };

  // ==================== 7. CLICKER & SHOP ====================
  const [clickCount, setClickCount] = useState(0);
  const allShopSkins = getAllTemplates();

  const handleWorkClick = () => {
    playClickSound();
    setClickCount((c) => c + 1);
    onChangeBalance(0.5);
  };

  const buyFromExchanger = (template: SkinTemplate) => {
    if (balance < template.basePrice) {
      notify('Недостаточно средств', `Нужно $${template.basePrice.toFixed(2)}`, 'error');
      return;
    }
    onChangeBalance(-template.basePrice);
    const created = instantiateSkin(template);
    created.price = Number(template.basePrice.toFixed(2));
    onAddInventoryItem(created);
    playWinSound();
    notify('Куплено', `${created.weapon} | ${created.name} добавлен на склад.`, 'success');
  };

  const selectedContractItems = contractIds
    .map((id) => inventory.find((i) => i.instanceId === id))
    .filter(Boolean) as InventoryItem[];

  // ==================== CLEAN MINIMALIST LOBBY ====================
  if (activeGame === 'lobby') {
    return (
      <View style={styles.container}>
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          Игровые режимы
        </Text>
        <View style={styles.lobbyGrid}>
          {GAME_CARDS.map((card) => (
            <TouchableOpacity
              key={card.id}
              activeOpacity={0.85}
              onPress={() => {
                playClickSound();
                setActiveGame(card.id);
              }}
              style={[
                styles.lobbyCard,
                {
                  backgroundColor: theme.cardBg,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <View style={styles.lobbyCardTop}>
                <View style={[styles.tagPill, { backgroundColor: theme.surfaceBg }]}>
                  <Text style={[styles.tagPillText, { color: theme.textSecondary }]}>
                    {card.tag}
                  </Text>
                </View>
                <Ionicons name={card.icon} size={17} color={theme.textSecondary} />
              </View>

              <View style={styles.lobbyImgWrap}>
                {card.previewImg ? (
                  <Image
                    source={{ uri: card.previewImg }}
                    style={styles.lobbyImg}
                    resizeMode="contain"
                  />
                ) : (
                  <Ionicons name={card.icon} size={42} color={theme.textSecondary} />
                )}
              </View>

              <View>
                <Text style={[styles.lobbyCardTitle, { color: theme.textPrimary }]}>
                  {card.title}
                </Text>
                <Text
                  numberOfLines={2}
                  style={[styles.lobbyCardSub, { color: theme.textSecondary }]}
                >
                  {card.subtitle}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  if (activeGame === 'casebattle') {
    return (
      <CaseBattleArena
        balance={balance}
        themeMode={themeMode}
        defaultFastSpin={defaultFastSpin}
        onUpdateBalance={onChangeBalance}
        onAddItems={(items) => {
          if (onAddMultipleItems) onAddMultipleItems(items);
          else items.forEach((i) => onAddInventoryItem(i));
        }}
        onNotify={notify}
        onBattlePlayed={onRecordBattlePlayed}
        onBack={() => setActiveGame('lobby')}
      />
    );
  }

  const renderQuickBetBar = (
    val: string,
    setter: (v: string) => void,
    disabled = false
  ) => (
    <View style={styles.betSection}>
      <View style={styles.betInputRow}>
        <Text style={[styles.betLabel, { color: theme.textSecondary }]}>Ставка ($)</Text>
        <TextInput
          value={val}
          onChangeText={setter}
          keyboardType="numeric"
          editable={!disabled}
          style={[
            styles.betInput,
            {
              backgroundColor: theme.surfaceBg,
              color: theme.textPrimary,
              borderColor: theme.cardBorder,
            },
          ]}
        />
      </View>
      <View style={styles.quickBetPills}>
        {(
          [
            { id: '1', label: '$1' },
            { id: '5', label: '$5' },
            { id: '10', label: '$10' },
            { id: 'half', label: '1/2' },
            { id: 'double', label: 'x2' },
            { id: 'max', label: 'MAX' },
          ] as const
        ).map((b) => (
          <TouchableOpacity
            key={b.id}
            disabled={disabled}
            onPress={() => applyQuickBet(val, setter, b.id)}
            style={[styles.quickBetBtn, { backgroundColor: theme.surfaceBg }]}
          >
            <Text style={[styles.quickBetBtnText, { color: theme.textSecondary }]}>
              {b.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Unified Clean Top Game Header */}
      <View
        style={[
          styles.gameTopHeader,
          { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
        ]}
      >
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: theme.surfaceBg }]}
          onPress={() => {
            playClickSound();
            setActiveGame('lobby');
          }}
        >
          <Ionicons name="arrow-back" size={16} color={theme.textPrimary} />
          <Text style={[styles.backBtnText, { color: theme.textPrimary }]}>Все игры</Text>
        </TouchableOpacity>

        <Text style={[styles.gameHeaderTitle, { color: theme.textPrimary }]}>
          {GAME_CARDS.find((g) => g.id === activeGame)?.title || 'Игра'}
        </Text>

        <View style={{ width: 68 }} />
      </View>

      {/* ==================== 1. CRASH ==================== */}
      {activeGame === 'crash' && (
        <View
          style={[
            styles.gamePanel,
            { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
          ]}
        >
          <View style={styles.historyRow}>
            {crashHistory.map((h, i) => (
              <View
                key={i}
                style={[styles.histPill, { backgroundColor: theme.surfaceBg }]}
              >
                <Text
                  style={[
                    styles.histText,
                    { color: h >= 2 ? '#16A34A' : theme.textSecondary },
                  ]}
                >
                  {h.toFixed(2)}x
                </Text>
              </View>
            ))}
          </View>

          <View
            style={[
              styles.crashStage,
              {
                backgroundColor: theme.surfaceBg,
                borderColor: crashBusted ? '#EF4444' : theme.cardBorder,
              },
            ]}
          >
            <Svg width="340" height="145" style={StyleSheet.absoluteFillObject}>
              <Path
                d={curvePath}
                stroke={crashBusted ? '#EF4444' : '#16A34A'}
                strokeWidth="3"
                fill="none"
              />
              <Circle
                cx={rocketX}
                cy={rocketY}
                r="5"
                fill={crashBusted ? '#EF4444' : '#16A34A'}
              />
            </Svg>

            <Text
              style={[
                styles.crashBigNumber,
                { color: crashBusted ? '#EF4444' : theme.textPrimary },
              ]}
            >
              {crashMultiplier.toFixed(2)}x
            </Text>
            <Text style={[styles.crashSubStatus, { color: theme.textSecondary }]}>
              {crashBusted
                ? 'График обрушился'
                : cashedOutAt
                ? `Выигрыш забран на ${cashedOutAt.toFixed(2)}x`
                : crashRunning
                ? 'Множитель растёт...'
                : 'Готов к запуску'}
            </Text>
          </View>

          {renderQuickBetBar(crashBet, setCrashBet, crashRunning)}

          {!crashRunning ? (
            <TouchableOpacity style={styles.greenActionBtn} onPress={startCrash}>
              <Text style={styles.greenActionText}>НАЧАТЬ РАУНД</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.greenActionBtn, { backgroundColor: '#EAB308' }]}
              onPress={cashOutCrash}
            >
              <Text style={[styles.greenActionText, { color: '#111827' }]}>
                ЗАБРАТЬ ${(Number(crashBet) * crashMultiplier).toFixed(2)}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* ==================== 2. UPGRADER (WITH 2-COLUMN INVENTORY GRID) ==================== */}
      {activeGame === 'upgrader' && (
        <View
          style={[
            styles.gamePanel,
            { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
          ]}
        >
          {/* Two Top Slots: Current Skin -> Target Value */}
          <View style={styles.upgraderSlotsRow}>
            <View
              style={[
                styles.upgraderBox,
                { backgroundColor: theme.surfaceBg, borderColor: theme.cardBorder },
              ]}
            >
              <Text style={[styles.upgraderBoxLabel, { color: theme.textSecondary }]}>
                ВАШ СКИН
              </Text>
              {selectedUpgradeSkin ? (
                <>
                  <Image
                    source={{ uri: selectedUpgradeSkin.image }}
                    style={{ width: 84, height: 56, marginVertical: 4 }}
                    resizeMode="contain"
                  />
                  <Text
                    numberOfLines={1}
                    style={[styles.upgraderSkinTitle, { color: theme.textPrimary }]}
                  >
                    {selectedUpgradeSkin.name}
                  </Text>
                  <Text style={styles.upgraderPriceText}>
                    ${selectedUpgradeSkin.price.toFixed(2)}
                  </Text>
                </>
              ) : (
                <Text style={[styles.upgraderEmptyHint, { color: theme.textMuted }]}>
                  Выберите ниже
                </Text>
              )}
            </View>

            <View
              style={[
                styles.upgraderBox,
                { backgroundColor: theme.surfaceBg, borderColor: theme.cardBorder },
              ]}
            >
              <Text style={[styles.upgraderBoxLabel, { color: theme.textSecondary }]}>
                ЦЕЛЬ (x{upgradeMultiplier})
              </Text>
              <Text style={[styles.upgraderTargetChance, { color: theme.textPrimary }]}>
                {winChance}%
              </Text>
              <Text style={[styles.upgraderBoxLabel, { color: theme.textSecondary }]}>
                ШАНС УСПЕХА
              </Text>
              <Text style={styles.upgraderPriceText}>
                $
                {selectedUpgradeSkin
                  ? (selectedUpgradeSkin.price * upgradeMultiplier).toFixed(2)
                  : '0.00'}
              </Text>
            </View>
          </View>

          {/* Minimalist Wheel */}
          <View style={styles.wheelStage}>
            <Svg width={164} height={164}>
              <Circle
                cx={82}
                cy={82}
                r={wheelRadius}
                stroke={theme.isLight ? '#E5E7EB' : 'rgba(255,255,255,0.08)'}
                strokeWidth={12}
                fill="none"
              />
              <Circle
                cx={82}
                cy={82}
                r={wheelRadius}
                stroke="#16A34A"
                strokeWidth={12}
                fill="none"
                strokeDasharray={`${wheelCircumference} ${wheelCircumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                rotation="-90"
                origin="82, 82"
              />
            </Svg>

            <View style={styles.wheelCenterBox}>
              <Text style={[styles.wheelChanceNum, { color: theme.textPrimary }]}>
                {winChance}%
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: 10 }}>x{upgradeMultiplier}</Text>
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

          {/* Multiplier Selector */}
          <View style={styles.multRow}>
            {([1.5, 2, 5, 10] as const).map((m) => {
              const active = upgradeMultiplier === m;
              return (
                <TouchableOpacity
                  key={m}
                  disabled={isWheelSpinning}
                  onPress={() => setUpgradeMultiplier(m)}
                  style={[
                    styles.multBtn,
                    {
                      backgroundColor: active ? '#16A34A' : theme.surfaceBg,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.multBtnText,
                      { color: active ? '#FFFFFF' : theme.textPrimary },
                    ]}
                  >
                    x{m}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {upgradeResultMsg && (
            <Text
              style={[
                styles.statusText,
                { color: upgradeResultMsg.win ? '#16A34A' : '#EF4444' },
              ]}
            >
              {upgradeResultMsg.text}
            </Text>
          )}

          <TouchableOpacity style={styles.greenActionBtn} onPress={runUpgrade}>
            <Text style={styles.greenActionText}>
              {isWheelSpinning
                ? 'УЛУЧШАЕМ...'
                : selectedUpgradeSkin
                ? `УЛУЧШИТЬ СКИН (${winChance}%)`
                : 'ВЫБЕРИТЕ СКИН НИЖЕ'}
            </Text>
          </TouchableOpacity>

          <Text style={[styles.inventoryPickerTitle, { color: theme.textSecondary }]}>
            ВАШ СКЛАД ({inventory.length}) — НАЖМИТЕ ДЛЯ ВЫБОРА:
          </Text>
          <View style={styles.gridPickerWrap}>
            {inventory.map((item) => (
              <SkinCard
                key={item.instanceId}
                item={item}
                themeMode={themeMode}
                selected={selectedUpgradeSkin?.instanceId === item.instanceId}
                onPress={() => setSelectedUpgradeSkin(item)}
              />
            ))}
          </View>
        </View>
      )}

      {/* ==================== 3. MINES ==================== */}
      {activeGame === 'mines' && (
        <View
          style={[
            styles.gamePanel,
            { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
          ]}
        >
          <View style={styles.rowBetween}>
            <Text style={[styles.betLabel, { color: theme.textSecondary }]}>
              Множитель: <Text style={{ color: '#16A34A' }}>{currentMinesMultiplier()}x</Text>
            </Text>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {[3, 5, 10, 15].map((cnt) => (
                <TouchableOpacity
                  key={cnt}
                  disabled={minesActive}
                  onPress={() => setMinesCount(cnt)}
                  style={[
                    styles.bombChip,
                    {
                      backgroundColor: minesCount === cnt ? '#16A34A' : theme.surfaceBg,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: minesCount === cnt ? '#FFFFFF' : theme.textSecondary,
                      fontSize: 11,
                      fontWeight: '700',
                    }}
                  >
                    {cnt} мин
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

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
                    {
                      backgroundColor: theme.surfaceBg,
                      borderColor: theme.cardBorder,
                    },
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
                        : 'ellipse'
                    }
                    size={isRevealed ? 20 : 8}
                    color={
                      isRevealed
                        ? isBomb
                          ? '#EF4444'
                          : '#16A34A'
                        : theme.textMuted
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          {renderQuickBetBar(minesBet, setMinesBet, minesActive)}

          {!minesActive ? (
            <TouchableOpacity style={styles.greenActionBtn} onPress={startMines}>
              <Text style={styles.greenActionText}>НАЧАТЬ ИГРУ</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.greenActionBtn, { backgroundColor: '#EAB308' }]}
              onPress={cashOutMines}
            >
              <Text style={[styles.greenActionText, { color: '#111827' }]}>
                ЗАБРАТЬ ${(Number(minesBet) * currentMinesMultiplier()).toFixed(2)}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* ==================== 4. TRADE-UP CONTRACT (WITH 2-COLUMN GRID) ==================== */}
      {activeGame === 'tradeup' && (
        <View
          style={[
            styles.gamePanel,
            { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
          ]}
        >
          <Text style={[styles.betLabel, { color: theme.textSecondary, marginBottom: 8 }]}>
            Выберите 5 предметов одной редкости ({contractIds.length} / 5):
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
                    {
                      backgroundColor: theme.surfaceBg,
                      borderColor: r ? r.color : theme.cardBorder,
                    },
                  ]}
                >
                  {slotItem ? (
                    <Image
                      source={{ uri: slotItem.image }}
                      style={{ width: 48, height: 36 }}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text style={{ color: theme.textMuted, fontSize: 11, fontWeight: '700' }}>
                      #{slotIdx + 1}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {contractMessage && (
            <Text style={[styles.statusText, { color: '#16A34A' }]}>{contractMessage}</Text>
          )}

          <TouchableOpacity style={styles.greenActionBtn} onPress={executeTradeUp}>
            <Text style={styles.greenActionText}>
              ОБМЕНЯТЬ 5 СКИНОВ ({contractIds.length}/5)
            </Text>
          </TouchableOpacity>

          <Text style={[styles.inventoryPickerTitle, { color: theme.textSecondary }]}>
            ДОСТУПНЫЕ СКИНЫ НА СКЛАДЕ:
          </Text>
          <View style={styles.gridPickerWrap}>
            {inventory
              .filter((i) => i.rarity !== 'gold' && !i.isSticker)
              .map((item) => (
                <SkinCard
                  key={item.instanceId}
                  item={item}
                  themeMode={themeMode}
                  selected={contractIds.includes(item.instanceId)}
                  onPress={() => toggleContractSkin(item)}
                />
              ))}
          </View>
        </View>
      )}

      {/* ==================== 5. COINFLIP ==================== */}
      {activeGame === 'coinflip' && (
        <View
          style={[
            styles.gamePanel,
            { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
          ]}
        >
          <View style={styles.coinArena}>
            <Animated.View
              style={[
                styles.bigCoinCircle,
                {
                  backgroundColor: theme.surfaceBg,
                  borderColor: coinLanded === 'CT' ? '#3B82F6' : '#EAB308',
                  transform: [{ scaleX: coinScaleX }],
                },
              ]}
            >
              <Ionicons
                name={coinLanded === 'CT' ? 'shield-half-outline' : 'flame-outline'}
                size={38}
                color={coinLanded === 'CT' ? '#3B82F6' : '#EAB308'}
              />
              <Text style={[styles.coinBadgeText, { color: theme.textPrimary }]}>
                {coinLanded}
              </Text>
            </Animated.View>
          </View>

          <View style={styles.multRow}>
            <TouchableOpacity
              onPress={() => setCoinSide('CT')}
              style={[
                styles.multBtn,
                { backgroundColor: coinSide === 'CT' ? '#3B82F6' : theme.surfaceBg },
              ]}
            >
              <Text
                style={[
                  styles.multBtnText,
                  { color: coinSide === 'CT' ? '#FFFFFF' : theme.textPrimary },
                ]}
              >
                CT (Спецназ)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCoinSide('T')}
              style={[
                styles.multBtn,
                { backgroundColor: coinSide === 'T' ? '#EAB308' : theme.surfaceBg },
              ]}
            >
              <Text
                style={[
                  styles.multBtnText,
                  { color: coinSide === 'T' ? '#111827' : theme.textPrimary },
                ]}
              >
                T (Террористы)
              </Text>
            </TouchableOpacity>
          </View>

          {renderQuickBetBar(coinBet, setCoinBet, coinFlipping)}

          {coinResult && (
            <Text
              style={[
                styles.statusText,
                { color: coinResult.win ? '#16A34A' : '#EF4444' },
              ]}
            >
              {coinResult.text}
            </Text>
          )}

          <TouchableOpacity style={styles.greenActionBtn} onPress={flipCoin}>
            <Text style={styles.greenActionText}>
              {coinFlipping ? 'БРОСАЕМ МОНЕТУ...' : 'БРОСИТЬ МОНЕТУ (x1.94)'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ==================== 6. BLACKJACK 21 ==================== */}
      {activeGame === 'blackjack' && (
        <View
          style={[
            styles.gamePanel,
            { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
          ]}
        >
          <View style={[styles.bjTable, { backgroundColor: theme.surfaceBg }]}>
            <Text style={[styles.betLabel, { color: theme.textSecondary }]}>
              Карты дилера ({handSum(dealerHand)}):
            </Text>
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

            <Text style={[styles.betLabel, { color: theme.textPrimary, marginTop: 14 }]}>
              Ваши карты ({handSum(playerHand)}):
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

          {bjStatus !== '' && (
            <Text style={[styles.statusText, { color: theme.textPrimary }]}>{bjStatus}</Text>
          )}

          {!bjActive ? (
            <>
              {renderQuickBetBar(bjBet, setBjBet, false)}
              <TouchableOpacity style={styles.greenActionBtn} onPress={startBlackjack}>
                <Text style={styles.greenActionText}>РАЗДАТЬ КАРТЫ</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.multRow}>
              <TouchableOpacity
                style={[styles.greenActionBtn, { flex: 1 }]}
                onPress={hitBlackjack}
              >
                <Text style={styles.greenActionText}>ЕЩЁ КАРТУ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.greenActionBtn, { flex: 1, backgroundColor: '#EAB308' }]}
                onPress={standBlackjack}
              >
                <Text style={[styles.greenActionText, { color: '#111827' }]}>ОСТАВИТЬ</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {/* ==================== 7. CLICKER & SHOP ==================== */}
      {(activeGame === 'clicker' || activeGame === 'exchanger') && (
        <View
          style={[
            styles.gamePanel,
            { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleWorkClick}
            style={[
              styles.clickerBox,
              { backgroundColor: theme.surfaceBg, borderColor: theme.cardBorder },
            ]}
          >
            <MaterialCommunityIcons name="treasure-chest" size={36} color="#16A34A" />
            <Text style={[styles.clickerTitle, { color: theme.textPrimary }]}>
              Собрать оружейный кейс (+$0.50)
            </Text>
            <Text style={{ color: theme.textSecondary, fontSize: 11, marginTop: 2 }}>
              Заработано за смену: +${(clickCount * 0.5).toFixed(2)} ({clickCount} кликов)
            </Text>
          </TouchableOpacity>

          <Text style={[styles.inventoryPickerTitle, { color: theme.textSecondary }]}>
            ОРУЖЕЙНЫЙ МАГАЗИН:
          </Text>
          <View style={styles.gridPickerWrap}>
            {allShopSkins.slice(0, 18).map((skin) => (
              <SkinCard
                key={skin.id}
                item={skin}
                themeMode={themeMode}
                actionLabel={`Купить $${skin.basePrice}`}
                onAction={() => buyFromExchanger(skin)}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
  },
  lobbyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  lobbyCard: {
    width: '48.4%',
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    justifyContent: 'space-between',
    minHeight: 175,
  },
  lobbyCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagPill: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagPillText: {
    fontSize: 9,
    fontWeight: '800',
  },
  lobbyImgWrap: {
    height: 68,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  lobbyImg: {
    width: 100,
    height: 64,
  },
  lobbyCardTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  lobbyCardSub: {
    fontSize: 10,
    marginTop: 3,
    lineHeight: 13,
  },
  gameTopHeader: {
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
  gameHeaderTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  gamePanel: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  historyRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  histPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  histText: {
    fontSize: 11,
    fontWeight: '700',
  },
  crashStage: {
    height: 150,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  crashBigNumber: {
    fontSize: 36,
    fontWeight: '900',
  },
  crashSubStatus: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  betSection: {
    marginBottom: 12,
  },
  betInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  betLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  betInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontWeight: '800',
    minWidth: 100,
    textAlign: 'right',
  },
  quickBetPills: {
    flexDirection: 'row',
    gap: 6,
  },
  quickBetBtn: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 8,
    alignItems: 'center',
  },
  quickBetBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  greenActionBtn: {
    backgroundColor: '#16A34A',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  greenActionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  upgraderSlotsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  upgraderBox: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
  },
  upgraderBoxLabel: {
    fontSize: 9,
    fontWeight: '800',
  },
  upgraderSkinTitle: {
    fontSize: 11,
    fontWeight: '700',
  },
  upgraderPriceText: {
    color: '#16A34A',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },
  upgraderEmptyHint: {
    fontSize: 11,
    marginTop: 12,
  },
  upgraderTargetChance: {
    fontSize: 24,
    fontWeight: '900',
    marginVertical: 4,
  },
  wheelStage: {
    height: 175,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 4,
  },
  wheelCenterBox: {
    position: 'absolute',
    alignItems: 'center',
  },
  wheelChanceNum: {
    fontSize: 20,
    fontWeight: '900',
  },
  wheelNeedleContainer: {
    position: 'absolute',
    width: 164,
    height: 164,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wheelNeedleTip: {
    width: 8,
    height: 16,
    borderRadius: 4,
    backgroundColor: '#EAB308',
    marginTop: 2,
  },
  multRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  multBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
  },
  multBtnText: {
    fontSize: 13,
    fontWeight: '800',
  },
  statusText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 10,
  },
  inventoryPickerTitle: {
    fontSize: 11,
    fontWeight: '800',
    marginTop: 16,
    marginBottom: 8,
  },
  gridPickerWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  bombChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  minesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  mineCell: {
    width: '18.6%',
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  mineCellSafe: {
    borderColor: '#16A34A',
    backgroundColor: 'rgba(22, 163, 74, 0.14)',
  },
  mineCellBomb: {
    borderColor: '#EF4444',
    backgroundColor: 'rgba(239, 68, 68, 0.18)',
  },
  slotsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  contractSlot: {
    width: '18.4%',
    height: 54,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinArena: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  bigCoinCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinBadgeText: {
    fontWeight: '900',
    fontSize: 15,
    marginTop: 2,
  },
  bjTable: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    minHeight: 54,
    marginTop: 6,
  },
  playingCard: {
    width: 42,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRank: {
    color: '#111827',
    fontWeight: '900',
    fontSize: 14,
  },
  cardSuit: {
    color: '#111827',
    fontSize: 15,
  },
  clickerBox: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 18,
    alignItems: 'center',
  },
  clickerTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 6,
  },
});
