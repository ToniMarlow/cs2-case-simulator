import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { LiquidGlassCard } from './LiquidGlassUI';

export interface RankTier {
  title: string;
  minElo: number;
  color: string;
  badgeBg: string;
}

export const CS2_RANKS: RankTier[] = [
  { title: 'Silver I', minElo: 1000, color: '#94A3B8', badgeBg: 'rgba(148, 163, 184, 0.18)' },
  { title: 'Gold Nova', minElo: 4000, color: '#38BDF8', badgeBg: 'rgba(56, 189, 248, 0.18)' },
  { title: 'Master Guardian (Калаш)', minElo: 8000, color: '#6366F1', badgeBg: 'rgba(99, 102, 241, 0.2)' },
  { title: 'Legendary Eagle (Беркут)', minElo: 13000, color: '#A855F7', badgeBg: 'rgba(168, 85, 247, 0.22)' },
  { title: 'Supreme Master', minElo: 19000, color: '#EC4899', badgeBg: 'rgba(236, 72, 153, 0.22)' },
  { title: 'The Global Elite', minElo: 25000, color: '#EF4444', badgeBg: 'rgba(239, 68, 68, 0.24)' },
  { title: '★ Premier Gold Legend', minElo: 30000, color: '#FFD700', badgeBg: 'rgba(255, 215, 0, 0.25)' },
];

export function getRankByElo(elo: number): { current: RankTier; next: RankTier | null; progressPct: number } {
  let current = CS2_RANKS[0];
  let next: RankTier | null = null;

  for (let i = 0; i < CS2_RANKS.length; i++) {
    if (elo >= CS2_RANKS[i].minElo) {
      current = CS2_RANKS[i];
      next = CS2_RANKS[i + 1] || null;
    }
  }

  if (!next) {
    return { current, next: null, progressPct: 100 };
  }

  const span = next.minElo - current.minElo;
  const into = elo - current.minElo;
  return {
    current,
    next,
    progressPct: Math.min(100, Math.max(0, Math.round((into / span) * 100))),
  };
}

export const DAILY_REWARDS = [
  { day: 1, reward: 150, label: 'День 1' },
  { day: 2, reward: 250, label: 'День 2' },
  { day: 3, reward: 400, label: 'День 3' },
  { day: 4, reward: 600, label: 'День 4' },
  { day: 5, reward: 900, label: 'День 5' },
  { day: 6, reward: 1400, label: 'День 6' },
  { day: 7, reward: 2500, label: 'День 7 ★' },
];

const AI_COLLECTORS = [
  { nickname: 's1mple_GOAT', elo: 34250, netWorth: 48500, topSkin: 'AWP | Dragon Lore (FN)' },
  { nickname: 'donk_spirit', elo: 32900, netWorth: 39200, topSkin: '★ Butterfly | Emerald' },
  { nickname: 'm0NESY_awa', elo: 29800, netWorth: 28400, topSkin: 'AWP | Gungnir (MW)' },
  { nickname: 'ZywOo_vit', elo: 27400, netWorth: 19600, topSkin: 'AK-47 | Wild Lotus' },
  { nickname: 'NiKo_deagle', elo: 23100, netWorth: 12400, topSkin: '★ Karambit | Sapphire' },
  { nickname: 'b1t_headshot', elo: 17500, netWorth: 6800, topSkin: 'M4A4 | Howl' },
  { nickname: 'jL_major_mvp', elo: 12200, netWorth: 3400, topSkin: '★ Sport Gloves | Vice' },
  { nickname: 'Cloud9_Boom', elo: 6500, netWorth: 1850, topSkin: 'AK-47 | Inheritance' },
  { nickname: 'Silver_Sniper', elo: 1950, netWorth: 920, topSkin: 'USP-S | Jawbreaker' },
];

interface DailyRewardModalProps {
  visible: boolean;
  streakDay: number; // 1..7
  canClaimToday: boolean;
  onClaim: (amount: number) => void;
  onClose: () => void;
}

export const DailyRewardModal: React.FC<DailyRewardModalProps> = ({
  visible,
  streakDay,
  canClaimToday,
  onClaim,
  onClose,
}) => {
  const currentRewardObj =
    DAILY_REWARDS.find((d) => d.day === streakDay) || DAILY_REWARDS[0];

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <LiquidGlassCard glowColor="#FFD700" style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <View style={styles.giftBadge}>
              <Ionicons name="gift" size={18} color="#FFD700" />
              <Text style={styles.giftBadgeText}>ЕЖЕДНЕВНЫЙ БОНУС CS2</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Ionicons name="close" size={18} color="#F8FAFC" />
            </TouchableOpacity>
          </View>

          <Text style={styles.modalTitle}>Заходи каждый день и богатей!</Text>
          <Text style={styles.modalSub}>
            Твоя серия входов: День {streakDay} из 7
          </Text>

          <View style={styles.daysGrid}>
            {DAILY_REWARDS.map((item) => {
              const isPast = item.day < streakDay;
              const isCurrent = item.day === streakDay;
              return (
                <View
                  key={item.day}
                  style={[
                    styles.dayBox,
                    item.day === 7 && styles.dayBoxMega,
                    isPast && styles.dayBoxClaimed,
                    isCurrent && styles.dayBoxCurrent,
                  ]}
                >
                  <Text style={styles.dayLabel}>{item.label}</Text>
                  <Text
                    style={[
                      styles.dayAmount,
                      isCurrent && { color: '#FFD700' },
                      isPast && { color: '#10B981' },
                    ]}
                  >
                    +${item.reward}
                  </Text>
                  <Text style={styles.dayState}>
                    {isPast ? '✓ Получено' : isCurrent ? 'Сегодня' : 'Скоро'}
                  </Text>
                </View>
              );
            })}
          </View>

          <TouchableOpacity
            disabled={!canClaimToday}
            style={[
              styles.claimBigBtn,
              !canClaimToday && { backgroundColor: 'rgba(255,255,255,0.08)' },
            ]}
            onPress={() => onClaim(currentRewardObj.reward)}
          >
            <Text
              style={[
                styles.claimBigText,
                !canClaimToday && { color: '#64748B' },
              ]}
            >
              {canClaimToday
                ? `ЗАБРАТЬ НАГРАДУ +$${currentRewardObj.reward}`
                : 'НАГРАДА НА СЕГОДНЯ УЖЕ ПОЛУЧЕНА ✓'}
            </Text>
          </TouchableOpacity>
        </LiquidGlassCard>
      </View>
    </Modal>
  );
};

