import {
  CaseContainer,
  CS2Agent,
  CS2RankInfo,
  DailyCareReward,
  InventoryItem,
  MarketTrendInfo,
  PremierRatingInfo,
  QuestItem,
  RarityKey,
  SkinTemplate,
  WearShort,
} from '../types/cs2';

const catalog: {
  defaultRarityWeights: Record<RarityKey, number>;
  cases: CaseContainer[];
  agents: CS2Agent[];
  stickers: { name: string; image: string }[];
} = require('./items.json');

export const INITIAL_CASES = catalog.cases;
export const TOURNAMENT_STICKERS = catalog.stickers;

export const INITIAL_QUESTS: QuestItem[] = [
  // ЕЖЕДНЕВНЫЕ
  {
    id: 'q_daily_open_15',
    title: 'Разминка перед мейджором',
    description: 'Открой 15 любых кейсов или капсул',
    difficulty: 'daily',
    reward: 25,
    target: 15,
    progress: 0,
    claimed: false,
    type: 'open_cases',
  },
  {
    id: 'q_daily_sell_12',
    title: 'Чистка склада',
    description: 'Продай 12 выбитых скинов на торговой площадке',
    difficulty: 'daily',
    reward: 18,
    target: 12,
    progress: 0,
    claimed: false,
    type: 'sell_items',
  },
  // БОЕВЫЕ (CASE BATTLE & MINIGAMES)
  {
    id: 'q_battle_win_3',
    title: 'Чемпион Битвы Кейсов',
    description: 'Победи ботов в режиме «Битва Кейсов» 3 раза',
    difficulty: 'battle',
    reward: 65,
    target: 3,
    progress: 0,
    claimed: false,
    type: 'win_case_battle',
  },
  {
    id: 'q_battle_reverse_2',
    title: 'Тактик Анти-Дропа (Реверс)',
    description: 'Выиграй 2 Битвы Кейсов в режиме «Реверс» (выбив самый дешевый дроп)',
    difficulty: 'battle',
    reward: 90,
    target: 2,
    progress: 0,
    claimed: false,
    type: 'win_reverse_battle',
  },
  {
    id: 'q_games_win_8',
    title: 'Акула Азарта',
    description: 'Одержи 8 побед в Ракетке, Минах, Монетке или Блэкджеке',
    difficulty: 'battle',
    reward: 75,
    target: 8,
    progress: 0,
    claimed: false,
    type: 'win_games',
  },
  // КОЛЛЕКЦИОННЫЕ
  {
    id: 'q_craft_3',
    title: 'Мастер Контрактов Обмена',
    description: 'Скрафти 3 предмета через Контракт Обмена (Trade-Up)',
    difficulty: 'collector',
    reward: 55,
    target: 3,
    progress: 0,
    claimed: false,
    type: 'craft_contract',
  },
  {
    id: 'q_upgrade_4',
    title: 'Ювелирный Апгрейд',
    description: 'Успешно улучши скины в Апгрейдере 4 раза',
    difficulty: 'collector',
    reward: 110,
    target: 4,
    progress: 0,
    claimed: false,
    type: 'upgrade_win',
  },
  // ХАРДКОРНЫЕ
  {
    id: 'q_hard_open_100',
    title: 'Одержимый кейсами',
    description: 'Открой 100 кейсов в любых каталогах',
    difficulty: 'hardcore',
    reward: 180,
    target: 100,
    progress: 0,
    claimed: false,
    type: 'open_cases',
  },
  {
    id: 'q_hard_covert_3',
    title: 'Ловец Тайного и Золота',
    description: 'Выбей 3 предмета качества «Тайное» или «Особый редкий предмет (Нож/Перчатки)»',
    difficulty: 'hardcore',
    reward: 320,
    target: 3,
    progress: 0,
    claimed: false,
    type: 'get_covert',
  },
];

export function getWearInfo(floatValue: number): { wear: WearShort; wearName: string; multiplier: number } {
  if (floatValue < 0.07) {
    return { wear: 'FN', wearName: 'Прямо с завода (Factory New)', multiplier: 1.45 };
  }
  if (floatValue < 0.15) {
    return { wear: 'MW', wearName: 'Немного поношенное (Minimal Wear)', multiplier: 1.2 };
  }
  if (floatValue < 0.38) {
    return { wear: 'FT', wearName: 'После полевых испытаний (Field-Tested)', multiplier: 1.0 };
  }
  if (floatValue < 0.45) {
    return { wear: 'WW', wearName: 'Поношенное (Well-Worn)', multiplier: 0.82 };
  }
  return { wear: 'BS', wearName: 'Закалённое в боях (Battle-Scarred)', multiplier: 0.68 };
}

