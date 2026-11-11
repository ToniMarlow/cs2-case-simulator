import React, { memo, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { InventoryItem, RARITIES, RarityKey, SkinTemplate, ThemeMode } from '../types/cs2';

export interface ThemePalette {
  id: ThemeMode;
  name: string;
  subtitle: string;
  bgGradient: [string, string, string];
  headerBg: string;
  cardGradient: [string, string, string];
  skinCardGradient: [string, string];
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentSecondary: string;
  tabBarBg: string;
  surfaceBg: string;
  isLight: boolean;
}

export const THEMES: Record<ThemeMode, ThemePalette> = {
  bright: {
    id: 'bright',
    name: 'Яркая Неоновая (Светлая)',
    subtitle: 'Светлый жемчужный интерфейс с яркими акцентами CS2',
    bgGradient: ['#F0F7FF', '#E0F2FE', '#DBEAFE'],
    headerBg: 'rgba(255, 255, 255, 0.92)',
    cardGradient: [
      'rgba(255, 255, 255, 0.96)',
      'rgba(241, 248, 255, 0.94)',
      'rgba(230, 242, 255, 0.96)',
    ],
    skinCardGradient: ['rgba(255, 255, 255, 0.98)', 'rgba(241, 245, 249, 0.98)'],
    cardBorder: 'rgba(56, 189, 248, 0.35)',
    textPrimary: '#0F172A',
    textSecondary: '#334155',
    textMuted: '#64748B',
    accent: '#0284C7',
    accentSecondary: '#F59E0B',
    tabBarBg: 'rgba(255, 255, 255, 0.96)',
    surfaceBg: 'rgba(255, 255, 255, 0.85)',
    isLight: true,
  },
  cyber_blue: {
    id: 'cyber_blue',
    name: 'Кибер-Лазурь (Яркая Синяя)',
    subtitle: 'Насыщенный неоново-синий киберспортивный стиль',
    bgGradient: ['#0F2942', '#133B5C', '#1D4ED8'],
    headerBg: 'rgba(15, 41, 66, 0.92)',
    cardGradient: [
      'rgba(30, 64, 110, 0.92)',
      'rgba(23, 49, 86, 0.95)',
      'rgba(17, 36, 68, 0.98)',
    ],
    skinCardGradient: ['rgba(28, 62, 108, 0.96)', 'rgba(18, 40, 74, 0.98)'],
    cardBorder: 'rgba(56, 189, 248, 0.42)',
    textPrimary: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8',
    accent: '#38BDF8',
    accentSecondary: '#FBBF24',
    tabBarBg: 'rgba(15, 35, 62, 0.96)',
    surfaceBg: 'rgba(25, 55, 95, 0.75)',
    isLight: false,
  },
  obsidian: {
    id: 'obsidian',
    name: 'Ночной Обсидиан (Тёмная)',
    subtitle: 'Классическая контрастная тёмная тема',
    bgGradient: ['#0B1325', '#0F1B33', '#090F1E'],
    headerBg: 'rgba(13, 21, 38, 0.94)',
    cardGradient: [
      'rgba(28, 39, 68, 0.90)',
      'rgba(18, 26, 46, 0.95)',
      'rgba(12, 18, 34, 0.98)',
    ],
    skinCardGradient: ['rgba(24, 33, 56, 0.96)', 'rgba(14, 20, 36, 0.98)'],
    cardBorder: 'rgba(255, 255, 255, 0.16)',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    accent: '#38BDF8',
    accentSecondary: '#FFD700',
    tabBarBg: 'rgba(12, 18, 34, 0.96)',
    surfaceBg: 'rgba(255, 255, 255, 0.07)',
    isLight: false,
  },
};

export interface InGameNotification {
  id: string;
  title: string;
  message: string;
  type: 'error' | 'warning' | 'success' | 'info' | 'reward';
}

export const GameNotificationBanner: React.FC<{
  notification: InGameNotification | null;
  onDismiss: () => void;
}> = memo(({ notification, onDismiss }) => {
  if (!notification) return null;

  const palette = {
    error: {
      border: '#EF4444',
      bg: ['rgba(127, 29, 29, 0.96)', 'rgba(69, 10, 10, 0.98)'] as [string, string],
      icon: 'alert-circle' as const,
      iconColor: '#F87171',
      badge: 'ОШИБКА / НЕДОСТУПНО',
    },
    warning: {
      border: '#F59E0B',
      bg: ['rgba(120, 53, 15, 0.96)', 'rgba(69, 26, 3, 0.98)'] as [string, string],
      icon: 'warning' as const,
      iconColor: '#FBBF24',
      badge: 'ВНИМАНИЕ',
    },
    success: {
      border: '#10B981',
      bg: ['rgba(6, 78, 59, 0.96)', 'rgba(2, 44, 34, 0.98)'] as [string, string],
      icon: 'checkmark-circle' as const,
      iconColor: '#34D399',
      badge: 'УСПЕШНО',
    },
    reward: {
      border: '#FFD700',
      bg: ['rgba(113, 63, 18, 0.96)', 'rgba(66, 32, 6, 0.98)'] as [string, string],
      icon: 'trophy' as const,
      iconColor: '#FACC15',
      badge: 'НАГРАДА CS2 DROP',
    },
    info: {
      border: '#38BDF8',
      bg: ['rgba(12, 74, 110, 0.96)', 'rgba(8, 47, 73, 0.98)'] as [string, string],
      icon: 'information-circle' as const,
      iconColor: '#38BDF8',
      badge: 'УВЕДОМЛЕНИЕ',
    },
  }[notification.type];

  return (
    <View style={styles.toastOuter} pointerEvents="box-none">
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={onDismiss}
        style={[styles.toastCard, { borderColor: palette.border }]}
      >
        <LinearGradient
          colors={palette.bg}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={[styles.toastIconWrap, { borderColor: palette.border }]}>
          <Ionicons name={palette.icon} size={24} color={palette.iconColor} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.toastBadge, { color: palette.iconColor }]}>{palette.badge}</Text>
          <Text style={styles.toastTitle}>{notification.title}</Text>
          <Text style={styles.toastMsg}>{notification.message}</Text>
        </View>
        <View style={styles.toastCloseBtn}>
          <Ionicons name="close" size={18} color="#CBD5E1" />
        </View>
      </TouchableOpacity>
    </View>
  );
});

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  glowColor?: string;
  themeMode?: ThemeMode;
}

