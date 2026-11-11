export type RarityKey = 'milspec' | 'restricted' | 'classified' | 'covert' | 'gold';

export type CatalogCategory = 'base_cases' | 'black_market' | 'capsules' | 'souvenir';

export type WearShort = 'FN' | 'MW' | 'FT' | 'WW' | 'BS';

export interface RarityInfo {
  key: RarityKey;
  name: string;
  color: string;
  glow: string;
  chance: number; // default Valve chance
}

export const RARITIES: Record<RarityKey, RarityInfo> = {
  milspec: {
    key: 'milspec',
    name: 'Армейское качество',
    color: '#4B69FF',
    glow: 'rgba(75, 105, 255, 0.45)',
    chance: 79.92,
  },
  restricted: {
    key: 'restricted',
    name: 'Запрещённое',
    color: '#8847FF',
    glow: 'rgba(136, 71, 255, 0.45)',
    chance: 15.98,
  },
  classified: {
    key: 'classified',
    name: 'Засекреченное',
    color: '#D32CE6',
    glow: 'rgba(211, 44, 230, 0.45)',
    chance: 3.20,
  },
  covert: {
    key: 'covert',
    name: 'Тайное',
    color: '#EB4B4B',
    glow: 'rgba(235, 75, 75, 0.5)',
    chance: 0.64,
  },
  gold: {
    key: 'gold',
    name: 'Редкий особый предмет',
    color: '#FFD700',
    glow: 'rgba(255, 215, 0, 0.6)',
    chance: 0.26,
  },
};

export interface SkinTemplate {
  id: string;
  weapon: string;
  name: string;
  rarity: RarityKey;
  basePrice: number; // Base price for Field-Tested (FT)
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
}

export interface InventoryItem {
  instanceId: string;
  templateId: string;
  weapon: string;
  name: string;
  rarity: RarityKey;
  image: string;
  floatValue: number;
  wear: WearShort;
  wearName: string;
  statTrak: boolean;
  souvenir: boolean;
  isSticker: boolean;
  stickers: { name: string; image: string }[];
  price: number;
  obtainedAt: number;
}

export interface QuestItem {
  id: string;
  title: string;
  description: string;
  reward: number;
  target: number;
  progress: number;
  claimed: boolean;
  type: 'open_cases' | 'win_games' | 'sell_items' | 'get_covert' | 'upgrade_win';
}

export type AuthProviderType = 'google' | 'yandex' | 'mailru';

export interface UserProfile {
  email: string;
  nickname: string;
  provider: AuthProviderType;
  avatarColor: string;
  createdAt: number;
}