interface CaseDropGroup {
  rarity: RarityKey;
  items: readonly SkinTemplate[];
  weight: number;
  probability: number;
}

const caseDropTables = new WeakMap<CaseContainer, {
  groups: readonly CaseDropGroup[];
  totalWeight: number;
}>();
const rarityOrder = Object.keys(catalog.defaultRarityWeights) as RarityKey[];

function buildCaseDropTable(caseItem: CaseContainer) {
  const pools = new Map<RarityKey, SkinTemplate[]>();
  for (const item of caseItem.items) {
    const pool = pools.get(item.rarity);
    if (pool) pool.push(item);
    else pools.set(item.rarity, [item]);
  }

  const groups = rarityOrder.flatMap((rarity) => {
    const items = pools.get(rarity);
    const weight = caseItem.customChances?.[rarity] ?? catalog.defaultRarityWeights[rarity];
    return items && weight > 0 && Number.isFinite(weight) ? [{ rarity, items, weight }] : [];
  });
  const totalWeight = groups.reduce((sum, group) => sum + group.weight, 0);
  if (!Number.isFinite(totalWeight) || totalWeight === 0) {
    throw new Error(`Case ${caseItem.id} has no items with valid drop weights`);
  }
  return {
    totalWeight,
    groups: groups.map((group) => ({ ...group, probability: group.weight / totalWeight })),
  };
}

function getCaseDropTable(caseItem: CaseContainer) {
  let table = caseDropTables.get(caseItem);
  if (!table) {
    table = buildCaseDropTable(caseItem);
    caseDropTables.set(caseItem, table);
  }
  return table;
}

export function getCaseDropRates(caseItem: CaseContainer): readonly CaseDropGroup[] {
  return getCaseDropTable(caseItem).groups;
}

export function rollSkinFromCase(caseItem: CaseContainer, random = Math.random): InventoryItem {
  const { groups, totalWeight } = getCaseDropTable(caseItem);
  let remaining = random() * totalWeight;
  let selected = groups[groups.length - 1];
  for (const group of groups) {
    if (remaining < group.weight) {
      selected = group;
      break;
    }
    remaining -= group.weight;
  }

  const template = selected.items[Math.floor(random() * selected.items.length)];
  return instantiateSkin(template, caseItem.category);
}

export function instantiateSkin(template: SkinTemplate, category: CaseContainer['category'] = 'base_cases'): InventoryItem {
  const isSticker = Boolean(template.isSticker);
  const isSouvenir = category === 'souvenir';
  const statTrak = !isSticker && !isSouvenir && Math.random() < 0.09;

  // Weighted float distribution (Field-Tested & Well-Worn are most common, Factory New is rare!)
  const rFloat = Math.random();
  const floatValue = isSticker
    ? 0
    : rFloat < 0.08
    ? Number((Math.random() * 0.069).toFixed(6))
    : rFloat < 0.26
    ? Number((0.07 + Math.random() * 0.079).toFixed(6))
    : Number((0.15 + Math.random() * 0.75).toFixed(6));

  const wearInfo = getWearInfo(floatValue);

  let finalPrice = template.basePrice * (isSticker ? 1 : wearInfo.multiplier);
  if (statTrak) finalPrice *= 1.75;
  if (isSouvenir) finalPrice *= 1.35;

  const stickers = isSouvenir && TOURNAMENT_STICKERS.length > 0
    ? [
        TOURNAMENT_STICKERS[Math.floor(Math.random() * TOURNAMENT_STICKERS.length)],
        TOURNAMENT_STICKERS[Math.floor(Math.random() * TOURNAMENT_STICKERS.length)],
        TOURNAMENT_STICKERS[Math.floor(Math.random() * TOURNAMENT_STICKERS.length)],
      ]
    : [];

  return {
    instanceId: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    templateId: template.id,
    weapon: template.weapon,
    name: template.name,
    rarity: template.rarity,
    image: template.image,
    floatValue,
    patternSeed: Math.floor(Math.random() * 999) + 1,
    wear: isSticker ? 'FN' : wearInfo.wear,
    wearName: isSticker ? 'Турнирная наклейка CS2' : wearInfo.wearName,
    statTrak,
    souvenir: isSouvenir,
    isSticker,
    stickers,
    price: Math.max(0.05, Number(finalPrice.toFixed(2))),
    obtainedAt: Date.now(),
    isLocked: false,
    marketTrend: {
      trendPct: getSkinMarketTrend(template.id).trendPct,
      isUp: getSkinMarketTrend(template.id).isUp,
    },
  };
}