export const LiquidGlassCard: React.FC<GlassCardProps> = memo(
  ({ children, style, glowColor, themeMode = 'bright' }) => {
    const theme = THEMES[themeMode] || THEMES.bright;
    const borderCol = glowColor || theme.cardBorder;
    return (
      <View
        style={[
          styles.glassWrapper,
          {
            borderColor: borderCol,
            backgroundColor: theme.isLight ? '#FFFFFF' : '#0D1526',
          },
          style,
        ]}
      >
        <LinearGradient
          colors={theme.cardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
        {children}
      </View>
    );
  }
);

interface SkinCardProps {
  item: InventoryItem | SkinTemplate;
  onPress?: () => void;
  selected?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  compact?: boolean;
  themeMode?: ThemeMode;
}

export const SkinCard: React.FC<SkinCardProps> = memo(
  ({ item, onPress, selected, actionLabel, onAction, compact, themeMode = 'bright' }) => {
    const [imgError, setImgError] = useState(false);
    const rarityInfo = RARITIES[item.rarity as RarityKey] || RARITIES.milspec;
    const isInstance = 'instanceId' in item;
    const price = isInstance ? item.price : item.basePrice;
    const theme = THEMES[themeMode] || THEMES.bright;

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={[
          styles.skinCard,
          compact && styles.skinCardCompact,
          {
            backgroundColor: theme.isLight ? '#FFFFFF' : '#10192E',
            borderColor: selected
              ? '#10B981'
              : theme.isLight
              ? 'rgba(15, 23, 42, 0.12)'
              : 'rgba(255, 255, 255, 0.14)',
          },
          selected && styles.selectedBorder,
        ]}
      >
        <LinearGradient
          colors={theme.skinCardGradient}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Top rarity tint */}
        <View
          style={[
            styles.spotlightTop,
            { backgroundColor: rarityInfo.color, opacity: theme.isLight ? 0.18 : 0.15 },
          ]}
        />

        {/* Top Row: Badges & Price */}
        <View style={styles.badgeRow}>
          <View style={styles.badgesLeft}>
            <View style={[styles.rarityIndicator, { backgroundColor: rarityInfo.color }]} />
            {isInstance && (
              <View
                style={[
                  styles.wearBadge,
                  theme.isLight && { backgroundColor: 'rgba(15,23,42,0.08)' },
                ]}
              >
                <Text style={[styles.wearText, theme.isLight && { color: '#334155' }]}>
                  {item.wear}
                </Text>
              </View>
            )}
            {isInstance && item.statTrak && (
              <View style={styles.stBadge}>
                <Text style={styles.stText}>ST™</Text>
              </View>
            )}
            {isInstance && item.souvenir && (
              <View style={styles.souvBadge}>
                <Text style={styles.souvText}>SV</Text>
              </View>
            )}
          </View>

          <View
            style={[
              styles.priceBadge,
              theme.isLight && { backgroundColor: 'rgba(16, 185, 129, 0.16)' },
            ]}
          >
            <Text style={[styles.priceTag, theme.isLight && { color: '#059669' }]}>
              ${price.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Weapon 3D Render */}
        <View style={[styles.imageContainer, compact && { height: 72 }]}>
          {!imgError && item.image ? (
            <Image
              source={{ uri: item.image }}
              style={compact ? styles.skinImgCompact : styles.skinImg}
              resizeMode="contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <View style={[styles.fallbackIcon, { borderColor: rarityInfo.color }]}>
              <MaterialCommunityIcons
                name={item.rarity === 'gold' ? 'knife-military' : 'pistol'}
                size={24}
                color={rarityInfo.color}
              />
            </View>
          )}

          {/* Applied Stickers */}
          {isInstance && item.stickers && item.stickers.length > 0 && (
            <View style={styles.miniStickerRow}>
              {item.stickers.slice(0, 4).map((st, idx) => (
                <Image
                  key={idx}
                  source={{ uri: st.image }}
                  style={styles.miniStickerImg}
                  resizeMode="contain"
                />
              ))}
            </View>
          )}
        </View>

        {/* Weapon & Skin Info */}
        <View style={styles.infoBottom}>
          <Text
            numberOfLines={1}
            style={[styles.weaponText, { color: theme.textSecondary }]}
          >
            {item.weapon}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.skinNameText, { color: theme.textPrimary }]}
          >
            {item.name}
          </Text>

          {isInstance && !item.isSticker && !compact && (
            <View style={styles.inspectHintRow}>
              <Text style={[styles.floatText, { color: theme.textMuted }]}>
                F: {item.floatValue.toFixed(4)}
              </Text>
              <View
                style={[
                  styles.inspectChip,
                  theme.isLight && { backgroundColor: 'rgba(15,23,42,0.06)' },
                ]}
              >
                <Ionicons name="cube-outline" size={11} color={theme.textSecondary} />
                <Text style={[styles.inspectHint, { color: theme.textSecondary }]}>3D</Text>
              </View>
            </View>
          )}
        </View>

        {/* Sleek Bottom Rarity Accent Line */}
        <View style={[styles.rarityBar, { backgroundColor: rarityInfo.color }]} />

        {actionLabel && onAction && (
          <TouchableOpacity style={styles.sellBtn} onPress={onAction}>
            <Ionicons name="cash-outline" size={13} color="#10B981" />
            <Text style={[styles.sellBtnText, theme.isLight && { color: '#059669' }]}>
              {actionLabel}
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  toastOuter: {
    position: 'absolute',
    top: 52,
    left: 12,
    right: 12,
    zIndex: 9999,
    alignItems: 'center',
  },
  toastCard: {
    width: '100%',
    maxWidth: 460,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    borderRadius: 18,
    borderWidth: 1.5,
    overflow: 'hidden',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 10,
  },
  toastIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastBadge: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  toastTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    marginTop: 1,
  },
  toastMsg: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    lineHeight: 15,
  },
  toastCloseBtn: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  glassWrapper: {
    borderRadius: 22,
    borderWidth: 1.2,
    overflow: 'hidden',
  },
  skinCard: {
    width: '48.2%',
    borderRadius: 18,
    borderWidth: 1.2,
    padding: 11,
    marginBottom: 11,
    overflow: 'hidden',
    position: 'relative',
  },
  skinCardCompact: {
    width: 136,
    marginRight: 10,
    padding: 9,
    marginBottom: 4,
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: '#10B981',
  },
  spotlightTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  badgesLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  rarityIndicator: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  wearBadge: {
    backgroundColor: 'rgba(255,255,255,0.09)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  wearText: {
    color: '#CBD5E1',
    fontSize: 9,
    fontWeight: '800',
  },
  stBadge: {
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(249, 115, 22, 0.5)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  stText: {
    color: '#FB923C',
    fontSize: 9,
    fontWeight: '900',
  },
  souvBadge: {
    backgroundColor: 'rgba(234, 179, 8, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.5)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  souvText: {
    color: '#FACC15',
    fontSize: 9,
    fontWeight: '900',
  },
  priceBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.14)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  priceTag: {
    color: '#34D399',
    fontWeight: '800',
    fontSize: 11,
  },
  imageContainer: {
    height: 92,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    position: 'relative',
  },
  skinImg: {
    width: '94%',
    height: 88,
  },
  skinImgCompact: {
    width: 114,
    height: 68,
  },
  miniStickerRow: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    gap: 2,
  },
  miniStickerImg: {
    width: 18,
    height: 18,
  },
  fallbackIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  infoBottom: {
    marginTop: 2,
  },
  weaponText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
  },
  skinNameText: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 1,
  },
  inspectHintRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  floatText: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '600',
  },
  inspectChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  inspectHint: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '800',
  },
  rarityBar: {
    height: 3,
    borderRadius: 2,
    marginTop: 8,
  },
  sellBtn: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(16, 185, 129, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.35)',
    borderRadius: 10,
    paddingVertical: 7,
  },
  sellBtnText: {
    color: '#34D399',
    fontSize: 11,
    fontWeight: '800',
  },
});