interface LeaderboardSectionProps {
  playerNickname: string;
  playerElo: number;
  playerNetWorth: number;
  playerBestSkin: string;
}

export const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({
  playerNickname,
  playerElo,
  playerNetWorth,
  playerBestSkin,
}) => {
  const combined = [
    ...AI_COLLECTORS.map((c) => ({ ...c, isPlayer: false })),
    {
      nickname: `${playerNickname} (Ты)`,
      elo: playerElo,
      netWorth: Number(playerNetWorth.toFixed(2)),
      topSkin: playerBestSkin || 'Новичок CS2',
      isPlayer: true,
    },
  ].sort((a, b) => b.netWorth - a.netWorth);

  return (
    <LiquidGlassCard style={styles.lbCard}>
      <View style={styles.lbHeaderRow}>
        <Ionicons name="trophy" size={18} color="#FFD700" />
        <Text style={styles.lbTitle}>МИРОВОЙ РЕЙТИНГ КОЛЛЕКЦИОНЕРОВ</Text>
      </View>
      <Text style={styles.lbSub}>
        Общая стоимость (Баланс + Скины на складе). Обогони легенд киберспорта!
      </Text>

      {combined.map((entry, idx) => {
        const rankInfo = getRankByElo(entry.elo).current;
        const isTop3 = idx < 3;
        return (
          <View
            key={entry.nickname}
            style={[
              styles.lbRow,
              entry.isPlayer && styles.lbRowPlayer,
            ]}
          >
            <View
              style={[
                styles.placeBadge,
                idx === 0 && { backgroundColor: '#FFD700' },
                idx === 1 && { backgroundColor: '#CBD5E1' },
                idx === 2 && { backgroundColor: '#D97706' },
              ]}
            >
              <Text style={[styles.placeText, isTop3 && { color: '#040D1A' }]}>
                #{idx + 1}
              </Text>
            </View>

            <View style={{ flex: 1, marginLeft: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text
                  style={[
                    styles.lbNick,
                    entry.isPlayer && { color: '#38BDF8' },
                  ]}
                >
                  {entry.nickname}
                </Text>
                <View style={[styles.eloMiniPill, { backgroundColor: rankInfo.badgeBg }]}>
                  <Text style={[styles.eloMiniText, { color: rankInfo.color }]}>
                    {entry.elo.toLocaleString()} ELO
                  </Text>
                </View>
              </View>
              <Text numberOfLines={1} style={styles.lbBestSkin}>
                Топ дроп: {entry.topSkin}
              </Text>
            </View>

            <Text style={styles.lbWorth}>${entry.netWorth.toLocaleString()}</Text>
          </View>
        );
      })}
    </LiquidGlassCard>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    padding: 18,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  giftBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 215, 0, 0.16)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  giftBadgeText: {
    color: '#FFD700',
    fontSize: 10,
    fontWeight: '900',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
  },
  modalSub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 14,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  dayBox: {
    width: '31.5%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  dayBoxMega: {
    width: '100%',
    backgroundColor: 'rgba(255, 215, 0, 0.08)',
    borderColor: 'rgba(255, 215, 0, 0.35)',
  },
  dayBoxClaimed: {
    borderColor: 'rgba(16, 185, 129, 0.4)',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  dayBoxCurrent: {
    borderWidth: 1.8,
    borderColor: '#FFD700',
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
  },
  dayLabel: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '800',
  },
  dayAmount: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '900',
    marginVertical: 4,
  },
  dayState: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '700',
  },
  claimBigBtn: {
    backgroundColor: '#FFD700',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  claimBigText: {
    color: '#040D1A',
    fontWeight: '900',
    fontSize: 13,
  },
  lbCard: {
    padding: 16,
    marginTop: 14,
  },
  lbHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lbTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  lbSub: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 3,
    marginBottom: 12,
  },
  lbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    marginBottom: 7,
  },
  lbRowPlayer: {
    backgroundColor: 'rgba(56, 189, 248, 0.14)',
    borderColor: '#38BDF8',
  },
  placeBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '900',
  },
  lbNick: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '800',
  },
  eloMiniPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  eloMiniText: {
    fontSize: 9,
    fontWeight: '900',
  },
  lbBestSkin: {
    color: '#64748B',
    fontSize: 10,
    marginTop: 2,
  },
  lbWorth: {
    color: '#34D399',
    fontSize: 13,
    fontWeight: '900',
  },
});