const templatesById = new Map<string, SkinTemplate>();
for (const caseItem of INITIAL_CASES) {
  for (const item of caseItem.items) templatesById.set(item.id, item);
}
const allTemplates = [...templatesById.values()].sort((a, b) => a.basePrice - b.basePrice);

export function getAllTemplates(): readonly SkinTemplate[] {
  return allTemplates;
}

export const CS2_RANKS: CS2RankInfo[] = [
  { id: 1, name: 'Silver I', nameRu: 'Серебро I', tier: 'silver', icon: 'shield-outline', minElo: 0 },
  { id: 2, name: 'Silver II', nameRu: 'Серебро II', tier: 'silver', icon: 'shield-outline', minElo: 600 },
  { id: 3, name: 'Silver III', nameRu: 'Серебро III', tier: 'silver', icon: 'shield-outline', minElo: 1400 },
  { id: 4, name: 'Silver IV', nameRu: 'Серебро IV', tier: 'silver', icon: 'shield-outline', minElo: 2400 },
  { id: 5, name: 'Silver Elite', nameRu: 'Серебро-Элита', tier: 'silver', icon: 'shield-half-outline', minElo: 3600 },
  { id: 6, name: 'Silver Elite Master', nameRu: 'Серебро — Великий Магистр', tier: 'silver', icon: 'shield', minElo: 5000 },
  { id: 7, name: 'Gold Nova I', nameRu: 'Золотая Звезда — I', tier: 'nova', icon: 'star-outline', minElo: 6600 },
  { id: 8, name: 'Gold Nova II', nameRu: 'Золотая Звезда — II', tier: 'nova', icon: 'star-half-outline', minElo: 8400 },
  { id: 9, name: 'Gold Nova III', nameRu: 'Золотая Звезда — III', tier: 'nova', icon: 'star', minElo: 10400 },
  { id: 10, name: 'Gold Nova Master', nameRu: 'Золотая Звезда — Магистр', tier: 'nova', icon: 'ribbon-outline', minElo: 12800 },
  { id: 11, name: 'Master Guardian I', nameRu: 'Магистр-хранитель — I', tier: 'guardian', icon: 'trophy-outline', minElo: 15500 },
  { id: 12, name: 'Master Guardian II', nameRu: 'Магистр-хранитель — II', tier: 'guardian', icon: 'trophy-outline', minElo: 18500 },
  { id: 13, name: 'Master Guardian Elite', nameRu: 'Магистр-хранитель — Элита', tier: 'guardian', icon: 'trophy', minElo: 22000 },
  { id: 14, name: 'Distinguished Master Guardian', nameRu: 'Заслуженный Магистр (Бигстар)', tier: 'guardian', icon: 'medal-outline', minElo: 26000 },
  { id: 15, name: 'Legendary Eagle', nameRu: 'Легендарный Беркут', tier: 'elite', icon: 'flash-outline', minElo: 30500 },
  { id: 16, name: 'Legendary Eagle Master', nameRu: 'Беркут-Магистр (LEM)', tier: 'elite', icon: 'flash', minElo: 35500 },
  { id: 17, name: 'Supreme Master First Class', nameRu: 'Великий Магистр (Суприм)', tier: 'elite', icon: 'sparkles', minElo: 41000 },
  { id: 18, name: 'The Global Elite', nameRu: 'Всемирная Элита (Global Elite)', tier: 'elite', icon: 'planet', minElo: 48000 },
];

export function getCS2Rank(elo: number): CS2RankInfo {
  let cur = CS2_RANKS[0];
  for (const r of CS2_RANKS) {
    if (elo >= r.minElo) cur = r;
    else break;
  }
  return cur;
}

