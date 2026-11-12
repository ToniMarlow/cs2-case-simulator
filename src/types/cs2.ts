export type RarityKey = 'milspec' | 'restricted' | 'classified' | 'covert' | 'gold';

export type CatalogCategory = 'base_cases' | 'black_market' | 'capsules' | 'souvenir';

export type WearShort = 'FN' | 'MW' | 'FT' | 'WW' | 'BS';

export type ThemeMode = 'bright' | 'cyber_blue' | 'obsidian';

export type AutoSellThreshold = 'none' | 'milspec' | 'restricted' | 'classified' | 'all_except_gold';

export interface CS2Agent {
  id: string;
  name: string;
  fullName: string;
  fraction: string;
  team: 'CT' | 'T';
  teamName: string;
  color: string;
  rarity: string;
  image: string;
}

export type CaseBattleMode = 'clutch' | 'terminal' | 'reverse' | 'shared';

export type CaseBattleFormat = '1v1' | '1v1v1' | '2v2';

export interface RarityInfo {
  key: RarityKey;
  name: string;
  color: string;
  glow: string;
  chance: number; // Realistic tough CS2 odds
}

export const RARITIES: Record<RarityKey, RarityInfo> = {
  milspec: {
    key: 'milspec',
    name: 'Армейское качество',
    color: '#4B69FF',
    glow: 'rgba(75, 105, 255, 0.45)',
    chance: 83.5, // Realistic tough Valve drop rate
  },
  restricted: {
    key: 'restricted',
    name: 'Запрещённое',
    color: '#8847FF',
    glow: 'rgba(136, 71, 255, 0.45)',
    chance: 13.5,
  },
  classified: {
    key: 'classified',
    name: 'Засекреченное',
    color: '#D32CE6',
    glow: 'rgba(211, 44, 230, 0.45)',
    chance: 2.35,
  },
  covert: {
    key: 'covert',
    name: 'Тайное',
    color: '#EB4B4B',
    glow: 'rgba(235, 75, 75, 0.5)',
    chance: 0.45,
  },
  gold: {
    key: 'gold',
    name: 'Редкий особый предмет',
    color: '#FFD700',
    glow: 'rgba(255, 215, 0, 0.6)',
    chance: 0.2,
  },
};

export interface SkinTemplate {
  id: string;
  weapon: string;
  name: string;
  rarity: RarityKey;
  basePrice: number;
  image: string;
  isSticker?: boolean;
}

export interface CaseContainer {
  id: string;
  name: string;
  subtitle: string;
  category: CatalogCategory;
  price: number;
  image: string;
  accentColor: string;
  customChances?: Partial<Record<RarityKey, number>>;
  items: SkinTemplate[];
  minPrice?: number;
  maxPrice?: number;
  badgeTag?: string;
}

export interface AppliedSticker {
  name: string;
  image: string;
  wear?: number;
}

export interface InventoryItem {
  instanceId: string;
  templateId: string;
  weapon: string;
  name: string;
  rarity: RarityKey;
  image: string;
  floatValue: number;
  patternSeed?: number;
  wear: WearShort;
  wearName: string;
  statTrak: boolean;
  souvenir: boolean;
  isSticker: boolean;
  stickers: AppliedSticker[];
  price: number;
  obtainedAt: number;
  isLocked?: boolean;
  marketTrend?: {
    trendPct: number;
    isUp: boolean;
  };
}

export interface MarketTrendInfo {
  trendPct: number;
  isUp: boolean;
  volume24h: number;
  status: 'surging' | 'rising' | 'stable' | 'dipping' | 'crashing';
  statusText: string;
}

export interface CS2RankInfo {
  id: number;
  name: string;
  nameRu: string;
  tier: 'silver' | 'nova' | 'guardian' | 'elite';
  icon: string;
  minElo: number;
}

export interface PremierRatingInfo {
  rating: number;
  color: string;
  tierName: string;
}

export interface DailyCareReward {
  day: number;
  type: 'coins' | 'case' | 'capsule' | 'knife';
  amount?: number;
  caseId?: string;
  label: string;
  icon: string;
}

export type QuestDifficulty = 'daily' | 'hardcore' | 'collector' | 'battle';

export interface QuestItem {
  id: string;
  title: string;
  description: string;
  difficulty: QuestDifficulty;
  reward: number;
  target: number;
  progress: number;
  claimed: boolean;
  type:
    | 'open_cases'
    | 'win_games'
    | 'sell_items'
    | 'get_covert'
    | 'upgrade_win'
    | 'win_case_battle'
    | 'win_reverse_battle'
    | 'craft_contract';
}

export type AuthProviderType = 'google' | 'yandex' | 'mailru';

export interface UserProfile {
  email: string;
  nickname: string;
  passwordHash: string;
  syncCode: string;
  provider: AuthProviderType;
  avatarColor: string;
  verified: boolean;
  createdAt: number;
}

export interface GameSettings {
  theme: ThemeMode;
  soundOn: boolean;
  hapticsOn: boolean;
  fastSpinDefault: boolean;
  showLiveTicker: boolean;
}