export function getNextCS2Rank(elo: number): { nextRank: CS2RankInfo | null; progress: number; needed: number } {
  const current = getCS2Rank(elo);
  const nextIdx = CS2_RANKS.findIndex((r) => r.id === current.id) + 1;
  if (nextIdx >= CS2_RANKS.length) {
    return { nextRank: null, progress: 1, needed: 0 };
  }
  const next = CS2_RANKS[nextIdx];
  const step = next.minElo - current.minElo;
  const currentInStep = elo - current.minElo;
  return {
    nextRank: next,
    progress: Math.min(1, Math.max(0, currentInStep / step)),
    needed: next.minElo - elo,
  };
}

export function getPremierRating(elo: number): PremierRatingInfo {
  // Premier CS Rating CS2 style
  const rating = Math.max(1000, Math.floor(elo * 0.72));
  if (rating < 5000) return { rating, color: '#9CA3AF', tierName: 'Серый' };
  if (rating < 10000) return { rating, color: '#38BDF8', tierName: 'Голубой' };
  if (rating < 15000) return { rating, color: '#3B82F6', tierName: 'Синий' };
  if (rating < 20000) return { rating, color: '#A855F7', tierName: 'Фиолетовый' };
  if (rating < 25000) return { rating, color: '#EC4899', tierName: 'Розовый' };
  if (rating < 30000) return { rating, color: '#EF4444', tierName: 'Красный' };
  return { rating, color: '#FACC15', tierName: 'Золотой' };
}

export const CS2_AVATARS = catalog.agents;

export const DAILY_CARE_PACKAGE: DailyCareReward[] = [
  { day: 1, type: 'coins', amount: 15, label: '+$15 Монет', icon: 'cash-outline' },
  { day: 2, type: 'case', caseId: 'case_revolution', label: 'Кейс «Революция»', icon: 'cube-outline' },
  { day: 3, type: 'capsule', caseId: 'capsule_copenhagen_legends', label: 'Капсула наклеек Major', icon: 'disc-outline' },
  { day: 4, type: 'coins', amount: 50, label: '+$50 Монет', icon: 'wallet-outline' },
  { day: 5, type: 'case', caseId: 'case_dreams_nightmares', label: 'Кейс «Грёзы и кошмары»', icon: 'cube-outline' },
  { day: 6, type: 'coins', amount: 100, label: '+$100 Монет', icon: 'card-outline' },
  { day: 7, type: 'knife', label: '★ Случайный Редкий Нож', icon: 'sparkles' },
];

export function getSkinMarketTrend(templateId: string): MarketTrendInfo {
  const today = new Date().toISOString().slice(0, 10);
  let hash = 0;
  const str = templateId + '_' + today;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const normalized = (Math.abs(hash % 200) / 10) - 10;
  const trendPct = Number(normalized.toFixed(1));
  const isUp = trendPct >= 0;
  const volume24h = (Math.abs(hash) % 450) + 20;

  let status: MarketTrendInfo['status'] = 'stable';
  let statusText = 'Стабильный спрос';
  if (trendPct > 6) {
    status = 'surging';
    statusText = '🔥 Всплеск спроса';
  } else if (trendPct > 0) {
    status = 'rising';
    statusText = '🟢 Рост цены';
  } else if (trendPct < -5) {
    status = 'crashing';
    statusText = '📉 Выгодная скидка';
  } else if (trendPct < 0) {
    status = 'dipping';
    statusText = '🔴 Коррекция';
  }

  return { trendPct, isUp, volume24h, status, statusText };
}

export function rollRandomKnife(): InventoryItem {
  const all = getAllTemplates();
  const knives = all.filter(
    (t) =>
      t.rarity === 'gold' &&
      (t.weapon.includes('Knife') ||
        t.weapon.includes('Bayonet') ||
        t.weapon.includes('Karambit') ||
        t.weapon.includes('Dagger') ||
        t.weapon.includes('Kerambit'))
  );
  const chosen = knives.length > 0 ? knives[Math.floor(Math.random() * knives.length)] : all[0];
  return instantiateSkin(chosen);
}

// Compute dynamic minPrice and maxPrice for cases that don't have them
for (const c of INITIAL_CASES) {
  if (!c.minPrice && c.items.length > 0) {
    const prices = c.items.map((i) => i.basePrice);
    c.minPrice = Math.max(0.05, Number((Math.min(...prices) * 0.68).toFixed(2)));
    c.maxPrice = Number((Math.max(...prices) * 1.45 * 1.75).toFixed(2));
  }
}
